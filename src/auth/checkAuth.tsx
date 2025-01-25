import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function useCheckAuth() {
  const router = useRouter();

  useEffect(() => {
    const checkLogin = async () => {
      const { data: user, error } = await supabase.auth.getUser(); // Verifica o usuário logado

      if (!user || error) {
        router.push("/login"); // Redireciona para a página de login se o usuário não estiver logado
      }
    };

    checkLogin();
  }, [router]); // Executa quando o componente monta
}
