'use client';

import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './button';

export default function DashboardNavbar() {
  const pathname = usePathname();
  return (
    <header className="border-b sticky top-0 z-20 bg-white">
      <nav className="max-w-6xl mx-auto p-4 flex items-center justify-between">
        <div className="menu max-md:hidden">
          <ul className="flex gap-10 items-center text-sm">
            {menus.map((menu, index) => (
              <li key={index} className={`hover:text-blue-500 transition-all duration-200 ${pathname === menu.link ? 'text-blue-500' : ''}`}>
                <Link href={menu.link}>{menu.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent className="max-sm:w-full transition-all duration-200">
              <SheetTitle>
                <Link href={'/'} className="logo flex gap-3 items-center p-4">
                  <Image src={'/logo.svg'} width={40} height={40} alt="Logo" />
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
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}

const menus = [
  {
    label: 'Dashboard',
    link: '/user/dashboard',
  },
  {
    label: 'Ide',
    link: '/user/ide',
  },
  {
    label: 'Investor',
    link: '/user/investor',
  },
  {
    label: 'Profil',
    link: '/user/profil',
  },
];
