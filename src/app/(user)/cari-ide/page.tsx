import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';
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
    </div>
  );
}
