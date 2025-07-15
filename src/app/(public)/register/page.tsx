'use client';
import { useRouter } from 'next/navigation';
import type React from 'react';
import { useState } from 'react';
import { z } from 'zod';
import Auth from '@/components/auth';
import { supabase } from '@/lib/supabaseClient';
import { emailSchema } from '@/lib/validateEmail';

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');

  const [password, setPassw] = useState<string>('');

  const [name, setName] = useState<string>('');

  const [error, setError] = useState<string>('');

  const handlerRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = validateEmail(email);

    if (email.length > 0 && password.length > 0 && isValid) {
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
        setError('Alguma coisa deu errado :(');
      } else {
        router.push('/dashboard');
      }
    }
  };

  const validateEmail = (email: string) => {
    try {
      emailSchema.parse({ email });
      setEmail(email);
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Aqui você pode tratar o erro como preferir
        setEmail('');
        // Se você tiver uma função para mostrar erros, pode usá-la aqui
        setError(error.errors[0].message);
        return false;
      }
    }
    return true;
  };

  return (
    <Auth
      error={error}
      handler={handlerRegister}
      setEmail={setEmail}
      setName={setName}
      setPassw={setPassw}
    />
  );
}
