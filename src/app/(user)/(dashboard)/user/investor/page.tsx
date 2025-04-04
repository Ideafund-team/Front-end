'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { fetcher } from '@/lib/fetcher';
import { Idea } from '@/types/idea';
import Cookies from 'js-cookie';
import { ChevronRight, HandCoins, LoaderCircle, MapPin, Plus, SearchIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import useSWR from 'swr';

export default function Page() {
  const userId = Cookies.get('userId');
  const { data: ideas = [] } = useSWR(userId ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/getidowner/ide/${userId}` : null, fetcher);

  const [searchTerm, setSearchTerm] = React.useState('');
  const [filteredIdeas, setFilteredIdeas] = React.useState<Idea[]>([]);

  React.useEffect(() => {
    if (ideas.length > 0) {
      setFilteredIdeas(ideas);
    }
  }, [ideas]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    if (value) {
      const filtered = ideas.filter((idea: Idea) => idea.title.toLowerCase().includes(value));
      setFilteredIdeas(filtered);
    } else {
      setFilteredIdeas(ideas);
    }
  };

  const { data: user } = useSWR(userId ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/${userId}` : null, fetcher);

  if (!user) {
    return (
      <div className="max-w-5xl w-full h-[80vh] mx-auto flex justify-center items-center">
        <p className="flex text-sm gap-2 items-center text-slate-500">
          <LoaderCircle size={18} className="animate-spin" /> Memuat...
        </p>
      </div>
    );
  }

  if (!user?.is_active) {
    return (
      <div className="max-w-5xl h-[80vh] mx-auto px-4 flex justify-center items-center">
        <div className="flex flex-col items-center">
          <Image src={'/restricted-nonactive.png'} width={200} height={200} alt="restricteds" unoptimized />
          <p className="text-sm text-slate-600 mt-3">Mohon maaf, akun anda belum aktif!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl">
      <div className="">
        <h1 className="text-2xl font-semibold">Investor Anda</h1>
        <p className="text-slate-600 text-sm">Daftar investor yang anda dapatkan</p>
      </div>
      <div className="mt-8 flex gap-4">
        <div className="relative w-full">
          <div className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground">
            <SearchIcon className="h-4 w-4" />
          </div>
          <Input id="search" type="search" value={searchTerm} placeholder="Cari Ide Usaha..." className="w-full bg-background pl-8 py-4" onChange={handleSearch} />
        </div>
        <Link href={'/user/ide/buat'}>
          <Button className="hover:bg-blue-500 bg-blue-600 cursor-pointer">
            Buat Ide <Plus />
          </Button>
        </Link>
      </div>
      <section className="grid pb-10 mt-3 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        {filteredIdeas && filteredIdeas.length > 0
          ? filteredIdeas.map((ide: Idea, index: number) => (
              <div key={index} className="border rounded-lg w-full p-4 mt-4">
                <div className="relative">
                  <Image src={ide.image} width={10} height={10} alt={ide.title} className="w-full rounded-md aspect-video object-cover" unoptimized />
                  <div className="absolute top-2 right-2 bg-white px-3 py-1 rounded-full flex items-center gap-2 shadow">
                    <span className={`h-2 w-2 rounded-full ${ide.status === true ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    <p className="text-xs font-medium">{ide.status === true ? 'Dibuka' : 'Ditutup'}</p>
                  </div>
                </div>
                <p className="text-xl font-semibold mt-3">{ide.title}</p>
                <div className="flex gap-2 mt-2">
                  <p className="text-blue-600 bg-blue-600/10 px-4 py-1 rounded-full text-xs">{ide.kategori}</p>
                </div>

                <p className="text-sm my-4 line-clamp-3">{ide.summary}</p>
                <div className="flex gap-2 items-center">
                  <p className="text-green-500 bg-green-500/10 flex gap-2 items-center w-max px-4 py-1 rounded-full text-sm">
                    <HandCoins size={18} /> {ide.investment_amount}
                  </p>
                  <p className="text-red-600 bg-red-600/10 flex gap-2 items-center w-max px-4 py-1 rounded-full text-sm">
                    <MapPin size={16} /> {ide.location}
                  </p>
                </div>
                <Link href={`/user/investor/${ide.id}`} className="mt-5">
                  <Button className="bg-blue-600 mt-5 hover:bg-blue-500 cursor-pointer w-full">
                    Lihat Investor <ChevronRight />
                  </Button>
                </Link>
              </div>
            ))
          : null}
      </section>
      {filteredIdeas && filteredIdeas.length === 0 && searchTerm != '' && <p className="text-center w-full text-sm mt-6 text-slate-400">Ide yang anda cari belum ada</p>}

      {ideas?.message === 'Ide tidak ditemukan' && searchTerm === '' ? <p className="text-center w-full text-sm mt-6 text-slate-400">Belum ada ide yang dibuat</p> : null}
    </div>
  );
}
