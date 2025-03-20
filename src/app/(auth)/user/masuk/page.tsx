/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
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
    formState: { errors },
  } = useForm<User>();
  const [showPassword, setShowPassword] = React.useState(false);

  const onSubmit: SubmitHandler<User> = (data) => console.log(data);

  return (
    <div>
      <nav className="hidden w-full max-md:flex items-center justify-between p-4 border-b">
        <Link href={'/'} className="logo flex gap-3 items-center">
          <Image src={'/logo.svg'} width={40} height={40} alt="Logo" />
          <p className="font-medium">Ideafund</p>
        </Link>
      </nav>
      <div className="flex w-full h-screen">
        <div className="w-full">
          <div className="flex flex-col items-center justify-center h-screen ">
            <div className="w-[80%] max-md:w-full px-4 mb-8 place-items-start ">
              <p className="text-2xl font-semibold">Masuk ke akun anda!</p>
              <p className="text-sm text-slate-400 font-light">Lengkapi form berikut untuk masuk ke akun anda</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="w-[80%] max-md:w-full px-4">
              <Label htmlFor="email" className="mb-3 text-base">
                Email
              </Label>
              <Input
                {...register('email', { required: 'Email wajib diisi', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email tidak valid' } })}
                placeholder="youremail@example.com"
                type="email"
                aria-invalid={errors.email && 'true'}
              />
              {errors.email && <p className="text-xs text-red-500 mt-3">{errors.email.message}</p>}

              <Label htmlFor="password" className="mt-5 mb-3 text-base">
                Password
              </Label>
              <Input {...register('password', { required: 'Password wajib diisi' })} placeholder="******" type={showPassword ? 'text' : 'password'} aria-invalid={errors.password && 'true'} />
              {errors.password && <p className="text-xs text-red-500 mt-3">{errors.password.message}</p>}

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
                Daftar Sekarang
              </Link>
            </p>
          </div>
        </div>
        <div className="w-full bg-blue-600 max-md:hidden"></div>
      </div>
    </div>
  );
}
