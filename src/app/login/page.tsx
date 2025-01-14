"use client";
import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";
import Auth from "@/components/auth";

export default function Register() {
  const [email, setEmail] = useState<string>("");

  const [password, setPassw] = useState<string>("");

  const handlerLogin = async (e) => {
    e.preventDefault();
    if (email.length > 0 && password.length > 0) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error(error);
      } else {
        console.info("usuario logado:", data);
      }
    }
  };
  return (
    <>
      <Auth handler={handlerLogin} setEmail={setEmail} setPassw={setPassw} />
    </>
  );
}
