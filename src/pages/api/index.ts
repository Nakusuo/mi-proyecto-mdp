import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import type { RowDataPacket } from "mysql2";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      // Aquí podrías filtrar por usuario logueado (ejemplo: req.query.userId)
      const [rows] = await db.query<RowDataPacket[]>(
        `SELECT 
          ID_documento as id,
          numero_registro as numeroRegistro,
          fecha_documento as fechaDocumento,
          tipo_documento as tipoDocumento,
          numero_documento as numeroDocumento,
          de_donde_proviene as deDondeProviene,
          asunto,
          responsable,
          estado,
          salida_tipo as salidaTipo,
          salida_numero as salidaNumero,
          salida_destino as salidaDestino
        FROM documentos
        ORDER BY fecha_documento DESC`
      );

      return res.status(200).json(rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error al obtener documentos" });
    }
  }

  return res.status(405).json({ error: "Método no permitido" });
}
