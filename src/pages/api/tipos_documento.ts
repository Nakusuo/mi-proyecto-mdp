import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const [rows] = await db.query("SELECT ID_tipo_documento AS id, nombre FROM tipos_documento");
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al obtener tipos de documento" });
  }
}
