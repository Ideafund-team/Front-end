'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronRight, HandCoins, MapPin, SearchIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Page() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filteredIdeas, setFilteredIdeas] = React.useState(ideas);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredIdeas(ideas.filter((ide) => ide.title.toLowerCase().includes(value) || ide.summary.toLowerCase().includes(value)));
  };

  return (
    <div className="max-w-5xl">
      <div className="">
        <h1 className="text-2xl font-semibold">Investor Anda</h1>
        <p className="text-slate-600 text-sm">Data investor yang anda dapatkan</p>
      </div>
      <div className="mt-8 flex gap-4">
        <div className="relative w-full">
          <div className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground">
            <SearchIcon className="h-4 w-4" />
          </div>
          <Input id="search" type="search" value={searchTerm} placeholder="Cari Ide Usaha..." className="w-full bg-background pl-8 py-4" onChange={handleSearch} />
        </div>
      </div>
      <section className="grid pb-10 mt-3 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        {filteredIdeas.map((ide, index) => (
          <div key={index} className="border rounded-lg w-full p-4 mt-4">
            <div className="relative">
              <Image src={ide.image} width={10} height={10} alt={ide.title} className="w-full rounded-md" unoptimized />
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

            <p className="text-sm my-4 line-clamp-3">{ide.summary}</p>
            <div className="flex gap-2 items-center">
              <p className="text-green-500 bg-green-500/10 flex gap-2 items-center w-max px-4 py-1 rounded-full text-sm">
                <HandCoins size={18} /> {ide.investmentAmount}
              </p>
              <p className="text-red-600 bg-red-600/10 flex gap-2 items-center w-max px-4 py-1 rounded-full text-sm">
                <MapPin size={16} /> {ide.location}
              </p>
            </div>
            <Link href={`/user/investor/ide/${ide.id}`} className="mt-5">
              <Button className="bg-blue-600 mt-5 hover:bg-blue-500 cursor-pointer w-full">
                Lihat Investor <ChevronRight />
              </Button>
            </Link>
          </div>
        ))}
      </section>

      <p className="text-center w-full text-slate-600">{filteredIdeas.length <= 0 && 'Ide yang ada cari tidak ada'}</p>
    </div>
  );
}

const ideas = [
  {
    id: '1',
    title: 'Test',
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
