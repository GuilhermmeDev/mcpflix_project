'use client';

import Link from 'next/link';
import useAuth from '@/auth/checkAuth';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/supabaseClient';
import { AlertError } from './alert_error';

interface AuthProps {
  handler: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  setEmail: (value: string) => void;
  setPassw: (value: string) => void;
  setName?: (value: string) => void;
  error?: string;
} // props de passagem de estados entre telas de registro e login

export default function Auth({
  handler,
  setEmail,
  setPassw,
  setName,
  error,
}: AuthProps) {
  useAuth();

  const handleGoogleAuth = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  };

  return (
    <div className="h-screen">
      <div className="flex min-h-full flex-grow flex-col items-center justify-center">
        <Card className="w-full max-w-sm bg-card">
          <CardHeader>
            <CardTitle>{setName ? 'Crie sua conta' : 'Login'}</CardTitle>
            <CardDescription>
              Coloque seus dados abaixo para entrar na sua conta.
            </CardDescription>
            <div className="h-full w-full">
              <span className="text-muted-foreground text-sm">
                {setName
                  ? 'Já possui uma conta?'
                  : 'Não possui uma conta?'}{' '}
              </span>
              <Link
                className="text-primary text-sm hover:text-card-foreground"
                href={setName ? '/login' : '/register'}
              >
                {setName ? 'Login' : 'Registrar-se'}
              </Link>
              <hr className="mt-4" />
            </div>
          </CardHeader>
          <CardContent>
            {error && <AlertError className="mb-4" error={error} />}
            <form id="form" onSubmit={handler}>
              <div className="flex flex-col gap-6">
                {setName && (
                  <div className="grid gap-2">
                    <Label htmlFor="email">Nome</Label>
                    <Input
                      id="name"
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      required
                      type="text"
                    />
                  </div>
                )}
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="m@example.com"
                    required
                    type="email"
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Senha</Label>
                  </div>
                  <Input
                    id="password"
                    onChange={(e) => setPassw(e.target.value)}
                    required
                    type="password"
                  />
                </div>
              </div>
              <CardFooter className="mt-4 w-full flex-col gap-2 p-0">
                <Button className="w-full text-background" type="submit">
                  Entrar
                </Button>
                <Button
                  className="w-full"
                  onClick={handleGoogleAuth}
                  type="button"
                  variant="outline"
                >
                  Login com Google
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
