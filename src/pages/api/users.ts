import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from "../../lib/db";

type UserWithRoles = {
  id: number;
  nombre: string;
  apellido: string;
  username: string;
  activo: boolean;
  roles: string[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  try {
    const [rows] = await db.query(
      `SELECT u.ID_usuario as id, u.nombre, u.apellido, u.username, u.activo, r.nombre as rol
       FROM usuarios u
       LEFT JOIN usuario_roles ur ON u.ID_usuario = ur.ID_usuario
       LEFT JOIN roles r ON ur.ID_rol = r.ID_rol`
    );

    // rows es un array con filas tipo { id, nombre, apellido, username, activo, rol }

    // Agrupamos por usuario
    const usersMap = new Map<number, UserWithRoles>();

    for (const row of rows as any[]) {
      const { id, nombre, apellido, username, activo, rol } = row;
      if (!usersMap.has(id)) {
        usersMap.set(id, {
          id,
          nombre,
          apellido,
          username,
          activo: Boolean(activo),
          roles: [],
        });
      }
      if (rol) {
        usersMap.get(id)!.roles.push(rol);
      }
    }

    const users = Array.from(usersMap.values());

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en la consulta' });
  }
}
