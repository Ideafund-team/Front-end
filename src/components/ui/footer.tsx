'use client';

import { Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
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
      <div className="flex justify-between w-full max-w-6xl mx-auto p-4">
        <div className='flex flex-col gap-3'>
          <Link href="/" className="logo flex gap-3 items-center">
            <Image src="/logo.svg" width={40} height={40} alt="Logo" />
            <p className="font-medium">Ideafund</p>
          </Link>

          <ul className="flex gap-6">
            {menus.map((menu, index) => (
              <li key={index} className="text-sm text-slate-600 hover:text-blue-600 transition-all duration-200">
                <Link href={menu.link}>{menu.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <Link href={'mailto:ideafundindonesia@gmail.com'} target="_blank" className="text-slate-600 cursor-pointer flex items-center gap-2 text-sm ">
          <Mail size={18} />
          ideafundindonesia@gmail.com
        </Link>
      </div>
      <div className="border-t max-w-6xl mx-auto p-3 mt-4">
        <p className="text-center text-sm text-slate-600">© {year} Ideafund, All right reserved</p>
      </div>
    </footer>
  );
}

const menus = [
  { label: 'Beranda', link: '/' },
  { label: 'Cari Ide', link: '/cari-ide' },
  { label: 'Tentang Kami', link: '/tentang' },
  { label: 'Syarat dan Privasi', link: '/syarat-dan-privasi' },
];
