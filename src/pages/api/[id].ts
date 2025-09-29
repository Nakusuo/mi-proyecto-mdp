import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "PUT") {
    try {
      const { asunto, estado, salidaTipo, salidaNumero, salidaDestino } = req.body;

      await db.query(
        `UPDATE documentos 
         SET asunto = ?, estado = ?, salida_tipo = ?, salida_numero = ?, salida_destino = ?
         WHERE ID_documento = ?`,
        [asunto, estado, salidaTipo, salidaNumero, salidaDestino, id]
      );

      return res.status(200).json({ message: "Documento actualizado correctamente" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error al actualizar documento" });
    }
  }

  return res.status(405).json({ error: "Método no permitido" });
}
