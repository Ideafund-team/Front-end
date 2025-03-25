'use client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { fetcher } from '@/lib/fetcher';
import { Idea } from '@/types/idea';
import { HandCoins, LoaderCircle, Mail, MapPin, PhoneCall, Send, UserRound } from 'lucide-react';
import Image from 'next/image';
import { SubmitHandler, useForm } from 'react-hook-form';
import useSWR from 'swr';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { toast } from 'sonner';

type Investment = {
  id_owner: string;
  id_ide: number;
  id_investor: string;
  nama_investor: string;
  investasi: number;
  note: string;
};

export default function ClientPage({ id }: { id: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Investment>();
  const [isLoading, setIsLoading] = useState(false);

  const { data: idea } = useSWR<Idea>(process.env.NEXT_PUBLIC_API_BASE_URL + `/idea/${id}`, fetcher);

  const { data: investorIn } = useSWR(process.env.NEXT_PUBLIC_API_BASE_URL + `/getinvestoride/allinvestoride/${idea?.id}`, fetcher);

  const investorLength = Array.isArray(investorIn) ? investorIn.filter((investor) => investor.status === 'diterima').length : 0;

  const idUser = Cookies.get('userId');
  const token = Cookies.get('token');

  const { data: user } = useSWR(idUser ? process.env.NEXT_PUBLIC_API_BASE_URL + `/user/${idUser}` : null, fetcher);

  const { data: owner } = useSWR(idea ? process.env.NEXT_PUBLIC_API_BASE_URL + `/user/${idea.id_owner}` : null, fetcher);

  const onSubmit: SubmitHandler<Investment> = async (data) => {
    if (!idea || !user) return;

    const investmentData: Investment = {
      id_owner: idea.id_owner,
      id_ide: idea.id,
      id_investor: idUser || '',
      nama_investor: user.nama,
      investasi: data.investasi,
      note: data.note,
    };

    console.log('Investment Data:', investmentData);

    try {
      setIsLoading(true);
      const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/investor/post', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(investmentData),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success('Investasi berhasil diajukan');
        window.location.reload();
      }

      console.log('Response:', result);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!idea) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <p>Memuat...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 mt-10 mb-22">
      <div>
        <div className="relative">
          <Image src={idea.image || '/thumbniel.png'} width={100} height={100} alt={idea.title} className="w-full rounded-md aspect-video object-cover" unoptimized />
          <div className="absolute top-2 right-2 bg-white px-3 py-1 rounded-full flex items-center gap-2 shadow">
            <span className={`h-2 w-2 rounded-full ${idea.status === true ? 'bg-green-500' : 'bg-red-500'}`}></span>
            <p className="text-xs font-medium">{idea.status === true ? 'Dibuka' : 'Ditutup'}</p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-blue-600 bg-blue-600/10 px-4 py-1 rounded-full text-xs w-max">{idea.kategori}</p>
        </div>
        <h1 className="text-2xl font-semibold mt-4">{idea.title}</h1>
        <p className="text-xs text-slate-600 mt-1">Dibuat {new Date(idea.created_at).toLocaleDateString('id-ID')}</p>
        {owner && (
          <div className="flex items-center justify-between">
            <div className="flex gap-3 mt-4">
              <Image src={owner.foto_profil} width={50} height={50} alt={owner.nama} unoptimized className="rounded-full w-10 h-10 object-cover" />
              <div>
                <p className="font-medium">{owner.nama}</p>
                <p className="text-sm text-slate-600">Pemilik ide</p>
              </div>
            </div>
            <div>
              <Dialog>
                <DialogTrigger>
                  <Button className="hover:bg-blue-500 cursor-pointer rounded-full bg-blue-600">Hubungi</Button>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Kontak</DialogTitle>
                    <div className="mt-3 text-left">
                      <p>Email</p>
                      <p className="flex text-slate-600 gap-2 items-center mt-2">
                        <Mail size={18} /> {owner.email}
                      </p>
                    </div>
                    <div className="mt-3 text-left">
                      <p>No Handphone</p>
                      <p className="flex text-slate-600 gap-2 items-center mt-2">
                        <PhoneCall size={18} /> {owner.no_hp}
                      </p>
                    </div>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        )}
        <div className="mt-6 flex max-sm:flex-wrap gap-5 items-center">
          <p className="flex gap-2 items-center">
            <HandCoins size={18} className="text-green-500" />
            Rp. {parseFloat(idea.investment_amount).toLocaleString('id-ID')}
          </p>
          <p className="flex gap-2 items-center">
            <MapPin size={18} className="text-red-500" />
            {idea.location}
          </p>
          <p className="flex gap-2 items-center">
            <UserRound size={18} className="text-blue-500" />
            {investorLength} Investor Terlibat
          </p>
        </div>
        <p className="mt-4 leading-relaxed text-slate-600">{idea.description}</p>
        <div>
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
            <Dialog>
              {idea.id_owner === idUser || idea.status === false ? null : (
                <DialogTrigger className="bg-blue-600 hover:bg-blue-500 cursor-pointer text-white px-6 py-2 rounded-full flex items-center gap-1 shadow-md">
                  Ajukan Investasi <Send size={18} />
                </DialogTrigger>
              )}
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Ajukan tawaran investasi</DialogTitle>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Label htmlFor="amount" className="my-4">
                      Jumlah Investasi
                    </Label>
                    <Input type="number" {...register('investasi', { required: 'Jumlah tawaran investasi wajib diisi' })} aria-invalid={errors.investasi && 'true'} id="amount" placeholder="Rp. 10.000.000" className="w-full" />
                    {errors.investasi && <p className="text-xs text-red-500 mt-3">{errors.investasi.message}</p>}
                    <Label htmlFor="message" className="my-4">
                      Pesan (opsional)
                    </Label>
                    <Textarea id="message" {...register('note', { required: false })} placeholder="Tawaran investasi" className="w-full" aria-invalid={errors.note && 'true'} />
                    <div className="flex gap-3 items-center justify-end mt-4 w-full">
                      <DialogClose asChild>
                        <Button variant={'secondary'} className="cursor-pointer w-24" type="button">
                          Batal
                        </Button>
                      </DialogClose>
                      <Button className="bg-blue-600 min-w-20 hover:bg-blue-500 w-24 cursor-pointer" type="submit" disabled={isLoading}>
                        {isLoading ? (
                          <span className="">
                            <LoaderCircle className="animate-spin" />
                          </span>
                        ) : (
                          'Kirim'
                        )}
                      </Button>
                    </div>
                  </form>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}
