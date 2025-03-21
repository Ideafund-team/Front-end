import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronRight, HandCoins, MapPin, SearchIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function page() {
  return (
    <div className="h-screen max-w-6xl mx-auto px-4">
      <div className="mt-10 w-full text-center">
        <h1 className="text-3xl max-sm:text-2xl font-semibold">
          Temukan Ide <span className="text-blue-600">Usaha Menarik</span>
        </h1>
        <p className="text-slate-400 text-sm max-sm:text-xs mt-2">Temukan Ide Usaha Potensial dan Jadi Bagian dari Kesuksesannya!</p>
      </div>
      <div className="mt-10 max-w-4xl mx-auto px-4">
        <div className="relative">
          <div className="absolute left-3 top-4.5 h-4 w-4 text-muted-foreground">
            <SearchIcon className="h-4 w-4" />
          </div>
          <Input id="search" type="search" placeholder="Cari Ide Usaha..." className="w-full bg-background pl-8 py-6 rounded-full" />
        </div>
      </div>

      <section className="grid py-10 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        {ideas.map((ide, index) => (
          <div key={index} className="border rounded-lg w-full p-4 mt-4">
            <div className="relative">
              <Image src={ide.image} width={100} height={100} alt={ide.title} className="w-full rounded-md" />
              <div className="absolute top-2 right-2 bg-white px-3 py-1 rounded-full flex items-center gap-2 shadow">
                <span className={`h-2 w-2 rounded-full ${ide.status === 'Dibuka' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                <p className="text-xs font-medium">{ide.status}</p>
              </div>
            </div>
            <p className="text-xl font-semibold mt-3">{ide.title}</p>
            <div className="flex gap-2 mt-2">
              {ide.category.map((category, index) => (
                <p key={index} className="text-blue-600 bg-blue-600/10 px-4 py-1 rounded-full text-xs">
                  {category}
                </p>
              ))}
            </div>

            <p className="text-sm my-4">{ide.summary}</p>
            <div className="flex gap-2 items-center">
              <p className="text-green-500 bg-green-500/10 flex gap-2 items-center w-max px-4 py-1 rounded-full text-sm">
                <HandCoins size={18} /> {ide.investmentAmount}
              </p>
              <p className="text-red-600 bg-red-600/10 flex gap-2 items-center w-max px-4 py-1 rounded-full text-sm">
                <MapPin size={16} /> {ide.location}
              </p>
            </div>
            <Link href={`/detail-ide/${ide.id}`} className="mt-5">
              <Button className="bg-blue-600 mt-5 hover:bg-blue-500 cursor-pointer w-full">
                Lihat Detail <ChevronRight />
              </Button>
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
}

const ideas = [
  {
    id: '1',
    title: 'Contoh Ide Usaha',
    image: '/thumbniel.png',
    category: ['Elektroknik', 'Pendidikan'],
    location: 'Jakarta',
    status: 'Dibuka',
    investmentAmount: 'Rp. 10.000.000',
    investmentAvalible: 'Rp. 5.000.000',
    summary: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro nulla nostrum cumque vitae rem nihil eos at corrupti praesentium non.',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro nulla nostrum cumque vitae rem nihil eos at corrupti praesentium non. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, sit quibusdam. Quo eum atque blanditiis possimus, neque necessitatibus esse non quis rerum reiciendis nemo, enim nesciunt deserunt corrupti vero perferendis adipisci ipsum? Pariatur similique odio quidem qui. Beatae iure, in a consectetur fuga eveniet, nam quibusdam voluptas praesentium, aut voluptatum magni maiores rem architecto doloribus earum vero. Recusandae obcaecati minima, officia omnis, cum iste culpa animi, incidunt nobis perspiciatis fugiat laboriosam. Voluptates, ea. Ipsum repellat libero nesciunt mollitia obcaecati voluptatibus reiciendis ipsa, sunt blanditiis dolorum provident numquam rerum laboriosam magnam eligendi. Possimus quas inventore, provident eligendi fuga repellat quo soluta?',
  },
  {
    id: '2',
    title: 'Contoh Ide Usaha',
    image: '/thumbniel.png',
    category: ['Elektroknik', 'Pendidikan'],
    location: 'Jakarta',
    status: 'Ditutup',
    investmentAmount: 'Rp. 10.000.000',
    investmentAvalible: 'Rp. 5.000.000',
    summary: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro nulla nostrum cumque vitae rem nihil eos at corrupti praesentium non.',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro nulla nostrum cumque vitae rem nihil eos at corrupti praesentium non. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, sit quibusdam. Quo eum atque blanditiis possimus, neque necessitatibus esse non quis rerum reiciendis nemo, enim nesciunt deserunt corrupti vero perferendis adipisci ipsum? Pariatur similique odio quidem qui. Beatae iure, in a consectetur fuga eveniet, nam quibusdam voluptas praesentium, aut voluptatum magni maiores rem architecto doloribus earum vero. Recusandae obcaecati minima, officia omnis, cum iste culpa animi, incidunt nobis perspiciatis fugiat laboriosam. Voluptates, ea. Ipsum repellat libero nesciunt mollitia obcaecati voluptatibus reiciendis ipsa, sunt blanditiis dolorum provident numquam rerum laboriosam magnam eligendi. Possimus quas inventore, provident eligendi fuga repellat quo soluta?',
  },
  {
    id: '3',
    title: 'Contoh Ide Usaha',
    image: '/thumbniel.png',
    category: ['Elektroknik', 'Pendidikan'],
    location: 'Jakarta',
    status: 'Dibuka',
    investmentAmount: 'Rp. 10.000.000',
    investmentAvalible: 'Rp. 5.000.000',
    summary: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro nulla nostrum cumque vitae rem nihil eos at corrupti praesentium non.',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro nulla nostrum cumque vitae rem nihil eos at corrupti praesentium non. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, sit quibusdam. Quo eum atque blanditiis possimus, neque necessitatibus esse non quis rerum reiciendis nemo, enim nesciunt deserunt corrupti vero perferendis adipisci ipsum? Pariatur similique odio quidem qui. Beatae iure, in a consectetur fuga eveniet, nam quibusdam voluptas praesentium, aut voluptatum magni maiores rem architecto doloribus earum vero. Recusandae obcaecati minima, officia omnis, cum iste culpa animi, incidunt nobis perspiciatis fugiat laboriosam. Voluptates, ea. Ipsum repellat libero nesciunt mollitia obcaecati voluptatibus reiciendis ipsa, sunt blanditiis dolorum provident numquam rerum laboriosam magnam eligendi. Possimus quas inventore, provident eligendi fuga repellat quo soluta?',
  },
];
