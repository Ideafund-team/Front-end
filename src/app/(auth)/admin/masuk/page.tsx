'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoaderCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Cookies from 'js-cookie';

type User = {
  email: string;
  password: string;
};

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();
  const [showPassword, setShowPassword] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<User> = async (data) => {
    try {
      setIsLoading(true);
      const loginResponse = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/auth/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const loginResult = await loginResponse.json();
      console.log('Login Response:', loginResult);
      setMessage(loginResult.message);

      if (loginResult.token) {
        toast.success('Berhasil masuk ke akun anda!');
        Cookies.set('token', loginResult.token, { expires: 1 / 24 });
        router.push('/admin/dashboard');
      } else {
        toast.error('Login gagal. Silakan periksa kembali email dan password anda.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <nav className="hidden fixed top-0 w-full max-md:flex items-center justify-between p-4 border-b">
        <Link href={'/'} className="logo flex gap-3 items-center">
          <Image src={'/logo.svg'} width={40} height={40} alt="Logo" />
          <p className="font-medium">Ideafund</p>
        </Link>
      </nav>
      <div className="flex justify-center items-center max-w-lg mx-auto px-4 h-screen">
        <div className="w-full h-max border p-4 rounded-md shadow-sm">
          <div className="flex flex-col items-center justify-center">
            <div className="w-full text-center mb-8 place-items-start ">
              <p className="text-2xl font-semibold">Masuk ke akun anda!</p>
              <p className="text-sm text-slate-400 font-light">Lengkapi form berikut untuk masuk ke akun anda</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
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
              <p className="text-xs text-red-500">{message}</p>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-500 w-full mt-4 cursor-pointer" size={'lg'} disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <LoaderCircle className="animate-spin" /> Mohon tunggu...
                  </span>
                ) : (
                  'Masuk'
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
