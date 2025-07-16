// src/auth/useUserInfo.ts
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export function useUserInfo() {
  const [userInfo, setUserInfo] = useState<{
    name?: string;
    email?: string;
    favs?: number;
  }>({});

  useEffect(() => {
    async function fetchUser() {
      const { data } = await supabase.auth.getUser();
      setUserInfo({
        name: data.user?.user_metadata?.name || '',
        email: data.user?.email || '',
        favs: data.user?.user_metadata.favs.length || 0,
      });
    }
    fetchUser();
  }, []);

  return userInfo;
}
