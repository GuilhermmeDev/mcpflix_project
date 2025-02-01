"use client";
import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";
import Auth from "@/components/auth";
import { AuthApiError } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState<string>("");

  const [password, setPassw] = useState<string>("");

  const [error, setError] = useState<string>("");

  const router = useRouter();

  const handlerLogin = async (e) => {
    e.preventDefault();
    if (email.length > 0 && password.length > 0) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error<AuthApiError>) {
        console.error(error);
        setError("Seu email e/ou senha estão incorretos");
      } else {
        router.push("/"); // redireciona o usuario se o login for bem sucedido
      }
    }
  };
  return (
    <>
      <Auth
        handler={handlerLogin}
        setEmail={setEmail}
        setPassw={setPassw}
        error={error}
      />
    </>
  );
}
