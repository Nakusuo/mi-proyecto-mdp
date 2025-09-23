import Image from "next/image"; // <- IMPORTANTE arriba del componente

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96 flex">

        {/* Lado izquierdo: logo */}
        <div className="hidden md:flex items-center justify-center w-1/3">
          <Image
            src="/imagenes/logoPNP.png" // ruta desde public/
            alt="Logo"
            width={96}  // ancho
            height={96} // alto
          />
        </div>

        {/* Lado derecho: formulario */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-center mb-6">Mesa de Partes Digital - UNITIC</h1>
          
          <form className="flex flex-col space-y-4" method="POST">
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-400">👤</span>
              <input
                type="text"
                name="username"
                placeholder="Usuario"
                required
                className="p-3 pl-10 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-400">🔒</span>
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                required
                className="p-3 pl-10 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute right-3 top-3 cursor-pointer text-gray-400">👁️</span>
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Ingresar
            </button>

            <a href="#" className="text-sm text-blue-600 hover:underline text-center">
              ¿Olvidaste tu contraseña?
            </a>
          </form>
        </div>

      </div>
    </div>
  );
}
