"use client";
import { useState } from "react";
import Image from "next/image";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        alert("Login exitoso"); // Aquí luego rediriges a otra página
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Error en el servidor");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-200">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md flex flex-col items-center">
        
        {/* Logo */}
        <div className="mb-6">
          <Image src="/imagenes/logoPNP.png" alt="Logo PNP" width={120} height={120} />
        </div>

        {/* Título */}
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Mesa de Partes Digital
        </h1>

        {/* Formulario */}
        <form onSubmit={handleLogin} className="w-full flex flex-col gap-5">
          {/* Usuario */}
          <div className="relative">
            <span className="absolute left-4 top-3 text-gray-400 text-lg">👤</span>
            <input
              type="text"
              name="username"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-4 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            />
          </div>

          {/* Contraseña */}
          <div className="relative">
            <span className="absolute left-4 top-3 text-gray-400 text-lg">🔒</span>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            />
            <span
              className="absolute right-4 top-3 cursor-pointer text-gray-400 text-lg"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          {/* Mensaje de error */}
          {error && <p className="text-red-500 text-center">{error}</p>}

          {/* Botón */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 active:scale-95 transition transform"
          >
            Ingresar
          </button>

          {/* Link */}
          <a href="#" className="text-center text-sm text-blue-600 hover:underline mt-2">
            ¿Olvidaste tu contraseña?
          </a>
        </form>
      </div>
    </div>
  );
}
