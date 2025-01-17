"use client";
import { supabase } from "@/lib/supabaseClient";
import React, { useState } from "react";
import Auth from "@/components/auth";

export default function Register() {
  const [email, setEmail] = useState<string>("");

  const [password, setPassw] = useState<string>("");

  const [name, setName] = useState<string>("");

  const [error, setError] = useState<string>("");

  const [success, setSuccess] = useState<boolean>(false);

  const handlerRegister = async (e) => {
    e.preventDefault();
    if (email.length > 0 && password.length > 0) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            favs: [],
          },
        },
      });

      if (data) {
        await supabase.auth.updateUser({
          data: {
            display_name: name,
          },
        });
      }
      if (error) {
        console.error(error);
        setError("Alguma coisa deu errado :(");
      } else {
        setSuccess(true);
      }
    }
  };

  return (
    <>
      <Auth
        setEmail={setEmail}
        setPassw={setPassw}
        setName={setName}
        handler={handlerRegister}
        error={error}
        success={success}
      />
    </>
  );
}
