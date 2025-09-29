import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import type { RowDataPacket } from "mysql2";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    // Traer documentos que aún no tienen salida registrada
    const [rows] = await db.query<RowDataPacket[]>(`
      SELECT d.ID_documento, d.titulo, d.numero_documento
      FROM documentos d
      WHERE d.estado != 'Salido' OR d.estado IS NULL
    `);

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error obteniendo pendientes:", error);
    res.status(500).json({ error: "Error al obtener documentos pendientes" });
  }
}
