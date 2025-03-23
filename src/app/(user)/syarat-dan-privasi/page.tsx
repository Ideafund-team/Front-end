import React from 'react';

export default function TermsAndPrivacyPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-5">
      {/* Syarat dan Ketentuan */}
      <div className="pt-10 w-full text-center scroll-mt-20" id="syarat-dan-ketentuan">
        <h1 className="text-3xl font-semibold text-blue-600">Syarat dan Ketentuan</h1>
        <p className="text-slate-400 text-sm mt-2">Diperbarui pada 2025</p>
      </div>
      <section className="mt-8 space-y-4 pb-10">
        <h2 className="text-xl font-semibold">Pendahuluan</h2>
        <p className="text-sm text-slate-600 text-justify">
          Saat mengakses dan menggunakan layanan kami, Anda setuju untuk terikat dengan syarat dan ketentuan berikut ini. Jika Anda tidak setuju dengan salah satu bagian dari syarat dan ketentuan ini, harap untuk tidak menggunakan layanan
          kami.
        </p>

        <h2 className="text-xl font-semibold">1. Perubahan Syarat dan Ketentuan</h2>
        <p className="text-sm text-slate-600 text-justify">
          Kami berhak untuk mengubah, menambah, atau menghapus bagian dari syarat dan ketentuan ini kapan saja tanpa pemberitahuan sebelumnya. Anda disarankan untuk secara berkala meninjau halaman ini untuk mengetahui perubahan yang
          terjadi.
        </p>

        <h2 className="text-xl font-semibold">2. Penggunaan Layanan</h2>
        <p className="text-sm text-slate-600 text-justify">Platform ini bertujuan untuk mempertemukan pemilik ide dan pencari modal guna menciptakan peluang bisnis yang inovatif.</p>
        <ul className="list-disc list-inside text-sm text-slate-600">
          <li>Anda setuju untuk menggunakan layanan kami hanya untuk tujuan yang sah dan sesuai dengan hukum yang berlaku.</li>
          <li>Pengguna dilarang menggunakan layanan ini untuk aktivitas yang melanggar hukum, menipu, atau merugikan pihak lain.</li>
        </ul>

        <h2 className="text-xl font-semibold">3. Akun dan Keamanan</h2>
        <p className="text-sm text-slate-600 text-justify">Pengguna harus mendaftarkan akun dengan informasi data diri yang valid dan akurat.</p>
        <ul className="list-disc list-inside text-sm text-slate-600">
          <li>Anda bertanggung jawab atas keamanan akun dan kata sandi Anda sendiri.</li>
          <li>Kami tidak bertanggung jawab atas kehilangan atau kerusakan yang timbul akibat kelalaian Anda dalam menjaga keamanan akun Anda.</li>
        </ul>

        <h2 className="text-xl font-semibold">4. Hak Kekayaan Intelektual</h2>
        <p className="text-sm text-slate-600 text-justify">Semua ide yang diunggah oleh pengguna tetap menjadi hak milik pengguna.</p>
        <ul className="list-disc list-inside text-sm text-slate-600">
          <li>Kami tidak bertanggung jawab atas klaim pelanggaran hak cipta atau hak kekayaan intelektual yang timbul dari konten yang diunggah oleh pengguna.</li>
          <li>Pengguna wajib memastikan bahwa ide yang dibagikan bukan hasil plagiarisme atau pelanggaran hak pihak ketiga.</li>
        </ul>

        <h2 className="text-xl font-semibold">5. Batasan Tanggung Jawab</h2>
        <p className="text-sm text-slate-600 text-justify">Kami hanya menyediakan platform untuk mempertemukan pemilik ide dan pencari modal, tanpa memberikan jaminan terhadap keberhasilan kerja sama.</p>
        <ul className="list-disc list-inside text-sm text-slate-600">
          <li>Kami tidak bertanggung jawab atas perjanjian, transaksi, atau sengketa yang terjadi antara pengguna.</li>
          <li>Pengguna bertanggung jawab penuh atas setiap kesepakatan yang dibuat melalui platform ini.</li>
        </ul>

        <h2 className="text-xl font-semibold">6. Penyelesaian Sengketa</h2>
        <p className="text-sm text-slate-600 text-justify">Jika terjadi sengketa antara pengguna, diharapkan untuk menyelesaikan secara musyawarah.</p>
        <ul className="list-disc list-inside text-sm text-slate-600">
          <li>Jika tidak ditemukan penyelesaian, maka sengketa dapat diselesaikan melalui jalur hukum sesuai dengan peraturan yang berlaku di Indonesia.</li>
        </ul>

        <h2 className="text-xl font-semibold">7. Hukum yang Berlaku</h2>
        <p className="text-sm text-slate-600 text-justify">Syarat dan ketentuan ini diatur dan ditafsirkan sesuai dengan hukum yang berlaku di Indonesia.</p>

        <h2 className="text-xl font-semibold">8. Kontak</h2>
        <p className="text-sm text-slate-600 text-justify">
          Jika Anda memiliki pertanyaan atau memerlukan informasi lebih lanjut mengenai syarat dan ketentuan ini, silakan hubungi kami melalui email atau kontak yang tersedia di website kami.
        </p>
        <p className="text-sm text-slate-600 text-justify">Dengan menggunakan layanan kami, Anda dianggap telah membaca, memahami, dan menyetujui syarat dan ketentuan ini.</p>
      </section>

      {/* Kebijakan Privasi */}
      <div className="pt-10 w-full text-center scroll-mt-20" id="kebijakan-privasi">
        <h1 className="text-3xl font-semibold text-blue-600">Kebijakan Privasi</h1>
        <p className="text-slate-400 text-sm mt-2">Privasi Anda adalah prioritas kami.</p>
      </div>
      <section className="mt-8 space-y-4 pb-10">
        <h2 className="text-xl font-semibold">Pendahuluan</h2>
        <p className="text-sm text-slate-600 text-justify">
          Kami menghargai privasi Anda dan berkomitmen untuk melindungi informasi pribadi yang Anda berikan kepada kami. Kebijakan privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi data Anda saat menggunakan
          layanan kami.
        </p>

        <h2 className="text-xl font-semibold">1. Informasi yang Kami Kumpulkan</h2>
        <p className="text-sm text-slate-600 text-justify">Kami dapat mengumpulkan informasi berikut:</p>
        <ul className="list-disc list-inside text-sm text-slate-600">
          <li>Informasi pribadi: Nama, alamat email, nomor telepon, dan data lain yang diberikan saat pendaftaran.</li>
          <li>Informasi aktivitas: Data penggunaan platform, seperti interaksi, pencarian, dan preferensi.</li>
          <li>Informasi teknis: Alamat IP, jenis perangkat, dan data log lainnya.</li>
        </ul>

        <h2 className="text-xl font-semibold">2. Penggunaan Informasi</h2>
        <p className="text-sm text-slate-600 text-justify">Kami menggunakan informasi yang dikumpulkan untuk:</p>
        <ul className="list-disc list-inside text-sm text-slate-600">
          <li>Memfasilitasi komunikasi antara pemilik ide dan pencari modal.</li>
          <li>Meningkatkan layanan dan pengalaman pengguna.</li>
          <li>Mengelola keamanan dan mencegah penyalahgunaan platform.</li>
          <li>Mengirimkan pembaruan, promosi, atau informasi penting terkait layanan kami.</li>
        </ul>

        <h2 className="text-xl font-semibold">3. Penyimpanan dan Keamanan Data</h2>
        <p className="text-sm text-slate-600 text-justify">Kami menjaga keamanan informasi Anda dengan langkah-langkah perlindungan teknis dan organisasi. Namun, kami tidak dapat menjamin keamanan data sepenuhnya dari akses tidak sah.</p>

        <h2 className="text-xl font-semibold">4. Berbagi Informasi dengan Pihak Ketiga</h2>
        <p className="text-sm text-slate-600 text-justify">Kami tidak akan membagikan informasi pribadi Anda kepada pihak ketiga tanpa persetujuan, kecuali jika diperlukan untuk:</p>
        <ul className="list-disc list-inside text-sm text-slate-600">
          <li>Kepatuhan terhadap hukum atau regulasi yang berlaku.</li>
          <li>Menegakkan kebijakan layanan kami.</li>
          <li>Melindungi hak, keamanan, dan kepentingan pengguna atau pihak lain.</li>
        </ul>

        <h2 className="text-xl font-semibold">5. Hak Pengguna</h2>
        <p className="text-sm text-slate-600 text-justify">Anda memiliki hak untuk:</p>
        <ul className="list-disc list-inside text-sm text-slate-600">
          <li>Mengakses, memperbarui, atau menghapus informasi pribadi Anda.</li>
          <li>Menolak penggunaan data Anda untuk tujuan pemasaran.</li>
          <li>Meminta salinan data pribadi yang kami simpan.</li>
        </ul>

        <h2 className="text-xl font-semibold">6. Kontak</h2>
        <p className="text-sm text-slate-600 text-justify">Jika Anda memiliki pertanyaan atau ingin mengajukan permintaan terkait data pribadi Anda, silakan hubungi kami melalui email atau kontak yang tersedia di website kami.</p>
        <p className="text-sm text-slate-600 text-justify">Dengan menggunakan layanan kami, Anda dianggap telah membaca, memahami, dan menyetujui kebijakan privasi ini.</p>
      </section>
    </div>
  );
}
