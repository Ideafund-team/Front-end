import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';


export default function Home() {
  return (
    <main>
      <div className="relative flex h-[85vh] w-full items-center justify-center bg-white dark:bg-black">
        <div className={cn('absolute inset-0', '[background-size:20px_20px]', '[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]', 'dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]')} />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl max-sm:text-3xl font-bold">Wujudkan Usaha Impian Anda Sekarang!</h1>
          <p className="my-5 text-slate-600 max-sm:text-xs">Ideafund adalah platform yang menghubungkan pemilik ide usaha UMKM dengan investor. Temukan dukungan finansial dan strategis untuk mewujudkan usaha impian Anda!</p>
          <div className="flex gap-5 items-center justify-center mt-8">
            <Link href={'/cari-ide'}>
              <Button className="w-40 py-5 cursor-pointer" variant={'secondary'}>
                Cari Ide
              </Button>
            </Link>
            <Link href={'/daftar'}>
              <Button className="bg-blue-600 hover:bg-blue-500 w-40 py-5 cursor-pointer">Daftar Sekarang</Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
