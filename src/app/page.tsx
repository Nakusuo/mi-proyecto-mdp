"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login"); // aquí redirige a la página /login
  }, [router]);

  return null; // no muestra nada, solo redirige
}
