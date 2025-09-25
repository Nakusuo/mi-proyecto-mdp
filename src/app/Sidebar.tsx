"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-green-800 text-white flex flex-col shadow-lg">
      <div className="p-6 text-center font-bold text-xl border-b border-green-700 tracking-wide">
        📂 MDP - Documentos
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <Link href="/dashboard" className="block p-3 rounded-lg hover:bg-green-700 transition">Dashboard</Link>
        <Link href="/usuarios" className="block p-3 rounded-lg hover:bg-green-700 transition">Usuarios</Link>
        <Link href="/registro" className="block p-3 rounded-lg hover:bg-green-700 transition">Registro</Link>
      </nav>
    </aside>
  );
}
