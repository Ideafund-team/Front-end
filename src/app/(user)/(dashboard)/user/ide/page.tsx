'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { ChevronRight, Ellipsis, HandCoins, LoaderCircle, MapPin, Pencil, Plus, SearchIcon, Trash } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Cookies from 'js-cookie';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import { Idea } from '@/types/idea';
import { toast } from 'sonner';

export default function Page() {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
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

  const handleDeleteIdea = async (id: number): Promise<void> => {
    const token = Cookies.get('token');
    if (!token) {
      throw new Error('Token tidak ditemukan');
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/deleteidea/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        toast.error('Gagal menghapus ide');
      }

      if (response.ok) {
        toast.success('Ide berhasil dihapus');
        window.location.reload();
      }
      console.log('Ide berhasil dihapus');
    } catch (error) {
      console.error('Gagal menghapus ide:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl">
      <div className="">
        <h1 className="text-2xl font-semibold">Ide Anda</h1>
        <p className="text-slate-600 text-sm">Daftar ide yang sudah anda buat</p>
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
        {filteredIdeas &&
          filteredIdeas.map((ide: Idea, index: number) => (
            <div key={index} className="border rounded-lg w-full p-4 mt-4">
              <div className="flex w-full justify-between mb-3">
                <p className="bg-blue-600/10 rounded-full px-2.5 py-0.5 text-blue-600">
                  <span>{index + 1}</span>
                </p>
                <Dialog open={dialogOpen} onOpenChange={(open) => setDialogOpen(open)}>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Hapus Ide</DialogTitle>
                      <DialogDescription>Apakah anda yakin untuk menghapus ide?</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button type="submit" variant={'secondary'} className="cursor-pointer">
                          Batal
                        </Button>
                      </DialogClose>
                      <Button type="submit" className="cursor-pointer min-w-20" variant={'destructive'} onClick={() => handleDeleteIdea(ide.id)} disabled={isLoading}>
                        {isLoading ? <LoaderCircle /> : 'Hapus'}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <DropdownMenu>
                  <DropdownMenuTrigger className="text-slate-400 cursor-pointer hover:text-blue-600">
                    <Ellipsis />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-max min-w-[4rem]">
                    <DropdownMenuItem className="w-max">
                      <Button className="bg-red-500 hover:bg-red-400 cursor-pointer" onClick={() => setDialogOpen(true)}>
                        <Trash className="text-white" />
                      </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="w-max">
                      <Link href={`/user/ide/ubah/${ide.id}`}>
                        <Button className="bg-green-500 hover:bg-green-400 cursor-pointer">
                          {' '}
                          <Pencil className="text-white" />
                        </Button>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="relative">
                <Image src={ide.image} width={10} height={10} alt={ide.title} className="w-full rounded-md sm:h-52 object-cover" unoptimized />
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
              <Link href={`/detail-ide/${ide.id}`} className="mt-5">
                <Button className="bg-blue-600 mt-5 hover:bg-blue-500 cursor-pointer w-full">
                  Lihat Detail <ChevronRight />
                </Button>
              </Link>
            </div>
          ))}
      </section>

      {filteredIdeas && filteredIdeas.length === 0 && searchTerm != '' && <p className="text-center w-full text-sm mt-6 text-slate-400">Ide yang anda cari belum ada</p>}

      {ideas?.message === 'Ide tidak ditemukan' && searchTerm === '' ? <p className="text-center w-full text-sm mt-6 text-slate-400">Belum ada ide yang dibuat</p> : null}
    </div>
  );
}
