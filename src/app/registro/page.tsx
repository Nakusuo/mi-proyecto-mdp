"use client";
import { useEffect, useState, FormEvent } from "react";
import { Paperclip } from "lucide-react";
import "./form.css"; // Usa el mismo CSS que Salida

type TipoDocumento = { ID_tipo_documento: number; nombre: string };
type Area = { ID_area: number; nombre: string };
type Usuario = { ID_usuario: number; nombre: string };

export default function RegistroDocumento() {
  const [tiposDocumento, setTiposDocumento] = useState<TipoDocumento[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [archivoCargo, setArchivoCargo] = useState<File | null>(null);  

  const [titulo, setTitulo] = useState("");
  const [tipo, setTipo] = useState<number | "">("");
  const [numeroDoc, setNumeroDoc] = useState("");
  const [numeroHT, setNumeroHT] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [areaDestino, setAreaDestino] = useState<number | "">("");
  const [usuarioAsignado, setUsuarioAsignado] = useState<number | "">("");

  useEffect(() => {
    Promise.all([
      fetch("/api/tipos_documento").then((res) => res.json()),
      fetch("/api/areas").then((res) => res.json()),
      fetch("/api/usuarios").then((res) => res.json()),
    ]).then(([tipos, areas, usuarios]) => {
      setTiposDocumento(Array.isArray(tipos) ? tipos : []);
      setAreas(Array.isArray(areas) ? areas : []);
      setUsuarios(
        Array.isArray(usuarios)
          ? usuarios.map((u) => ({ ID_usuario: u.ID_usuario, nombre: u.nombre }))
          : []
      );
    });
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
      archivoCargo,
    });
    alert("Formulario listo para enviar al backend");
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-green-900">
        Registrar Nuevo Documento
      </h2>
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
          />
        </div>

        {/* Tipo */}
        <div>
          <label className="block font-semibold mb-1">Tipo de Documento</label>
          <select value={tipo} onChange={(e) => setTipo(Number(e.target.value))}>
            <option value="">Seleccione un tipo</option>
            {tiposDocumento.map((t) => (
              <option key={t.ID_tipo_documento} value={t.ID_tipo_documento}>
                {t.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* N° Documento y HT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">
              N° Documento Externo (Opcional)
            </label>
            <input
              type="text"
              value={numeroDoc}
              onChange={(e) => setNumeroDoc(e.target.value)}
              placeholder="Ej: OFICIO-0123-2024"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">
              N° Hoja de Trámite (HT)
            </label>
            <input
              type="text"
              value={numeroHT}
              onChange={(e) => setNumeroHT(e.target.value)}
              placeholder="Ej: 2024-001234"
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
          />
        </div>

        {/* Adjuntar archivo (SOLO UNO) */}
        <div>
          <label className="block font-semibold mb-1">Adjuntar Cargo</label>
          <div className="relative">
            <input
              type="file"
              id="archivoCargo"
              className="hidden"
              onChange={(e) => setArchivoCargo(e.target.files?.[0] || null)}
            />
            <label
              htmlFor="archivoCargo"
              className="file-label flex items-center gap-2 cursor-pointer"
            >
              <Paperclip size={18} /> Seleccionar archivo
            </label>
            {archivoCargo && (
              <p className="text-sm mt-2 text-gray-600">📄 {archivoCargo.name}</p>
            )}
          </div>
        </div>

        {/* Área y Usuario */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Área de Destino</label>
            <select
              value={areaDestino}
              onChange={(e) => setAreaDestino(Number(e.target.value))}
            >
              <option value="">Seleccione un área</option>
              {areas.map((a) => (
                <option key={a.ID_area} value={a.ID_area}>
                  {a.nombre}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1">Asignar a</label>
            <select
              value={usuarioAsignado}
              onChange={(e) => setUsuarioAsignado(Number(e.target.value))}
            >
              <option value="">Seleccione un usuario</option>
              {usuarios.map((u) => (
                <option key={u.ID_usuario} value={u.ID_usuario}>
                  {u.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Botón */}
        <div className="flex justify-end">
          <button type="submit" className="btn-primary">
            Registrar Documento
          </button>
        </div>
      </form>
    </div>
  );
}
