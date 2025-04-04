'use client';

import Cookies from 'js-cookie';
import { HandCoins, Lightbulb, WalletMinimal, LoaderCircle } from 'lucide-react';

import IdeaCard from '@/components/ui/idea-card';
import { fetcher } from '@/lib/fetcher';
import { Idea } from '@/types/idea';
import useSWR from 'swr';
import Image from 'next/image';

export default function Page() {
  const userId = Cookies.get('userId');
  const { data: user } = useSWR(userId ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/${userId}` : null, fetcher);
  const { data: ideas } = useSWR(userId ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/getidowner/ide/${userId}` : null, fetcher);
  const { data: investors } = useSWR(userId ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/getinvestorbyowner/${userId}` : null, fetcher);
  const { data: investasi } = useSWR(userId ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/getallinvestor/allinvestor/${userId}` : null, fetcher);

  if (!user) {
    return (
      <div className="max-w-5xl w-full h-[80vh] mx-auto flex justify-center items-center">
        <p className="flex text-sm gap-2 items-center text-slate-500">
          <LoaderCircle size={18} className="animate-spin" /> Memuat...
        </p>
      </div>
    );
  }

  if (!user.is_active) {
    return (
      <div className="max-w-5xl h-[80vh] mx-auto px-4 flex justify-center items-center">
        <div className="flex flex-col items-center">
          <Image src={'/restricted.png'} width={200} height={200} alt="restricteds" unoptimized />
          <p className="text-xl font-medium">Hallo!, Selamat Datang</p>
          <p className="text-sm text-slate-600 mt-3 max-w-lg text-center">Untuk saat ini akun anda belum aktif, kami akan mengirim konfirmasi status akun anda melalui email yang sudah anda daftarkan</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl">
      <div className="bg-blue-600 p-4 rounded-lg">
        <h1 className="text-white font-semibold text-2xl">
          {(() => {
            const hour = new Date().getHours();
            if (hour < 12) return 'Selamat Pagi';
            if (hour < 18) return 'Selamat Siang';
            return 'Selamat Malam';
          })()}{' '}
          {user?.nama && user.nama}!
        </h1>
        <p className="text-white mt-2">Selamat datang di dashboard anda.</p>

        <div className="flex gap-4 mt-6 flex-wrap">
          <div className="bg-white rounded-md p-4 flex w-40 items-center gap-4">
            <div className="bg-blue-600 w-max rounded-full p-2 text-white text-center">
              <Lightbulb />
            </div>
            <div>
              <p className="font-semibold text-2xl">{ideas?.length || 0}</p>
              <p className="text-slate-400 text-sm">Ide Usaha</p>
            </div>
          </div>
          <div className="bg-white rounded-md p-4 flex w-40 items-center gap-4">
            <div className="bg-blue-600 rounded-full p-2 text-white w-max text-center">
              <HandCoins />
            </div>
            <div>
              <p className="font-semibold text-2xl">{investors?.message === 'Investor tidak ditemukan' ? '0' : Array.isArray(investors) ? investors.length : '0'}</p>
              <p className="text-slate-400 text-sm">Investor</p>
            </div>
          </div>
          <div className="bg-white rounded-md p-4 flex w-40 items-center gap-4">
            <div className="bg-blue-600 rounded-full p-2 text-white w-max text-center">
              <WalletMinimal />
            </div>
            <div>
              <p className="font-semibold text-2xl">{investasi?.message === 'Investor tidak ditemukan' ? '0' : Array.isArray(investasi) ? investasi.length : '0'}</p>
              <p className="text-slate-400 text-sm">Investasi</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h1 className="text-xl font-medium border-b pb-2">Ide Terbaru</h1>
        {ideas?.message === 'Ide tidak ditemukan' && <p className="text-center w-full text-sm mt-6 text-slate-400">Belum ada ide yang dibuat</p>}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
          {Array.isArray(ideas) &&
            ideas
              .slice(-3)
              .reverse()
              .map((ide: Idea, index: number) => <IdeaCard key={index} ide={ide} linkDetail={`/user/ide/detail-ide/${ide.id}`} />)}
        </div>
      </div>
    </div>
  );
}
