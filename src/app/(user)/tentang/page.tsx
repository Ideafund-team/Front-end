import React from 'react';

export default function TentangKamiPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-5">
      <div className="mt-10 w-full text-center">
        <h1 className="text-3xl font-semibold text-blue-600">Tentang Kami</h1>
        <p className="text-slate-400 text-sm mt-2">Selamat datang di <span className="font-semibold">Ideafund</span></p>
      </div>
      <section className="mt-8 space-y-4 pb-10">
        <p className="text-sm text-slate-600 text-justify">Selamat datang di <span className="font-semibold">Ideafund</span>, platform yang menghubungkan inovator dan investor dalam satu ekosistem kolaboratif. Kami hadir untuk menciptakan peluang baru bagi pengembangan bisnis dan mendorong pertumbuhan ekonomi yang berkelanjutan. Dengan <span className="font-semibold">Ideafund</span>, setiap ide memiliki kesempatan untuk berkembang dan mendapatkan dukungan yang tepat.</p>
        <h2 className="text-xl font-semibold"><span className="font-semibold">Misi Kami</span></h2>
        <p className="text-sm text-slate-600 text-justify">Kami berkomitmen untuk:</p>
        <ul className="list-disc list-inside text-sm text-slate-600">
          <li>Memfasilitasi kolaborasi yang produktif dan inovatif.</li>
          <li>Menyediakan platform yang aman dan mudah diakses bagi semua pengguna, khususnya pelaku UMKM.</li>
          <li>Mendukung pertumbuhan dan pengembangan ide-ide kreatif serta bisnis lokal.</li>
          <li>Memberikan akses ke sumber daya dan pendanaan bagi UMKM agar dapat berkembang lebih luas.</li>
        </ul>
        <h2 className="text-xl font-semibold"><span className="font-semibold">Visi Kami</span></h2>
        <p className="text-sm text-slate-600 text-justify">Menjadi ekosistem global yang mendorong inovasi, koneksi yang berarti, serta pertumbuhan UMKM yang berkelanjutan.</p>
        <h2 className="text-xl font-semibold"><span className="font-semibold">Mengapa Memilih Kami?</span></h2>
        <ul className="list-disc list-inside text-sm text-slate-600">
          <li><span className="font-semibold">Dukungan untuk UMKM:</span> Kami berfokus pada pemberdayaan UMKM dengan akses ke modal, jaringan, dan pelatihan bisnis.</li>
          <li><span className="font-semibold">Akses Mudah:</span> Platform yang dirancang agar dapat digunakan oleh siapa saja, kapan saja.</li>
          <li><span className="font-semibold">Keamanan & Kepercayaan:</span> Kami berkomitmen untuk menjaga privasi dan keamanan data pengguna.</li>
          <li><span className="font-semibold">Jaringan Luas:</span> Bergabung dengan komunitas yang dinamis dan beragam, siap untuk berbagi dan berkembang bersama.</li>
        </ul>
        <h2 className="text-xl font-semibold">Hubungi Kami</h2>
        <p className="text-sm text-slate-600 text-justify">Kami selalu terbuka untuk pertanyaan, masukan, dan peluang kolaborasi. Jangan ragu untuk menghubungi kami melalui email atau media sosial yang tersedia di platform ini.</p>
        <p className="text-sm text-slate-600 text-justify">Mari bersama membangun masa depan yang lebih cerah melalui inovasi, kolaborasi, dan pertumbuhan UMKM yang berkelanjutan!</p>
      </section>
    </div>
  );
}
