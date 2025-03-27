/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { fetcher } from '@/lib/fetcher';
import { Check, LoaderCircle, X } from 'lucide-react';
import Image from 'next/image';
import useSWR from 'swr';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import { PhotoProvider, PhotoView } from 'react-photo-view';

interface Investor {
  id_investor: string;
  nama_investor: string;
  investasi: number;
  note?: string;
  id_ide: number;
  status: string;
  id: number;
  message: string;
}

interface InvestorDetails {
  nama: string;
  email: string;
  no_hp: string;
  foto_profil: string;
}

export default function ClientPage({ id }: { id: string }) {
  const { data: investors = [] } = useSWR<Investor[]>(process.env.NEXT_PUBLIC_API_BASE_URL + `/getinvestoride/allinvestoride/${id}`, fetcher);
  const [isLoading, setIsLoading] = useState(false);

  console.log(investors);
  const [selectedInvestor, setSelectedInvestor] = useState<InvestorDetails | null>(null);

  const fetchInvestorDetails = async (id_investor: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/${id_investor}`);
    const data = await response.json();
    setSelectedInvestor(data);
  };

  console.log(selectedInvestor);

  const token = Cookies.get('token');

  const handleTerima = async (idIde: number) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/updatestatus/updatestatusinvestor/${idIde}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: 'diterima' }),
      });
      const data = await response.json();
      console.log('Response:', data);
      toast.success('Tawaran investasi diterima.');
      if (!isLoading) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      toast.error('Terjadi kesalahan saat menerima tawaran investasi.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTolak = async (id: number) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/updatestatus/updatestatusinvestor/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: 'ditolak' }),
      });
      const data = await response.json();
      console.log('Response:', data);
      toast.success('Tawaran investasi ditolak.');
      if (!isLoading) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      toast.error('Terjadi kesalahan saat menolak tawaran investasi.');
    } finally {
      setIsLoading(false);
    }
  };

  const [investorPhotos, setInvestorPhotos] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchPhotos = async () => {
      const photos: { [key: string]: string } = {};
      await Promise.all(
        investors.map(async (investor) => {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/${investor.id_investor}`);
          const data = await res.json();
          photos[investor.id_investor] = data.foto_profil || '/default-avatar.jpg';
        })
      );
      setInvestorPhotos(photos);
    };

    if (investors.length) fetchPhotos();
  }, [investors]);

  return (
    <div>
      <div className="">
        <h1 className="text-2xl font-semibold">Daftar Investor</h1>
        <p className="text-slate-600 text-sm">Data investor yang anda dapatkan</p>
      </div>
      <div className="flex flex-col gap-3 max-w-3xl mt-8">
        {Array.isArray(investors) &&
          investors.map((invest: Investor, index: number) => (
            <div key={index} className="bg-white border rounded-md p-2 flex justify-between max-sm:flex-col gap-4 sm:items-center">
              <div className="flex sm:items-center gap-4 max-sm:flex-col w-full">
                <div>
                  <PhotoProvider>
                    <PhotoView src={investorPhotos[invest.id_investor]}>
                      <Image src={investorPhotos[invest.id_investor] || '/default-avatar.jpg'} width={134} height={100} alt={invest.nama_investor} className="rounded-md aspect-video max-sm:w-full sm:h-24 object-cover  cursor-pointer hover:brightness-75 transition-all duration-200" unoptimized />
                    </PhotoView>
                  </PhotoProvider>
                </div>
                <div className="max-sm:ps-1">
                  <p className="font-medium">{invest.nama_investor}</p>
                  <p className="mt-1">
                    Jumlah Tawaran Investasi <span className="text-green-600 bg-green-600/10 rounded-md px-2 py-1 text-sm">Rp.{invest.investasi}</span>
                  </p>
                  <div className="">
                    <Dialog>
                      <DialogTrigger onClick={() => fetchInvestorDetails(invest.id_investor)}>
                        <button className="text-blue-600 text-sm cursor-pointer hover:underline">Lihat Detail</button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="text-start">Detail Investasi</DialogTitle>
                          <DialogClose />
                        </DialogHeader>
                        <div className="text-left">
                          {selectedInvestor && (
                            <table className="table-auto w-full">
                              <tbody>
                                <tr>
                                  <td className="pb-2">Nama</td>
                                  <td className="px-2">:</td>
                                  <td className="font-medium">{selectedInvestor.nama}</td>
                                </tr>
                                <tr>
                                  <td className="py-2">Jumlah</td>
                                  <td className="px-2">:</td>
                                  <td className="font-medium">Rp. {invest.investasi}</td>
                                </tr>
                                <tr>
                                  <td className="py-2">Email</td>
                                  <td className="px-2">:</td>
                                  <td className="font-medium">{selectedInvestor.email}</td>
                                </tr>
                                <tr>
                                  <td className="py-2">No HP</td>
                                  <td className="px-2">:</td>
                                  <td className="font-medium">{selectedInvestor.no_hp}</td>
                                </tr>
                              </tbody>
                            </table>
                          )}
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
              {invest.status === 'pending' ? (
                <div className="flex flex-col gap-2 max-sm:flex-row items-center max-sm:ps-1">
                  <Dialog>
                    <DialogTrigger>
                      <Button className="cursor-pointer bg-green-600 hover:bg-green-500" size={'sm'}>
                        <Check /> Terima
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="text-start">Konfirmasi</DialogTitle>
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
                        <Button onClick={() => handleTerima(invest.id)} className="cursor-pointer min-w-20 bg-green-500 hover:bg-green-400" disabled={isLoading}>
                          {isLoading ? <LoaderCircle className="animate-spin" size={18} /> : 'Terima'}
                        </Button>
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
                        <DialogTitle className="text-start">Konfirmasi</DialogTitle>
                        <DialogClose />
                      </DialogHeader>
                      <div className="text-left">
                        <p>Apakah anda yakin menolak tawaran investasi ini?</p>
                        <p className="text-sm mt-2 text-slate-600">Pastikan anda sudah berkomunikasi dengan investor melalui kontak yang tersedia.</p>
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant={'secondary'} className="cursor-pointer">
                            Batal
                          </Button>
                        </DialogClose>
                        <Button onClick={() => handleTolak(invest.id)} className="cursor-pointer min-w-20 bg-red-600 hover:bg-red-500" disabled={isLoading}>
                          {isLoading ? <LoaderCircle className="animate-spin" size={18} /> : 'Tolak'}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              ) : (
                <p className={`${invest.status === 'diterima' ? 'text-green-600 bg-green-600/10' : 'text-red-500 bg-red-500/10'} text-sm px-2 py-1 rounded-full h-max mr-4 capitalize w-max max-sm:mb-1`}>{invest.status}</p>
              )}
            </div>
          ))}

        {investors.length === 0 || (investors as any).message ? <p className="text-center text-slate-400 w-full">Belum ada investor pada ide ini</p> : null}
      </div>
    </div>
  );
}
