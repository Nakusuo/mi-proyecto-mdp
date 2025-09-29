import type { NextApiRequest, NextApiResponse } from "next";
import formidable, { File, Fields, Files } from "formidable";
import { db } from "@/lib/db";

form.parse(req, async (err: Error | null, fields: Fields, files: Files) => {
  if (err) {
    console.error("Error al procesar FormData:", err);
    return res.status(500).json({ error: "Error al procesar archivo" });
  }

  const {
    ID_documento,
    ID_tipo_documento,
    numero_documento_salida,
    ID_destinatario,
    fecha_salida,
    observacion,
  } = fields;

  const archivoCargo = (files.archivo_cargo as File | undefined)?.newFilename || null;

import fs from "fs";
import path from "path";

// Desactivar el bodyParser de Next porque usaremos formidable
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const form = formidable({
    multiples: false,
    uploadDir: path.join(process.cwd(), "public", "uploads"),
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Error al procesar FormData:", err);
      return res.status(500).json({ error: "Error al procesar archivo" });
    }

    try {
      const {
        ID_documento,
        ID_tipo_documento,
        numero_documento_salida,
        ID_destinatario,
        fecha_salida,
        observacion,
      } = fields;

      const archivoCargo = (files.archivo_cargo as File | undefined)?.newFilename || null;

      // Insertar salida en la BD
      await db.query(
        `INSERT INTO salidas_documento 
         (ID_documento, ID_tipo_documento, numero_documento_salida, ID_destinatario, fecha_salida, observacion, archivo_cargo) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          ID_documento,
          ID_tipo_documento,
          numero_documento_salida,
          ID_destinatario,
          fecha_salida,
          observacion,
          archivoCargo,
        ]
      );

      // Actualizar estado del documento a "Salido"
      await db.query(
        "UPDATE documentos SET estado = 'Salido' WHERE ID_documento = ?",
        [ID_documento]
      );

      res.status(200).json({ message: "Salida registrada con éxito" });
    } catch (error) {
      console.error("Error guardando salida:", error);
      res.status(500).json({ error: "Error al registrar salida" });
    }
  });
}
