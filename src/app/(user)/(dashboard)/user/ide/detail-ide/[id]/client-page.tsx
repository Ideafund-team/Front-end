'use client';
import { fetcher } from '@/lib/fetcher';
import { Idea } from '@/types/idea';
import { HandCoins, MapPin, UserRound } from 'lucide-react';
import Image from 'next/image';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import useSWR from 'swr';
import Cookies from 'js-cookie';

export default function ClientPage({ id }: { id: string }) {
  const { data: idea } = useSWR<Idea>(process.env.NEXT_PUBLIC_API_BASE_URL + `/idea/${id}`, fetcher);

  const { data: investorIn } = useSWR(process.env.NEXT_PUBLIC_API_BASE_URL + `/getinvestoride/allinvestoride/${idea?.id}`, fetcher);

  const investorLength = Array.isArray(investorIn) ? investorIn.filter((investor) => investor.status === 'diterima').length : 0;

  const userId = Cookies.get('userId');

  const { data: user } = useSWR(userId ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/${userId}` : null, fetcher);

  if (!user?.is_active) {
    return (
      <div className="max-w-5xl h-[80vh] mx-auto px-4 flex justify-center items-center">
        <div className="flex flex-col items-center">
          <Image src={'/restricted-nonactive.png'} width={200} height={200} alt="restricteds" unoptimized />
          <p className="text-sm text-slate-600 mt-3">Mohon maaf, akun anda belum aktif!</p>
        </div>
      </div>
    );
  }

  if (!idea) {
    return (
      <div className="max-w-3xl mx-auto px-4 mb-22 mt-10">
        <div className="h-96 w-full bg-slate-200 animate-pulse rounded-md"></div>
        <div className="h-20 mt-4 w-full bg-slate-200 animate-pulse rounded-md"></div>
        <div className="h-4 mt-6 w-full bg-slate-200 animate-pulse rounded-md"></div>
        <div className="h-4 mt-6 w-[80%] bg-slate-200 animate-pulse rounded-md"></div>
        <div className="h-4 mt-6 w-[50%] bg-slate-200 animate-pulse rounded-md"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 mt-10 mb-22">
      <div>
        <div className="relative">
          <PhotoProvider>
            <PhotoView src={idea.image}>
              <Image src={idea.image || '/thumbniel.png'} width={100} height={100} alt={idea.title} className="w-full rounded-md aspect-video object-cover cursor-pointer hover:brightness-75 transition-all duration-200" unoptimized />
            </PhotoView>
          </PhotoProvider>
          <div className="absolute top-2 right-2 bg-white px-3 py-1 rounded-full flex items-center gap-2 shadow">
            <span className={`h-2 w-2 rounded-full ${idea.status === true ? 'bg-green-500' : 'bg-red-500'}`}></span>
            <p className="text-xs font-medium">{idea.status === true ? 'Dibuka' : 'Ditutup'}</p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-blue-600 bg-blue-600/10 px-4 py-1 rounded-full text-xs w-max">{idea.kategori}</p>
        </div>
        <h1 className="text-2xl font-semibold mt-4">{idea.title}</h1>
        <p className="text-xs text-slate-600 mt-1">Dibuat {new Date(idea.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}</p>

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
        <p className="mt-8 leading-relaxed text-slate-600 whitespace-pre-wrap">{idea.description}</p>
      </div>
    </div>
  );
}
