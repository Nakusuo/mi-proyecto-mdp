"use client";
import { useEffect, useState, FormEvent } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.css"; // estilos globales
import { CalendarDays, Paperclip } from "lucide-react";

type TipoDocumento = { ID_tipo_documento: number; nombre: string };
type Documento = { ID_documento: number; titulo: string; numero_documento?: string };
type Usuario = { ID_usuario: number; nombre: string };

export default function SalidaDocumento() {
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [tiposDocumento, setTiposDocumento] = useState<TipoDocumento[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  const [documentoSeleccionado, setDocumentoSeleccionado] = useState<number | "">("");
  const [numeroSalida, setNumeroSalida] = useState("");
  const [tipoSalida, setTipoSalida] = useState<number | "">("");
  const [destinatario, setDestinatario] = useState<number | "">("");
  const [fechaSalida, setFechaSalida] = useState<Date | null>(new Date());
  const [observacion, setObservacion] = useState("");
  const [archivoCargo, setArchivoCargo] = useState<File | null>(null);

  useEffect(() => {
    fetch("/api/documentos/pendientes_salida")
      .then((res) => res.json())
      .then((data: Documento[]) => setDocumentos(Array.isArray(data) ? data : []));

    fetch("/api/tipos_documento")
      .then((res) => res.json())
      .then((data: TipoDocumento[]) => setTiposDocumento(Array.isArray(data) ? data : []));

    fetch("/api/usuarios")
      .then((res) => res.json())
      .then((data: any[]) =>
        setUsuarios(
          Array.isArray(data)
            ? data.map((u) => ({ ID_usuario: u.ID_usuario, nombre: u.nombre }))
            : []
        )
      );
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!documentoSeleccionado || !numeroSalida || !tipoSalida || !destinatario) {
      alert("Por favor complete todos los campos obligatorios.");
      return;
    }

    const payload = new FormData();
    payload.append("ID_documento", String(documentoSeleccionado));
    payload.append("ID_tipo_documento", String(tipoSalida));
    payload.append("numero_documento_salida", numeroSalida);
    payload.append("ID_destinatario", String(destinatario));
    if (fechaSalida) payload.append("fecha_salida", fechaSalida.toISOString().split("T")[0]);
    payload.append("observacion", observacion);
    if (archivoCargo) payload.append("archivo_cargo", archivoCargo);

    fetch("/api/salidas_documento", {
      method: "POST",
      body: payload,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al registrar la salida");
        return res.json();
      })
      .then(() => alert("Salida registrada con éxito"))
      .catch((err) => alert(err.message));
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-2 text-green-900">
        Registrar Salida de Documento
      </h2>
      <p className="mb-6 text-gray-700">
        Complete el formulario para registrar la salida de un documento del sistema.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-lg">
        {/* Documento de Origen */}
        <div>
          <label className="block font-semibold mb-1">Documento de Origen</label>
          <select
            value={documentoSeleccionado}
            onChange={(e) => setDocumentoSeleccionado(Number(e.target.value))}
          >
            <option value="">Seleccionar documento de entrada</option>
            {documentos.map((d) => (
              <option key={d.ID_documento} value={d.ID_documento}>
                {d.titulo} {d.numero_documento ? `- ${d.numero_documento}` : ""}
              </option>
            ))}
          </select>
        </div>

        {/* Detalles */}
        <h3 className="text-xl font-bold text-green-700 mt-6">Detalles de la Salida</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Tipo de Documento</label>
            <select
              value={tipoSalida}
              onChange={(e) => setTipoSalida(Number(e.target.value))}
            >
              <option value="">Seleccione un tipo</option>
              {tiposDocumento.map((t) => (
                <option key={t.ID_tipo_documento} value={t.ID_tipo_documento}>
                  {t.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">N° Documento de Salida</label>
            <input
              type="number"
              placeholder="Ej: 01"
              value={numeroSalida}
              onChange={(e) => setNumeroSalida(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Destinatario</label>
            <select
              value={destinatario}
              onChange={(e) => setDestinatario(Number(e.target.value))}
            >
              <option value="">Seleccione un destinatario</option>
              {usuarios.map((u) => (
                <option key={u.ID_usuario} value={u.ID_usuario}>
                  {u.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* DatePicker con ícono alineado */}
          <div>
            <label className="block font-semibold mb-1">Fecha de Salida</label>
            <div className="relative">
              <CalendarDays
                className="absolute left-3 top-1/2 -translate-y-1/2 text-green-700 pointer-events-none"
                size={20}
              />
              <DatePicker
                selected={fechaSalida}
                onChange={(date) => setFechaSalida(date)}
                className="pl-10 pr-4 py-2 w-full"
                dateFormat="dd/MM/yyyy"
                placeholderText="Selecciona una fecha"
                calendarClassName="custom-datepicker"
              />
            </div>
          </div>
        </div>

        {/* Notas Adicionales */}
        <div>
          <label className="block font-semibold mb-1">Notas Adicionales</label>
          <textarea
            placeholder="Cualquier observación relevante sobre la salida."
            value={observacion}
            onChange={(e) => setObservacion(e.target.value)}
            rows={3}
          />
        </div>

        {/* Adjuntar cargo bonito */}
        <div>
          <label className="block font-semibold mb-1">Adjuntar Cargo</label>
          <label htmlFor="archivoCargo" className="file-label">
            <Paperclip size={18} /> Seleccionar archivo
          </label>
          <input
            type="file"
            id="archivoCargo"
            onChange={(e) => setArchivoCargo(e.target.files?.[0] || null)}
          />
          {archivoCargo && (
            <p className="text-sm mt-2 text-gray-600">
              📄 {archivoCargo.name}
            </p>
          )}
        </div>

        {/* Botones */}
        <div className="flex justify-end gap-4">
          <button type="button" className="btn-secondary" onClick={() => window.history.back()}>
            Cancelar
          </button>
          <button type="submit" className="btn-primary">
            Registrar Salida
          </button>
        </div>
      </form>
    </div>
  );
}
