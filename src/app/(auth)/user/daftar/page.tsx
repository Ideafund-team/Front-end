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

type User = {
  email: string;
  password: string;
  confirm_password: string;
  nama: string;
  alamat: string;
  no_hp: string;
  foto_profil: FileList;
  foto_ktp: FileList;
};

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<User>({ mode: 'onChange' });
  const [showPassword, setShowPassword] = React.useState(false);
  const [step, setStep] = React.useState(1);
  const [message, setMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<User> = async (data) => {
    const formData = new FormData();

    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('confirm_password', data.confirm_password);
    formData.append('nama', data.nama);
    formData.append('alamat', data.alamat);
    formData.append('no_hp', data.no_hp);
    formData.append('foto_ktp', data.foto_ktp[0]);
    formData.append('foto_profil', data.foto_profil[0]);

    try {
      setIsLoading(true);
      const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/auth/register', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      console.log('Response:', result);
      setMessage(result.message);
      toast.success('Berhasil mendaftar!');
      router.push('/user/masuk');
    } catch (error) {
      console.error('Error:', error);
      setMessage('Terjadi kesalahan saat mendaftar');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = async () => {
    const isValid = await trigger(['email', 'password', 'confirm_password']);
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
                  {...register('confirm_password', { required: 'Konfirmasi password wajib diisi', validate: (value) => value === watch('password') || 'Password tidak cocok' })}
                  placeholder="******"
                  type={showPassword ? 'text' : 'password'}
                  aria-invalid={errors.confirm_password && 'true'}
                />
                {errors.confirm_password && <p className="text-xs text-red-500 mt-3">{errors.confirm_password.message}</p>}

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
                    <Input {...register('no_hp', { required: 'No Handphone wajib diisi', minLength: { value: 12, message: 'Nomor Handphone tidak valid' } })} placeholder="Nomor Handphone" type="tel" aria-invalid={errors.no_hp && 'true'} />
                    {errors.no_hp && <p className="text-xs text-red-500 mt-3">{errors.no_hp.message}</p>}
                  </div>
                </div>

                <div className="flex gap-4 max-md:flex-col max-md:gap-0">
                  <div>
                    <Label className="mt-5 mb-3 text-base">Foto Profil</Label>
                    <Input {...register('foto_profil', { required: 'Foto profil wajib diisi' })} type="file" aria-invalid={errors.foto_profil && 'true'} accept="image/*" />
                    {errors.foto_profil && <p className="text-xs text-red-500 mt-3">{errors.foto_profil.message}</p>}
                  </div>
                  <div>
                    <Label className="mt-5 mb-3 text-base">Foto KTP</Label>
                    <Input {...register('foto_ktp', { required: 'Foto KTP wajib diisi' })} type="file" aria-invalid={errors.foto_ktp && 'true'} accept="image/*" />
                    {errors.foto_ktp && <p className="text-xs text-red-500 mt-3">{errors.foto_ktp.message}</p>}
                  </div>
                </div>
                <p className="text-xs mt-5">
                  Dengan melanjutkan anda menyetujui{' '}
                  <Link href="/syarat-dan-privasi#syarat-dan-ketentuan" className="text-blue-600">
                    Syarat dan Ketentuan
                  </Link>{' '}
                  dan{' '}
                  <Link href="/syarat-dan-privasi#kebijakan-privasi" className="text-blue-600">
                    Kebijakan Privasi
                  </Link>{' '}
                  yang berlaku dari Ideafund
                </p>
                <p className="text-xs text-red-500 mt-3">{message}</p>
                <div className="flex gap-4 max-md:flex-col-reverse max-md:w-full w-[80%] mt-6">
                  <Button className="w-[60%] max-md:w-full cursor-pointer" variant={'secondary'} type="button" onClick={() => setStep(1)}>
                    Kembali
                  </Button>
                  <Button type="submit" disabled={isLoading} className="bg-blue-600  max-md:w-full hover:bg-blue-500 w-[60%] cursor-pointer">
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <LoaderCircle className="animate-spin" /> Mohon tunggu...
                      </span>
                    ) : (
                      'Daftar'
                    )}
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
        <div className="w-full bg-blue-600 max-md:hidden flex flex-col px-4 py-6 h-screen">
          <Link href={'/'} className="logo flex gap-3 items-center mb-6">
            <Image src={'/logo-white.svg'} width={40} height={40} alt="Logo" />
            <p className="font-medium text-white">Ideafund</p>
          </Link>
          <div className="flex flex-col justify-center px-4 py-6 h-full">
            <div className="">
              <p className="text-white italic text-xl">
                &quot;Ideafund benar-benar membantu saya mendapatkan pendanaan untuk bisnis makanan saya. Prosesnya mudah, dan saya bisa terhubung langsung dengan investor yang percaya dengan visi saya!&quot;
              </p>
              <div className="flex gap-3 mt-6">
                <Image src="/avatar.jpg" width={50} height={50} alt="profil-picture" className="rounded-full w-10 h-10 object-cover" />
                <div>
                  <p className="text-white font-semibold tex-lg">Ahmad Afwan</p>
                  <p className="text-xs text-slate-200">pengguna ideafund</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
