/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { fetcher } from '@/lib/fetcher';
import Cookies from 'js-cookie';
import { LoaderCircle } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import useSWR from 'swr';

export default function Page() {
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setUserId(Cookies.get('userId') || null);
  }, []);

  const { data, mutate } = useSWR(userId ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/${userId}` : null, fetcher);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      nama: '',
      password: '',
      no_hp: '',
      alamat: '',
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        nama: data.nama,
        no_hp: data.no_hp,
        alamat: data.alamat,
      });
    }
  }, [data, reset]);

  const token = Cookies.get('token');

  const onSubmit = async (formData: any) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/update/user/${userId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      console.log(response)

      const updatedData = await response.json();
      mutate(updatedData);
      toast.success('Berhasil mengubah data profil');
      window.location.reload();
    } catch (error) {
      console.error(error);
      toast.error('Gagal mengbuah data profil');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="">
        <h1 className="text-2xl font-semibold">Profil Anda</h1>
        <p className="text-slate-600 text-sm">Data profil anda</p>
      </div>
      {data ? (
        <form className="mt-8 w-full" onSubmit={handleSubmit(onSubmit)}>
          <Label>Foto Profil</Label>
          <Image src={data.foto_profil} width={100} height={100} alt={data.nama} unoptimized className="rounded-full w-32 h-32 object-cover mt-4" />
          <Label className="my-4">Nama</Label>
          <Input type="text" {...register('nama')} />
          <Label className="my-4">Email</Label>
          <Input type="text" value={data.email} disabled className="hover:cursor-not-allowed disabled:bg-zinc-100" />
          <Label className="my-4">Password</Label>
          <Input type="password" {...register('password')} />
          <Label className="my-4">No Handphone</Label>
          <Input type="text" {...register('no_hp')} />
          <Label className="my-4">Alamat</Label>
          <Input type="text" {...register('alamat')} />

          <Dialog>
            <DialogTrigger>
              <Button className="bg-blue-600 hover:bg-blue-500 cursor-pointer mt-4" type="button">
                Simpan
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ubah Profil</DialogTitle>
              </DialogHeader>
              <p>Apakah ada yakin merubah data anda?</p>
              <div className="flex gap-2 justify-end">
                <DialogClose asChild>
                  <Button className="cursor-pointer" type="button" variant={'secondary'}>
                    Batal
                  </Button>
                </DialogClose>
                <Button className="bg-blue-600 hover:bg-blue-500 cursor-pointer min-w-20" disabled={isLoading} type="submit" onClick={handleSubmit(onSubmit)}>
                  {isLoading ? <LoaderCircle size={16} className="animate-spin" /> : 'Simpan'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </form>
      ) : null}
    </div>
  );
}
