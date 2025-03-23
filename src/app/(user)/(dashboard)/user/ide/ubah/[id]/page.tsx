'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type Idea = {
  title: string;
  summary: string;
  investment_amount: number;
  location: string;
  description: string;
  image: FileList;
};

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Idea>();

  const onSubmit: SubmitHandler<Idea> = async (data) => console.log(data);

  return (
    <div className='max-w-5xl'>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Ubah Ide</h1>
        <p className="text-slate-600 text-sm">Lengkapi data berikut untuk mengubah ide</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="min-w-4xl">
        <Label htmlFor="title" className="mb-3 text-base">
          Judul
        </Label>
        <Input {...register('title', { required: 'Judul wajib diisi' })} placeholder="Judul usaha" type="text" aria-invalid={errors.title && 'true'} className="w-full" />
        {errors.title && <p className="text-xs text-red-500 mt-3">{errors.title.message}</p>}

        <Label htmlFor="investment_amount" className="mb-3 text-base mt-4">
          Investasi yang dibutuhkan
        </Label>
        <Input
          {...register('investment_amount', {
            required: 'Nilai investasi wajib diisi',
            max: {
              value: 10000000,
              message: 'Investasi tidak boleh lebih dari 10 juta',
            },
          })}
          placeholder="Masukan jumlah nilai investasi yang dibutuhkan"
          type="number"
          aria-invalid={errors.investment_amount && 'true'}
          className="w-full"
        />
        <p className="text-slate-600 text-xs p-2 ps-1 pb-0">Maksimal nilai investasi 10.000.000 juta</p>
        {errors.investment_amount && <p className="text-xs text-red-500 mt-3">{errors.investment_amount.message}</p>}

        <Label htmlFor="summary" className="mb-3 mt-4 text-base">
          Ringkasan
        </Label>
        <Textarea
          {...register('summary', {
            required: 'Ringkasan wajib diisi',
            maxLength: {
              value: 50,
              message: 'Ringkasan tidak boleh lebih dari 50 kata',
            },
          })}
          placeholder="Ringkasan mengenai ide anda"
          aria-invalid={errors.summary && 'true'}
          className="w-full"
        />
        <p className="text-slate-600 text-xs p-2 ps-1 pb-0">Maksimal 50 kata</p>
        {errors.summary && <p className="text-xs text-red-500 mt-3">{errors.summary.message}</p>}

        <Label htmlFor="location" className="mb-3 mt-4 text-base">
          Lokasi
        </Label>
        <Input {...register('location', { required: 'Lokasi wajib diisi' })} placeholder="Lokasi usaha" type="text" aria-invalid={errors.location && 'true'} className="w-full" />
        {errors.location && <p className="text-xs text-red-500 mt-3">{errors.location.message}</p>}

        <Label htmlFor="description" className="mb-3 mt-4 text-base">
          Deskripsi
        </Label>
        <Textarea {...register('description', { required: 'Deskripsi wajib diisi' })} placeholder="Deskripsi lengkap mengenai ide anda" aria-invalid={errors.description && 'true'} className="w-full" />
        {errors.description && <p className="text-xs text-red-500 mt-3">{errors.description.message}</p>}

        <Label htmlFor="image" className="mb-3 mt-4 text-base">
          Gambar
        </Label>
        <Input {...register('image', { required: 'Gambar wajib diisi' })} type="file" aria-invalid={errors.image && 'true'} className="w-full" />
        {errors.image && <p className="text-xs text-red-500 mt-3">{errors.image.message}</p>}

        <div className="mt-4 mb-10 w-full flex justify-end gap-4">
          <Button className="cursor-pointer" type="button" variant={'secondary'} onClick={() => window.history.back()} size={'lg'}>
            Kembali
          </Button>
          <Button className="hover:bg-blue-500 bg-blue-600 cursor-pointer" type="submit" size={'lg'}>
            Buat Ide
          </Button>
        </div>
      </form>
    </div>
  );
}
