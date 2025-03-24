'use client';

import { fetcher } from '@/lib/fetcher';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import Cookies from 'js-cookie';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function Page() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    setUserId(Cookies.get('userId') || null);
  }, []);

  const { data } = useSWR(userId ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/${userId}` : null, fetcher);

  return (
    <div className="max-w-2xl">
      <div className="">
        <h1 className="text-2xl font-semibold">Profil Anda</h1>
        <p className="text-slate-600 text-sm">Data profil anda</p>
      </div>
      {data ? (
        <div className="mt-8 w-full">
          <Label>Foto Profil</Label>
          <Image src={data.foto_profil} width={100} height={100} alt={data.nama} unoptimized className="rounded-full w-32 h-32 object-cover mt-4" />
          <Label className="my-4">Nama</Label>
          <Input type="text" value={data.nama} />
          <Label className="my-4">Email</Label>
          <Input type="text" value={data.email} />
          <Label className="my-4">No Handphone</Label>
          <Input type="text" value={data.no_hp} />
          <Label className="my-4">Alamat</Label>
          <Input type="text" value={data.alamat} />
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
}
