"use client";
import { useEffect, useState, FormEvent } from "react";

type TipoDocumento = { ID_tipo_documento: number; nombre: string };
type Area = { ID_area: number; nombre: string };
type Usuario = { id: number; nombre: string };
type Documento = {
  id: number;
  titulo: string;
  tipo: number;
  numeroDoc?: string;
  numeroHT: string;
  descripcion: string;
  archivo?: string;
  areaDestino?: number;
  usuarioAsignado?: number;
};

export default function SalidaDocumento() {
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [tiposDocumento, setTiposDocumento] = useState<TipoDocumento[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  const [documentoSeleccionado, setDocumentoSeleccionado] = useState<number | "">("");
  const [fechaSalida, setFechaSalida] = useState(() => new Date().toISOString().split("T")[0]);
  const [usuarioSalida, setUsuarioSalida] = useState<number | "">("");
  const [areaSalida, setAreaSalida] = useState<number | "">("");

  useEffect(() => {
    // Traer documentos pendientes
    fetch("/api/documentos/pendientes_salida")
      .then((res) => res.json())
      .then((data: Documento[]) => setDocumentos(Array.isArray(data) ? data : []));

    // Tipos de documento
    fetch("/api/tipos_documento")
      .then((res) => res.json())
      .then((data: TipoDocumento[]) => setTiposDocumento(Array.isArray(data) ? data : []));

    // Áreas
    fetch("/api/areas")
      .then((res) => res.json())
      .then((data: Area[]) => setAreas(Array.isArray(data) ? data : []));

    // Usuarios
    fetch("/api/usuarios")
      .then((res) => res.json())
      .then((data: any[]) =>
        setUsuarios(
          Array.isArray(data)
            ? data.map((u) => ({ id: u.ID_usuario || u.id, nombre: u.nombre }))
            : []
        )
      );
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!documentoSeleccionado || !usuarioSalida) {
      alert("Seleccione un documento y usuario para registrar la salida.");
      return;
    }

    const payload = {
      idDocumento: documentoSeleccionado,
      fechaSalida,
      usuarioSalida,
      areaSalida,
    };

    console.log("Salida registrada:", payload);
    alert("Salida registrada con éxito. Ver consola para detalles.");
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-green-900">Registrar Salida de Documento</h2>
      <p className="mb-6 text-gray-700">
        Complete la información para registrar la salida del documento seleccionado.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-lg">

        {/* Seleccionar documento */}
        <div>
          <label className="block font-semibold mb-1">Documento</label>
          <select
            value={documentoSeleccionado}
            onChange={(e) => setDocumentoSeleccionado(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Seleccione un documento</option>
            {documentos.map((d) => (
              <option key={d.id} value={d.id}>
                {d.titulo} - {d.numeroHT}
              </option>
            ))}
          </select>
        </div>

        {/* Información de salida */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block font-semibold mb-1">Fecha de Salida</label>
            <input
              type="date"
              value={fechaSalida}
              onChange={(e) => setFechaSalida(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex-1">
            <label className="block font-semibold mb-1">Área de Destino</label>
            <select
              value={areaSalida}
              onChange={(e) => setAreaSalida(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Seleccione un área</option>
              {areas.map((a) => (
                <option key={a.ID_area} value={a.ID_area}>
                  {a.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Usuario que registra */}
        <div>
          <label className="block font-semibold mb-1">Usuario que registra la salida</label>
          <select
            value={usuarioSalida}
            onChange={(e) => setUsuarioSalida(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Seleccione un usuario</option>
            {usuarios.map((u) => (
              <option key={u.id} value={u.id}>
                {u.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Botón */}
        <button
          type="submit"
          className="mt-4 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Registrar Salida
        </button>
      </form>
    </div>
  );
}
