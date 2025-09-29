import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import type { RowDataPacket } from "mysql2";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    // Contadores generales
    const [ingresadosRows] = await db.query<RowDataPacket[]>(
      "SELECT COUNT(*) as total FROM documentos"
    );
    const [salidosRows] = await db.query<RowDataPacket[]>(
      "SELECT COUNT(*) as total FROM documentos WHERE estado = 'Salido'"
    );
    const [asignadosRows] = await db.query<RowDataPacket[]>(
      "SELECT COUNT(*) as total FROM documentos WHERE responsable IS NOT NULL"
    );

    // Distribución por tipo
    const [tiposRows] = await db.query<RowDataPacket[]>(
      `SELECT td.nombre AS tipo, COUNT(d.ID_documento) as cantidad
       FROM documentos d
       JOIN tipos_documento td ON d.ID_tipo_documento = td.ID_tipo_documento
       GROUP BY td.nombre`
    );

    const data = {
      ingresados: ingresadosRows[0].total,
      salidos: salidosRows[0].total,
      asignados: asignadosRows[0].total,
      porTipo: tiposRows.map(r => ({
        tipo: r.tipo,
        cantidad: r.cantidad
      }))
    };

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener resumen del dashboard" });
  }
}
