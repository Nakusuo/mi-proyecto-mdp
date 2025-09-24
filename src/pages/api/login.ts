import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../lib/db";
import crypto from "crypto";

type Usuario = {
  ID_usuario: number;
  username: string;
  password_hash: string;
  nombre: string;
  apellido: string;
  ID_area?: number;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") 
    return res.status(405).json({ message: "Método no permitido" });

  const { username, password } = req.body;

  if (!username || !password) 
    return res.status(400).json({ message: "Faltan datos" });

  try {
    const [rows] = await db.query(
      "SELECT * FROM usuarios WHERE username = ?",
      [username]
    ) as unknown as [Usuario[], any];

    const user = rows.length > 0 ? rows[0] : null;

    if (!user) 
      return res.status(401).json({ message: "Usuario no encontrado" });

    const hash = crypto.createHash("sha256").update(password).digest("hex");

    if (hash !== user.password_hash) 
      return res.status(401).json({ message: "Contraseña incorrecta" });

    // Obtener roles del usuario
    const [rolesRows] = await db.query(
      "SELECT r.nombre FROM roles r INNER JOIN usuario_roles ur ON r.ID_rol = ur.ID_rol WHERE ur.ID_usuario = ?",
      [user.ID_usuario]
    );

    const roles = Array.isArray(rolesRows) ? (rolesRows as any).map((r: any) => r.nombre) : [];

    return res.status(200).json({ 
      message: "Login correcto", 
      user: { 
        id: user.ID_usuario, 
        nombre: user.nombre,
        roles // ✅ array de roles, ej: ['Administrador', 'Mesa de Partes']
      } 
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error del servidor" });
  }
}
