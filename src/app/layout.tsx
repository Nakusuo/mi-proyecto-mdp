// src/app/layout.tsx
import ClientLayout from "./ClientLayout";
import "./globals.css";

export const metadata = {
  title: "Sistema de Documentos",
  description: "Gestión de documentos PNP",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
