"use client";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import Content from "@/components/content";
import { useState } from "react";
import CheckAuth from "@/auth/checkAuth";

export default function Home() {
  CheckAuth();

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
