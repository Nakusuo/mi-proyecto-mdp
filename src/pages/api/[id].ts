import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db';
import type { RowDataPacket } from 'mysql2';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query: { id } } = req;

  if (method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  try {
    const [rows] = await db.query<
      ({ ID_usuario: number; nombre: string; apellido: string; username: string; activo: number; rol_nombre: string } & RowDataPacket)[]
    >(
      `
      SELECT u.ID_usuario, u.nombre, u.apellido, u.username, u.activo, r.nombre AS rol_nombre
      FROM usuarios u
      LEFT JOIN usuario_roles ur ON u.ID_usuario = ur.ID_usuario
      LEFT JOIN roles r ON ur.ID_rol = r.ID_rol
      WHERE u.ID_usuario = ?
      `,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = {
      ID_usuario: rows[0].ID_usuario,
      nombre: rows[0].nombre,
      apellido: rows[0].apellido,
      username: rows[0].username,
      activo: !!rows[0].activo,
      roles: rows.map(row => row.rol_nombre).filter(Boolean),
    };

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
