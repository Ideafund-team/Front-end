'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

export default function Footer() {
  const year = new Date().getFullYear();
  const pathname = usePathname();

  if (pathname.includes('/user')) {
    return null;
  }

  return (
    <footer className="w-full bg-white border-t z-50 py-4">
      <div>
        <p className="text-center text-sm text-slate-600">© {year} Ideafund, All right reserved</p>
      </div>
    </footer>
  );
}
