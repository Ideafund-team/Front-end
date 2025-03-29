'use client';
import { fetcher } from '@/lib/fetcher';
import { Idea } from '@/types/idea';
import Image from 'next/image';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import useSWR from 'swr';

export default function ClientPage({ id }: { id: string }) {
  const { data: idea } = useSWR<Idea>(process.env.NEXT_PUBLIC_API_BASE_URL + `/idea/${id}`, fetcher);

  const { data: owner } = useSWR(idea ? process.env.NEXT_PUBLIC_API_BASE_URL + `/user/${idea.id_owner}` : null, fetcher);

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
    <div className="max-w-4xl mx-auto p-4 border rounded-md mb-10">
      <div className="">
        <p className="mb-1 text-blue-600 font-medium">Judul</p>
        <p className="text-slate-600">{idea.title}</p>
      </div>
      <div className="mt-4">
        <p className="mb-1 text-blue-600 font-medium">Pembuat Ide</p>
        <p className="text-slate-600">{owner?.nama}</p>
      </div>
      <div className="mt-4">
        <p className="mb-1 text-blue-600 font-medium">Dibuat</p>
        <p className="text-slate-600">{new Date(idea.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
      </div>
      <div className="mt-4">
        <p className="mb-1 text-blue-600 font-medium">Kategori</p>
        <p className="text-slate-600">{idea.kategori}</p>
      </div>
      <div className="mt-4">
        <p className="mb-1 text-blue-600 font-medium">Ringkasan</p>
        <p className="text-slate-600">{idea.summary}</p>
      </div>
      <div className="mt-4">
        <p className="mb-1 text-blue-600 font-medium">Kebutuhan Investasi</p>
        <p className="text-slate-600">Rp. {idea.investment_amount}</p>
      </div>
      <div className="mt-4">
        <p className="mb-1 text-blue-600 font-medium">Lokasi</p>
        <p className="text-slate-600">{idea.location}</p>
      </div>
      <div className="mt-4">
        <p className="mb-1 text-blue-600 font-medium">Deskripsi</p>
        <p className="text-slate-600">{idea.description}</p>
      </div>
      <div className="mt-4">
        <p className="mb-3 text-blue-600 font-medium">Gambar</p>
        <PhotoProvider>
          <PhotoView src={idea.image}>
            <Image
              src={idea.image || '/thumbniel.png'}
              width={100}
              height={100}
              alt={idea.title}
              className="w-[40%] max-md:w-full rounded-md aspect-video object-cover cursor-pointer hover:brightness-75 transition-all duration-200"
              unoptimized
            />
          </PhotoView>
        </PhotoProvider>
      </div>
    </div>
  );
}
