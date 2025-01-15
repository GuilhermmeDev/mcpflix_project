import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function CheckAuth() {
  const router = useRouter();
  async function checkLogin() {
    const { error } = await supabase.auth.getUser(); // garante que o usuario só acesse a essa pagina se estiver logado
    if (error) {
      router.push("/login"); // caso o contrario, será mandado para a pagina de login
    }
  }
  checkLogin();
}
