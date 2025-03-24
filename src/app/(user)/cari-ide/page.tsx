'use client';

import IdeaCard from '@/components/ui/idea-card';
import { Input } from '@/components/ui/input';
import { fetcher } from '@/lib/fetcher';
import { SearchIcon } from 'lucide-react';
import React from 'react';
import useSWR from 'swr';
import { Idea } from '@/types/idea';

export default function Page() {
  const [searchTerm, setSearchTerm] = React.useState('');

  const { data: ideas } = useSWR<Idea[]>(process.env.NEXT_PUBLIC_API_BASE_URL + '/idea', fetcher);

  const [filteredIdeas, setFilteredIdeas] = React.useState<Idea[] | undefined>(ideas);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = ideas?.filter((idea) => idea.title.toLowerCase().includes(value));
    setFilteredIdeas(filtered);
  };

  React.useEffect(() => {
    setFilteredIdeas(ideas);
  }, [ideas]);

  return (
    <div className="max-w-6xl mx-auto px-4">
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
          <Input id="search" value={searchTerm} onChange={handleSearch} type="search" placeholder="Cari Ide Usaha..." className="w-full bg-background pl-8 py-6 rounded-full" />
        </div>
      </div>

      <section className="grid py-10 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        {filteredIdeas?.map((ide) => (
          <IdeaCard ide={ide} key={ide.id} />
        ))}
      </section>
    </div>
  );
}
