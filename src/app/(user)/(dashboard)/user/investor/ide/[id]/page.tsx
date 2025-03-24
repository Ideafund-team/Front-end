import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Check, X } from 'lucide-react';
import Image from 'next/image';

export default function Page() {
  return (
    <div>
      <div className="">
        <h1 className="text-2xl font-semibold">Daftar Investor</h1>
        <p className="text-slate-600 text-sm">Data investor yang anda dapatkan</p>
      </div>
      <div className="flex flex-col gap-3 max-w-3xl mt-8">
        {investor.map((invest, index) => (
          <div key={index} className="bg-white border rounded-md p-2 flex justify-between max-sm:flex-col gap-4">
            <div className="flex sm:items-center gap-4 max-sm:flex-col w-full">
              <div>
                <Image src={invest.foto_profil} width={134} height={100} alt={invest.nama} className="rounded-md max-sm:w-full" unoptimized />
              </div>
              <div className="max-sm:ps-1">
                <p className="font-medium">{invest.nama}</p>
                <p className="mt-1">
                  Jumlah Tawaran Investasi <span className="text-green-600 bg-green-600/10 rounded-md px-2 py-1 text-sm">Rp.{invest.investasi}</span>
                </p>
                <div className="">
                  <Dialog>
                    <DialogTrigger>
                      <button className="text-blue-600 text-sm cursor-pointer hover:underline">Lihat Detail</button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="text-start">Detail Investasi</DialogTitle>
                        <DialogClose />
                      </DialogHeader>
                      <div className="text-left">
                        <table className="table-auto w-full">
                          <tbody className="">
                            <tr>
                              <td className="py-2">Nama</td>
                              <td className="px-2">:</td>
                              <td className="font-medium">{invest.nama}</td>
                            </tr>
                            <tr>
                              <td className="py-2">Jumlah</td>
                              <td className="px-2">:</td>
                              <td className="font-medium">Rp. {invest.investasi}</td>
                            </tr>
                            <tr>
                              <td className="py-2">Email</td>
                              <td className="px-2">:</td>
                              <td className="font-medium">{invest.email}</td>
                            </tr>
                            <tr>
                              <td className="py-2">No HP</td>
                              <td className="px-2">:</td>
                              <td className="font-medium">{invest.nomor_hp}</td>
                            </tr>
                          </tbody>
                        </table>
                        <p className="mt-2">Catatan</p>
                        <ScrollArea className="max-h-40 mt-2 pr-3">
                          <p className="text-sm text-slate-600 text-justify">{invest.note}</p>
                        </ScrollArea>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 max-sm:flex-row items-center max-sm:ps-1">
              <Dialog>
                <DialogTrigger>
                  <Button className="cursor-pointer bg-green-600 hover:bg-green-500" size={'sm'}>
                    <Check /> Terima
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-start">Detail Investasi</DialogTitle>
                    <DialogClose />
                  </DialogHeader>
                  <div>
                    <p>Apakah anda yakin menerima tawaran investasi ini?</p>
                    <p className="text-sm mt-2 text-slate-600">Pastikan anda sudah berkomunikasi dengan investor melalui kontak yang tersedia.</p>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant={'secondary'} className="cursor-pointer">
                        Batal
                      </Button>
                    </DialogClose>
                    <Button className="cursor-pointer bg-green-600 hover:bg-green-500">Terima</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger>
                  <Button variant={'destructive'} className="cursor-pointer hover:bg-red-500 w-[5.5rem]" size={'sm'}>
                    <X /> Tolak
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-start">Detail Investasi</DialogTitle>
                    <DialogClose />
                  </DialogHeader>
                  <div>
                    <p>Apakah anda yakin menolak tawaran investasi ini?</p>
                    <p className="text-sm mt-2 text-slate-600">Pastikan anda sudah berkomunikasi dengan investor melalui kontak yang tersedia.</p>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant={'secondary'} className="cursor-pointer">
                        Batal
                      </Button>
                    </DialogClose>
                    <Button className="cursor-pointer bg-red-600 hover:bg-red-500">Tolak</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const investor = [
  {
    id: 1,
    nama: 'Investor 1',
    investasi: '200000',
    foto_profil: '/avatar.jpg',
    email: 'galuhkun@gmail.com',
    nomor_hp: '081999200029',
    note: '    Lorem ipsum dolor sit amet consectetur adipisicing elit. Non alias nam neque laudantium provident! Dolore delectus numquam perspiciatis hic illum asperiores aut assumenda. Praesentium commodi quis labore accusantium. Quae, quisquam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Non alias nam neque laudantium provident! Dolore delectus numquam perspiciatis hic illum asperiores aut assumenda. Praesentium commodi quis labore accusantium. Quae, quisquam.',
  },
  {
    id: 1,
    nama: 'Investor 1',
    investasi: '200000',
    foto_profil: '/avatar.jpg',
    email: 'galuhkun@gmail.com',
    nomor_hp: '081999200029',
    note: '    Lorem ipsum dolor sit amet consectetur adipisicing elit. Non alias nam neque laudantium provident! Dolore delectus numquam perspiciatis hic illum asperiores aut assumenda. Praesentium commodi quis labore accusantium. Quae, quisquam.',
  },
  {
    id: 1,
    nama: 'Investor 1',
    investasi: '200000',
    foto_profil: '/avatar.jpg',
    email: 'galuhkun@gmail.com',
    nomor_hp: '081999200029',
    note: '    Lorem ipsum dolor sit amet consectetur adipisicing elit. Non alias nam neque laudantium provident! Dolore delectus numquam perspiciatis hic illum asperiores aut assumenda. Praesentium commodi quis labore accusantium. Quae, quisquam.',
  },
];
