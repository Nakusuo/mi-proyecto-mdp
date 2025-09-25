"use client";
import { useEffect, useState, FormEvent } from "react";

type TipoDocumento = { ID_tipo_documento: number; nombre: string };
type Area = { ID_area: number; nombre: string };
type Usuario = { id: number; nombre: string };

export default function RegistroDocumento() {
  const [tiposDocumento, setTiposDocumento] = useState<TipoDocumento[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  const [titulo, setTitulo] = useState("");
  const [tipo, setTipo] = useState<number | "">("");
  const [numeroDoc, setNumeroDoc] = useState("");
  const [numeroHT, setNumeroHT] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [areaDestino, setAreaDestino] = useState<number | "">("");
  const [usuarioAsignado, setUsuarioAsignado] = useState<number | "">("");
  const [archivo, setArchivo] = useState<File | null>(null);

  useEffect(() => {
    // Fetch tipos de documento
    fetch("/api/tipos_documento")
      .then((res) => res.json())
      .then((data: TipoDocumento[]) =>
        setTiposDocumento(Array.isArray(data) ? data : [])
      );

    // Fetch áreas
    fetch("/api/areas")
      .then((res) => res.json())
      .then((data: Area[]) => setAreas(Array.isArray(data) ? data : []));

    // Fetch usuarios
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
    console.log({
      titulo,
      tipo,
      numeroDoc,
      numeroHT,
      descripcion,
      areaDestino,
      usuarioAsignado,
      archivo,
    });
    alert("Formulario listo para enviar al backend");
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-green-900">Registrar Nuevo Documento</h2>
      <p className="mb-6 text-gray-700">
        Complete el formulario para registrar un nuevo documento en el sistema.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-lg">
        {/* Título */}
        <div>
          <label className="block font-semibold mb-1">Asunto / Título</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Ej: Solicitud de información sobre patrullaje"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Tipo de Documento */}
        <div>
          <label className="block font-semibold mb-1">Tipo de documento</label>
          <select
            value={tipo}
            onChange={(e) => setTipo(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Seleccione un tipo</option>
            {Array.isArray(tiposDocumento) &&
              tiposDocumento.map((t) => (
                <option key={t.ID_tipo_documento} value={t.ID_tipo_documento}>
                  {t.nombre}
                </option>
              ))}
          </select>
        </div>

        {/* N° Documento y HT */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-semibold mb-1">N° Documento Externo (Opcional)</label>
            <input
              type="text"
              value={numeroDoc}
              onChange={(e) => setNumeroDoc(e.target.value)}
              placeholder="Ej: OFICIO-0123-2024"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex-1">
            <label className="block font-semibold mb-1">N° Hoja de Trámite (HT)</label>
            <input
              type="text"
              value={numeroHT}
              onChange={(e) => setNumeroHT(e.target.value)}
              placeholder="Ej: 2024-001234"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Descripción */}
        <div>
          <label className="block font-semibold mb-1">Descripción / Sumilla</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Breve resumen del contenido del documento"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Archivo */}
        <div>
          <label className="block font-semibold mb-1">Adjuntar Archivo</label>
          <input
            type="file"
            onChange={(e) => setArchivo(e.target.files ? e.target.files[0] : null)}
            className="w-full"
          />
        </div>

        {/* Área y Usuario */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-semibold mb-1">Área de Destino</label>
            <select
              value={areaDestino}
              onChange={(e) => setAreaDestino(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Seleccione un área</option>
              {Array.isArray(areas) &&
                areas.map((a) => (
                  <option key={a.ID_area} value={a.ID_area}>
                    {a.nombre}
                  </option>
                ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="block font-semibold mb-1">Asignar a</label>
            <select
              value={usuarioAsignado}
              onChange={(e) => setUsuarioAsignado(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Seleccione un usuario</option>
              {Array.isArray(usuarios) &&
                usuarios.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.nombre}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* Botón */}
        <button
          type="submit"
          className="mt-4 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Registrar Documento
        </button>
      </form>
    </div>
  );
}
