'use client';

import { Sheet, SheetClose, SheetContent, SheetFooter, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import clsx from 'clsx';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button, buttonVariants } from './button';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    setUserId(Cookies.get('userId') || null);
  }, []);

  const { data } = useSWR(userId ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/${userId}` : null, fetcher);

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('userId');
    setUserId(null);
    router.push('/');
  };

  return (
    <header className="border-b sticky top-0 z-20 bg-white">
      <nav className="max-w-6xl mx-auto p-4 flex items-center justify-between">
        <Link href="/" className="logo flex gap-3 items-center">
          <Image src="/logo.svg" width={40} height={40} alt="Logo" />
          <p className="font-medium">Ideafund</p>
        </Link>

        <div className="menu max-md:hidden">
          <ul className="flex gap-10 items-center text-sm">
            {menus.map((menu, index) => (
              <li key={index} className={`hover:text-blue-500 transition-all duration-200 ${pathname === menu.link ? 'text-blue-500' : ''}`}>
                <Link href={menu.link}>{menu.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {data?.nama ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex gap-3 border rounded-md px-4 py-2 items-center cursor-pointer hover:bg-gray-50">
                <Image src={data.foto_profil} width={25} height={25} alt="Avatar" unoptimized className="rounded-full" />
                <p>{data.nama}</p>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/user/profil">Profil</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/user/dashboard">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                <p className="text-red-500">Logout</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex gap-3 items-center max-md:hidden">
            <Link href="/user/daftar" className={clsx(buttonVariants({ variant: 'secondary' }), 'w-24')}>
              Daftar
            </Link>
            <Link href="/user/masuk">
              <Button className="bg-blue-600 hover:bg-blue-500 cursor-pointer w-24">Masuk</Button>
            </Link>
          </div>
        )}

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent className="max-sm:w-full transition-all duration-200">
              <SheetTitle>
                <Link href="/" className="logo flex gap-3 items-center p-4">
                  <Image src="/logo.svg" width={40} height={40} alt="Logo" />
                  <p className="font-medium">Ideafund</p>
                </Link>
              </SheetTitle>
              <div className="mt-3">
                <ul className="flex flex-col gap-8 px-4 text-sm">
                  {menus.map((menu, index) => (
                    <SheetClose key={index} asChild>
                      <li className={`hover:text-blue-500 transition-all duration-200 ${pathname === menu.link ? 'text-blue-500' : ''}`}>
                        <Link href={menu.link}>{menu.label}</Link>
                      </li>
                    </SheetClose>
                  ))}
                </ul>
              </div>
              {!data?.nama && (
                <SheetFooter>
                  <div className="grid grid-cols-2 gap-3 items-center">
                    <Link href="/user/daftar" className={clsx(buttonVariants({ variant: 'secondary' }))}>
                      Daftar
                    </Link>
                    <Link href="/user/masuk" className="w-full">
                      <Button className="bg-blue-600 hover:bg-blue-500 cursor-pointer w-full">Masuk</Button>
                    </Link>
                  </div>
                </SheetFooter>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}

const menus = [
  { label: 'Beranda', link: '/' },
  { label: 'Cari Ide', link: '/cari-ide' },
  { label: 'Tentang Kami', link: '/tentang' },
  { label: 'Syarat dan Privasi', link: '/syarat-dan-privasi' },
];
