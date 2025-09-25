// src/app/ClientLayout.tsx
"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }: { children: ReactNode }) {
  const user = { nombre: "Demo" }; // Simula usuario logueado
  const pathname = usePathname();

  // Oculta sidebar en login
  const hideSidebar = pathname === "/login";

  return (
    <div className="flex h-screen font-sans bg-gray-100 text-gray-900">
      {user && !hideSidebar && (
        <aside className="w-64 bg-gradient-to-b from-green-800 to-green-900 text-white flex flex-col shadow-lg">
          <div className="p-6 text-center font-bold text-xl border-b border-green-700 tracking-wide">
            📂 MDP - Documentos
          </div>
          <nav className="flex-1 p-4 space-y-2">
            <Link href="/dashboard" className="block p-3 rounded-lg hover:bg-green-700 transition">
              Dashboard
            </Link>
            <Link href="/registro" className="block p-3 rounded-lg hover:bg-green-700 transition">
              Registro de Documentos
            </Link>
            <Link href="/salida" className="block p-3 rounded-lg hover:bg-green-700 transition">
              Salida de Documentos
            </Link>
            <Link href="/bitacora" className="block p-3 rounded-lg hover:bg-green-700 transition">
              Bitácora
            </Link>
            <Link href="/asignar" className="block p-3 rounded-lg hover:bg-green-700 transition">
              Asignar Documentos
            </Link>
            <Link href="/usuarios" className="block p-3 rounded-lg hover:bg-green-700 transition">
              Usuarios
            </Link>
            <Link href="/mis-documentos" className="block p-3 rounded-lg hover:bg-green-700 transition">
              Mis Documentos
            </Link>
          </nav>
          <div className="p-4 border-t border-green-700">
            <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg shadow">
              Cerrar Sesión
            </button>
          </div>
        </aside>
      )}

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className={`px-6 py-4 flex justify-between items-center shadow-md border-b ${
          hideSidebar ? "bg-blue-500/90 text-white" : "bg-yellow-500/95 text-gray-900 border-yellow-400"
        }`}>
          <h1 className="font-bold text-lg md:text-xl tracking-wide">
            {hideSidebar ? "Iniciar Sesión" : "Sistema de Gestión Documentaria"}
          </h1>
          {!hideSidebar && <span className="text-sm md:text-base font-medium">👤 {user.nombre}</span>}
        </header>

        <section className="flex-1 p-6 overflow-y-auto space-y-6">
          {children}
        </section>
      </main>
    </div>
  );
}
