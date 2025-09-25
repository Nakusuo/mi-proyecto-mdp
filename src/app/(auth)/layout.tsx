import "../globals.css";

export const metadata = {
  title: "Login - Sistema de Documentos",
  description: "Acceso al sistema",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="h-screen w-screen bg-gray-100 text-gray-900 overflow-hidden">
        {children}
      </body>
    </html>
  );
}
