'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { fetcher } from '@/lib/fetcher';
import { Idea } from '@/types/idea';
import { Label } from '@radix-ui/react-dropdown-menu';
import Cookies from 'js-cookie';
import { Ellipsis, Eye, HandCoins, LoaderCircle, MapPin, Pencil, SearchIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { toast } from 'sonner';
import useSWR from 'swr';

export default function Page() {
  const { data: ideas = [] } = useSWR(process.env.NEXT_PUBLIC_API_BASE_URL + '/idea', fetcher);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filteredIdeas, setFilteredIdeas] = React.useState<Idea[]>([]);
  const [isVerified, setIsVerified] = React.useState('1');
  const [selectedIdeaId, setSelectedIdeaId] = React.useState<string | null>(null);

  const token = Cookies.get('token');

  const handleVerifyIde = async (id: string, is_verified: string) => {
    console.log(id);
    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/verify`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, is_verified }),
      });
      const data = await response.json();
      console.log('Response:', data);
      toast.success('Ide berhasil diverifikasi');
      if (!isLoading) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      toast.error('Terjadi kesalahan saat memverifikasi ide.');
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (ideas.length > 0) {
      const reversedIdeas = [...ideas].reverse();
      setFilteredIdeas(reversedIdeas);
    }
  }, [ideas]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    if (value) {
      const filtered = ideas
        .slice()
        .reverse()
        .filter((idea: Idea) => idea.title.toLowerCase().includes(value));
      setFilteredIdeas(filtered);
    } else {
      setFilteredIdeas([...ideas].reverse());
    }
  };

  return (
    <div className="max-w-5xl">
      <div className="">
        <h1 className="text-2xl font-semibold">Data Ide</h1>
        <p className="text-slate-600 text-sm">Daftar data ide yang sudah dibuat</p>
      </div>
      <div className="mt-8 flex gap-4">
        <div className="relative w-full">
          <div className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground">
            <SearchIcon className="h-4 w-4" />
          </div>
          <Input id="search" type="search" value={searchTerm} placeholder="Cari Ide Usaha..." className="w-full bg-background pl-8 py-4" onChange={handleSearch} />
        </div>
      </div>
      <section className="flex flex-col gap-4 mt-6">
        {filteredIdeas && filteredIdeas.length > 0
          ? filteredIdeas.map((ide: Idea, index: number) => (
              <div key={index} className="border-y py-3 flex max-sm:flex-col max-sm:gap-5 justify-between items-center">
                <div className="flex gap-4 w-[70%] max-sm:flex-col max-sm:w-full">
                  <div>
                    <Image src={ide.image} width={150} height={100} alt={ide.title} className="rounded-md aspect-square max-w-[7.5rem] min-w-[7.5rem] object-cover shadow-sm max-sm:min-w-full" unoptimized />
                  </div>
                  <div>
                    <p className="font-medium text-lg">{ide.title}</p>
                    <p className="text-xs text-slate-500">{new Date(ide.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                    <p className="text-sm text-slate-500 mt-1">{ide.summary}</p>
                    <div className="flex gap-2 items-center mt-2">
                      <p className="flex gap-2 items-center text-sm">
                        <HandCoins size={16} className="text-green-500 text-sm" />
                        Rp. {parseFloat(ide.investment_amount).toLocaleString('id-ID')}
                      </p>
                      <p className="flex gap-2 items-center text-sm">
                        <MapPin size={16} className="text-red-500" />
                        {ide.location}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 max-sm:justify-between max-sm:w-full">
                  <p className="text-xs">
                    {ide.created_at === ide.updated_at ? (
                      <span className="bg-yellow-500/10 text-yellow-500 px-3 py-1 rounded-full">Menunggu Verifikasi</span>
                    ) : ide.is_verified ? (
                      <span className="bg-green-500/10 text-green-500 px-3 py-1 rounded-full">Diterima</span>
                    ) : (
                      <span className="bg-red-500/10 px-3 py-1.5 text-red-500 p-2 rounded-full">Ditolak</span>
                    )}
                  </p>
                  <Dialog open={dialogOpen} onOpenChange={(open) => setDialogOpen(open)}>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle className='text-left'>Verifikasi Ide</DialogTitle>
                      </DialogHeader>
                      <div>
                        <Label className="mb-3 text-base">Status Ide</Label>
                        <Select onValueChange={(value) => setIsVerified(value)} defaultValue="1">
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={'1'}>Diterima</SelectItem>
                            <SelectItem value={'0'}>Ditolak</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <DialogFooter className='max-sm:flex-row max-sm:justify-end'>
                        <DialogClose asChild>
                          <Button variant={'secondary'} className="cursor-pointer">
                            Batal
                          </Button>
                        </DialogClose>
                        <Button type="submit" className="cursor-pointer min-w-28 bg-blue-600 hover:bg-blue-500" disabled={isLoading} onClick={() => selectedIdeaId && handleVerifyIde(selectedIdeaId, isVerified)}>
                          {isLoading ? <LoaderCircle /> : 'Ubah Status'}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="text-slate-400 cursor-pointer hover:text-blue-600">
                      <Ellipsis />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-max min-w-[4rem] me-4">
                      <DropdownMenuItem className="w-max">
                        <Button
                          className="bg-blue-600 hover:bg-blue-500 w-[7.5rem] cursor-pointer"
                          onClick={() => {
                            setSelectedIdeaId(ide.id.toString());
                            setDialogOpen(true);
                          }}
                        >
                          <Pencil className="text-white" /> Ubah Status
                        </Button>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="w-max">
                        <Link href={`/admin/ide/detail-ide/${ide.id}`}>
                          <Button className="bg-green-500 hover:bg-green-400 cursor-pointer w-full">
                            {' '}
                            <Eye className="text-white" />
                            Lihat Detail
                          </Button>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))
          : null}
      </section>
      {filteredIdeas && filteredIdeas.length === 0 && searchTerm != '' && <p className="text-center w-full text-sm mt-6 text-slate-400">Ide yang anda cari belum ada</p>}

      {ideas?.message === 'Ide tidak ditemukan' && searchTerm === '' ? <p className="text-center w-full text-sm mt-6 text-slate-400">Belum ada ide yang dibuat</p> : null}
    </div>
  );
}
