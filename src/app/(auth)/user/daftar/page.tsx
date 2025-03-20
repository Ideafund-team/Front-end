'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type User = {
  email: string;
  password: string;
  confirmPassword: string;
  nama: string;
  alamat: string;
  noHp: string;
  fotoProfil: FileList;
  ktp: FileList;
};

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<User>({ mode: 'onChange' });
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);

  const onSubmit: SubmitHandler<User> = (data) => {
    console.log(data);
  };

  const handleNext = async () => {
    const isValid = await trigger(['email', 'password', 'confirmPassword']);
    if (isValid) {
      setStep(2);
    }
  };

  return (
    <div>
      <nav className="hidden w-full max-md:flex items-center justify-between p-4 border-b">
        <Link href={'/'} className="logo flex gap-3 items-center">
          <Image src={'/logo.svg'} width={40} height={40} alt="Logo" />
          <p className="font-medium">Ideafund</p>
        </Link>
      </nav>
      <div className="flex  w-full min-h-screen">
        <div className="w-full flex flex-col items-center justify-center h-screen">
          <div className="w-[80%] max-md:w-full px-4 mb-8 place-items-start">
            <p className="text-2xl font-semibold">Daftar akun anda!</p>
            <p className="text-sm text-slate-400 font-light">Lengkapi form berikut untuk daftar akun anda</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="w-[80%] max-md:w-full px-4">
            {step === 1 && (
              <>
                <Label className="mb-3 text-base">Email</Label>
                <Input
                  {...register('email', { required: 'Email wajib diisi', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email tidak valid' } })}
                  placeholder="youremail@example.com"
                  type="email"
                  aria-invalid={errors.email && 'true'}
                />
                {errors.email && <p className="text-xs text-red-500 mt-3">{errors.email.message}</p>}

                <Label className="mt-5 mb-3 text-base">Password</Label>
                <Input
                  {...register('password', { required: 'Password wajib diisi', minLength: { value: 6, message: 'Password minimal 6 karakter' } })}
                  placeholder="******"
                  type={showPassword ? 'text' : 'password'}
                  aria-invalid={errors.password && 'true'}
                />
                {errors.password && <p className="text-xs text-red-500 mt-3">{errors.password.message}</p>}

                <Label className="mt-5 mb-3 text-base">Konfirmasi Password</Label>
                <Input
                  {...register('confirmPassword', { required: 'Konfirmasi password wajib diisi', validate: (value) => value === watch('password') || 'Password tidak cocok' })}
                  placeholder="******"
                  type={showPassword ? 'text' : 'password'}
                  aria-invalid={errors.confirmPassword && 'true'}
                />
                {errors.confirmPassword && <p className="text-xs text-red-500 mt-3">{errors.confirmPassword.message}</p>}

                <div className="flex gap-3 mt-1 items-center">
                  <Input type="checkbox" onChange={(e) => setShowPassword(e.target.checked)} className="w-max" />
                  <p className="text-sm">Tampilkan Password</p>
                </div>

                <Button type="button" className="bg-blue-600 hover:bg-blue-500 w-full mt-4 cursor-pointer" size={'lg'} onClick={handleNext}>
                  Selanjutnya
                </Button>
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <Label className="mb-3 text-base">Nama Lengkap</Label>
                  <Input {...register('nama', { required: 'Nama wajib diisi' })} placeholder="Nama Anda" type="text" aria-invalid={errors.nama && 'true'} className="w-full" />
                  {errors.nama && <p className="text-xs text-red-500 mt-3">{errors.nama.message}</p>}
                </div>
                <div className="flex gap-4 max-md:flex-col max-md:gap-0 mt-5">
                  <div className="w-full">
                    <Label className="mb-3 text-base">Alamat</Label>
                    <Input {...register('alamat', { required: 'Alamat wajib diisi' })} placeholder="Alamat Anda" type="text" aria-invalid={errors.alamat && 'true'} />
                    {errors.alamat && <p className="text-xs text-red-500 mt-3">{errors.alamat.message}</p>}
                  </div>
                  <div className="w-full">
                    <Label className="mb-3 text-base">Nomor Handphone</Label>
                    <Input {...register('noHp', { required: 'No Handphone wajib diisi', minLength: { value: 12, message: 'Nomor Handphone tidak valid' } })} placeholder="Nomor Handphone" type="tel" aria-invalid={errors.noHp && 'true'} />
                    {errors.noHp && <p className="text-xs text-red-500 mt-3">{errors.noHp.message}</p>}
                  </div>
                </div>

                <div className="flex gap-4 max-md:flex-col max-md:gap-0">
                  <div>
                    <Label className="mt-5 mb-3 text-base">Foto Profil</Label>
                    <Input {...register('fotoProfil', { required: 'Foto profil wajib diisi' })} type="file" aria-invalid={errors.fotoProfil && 'true'} />
                    {errors.fotoProfil && <p className="text-xs text-red-500 mt-3">{errors.fotoProfil.message}</p>}
                  </div>
                  <div>
                    <Label className="mt-5 mb-3 text-base">Foto KTP</Label>
                    <Input {...register('ktp', { required: 'Foto KTP wajib diisi' })} type="file" aria-invalid={errors.ktp && 'true'} />
                    {errors.ktp && <p className="text-xs text-red-500 mt-3">{errors.ktp.message}</p>}
                  </div>
                </div>
                <p className="text-xs mt-5">
                  Dengan melanjutkan anda menyetujui{' '}
                  <Link href="/" className="text-blue-600">
                    Syarat dan Ketentuan
                  </Link>{' '}
                  dan{' '}
                  <Link href="/" className="text-blue-600">
                    Kebijakan Privasi
                  </Link>{' '}
                  yang berlaku dari Ideafund
                </p>
                <div className="flex gap-4 max-md:flex-col-reverse max-md:w-full w-[80%] mt-6">
                  <Button className="w-[60%] max-md:w-full cursor-pointer" variant={'secondary'} type="button" onClick={() => setStep(1)}>
                    Kembali
                  </Button>
                  <Button type="submit" className="bg-blue-600  max-md:w-full hover:bg-blue-500 w-[60%] cursor-pointer">
                    Daftar
                  </Button>
                </div>
              </>
            )}
          </form>

          <p className="mt-3 text-sm">
            Sudah punya akun?{' '}
            <Link href={'/user/masuk'} className="text-blue-600">
              Masuk Sekarang
            </Link>
          </p>
        </div>
        <div className="w-full bg-blue-600 max-md:hidden"></div>
      </div>
    </div>
  );
}
