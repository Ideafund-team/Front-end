'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { fetcher } from '@/lib/fetcher';
import { User } from '@/types/user';
import { Label } from '@radix-ui/react-dropdown-menu';
import Cookies from 'js-cookie';
import { Ellipsis, Eye, LoaderCircle, Mail, MapPin, Pencil, Phone, SearchIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { toast } from 'sonner';
import useSWR from 'swr';

export default function Page() {
  const { data: user = [] } = useSWR(process.env.NEXT_PUBLIC_API_BASE_URL + '/user', fetcher);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filteredUser, setFilteredUser] = React.useState<User[]>([]);
  const [isVerified, setIsVerified] = React.useState('1');
  const [selecteduseraId, setSelecteduseraId] = React.useState<string | null>(null);
  const [dialogDetailOpen, setDialogDetailOpen] = React.useState(false);
  const [selectedUserDetail, setSelectedUserDetail] = React.useState<User | null>(null);

  const token = Cookies.get('token');

  const handleVerifyUser = async (id: string, is_active: string) => {
    console.log(id);
    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/active`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, is_active }),
      });
      const data = await response.json();
      console.log('Response:', data);
      toast.success('Pengguna berhasil diaktifasi');
      if (!isLoading) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      toast.error('Terjadi kesalahan saat aktifasi pengguna.');
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (user.length > 0) {
      const reverseduser = [...user].reverse();
      setFilteredUser(reverseduser);
    }
  }, [user]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    if (value) {
      const filtered = user
        .slice()
        .reverse()
        .filter((user: User) => user.nama.toLowerCase().includes(value));
      setFilteredUser(filtered);
    } else {
      setFilteredUser([...user].reverse());
    }
  };

  return (
    <div className="max-w-5xl">
      <div className="">
        <h1 className="text-2xl font-semibold">Data Pengguna</h1>
        <p className="text-slate-600 text-sm">Daftar data semua pengguna</p>
      </div>
      <div className="mt-8 flex gap-4">
        <div className="relative w-full">
          <div className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground">
            <SearchIcon className="h-4 w-4" />
          </div>
          <Input id="search" type="search" value={searchTerm} placeholder="Cari pengguna..." className="w-full bg-background pl-8 py-4" onChange={handleSearch} />
        </div>
      </div>
      <section className="flex flex-col gap-4 mt-6">
        {filteredUser && filteredUser.length > 0
          ? filteredUser.map((user: User, index: number) => (
              <div key={index} className="border-y py-3 flex max-sm:flex-col max-sm:gap-5 justify-between items-center">
                <div className="flex gap-4 w-[70%] max-sm:flex-col max-sm:w-full">
                  <div>
                    <Image src={user.foto_profil} width={150} height={100} alt={user.nama} className="rounded-md aspect-square max-w-18 min-w-18  object-cover shadow-sm " unoptimized />
                  </div>
                  <div>
                    <p className="font-medium text-lg">{user.nama}</p>
                    <p className="text-xs text-slate-500">{new Date(user.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                    <div className="flex gap-3 items-center">
                      <p className="flex items-center gap-1 text-slate-600 text-sm mt-2">
                        <Mail size={16} /> {user.email}
                      </p>
                      <p className="flex items-center gap-1 text-slate-600 text-sm mt-2">
                        <Phone size={16} /> {user.no_hp}
                      </p>
                      <p className="flex items-center gap-1 text-slate-600 text-sm mt-2">
                        <MapPin size={16} /> {user.alamat}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 max-sm:justify-between max-sm:w-full">
                  <p className="text-xs">
                    {user.is_active ? <span className="bg-green-500/10 text-green-500 px-3 py-1 rounded-full">Sudah Aktif</span> : <span className="bg-red-500/10 px-3 py-1.5 text-red-500 p-2 rounded-full">Belum Aktif</span>}
                  </p>
                  <Dialog open={dialogOpen} onOpenChange={(open) => setDialogOpen(open)}>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle className="text-left">Aktifasi Pengguna</DialogTitle>
                      </DialogHeader>
                      <div>
                        <Label className="mb-3 text-base">Status Pengguna</Label>
                        <Select onValueChange={(value) => setIsVerified(value)} defaultValue="1">
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={'1'}>Aktifasi</SelectItem>
                            <SelectItem value={'0'}>Tolak Aktifasi</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <DialogFooter className="max-sm:flex-row max-sm:justify-end">
                        <DialogClose asChild>
                          <Button variant={'secondary'} className="cursor-pointer">
                            Batal
                          </Button>
                        </DialogClose>
                        <Button type="submit" className="cursor-pointer min-w-28 bg-blue-600 hover:bg-blue-500" disabled={isLoading} onClick={() => selecteduseraId && handleVerifyUser(selecteduseraId, isVerified)}>
                          {isLoading ? <LoaderCircle /> : 'Ubah Status'}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={dialogDetailOpen} onOpenChange={(open) => setDialogDetailOpen(open)}>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="text-start">Detail Pengguna</DialogTitle>
                        {selectedUserDetail && (
                          <div className="flex gap-3">
                            <div className="w-full">
                              <p className="mt-4">Nama</p>
                              <p className="text-slate-600">{selectedUserDetail.nama}</p>
                              <p className="mt-4">Alamat</p>
                              <p className="text-slate-600">{selectedUserDetail.alamat}</p>
                              <p className="mt-4">Email</p>
                              <p className="text-slate-600">{selectedUserDetail.email}</p>
                              <p className="mt-4">No Handphone</p>
                              <p className="text-slate-600">{selectedUserDetail.no_hp}</p>
                              <p className="mt-4">Status</p>
                              <p className="text-slate-600">{!selectedUserDetail.is_active ? 'Belum Aktif' : 'Sudah Aktif'}</p>
                            </div>
                            <div className="w-full">
                              <p className="mb-2 mt-4">Foto Profil</p>
                              <PhotoProvider>
                                <PhotoView src={selectedUserDetail.foto_profil}>
                                  <Image
                                    src={selectedUserDetail.foto_profil}
                                    width={100}
                                    height={100}
                                    alt={selectedUserDetail.nama}
                                    className="aspect-video w-full object-cover hover:brightness-75 duration-200 rounded-md cursor-pointer"
                                    unoptimized
                                  />
                                </PhotoView>
                              </PhotoProvider>
                              <p className="my-2">Foto KTP</p>
                              <PhotoProvider>
                                <PhotoView src={selectedUserDetail.foto_ktp}>
                                  <Image
                                    src={selectedUserDetail.foto_ktp}
                                    width={100}
                                    height={100}
                                    alt={selectedUserDetail.nama}
                                    className="aspect-video hover:brightness-75 transition-all duration-200 object-cover w-full rounded-md cursor-pointer"
                                    unoptimized
                                  />
                                </PhotoView>
                              </PhotoProvider>
                            </div>
                          </div>
                        )}
                      </DialogHeader>
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
                            setSelecteduseraId(user.id);
                            setDialogOpen(true);
                          }}
                        >
                          <Pencil className="text-white" /> Ubah Status
                        </Button>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="w-max">
                        <Button
                          className="bg-green-500 hover:bg-green-400 cursor-pointer w-full"
                          onClick={() => {
                            setSelectedUserDetail(user);
                            setDialogDetailOpen(true);
                          }}
                        >
                          <Eye className="text-white" />
                          Lihat Detail
                        </Button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))
          : null}
      </section>
      {filteredUser && filteredUser.length === 0 && searchTerm != '' && <p className="text-center w-full text-sm mt-6 text-slate-400">user yang anda cari belum ada</p>}

      {user?.message === 'user tidak ditemukan' && searchTerm === '' ? <p className="text-center w-full text-sm mt-6 text-slate-400">Belum ada user yang dibuat</p> : null}
    </div>
  );
}
