/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type User = {
  email: string;
  password: string;
};
export default function page() {
  const {
    register,
    handleSubmit,
  } = useForm<User>();
  const [showPassword, setShowPassword] = React.useState(false);

  const onSubmit: SubmitHandler<User> = (data) => console.log(data);

  return (
    <div>
      <div className="flex w-full h-screen">
        <div className="w-full">
          <div className="flex flex-col items-center justify-center h-screen border">
            <div className="w-[80%] px-4 mb-8 place-items-start">
              <p className='text-2xl font-semibold'>Masuk ke akun anda!</p>
              <p className='text-sm text-slate-400 font-light'>Lengkapi form berikut untuk masuk ke akun anda</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="w-[80%] px-4">
              <Label htmlFor="email" className="mb-3 text-base">
                Email
              </Label>
              <Input {...register('email', { required: true })} placeholder="youremail@example.com" className="w-full tex-base" type="email" />
              <Label htmlFor="password" className="mt-5 mb-3 text-base">
                Password
              </Label>
              <Input {...register('password', { required: true })} placeholder="******" type={showPassword ? 'text' : 'password'} />
              <div className="flex gap-3  mt-1 items-center">
                <Input type="checkbox" className="w-max" onChange={(e) => setShowPassword(e.target.checked)} />
                <p className="text-sm">Tampilkan Password</p>
              </div>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-500 w-full mt-4 cursor-pointer" size={'lg'}>
                Masuk
              </Button>
            </form>
            <p className="mt-3 text-sm ">
              Belum punya akun?{' '}
              <Link href={'/user/daftar'} className="text-blue-600">
                Daftar
              </Link>
            </p>
          </div>
        </div>
        <div className="w-full bg-blue-600"></div>
      </div>
    </div>
  );
}
