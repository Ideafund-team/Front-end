import React from 'react';
import { Button } from './button';
import Link from 'next/link';
import { ChevronRight, HandCoins, MapPin } from 'lucide-react';
import Image from 'next/image';
import { Idea } from '@/types/idea';

export default function IdeaCard({ ide }: { ide: Idea }) {
  return (
    <div>
      <div className="border rounded-lg w-full p-4 mt-4">
        <div className="relative">
          <Image src={ide.image} width={100} height={100} alt={ide.title} className="w-full rounded-md sm:h-52 object-cover" unoptimized />
          <div className="absolute top-2 right-2 bg-white px-3 py-1 rounded-full flex items-center gap-2 shadow">
            <span className={`h-2 w-2 rounded-full ${ide.status === true ? 'bg-green-500' : 'bg-red-500'}`}></span>
            <p className="text-xs font-medium">{ide.status === true ? 'Dibuka' : 'Ditutup'}</p>
          </div>
        </div>
        <p className="text-xl font-semibold mt-3">{ide.title}</p>
        <div className="flex gap-2 mt-2">
          <p className="text-blue-600 bg-blue-600/10 px-4 py-1 rounded-full text-xs">{ide.kategori}</p>
        </div>

        <p className="text-sm my-4 line-clamp-3">{ide.summary}</p>
        <div className="flex gap-2 items-center">
          <p className="text-green-500 bg-green-500/10 flex gap-2 items-center w-max px-4 py-1 rounded-full text-sm max-w-full truncate">
            <HandCoins size={18} /> {parseFloat(ide.investment_amount).toLocaleString('id-ID')}
          </p>
          <p className="text-red-600 bg-red-600/10 flex gap-2 items-center w-max px-4 py-1 rounded-full text-sm truncate">
            <MapPin size={16} /> {ide.location}
          </p>
        </div>
        <Link href={`/detail-ide/${ide.id}`} className="mt-5">
          <Button className="bg-blue-600 mt-5 hover:bg-blue-500 cursor-pointer w-full">
            Lihat Detail <ChevronRight />
          </Button>
        </Link>
      </div>
    </div>
  );
}
