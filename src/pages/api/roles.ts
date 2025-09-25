import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../lib/db';  // Ajusta según tu conexión

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).end();
    return;
  }
  try {
    const [roles] = await db.query('SELECT ID_rol, nombre FROM roles');
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener roles' });
  }
}
