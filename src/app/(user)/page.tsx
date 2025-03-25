import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Check, HandCoins, Lightbulb, MessageCircle, Quote } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

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
              <Button className="w-40 py-5 cursor-pointer border-none" variant={'secondary'}>
                Cari Ide
              </Button>
            </Link>
            <Link href={'/user/daftar'}>
              <Button className="bg-blue-600 hover:bg-blue-500 w-40 py-5 cursor-pointer">Daftar Sekarang</Button>
            </Link>
          </div>
        </div>
      </div>

      <section className="max-w-5xl mx-auto px-4 mt-8">
        <div className="flex flex-col gap-2 text-center w-full">
          <h1 className="font-bold text-3xl">
            Berbagai <span className="text-blue-600">Layanan</span>
          </h1>
          <p className="text-sm text-slate-600">Dapatkan layanan yang kami tawarkan</p>
        </div>

        <div className="grid md:grid-cols-3 grid-cols-1 mt-8 gap-4">
          <div className="border rounded-md p-4">
            <div className="bg-blue-600 rounded-full p-2 text-white w-max">
              <Lightbulb />
            </div>
            <p className="font-semibold text-xl mt-3">Bagikan Ide</p>
            <p className="text-sm text-slate-600 mt-1">Bagikan ide anda dan temukan investor yang tertarik dengan ide usaha anda.</p>
          </div>
          <div className="border rounded-md p-4">
            <div className="bg-blue-600 rounded-full p-2 text-white w-max">
              <HandCoins />
            </div>
            <p className="font-semibold text-xl mt-3">Investasi</p>
            <p className="text-sm text-slate-600 mt-1">Lakukan tawaran investasi pada ide usaha yang memiliki potensi besar.</p>
          </div>
          <div className="border rounded-md p-4">
            <div className="bg-blue-600 rounded-full p-2 text-white w-max">
              <MessageCircle />
            </div>
            <p className="font-semibold text-xl mt-3">Diskusi</p>
            <p className="text-sm text-slate-600 mt-1">Terhbungan dan berdiskusi sesama pengguna</p>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 mt-14">
        <div className="flex flex-col gap-2 text-center w-full">
          <h1 className="font-bold text-3xl">
            Dapatkan <span className="text-blue-600">Keuntungan</span>
          </h1>
          <p className="text-sm text-slate-600">Dapatkan keuntungan menjadi pengguna</p>
        </div>

        <div className="flex gap-8 items-center mt-14 max-md:flex-col-reverse">
          <div className="w-full">
            <div className="flex gap-5 flex-col">
              <p className="bg-blue-600/10 py-4 px-4 rounded-md flex items-center gap-3">
                <Check className="text-blue-500" /> Ide usaha anda dapat dilihat oleh para investor berpeluang
              </p>
              <p className="bg-blue-600/10 py-4 px-4 rounded-md flex items-center gap-3">
                {' '}
                <Check className="text-blue-500" />
                Dapat berinvestasi pada usaha yang memiliki potensi besar
              </p>
              <p className="bg-blue-600/10 py-4 px-4 rounded-md flex items-center gap-3">
                <Check className="text-blue-500" />
                Terhubung dengan para pemilik ide usaha dan investor yang hebat
              </p>
            </div>
          </div>
          <div className="w-full">
            <Image src={'/layanan.jpg'} width={700} height={100} alt="keuntungan" className="w-full rounded-md" />
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 mt-14">
        <div className="flex flex-col gap-2 text-center w-full">
          <h1 className="font-bold text-3xl">
            Berbagai <span className="text-blue-600">Ulasan</span>
          </h1>
          <p className="text-sm text-slate-600">Ulasan para pengguna tentang ideafund</p>
        </div>

        <div>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mt-8">
            {testimoni.map((user, index) => (
              <div key={index} className="bg-white border rounded-md p-4">
                <Quote size={18} className="text-blue-600" />
                <p className="italic text-sm mt-2">{user.testimoni}</p>
                <div className="flex items-center gap-3 mt-3">
                  <Image src={user.avatar} width={60} height={60} alt={user.nama} className="rounded-full w-10 h-10 object-cover" />
                  <div className="flex flex-col">
                    <p className="font-medium">{user.nama}</p>
                    <p className="text-xs text-slate-600">Pengguna</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 mt-14">
        <div className="flex flex-col gap-2 text-center w-full">
          <h1 className="font-bold text-3xl">
            FAQ<span className="text-blue-600">&apos;s</span>
          </h1>
          <p className="text-sm text-slate-600">Temuakan jawaban dari pertanyaan anda</p>
        </div>

        <div className="mt-8 mb-14">
          <div>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger className="cursor-pointer text-md">{faq.q}</AccordionTrigger>
                  <AccordionContent>{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </main>
  );
}

const testimoni = [
  {
    avatar: '/afwan.jpeg',
    nama: 'Afwan Sudtrajat',
    testimoni: 'Ideafund dapat memudahkan saya dalam usaha potensial untuk melakaukan investasi',
  },
  {
    avatar: '/galuh.jpeg',
    nama: 'Galuh Satria',
    testimoni: 'dengan Ideafund saya dapat dengan mudah share ide usaha yang saya punya kepada para investor',
  },
  {
    avatar: '/geger.jpeg',
    nama: 'Geger Yudha',
    testimoni: 'Saya sangat senang dengan ideafund karena dapat membantu saya dalam memulai berbisnis',
  },
];

const faqs = [
  {
    q: 'Apa itu Ideafund?',
    a: 'Ideafund adalah platform yang menghubungkan pemilik ide usaha UMKM dengan investor untuk mendapatkan dukungan finansial dan strategis.',
  },
  {
    q: 'Bagaimana cara mendaftar di Ideafund?',
    a: 'Anda dapat mendaftar dengan mengklik tombol "Daftar Sekarang" di halaman utama dan mengisi formulir pendaftaran.',
  },
  {
    q: 'Apakah Ideafund gratis digunakan?',
    a: 'Ya, mendaftar dan menggunakan platform Ideafund untuk berbagi ide atau mencari investasi tidak dikenakan biaya.',
  },
  {
    q: 'Bagaimana cara menemukan investor untuk ide saya?',
    a: 'Anda dapat membagikan ide usaha Anda di platform Ideafund, dan investor yang tertarik akan menawarkan  investasi Anda melalui platform.',
  },
  {
    q: 'Bagaimana sistem pembayaran investasi?',
    a: 'Kami tidak melayani proses transaksi, bagi investor dan pemilik ide usaha akan melakukan komunikasi dan melakukan pembayaran secara pribadi',
  },
];
