'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Cookies from 'js-cookie';
import { LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

type Idea = {
  title: string;
  kategori: string;
  status: string;
  location: string;
  summary: string;
  investment_amount: number;
  description: string;
  image: FileList | null;
};

export default function ClientPage({ id }: { id: string }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Idea>();
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchIdea = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/idea/${id}`, {
          method: 'GET',
        });

        if (response.ok) {
          const data = await response.json();
          setValue('title', data.title);
          setValue('kategori', data.kategori);
          setValue('status', data.status);
          setValue('location', data.location);
          setValue('summary', data.summary);
          setValue('investment_amount', data.investment_amount);
          setValue('description', data.description);
        } else {
          toast.error('Gagal memuat data ide.');
        }
      } catch (error) {
        console.error('Error fetching idea:', error);
        toast.error('Terjadi kesalahan saat memuat data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchIdea();
  }, [id, setValue]);

  const onSubmit: SubmitHandler<Idea> = async (data) => {
    const formData = new FormData();

    const id_owner = Cookies.get('userId') || '';
    formData.append('title', data.title);
    formData.append('summary', data.summary);
    formData.append('kategori', data.kategori);
    formData.append('investment_amount', data.investment_amount.toString());
    formData.append('location', data.location);
    formData.append('description', data.description);
    if (data.image && data.image[0]) {
      formData.append('image', data.image[0]);
    }
    formData.append('id_owner', id_owner);
    formData.append('status', data.status);

    try {
      setIsLoading(true);
      const token = Cookies.get('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/updateide/ide/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();
      console.log('Response:', result);
      if (response.ok) {
        toast.success('Berhasil memperbarui ide!');
        router.push('/user/dashboard');
      } else {
        toast.error('Gagal memperbarui ide.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Terjadi kesalahan saat memperbarui ide.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Ubah Ide</h1>
        <p className="text-slate-600 text-sm">Perbarui data berikut untuk ide Anda</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <Label htmlFor="title" className="mb-3 text-base">
          Judul
        </Label>
        <Input {...register('title', { required: 'Judul wajib diisi' })} placeholder="Judul usaha" type="text" aria-invalid={errors.title && 'true'} className="w-full" />
        {errors.title && <p className="text-xs text-red-500 mt-3">{errors.title.message}</p>}

        <Label htmlFor="kategori" className="mb-3 text-base mt-4">
          Kategori
        </Label>
        <Input
          {...register('kategori', {
            required: 'Kategori wajib diisi',
          })}
          placeholder="Masukan kategori usaha"
          type="text"
          aria-invalid={errors.kategori && 'true'}
          className="w-full"
        />
        {errors.kategori && <p className="text-xs text-red-500 mt-3">{errors.kategori.message}</p>}

        <Label htmlFor="lokasi" className="mb-3 text-base mt-4">
          Lokasi
        </Label>
        <Input
          {...register('location', {
            required: 'Lokasi usaha wajib diisi',
          })}
          placeholder="Masukan lokasi usaha"
          type="text"
          aria-invalid={errors.kategori && 'true'}
          className="w-full"
        />
        {errors.location && <p className="text-xs text-red-500 mt-3">{errors.location.message}</p>}

        <Label htmlFor="status" className="mb-3 text-base mt-4">
          Status Investasi
        </Label>
        <Select onValueChange={(value) => setValue('status', value)} defaultValue="">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Pilih status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Dibuka</SelectItem>
            <SelectItem value="0">Ditutup</SelectItem>
          </SelectContent>
        </Select>
        {errors.status && <p className="text-xs text-red-500 mt-3">{errors.status.message}</p>}

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
            validate: (value) => {
              const wordCount = value.trim().split(/\s+/).length;
              return wordCount <= 15 || 'Ringkasan tidak boleh lebih dari 15 kata';
            },
          })}
          placeholder="Ringkasan mengenai ide anda"
          aria-invalid={errors.summary && 'true'}
          className="w-full"
        />
        <p className="text-slate-600 text-xs p-2 ps-1 pb-0">Maksimal 50 kata</p>
        {errors.summary && <p className="text-xs text-red-500 mt-3">{errors.summary.message}</p>}

        <Label htmlFor="description" className="mb-3 mt-4 text-base">
          Deskripsi
        </Label>
        <Textarea {...register('description', { required: 'Deskripsi wajib diisi' })} placeholder="Deskripsi lengkap mengenai ide anda" aria-invalid={errors.description && 'true'} className="w-full" />
        {errors.description && <p className="text-xs text-red-500 mt-3">{errors.description.message}</p>}

        <Label htmlFor="image" className="mb-3 mt-4 text-base">
          Gambar
        </Label>
        <Input {...register('image')} type="file" aria-invalid={errors.image && 'true'} className="w-full" />
        <p className="text-slate-600 text-xs p-2 ps-1 pb-0">Ukuran gambar 16:9</p>
        {errors.image && <p className="text-xs text-red-500 mt-3">{errors.image.message}</p>}

        <div className="mt-4 mb-10 w-full flex justify-end gap-4">
          <Button className="cursor-pointer" type="button" variant={'secondary'} onClick={() => window.history.back()} size={'lg'}>
            Kembali
          </Button>
          <Button className="hover:bg-blue-500 bg-blue-600 cursor-pointer" disabled={isLoading} type="submit" size={'lg'}>
            {isLoading ? (
              <span className="flex items-center gap-2">
                <LoaderCircle className="animate-spin" /> Mohon tunggu...
              </span>
            ) : (
              'Perbarui Ide'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
