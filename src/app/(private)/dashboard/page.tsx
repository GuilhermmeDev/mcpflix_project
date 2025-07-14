'use client';
import { useState } from 'react';
import CheckAuth from '@/auth/checkAuth';
import Content from '@/components/content';
import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';

export default function Home() {
  CheckAuth();

  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  return (
    <div className="flex justify-center">
      <Sidebar />
      <main className="w-full md:ml-6">
        <Navbar onSearch={handleSearch} />
        <Content searchValue={searchValue} />
      </main>
    </div>
  );
}
