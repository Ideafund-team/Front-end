/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { HandCoins, MapPin, Send, UserRound } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { SubmitHandler, useForm } from 'react-hook-form';

type Investment = {
  userId: string;
  invest: number;
  note: string;
};

export default function ClientPage({ id }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<Investment>();

  const onSubmit: SubmitHandler<Investment> = async (data) => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log('Response:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 mt-10 mb-22">
      {/* {id} */}

      <div>
        <Image src={'/thumbniel.png'} width={100} height={100} alt="title" className="w-full rounded-md" unoptimized />
        <div className="flex gap-2 mt-4">
          <p className="text-blue-600 bg-blue-600/10 px-4 py-1 rounded-full text-xs">Category</p>
          <p className="text-blue-600 bg-blue-600/10 px-4 py-1 rounded-full text-xs">Category</p>
        </div>
        <h1 className="text-2xl font-semibold mt-4">Lorem ipsum dolor sit. Lorem, ipsum.</h1>
        <p className="text-xs text-slate-600 mt-1">Dibuat 20 Agustus 2024</p>
        <div className="mt-6 flex max-sm:flex-wrap gap-5 items-center">
          <p className="flex gap-2 items-center">
            <HandCoins size={18} className="text-green-500" />
            Rp. 10.0000.00
          </p>
          <p className="flex gap-2 items-center">
            <MapPin size={18} className="text-red-500" />
            Jakarta
          </p>
          <p className="flex gap-2 items-center">
            <UserRound size={18} className="text-blue-500" />2 Investor Terlibat
          </p>
        </div>
        <p className="mt-4 leading-relaxed text-slate-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora mollitia dignissimos provident vel dolore molestiae odit. Corrupti distinctio tenetur iure exercitationem repellendus officiis quasi adipisci quam sequi recusandae
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora mollitia dignissimos provident vel dolore molestiae odit. Corrupti distinctio tenetur iure exercitationem repellendus officiis quasi adipisci quam sequi recusandae
          et magni consequuntur, modi mollitia inventore nisi dolorem cumque itaque similique voluptatibus sit asperiores obcaecati omnis facere? Atque, exercitationem unde inventore odio reprehenderit totam magnam dicta ut ad delectus
          aliquid nulla laboriosam? Similique iste nobis dolor debitis animi mollitia ut, doloremque voluptatem porro reiciendis modi atque. Quae modi deserunt necessitatibus laborum nemo ad earum, pariatur praesentium ipsam adipisci quo.
          Nostrum saepe tenetur necessitatibus quos, fugiat illo nemo et, dolores, esse voluptatem quam!
        </p>
        <div>
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
            <Dialog>
              <DialogTrigger className="bg-blue-600 hover:bg-blue-500 cursor-pointer text-white px-6 py-2 rounded-full flex items-center gap-1 shadow-md">
                Ajukan Investasi <Send size={18} />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Ajukan tawaran investasi</DialogTitle>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Label htmlFor="amount" className="my-4">
                      Jumlah Investasi
                    </Label>
                    <Input type="number" {...register('note', { required: 'Jumlah tawaran investasi wajib diisi' })} aria-invalid={errors.invest && 'true'} id="amount" placeholder="Rp. 10.000.000" className="w-full" />
                    {errors.invest && <p className="text-xs text-red-500 mt-3">{errors.invest.message}</p>}
                    <Label htmlFor="message" className="my-4">
                      Pesan (optsional)
                    </Label>
                    <Textarea id="message" {...register('note', { required: false })} placeholder="Tawaran investasi" className="w-full" aria-invalid={errors.note && 'true'} />
                    <div className="flex gap-3 items-center justify-end mt-4 w-full">
                      <DialogClose asChild>
                        <Button variant={'secondary'} className="cursor-pointer w-24" type="button">
                          Batal
                        </Button>
                      </DialogClose>
                      <Button className="bg-blue-600 hover:bg-blue-500 w-24 cursor-pointer" type="submit">
                        Kirim
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
