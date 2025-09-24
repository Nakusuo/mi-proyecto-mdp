// src/app/layout.tsx
import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Sistema de Documentos",
  description: "Gestión de documentos PNP",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="flex h-screen bg-gray-100 text-gray-900">
        {/* Sidebar */}
        <aside className="w-64 bg-green-800 text-white flex flex-col">
          <div className="p-4 text-center font-bold text-lg border-b border-green-700">
            📂 MDP - Documentos
          </div>
          <nav className="flex-1 p-2 space-y-2">
            <Link
              href="/dashboard"
              className="block p-2 rounded hover:bg-green-700"
            >
              Dashboard
            </Link>
            <Link
              href="/registro"
              className="block p-2 rounded hover:bg-green-700"
            >
              Registro de Documentos
            </Link>
            <Link
              href="/salida"
              className="block p-2 rounded hover:bg-green-700"
            >
              Salida de Documentos
            </Link>
            <Link
              href="/bitacora"
              className="block p-2 rounded hover:bg-green-700"
            >
              Bitácora
            </Link>
            <Link
              href="/asignar"
              className="block p-2 rounded hover:bg-green-700"
            >
              Asignar Documentos
            </Link>
            <Link
              href="/usuarios"
              className="block p-2 rounded hover:bg-green-700"
            >
              Usuarios
            </Link>
            <Link
              href="/mis-documentos"
              className="block p-2 rounded hover:bg-green-700"
            >
              Mis Documentos
            </Link>
          </nav>
          <div className="p-4 border-t border-green-700">
            <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded">
              Cerrar Sesión
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 flex flex-col">
          {/* Topbar */}
          <header className="bg-yellow-500/90 text-gray-900 px-6 py-3 flex justify-between items-center shadow">
            <h1 className="font-semibold">Sistema de Gestión Documentaria</h1>
            <span className="text-sm">👤 Usuario en sesión</span>
          </header>

          {/* Page content */}
          <section className="flex-1 p-6 overflow-y-auto">{children}</section>
        </main>
      </body>
    </html>
  );
}
