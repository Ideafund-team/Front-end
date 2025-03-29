/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Separator } from '@/components/ui/separator';
import { fetcher } from '@/lib/fetcher';
import { Check, Lightbulb, LoaderCircle, UserRound, X } from 'lucide-react';
import React, { useState } from 'react';
import useSWR from 'swr';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogClose, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import Image from 'next/image';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import IdeaCard from '@/components/ui/idea-card';
import { Idea } from '@/types/idea';

export default function Page() {
  const { data: ideas } = useSWR(process.env.NEXT_PUBLIC_API_BASE_URL + '/idea', fetcher);
  const { data: users } = useSWR(process.env.NEXT_PUBLIC_API_BASE_URL + '/user', fetcher);
  const [isLoading, setIsLoading] = useState(false);

  const newUsers =
    users
      ?.filter((user: { created_at: string }) => {
        const createdAtDate = new Date(user.created_at);
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        return createdAtDate >= sevenDaysAgo;
      })
      .slice(-3)
      .reverse() || [];

  const newIdeas = ideas?.filter((idea: { created_at: string }) => {
    const createdAtDate = new Date(idea.created_at);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return createdAtDate >= sevenDaysAgo;
  });

  const token = Cookies.get('token');

  const handleTerimaUser = async (idUser: number) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/active`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: idUser, is_active: true }),
      });
      const data = await response.json();
      console.log('Response:', data);
      toast.success('Pengguna berhasil diaktifkan.');
      if (!isLoading) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      toast.error('Terjadi kesalahan saat mengaktifkan pengguna.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTolakUser = async (id: number) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/active`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, is_active: false }),
      });
      const data = await response.json();
      console.log('Response:', data);
      toast.success('Pengguna berhasil dinonaktifkan.');
      if (!isLoading) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      toast.error('Terjadi kesalahan saat menonaktifkan pengguna.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-blue-600 p-4 rounded-lg">
        <h1 className="text-white font-semibold text-2xl">
          {(() => {
            const hour = new Date().getHours();
            if (hour < 12) return 'Selamat Pagi';
            if (hour < 18) return 'Selamat Siang';
            return 'Selamat Malam';
          })()}{' '}
          Admin!
        </h1>
        <p className="text-white mt-2">Selamat datang di dashboard anda.</p>

        <div className="flex gap-4 mt-6 flex-wrap">
          <div className="bg-white rounded-md p-4 flex w-40 items-center gap-4">
            <div className="bg-blue-600 w-max rounded-full p-2 text-white text-center">
              <Lightbulb />
            </div>
            <div>
              <p className="font-semibold text-2xl">{ideas?.length || 0}</p>
              <p className="text-slate-400 text-sm">Ide Usaha</p>
            </div>
          </div>
          <div className="bg-white rounded-md p-4 flex w-40 items-center gap-4">
            <div className="bg-blue-600 rounded-full p-2 text-white w-max text-center">
              <UserRound />
            </div>
            <div>
              <p className="font-semibold text-2xl">{users?.length || 0}</p>
              <p className="text-slate-400 text-sm">Pengguna</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <h1 className="text-xl font-semibold">Pemberitahuan Aktivasi </h1>
        <p className="text-xs text-slate-400">Data 7 hari terkahir</p>
      </div>
      <Separator className="mb-5 mt-2" />
      <p className="text-lg font-medium">Pengguna Terbaru</p>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-4 gap-3">
        {newUsers
          .slice(-3)
          .reverse()
          .map((user: any, index: number) => (
            <div key={index} className="flex justify-between items-center border rounded-md px-2 py-3">
              <div className="flex gap-3 w-full">
                <div>
                  <Avatar>
                    <AvatarImage src={user.foto_profil} className="object-cover" />
                    <AvatarFallback>
                      {user.nama
                        .split(' ')
                        .map((n: string) => n[0])
                        .join('')
                        .slice(0, 2)
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="">
                  <p className="leading-2">
                    {user.nama} <span className={`${user.is_active ? 'bg-green-500/10 text-green-500' : 'bg-red-600/10 text-red-600'} text-[10px] px-2 py-1 rounded-full`}>{user.is_active ? 'Sudah Aktif' : 'Belum Aktif'}</span>
                  </p>
                  <Dialog>
                    <DialogTrigger>
                      <p className="text-blue-600 text-xs cursor-pointer hover:underline">Lihat Detail</p>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="text-start">Detail Pengguna</DialogTitle>
                        <div className="flex gap-3">
                          <div className="w-full">
                            <p className="mt-4">Nama</p>
                            <p className="text-slate-600">{user.nama}</p>
                            <p className="mt-4">Alamat</p>
                            <p className="text-slate-600">{user.alamat}</p>
                            <p className="mt-4">Email</p>
                            <p className="text-slate-600">{user.email}</p>
                            <p className="mt-4">No Handphone</p>
                            <p className="text-slate-600">{user.no_hp}</p>
                            <p className="mt-4">Status</p>
                            <p className="text-slate-600">{!user.is_active ? 'Belum Aktif' : 'Sudah Aktif'}</p>
                          </div>
                          <div className="w-full">
                            <p className="mb-2 mt-4">Foto Profil</p>
                            <PhotoProvider>
                              <PhotoView src={user.foto_profil}>
                                <Image src={user.foto_profil} width={100} height={100} alt={user.nama} className="aspect-video w-full object-cover hover:brightness-75 duration-200 rounded-md cursor-pointer" unoptimized />
                              </PhotoView>
                            </PhotoProvider>
                            <p className="my-2">Foto KTP</p>
                            <PhotoProvider>
                              <PhotoView src={user.foto_ktp}>
                                <Image src={user.foto_ktp} width={100} height={100} alt={user.nama} className="aspect-video hover:brightness-75 transition-all duration-200 object-cover w-full rounded-md cursor-pointer" unoptimized />
                              </PhotoView>
                            </PhotoProvider>
                          </div>
                        </div>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger>
                    <Button className="cursor-pointer bg-green-600 hover:bg-green-500" size={'sm'}>
                      <Check />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="text-start">Konfirmasi</DialogTitle>
                      <DialogClose />
                    </DialogHeader>
                    <div>
                      <p>Apakah anda yakin menerima aktifasi pengguna ini?</p>
                      <p className="text-sm mt-2 text-slate-600">Pastikan anda sudah melihat detail data pengguna</p>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant={'secondary'} className="cursor-pointer">
                          Batal
                        </Button>
                      </DialogClose>
                      <Button onClick={() => handleTerimaUser(user.id)} className="cursor-pointer min-w-20 bg-green-500 hover:bg-green-400" disabled={isLoading}>
                        {isLoading ? <LoaderCircle className="animate-spin" size={18} /> : 'Terima'}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger>
                    <Button variant={'destructive'} className="cursor-pointer hover:bg-red-500" size={'sm'}>
                      <X />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="text-start">Konfirmasi</DialogTitle>
                      <DialogClose />
                    </DialogHeader>
                    <div className="text-left">
                      <p>Apakah anda yakin tolak aktifasi pengguna ini?</p>
                      <p className="text-sm mt-2 text-slate-600">Pastikan anda sudah melihat detail data pengguna</p>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant={'secondary'} className="cursor-pointer">
                          Batal
                        </Button>
                      </DialogClose>
                      <Button onClick={() => handleTolakUser(user.id)} className="cursor-pointer min-w-20 bg-red-600 hover:bg-red-500" disabled={isLoading}>
                        {isLoading ? <LoaderCircle className="animate-spin" size={18} /> : 'Tolak'}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
      </div>
      {(newUsers?.length ?? 0) <= 0 && <p className="text-center text-sm text-slate-600 w-full mt-6">Belum ada pengguna baru</p>}

      <div className="mt-8">
        <p className="text-lg font-medium">Ide Terbaru</p>
        <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
          {newIdeas &&
            newIdeas
              .slice(-3)
              .reverse()
              .map((ide: Idea) => <IdeaCard ide={ide} key={ide.id} linkDetail={`/admin/ide/detail-ide/${ide.id}`} />)}
        </div>
        {(newIdeas?.length ?? 0) <= 0 && <p className="text-center text-sm text-slate-600 w-full mt-6">Belum ada ide baru</p>}
      </div>
    </div>
  );
}
