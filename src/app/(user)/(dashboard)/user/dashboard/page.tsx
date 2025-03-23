'use client';

import { HandCoins, Lightbulb, WalletMinimal } from 'lucide-react';
import React from 'react';
import Cookies from 'js-cookie';

import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';

export default function Page() {
  const userId = Cookies.get('userId');
  const { data: user } = useSWR(userId ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/${userId}` : null, fetcher);

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
              <p className="font-semibold text-2xl">10</p>
              <p className="text-slate-400 text-sm">Ide Usaha</p>
            </div>
          </div>
          <div className="bg-white rounded-md p-4 flex w-40 items-center gap-4">
            <div className="bg-blue-600 rounded-full p-2 text-white w-max text-center">
              <HandCoins />
            </div>
            <div>
              <p className="font-semibold text-2xl">10</p>
              <p className="text-slate-400 text-sm">Investor</p>
            </div>
          </div>
          <div className="bg-white rounded-md p-4 flex w-40 items-center gap-4">
            <div className="bg-blue-600 rounded-full p-2 text-white w-max text-center">
              <WalletMinimal />
            </div>
            <div>
              <p className="font-semibold text-2xl">10</p>
              <p className="text-slate-400 text-sm">Investasi</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h1 className="text-xl font-medium border-b pb-2">Ide Terbaru</h1>
        <div>
          <p className="text-center text-sm mt-6 text-slate-400">Belum ada ide yang dibuat</p>
        </div>
      </div>
    </div>
  );
}
