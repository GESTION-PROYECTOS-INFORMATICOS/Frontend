"use client";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div>
      <h1>Inicia Sesión</h1>
      <button
        onClick={() => signIn("azure-ad", { callbackUrl: "http://localhost:3000/upload" })} // O la página donde quieres redirigir tras login
      >
        Iniciar sesión con Microsoft
      </button>
    </div>
  );
}
