"use client";

import { useState } from "react";

type Documento = {
  id: number;
  titulo: string;
  descripcion: string;
  estado: "En Proyecto" | "Stand By" | "Finalizado";
  tipoAtencion: "Pendiente" | "Atendido" | "Informe" | "Informe Técnico con EETT";
  anotaciones?: string;
};

export default function MisDocumentosPage() {
  const [documentos, setDocumentos] = useState<Documento[]>([
    {
      id: 1,
      titulo: "Informe de Seguridad",
      descripcion: "Revisión de cámaras en sede central",
      estado: "En Proyecto",
      tipoAtencion: "Pendiente",
    },
    {
      id: 2,
      titulo: "Solicitud de TI",
      descripcion: "Instalación de software de monitoreo",
      estado: "Stand By",
      tipoAtencion: "Atendido",
    },
    {
      id: 3,
      titulo: "Requerimiento Técnico",
      descripcion: "Revisión de infraestructura de red",
      estado: "Finalizado",
      tipoAtencion: "Informe Técnico con EETT",
    },
  ]);

  const [selectedDoc, setSelectedDoc] = useState<Documento | null>(null);

  const handleSave = () => {
    if (selectedDoc) {
      setDocumentos((prev) =>
        prev.map((doc) => (doc.id === selectedDoc.id ? selectedDoc : doc))
      );
      setSelectedDoc(null);
    }
  };

  const getEstadoColor = (estado: Documento["estado"]) => {
    switch (estado) {
      case "En Proyecto":
        return "bg-green-100 text-green-700 border border-green-300";
      case "Stand By":
        return "bg-yellow-100 text-yellow-700 border border-yellow-300";
      case "Finalizado":
        return "bg-red-100 text-red-700 border border-red-300";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-[var(--pnp-green)] mb-6">
        📄 Mis Documentos
      </h1>

      {/* Lista de documentos */}
      <div className="grid gap-6">
        {documentos.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 border border-gray-200 flex justify-between items-center"
          >
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                {doc.titulo}
              </h2>
              <p className="text-gray-600">{doc.descripcion}</p>
              <span
                className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${getEstadoColor(
                  doc.estado
                )}`}
              >
                {doc.estado}
              </span>
            </div>
            <button
              onClick={() => setSelectedDoc(doc)}
              className="bg-[var(--pnp-yellow)] hover:bg-yellow-400 text-black font-semibold px-4 py-2 rounded-lg shadow"
            >
              ⚙️ Modificaciones
            </button>
          </div>
        ))}
      </div>

      {/* Modal bonito */}
      {selectedDoc && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              ✏️ {selectedDoc.titulo}
            </h2>
            <p className="text-gray-500 mb-6">{selectedDoc.descripcion}</p>

            {/* Estado */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estado
              </label>
              <select
                value={selectedDoc.estado}
                onChange={(e) =>
                  setSelectedDoc({
                    ...selectedDoc,
                    estado: e.target.value as Documento["estado"],
                  })
                }
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[var(--pnp-green)]"
              >
                <option value="En Proyecto">En Proyecto</option>
                <option value="Stand By">Stand By</option>
                <option value="Finalizado">Finalizado</option>
              </select>
            </div>

            {/* Tipo de Atención */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Atención
              </label>
              <select
                value={selectedDoc.tipoAtencion}
                onChange={(e) =>
                  setSelectedDoc({
                    ...selectedDoc,
                    tipoAtencion: e.target.value as Documento["tipoAtencion"],
                  })
                }
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[var(--pnp-green)]"
              >
                <option value="Pendiente">Pendiente</option>
                <option value="Atendido">Atendido</option>
                <option value="Informe">Informe</option>
                <option value="Informe Técnico con EETT">
                  Informe Técnico con EETT
                </option>
              </select>
            </div>

            {/* Anotaciones */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Anotaciones
              </label>
              <textarea
                value={selectedDoc.anotaciones || ""}
                onChange={(e) =>
                  setSelectedDoc({ ...selectedDoc, anotaciones: e.target.value })
                }
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[var(--pnp-green)]"
                rows={3}
                placeholder="Escribe observaciones..."
              />
            </div>

            {/* Botones */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedDoc(null)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-4 py-2 rounded-lg"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="bg-[var(--pnp-green)] hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg"
              >
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animaciones */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            transform: translateY(-10px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
