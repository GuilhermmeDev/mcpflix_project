import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

const publicRoutes = ['/login', '/register', '/']; // Defina suas rotas públicas aqui

const useAuth = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser();
      console.log(data);

      // Se o usuário estiver autenticado e em uma rota pública, redirecione para "/"
      if (data.user && publicRoutes.includes(pathname)) {
        router.replace('/dashboard');
      }
      // Se o usuário não estiver autenticado e estiver em uma rota privada, redirecione para a página de login
      if (!(data.user || publicRoutes.includes(pathname))) {
        router.replace('/login');
      }
    };

    checkAuth();
  }, [router, pathname]);
};

export default useAuth;
