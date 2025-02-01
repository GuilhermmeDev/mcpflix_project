import { supabase } from "@/lib/supabaseClient";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

const publicRoutes = ["/login", "/register", "/landing"]; // Defina suas rotas públicas aqui

const useAuth = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser();

      if (data.user) {
        // Se o usuário estiver autenticado e em uma rota pública, redirecione para "/"
        if (publicRoutes.includes(pathname)) {
          router.replace("/");
        }
      } else {
        // Se o usuário não estiver autenticado e estiver em uma rota privada, redirecione para a página de login
        if (!publicRoutes.includes(pathname)) {
          router.replace("/login");
        }
      }
    };

    checkAuth();
  }, [router, pathname]);
};

export default useAuth;
