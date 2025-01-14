"use client";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import Content from "@/components/content";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  useEffect(() => {
    async function checkLogin() {
      const { error } = await supabase.auth.getUser(); // garante que o usuario só acesse a essa pagina se estiver logado
      if (error) {
        router.push("/login"); // caso o contrario, será mandado para a pagina de login
      }
    }
    checkLogin();
  });

  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  return (
    <>
      <div className="flex justify-center">
        <Sidebar />
        <main className="md:ml-6 w-full">
          <Navbar onSearch={handleSearch} />
          <Content searchValue={searchValue} />
        </main>
      </div>
    </>
  );
}
