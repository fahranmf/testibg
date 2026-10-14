import type { Metadata } from "next";
import Link from "next/link";

import LegalDocumentPage from "@/features/landing/components/LegalDocumentPage";

export const metadata: Metadata = {
  title: "Ketentuan Layanan | UDD PMI Kota Depok",
  description: "Ketentuan penggunaan situs UDD PMI Kota Depok.",
};

export default function TermsOfServicePage() {
  return (
    <LegalDocumentPage
      title="Ketentuan Layanan"
      intro="Ketentuan ini menjelaskan aturan penggunaan situs dan layanan informasi digital UDD PMI Kota Depok. Dengan mengakses situs ini, Anda dianggap telah membaca dan memahami ketentuan berikut."
      sections={[
        {
          title: "Ruang lingkup layanan",
          paragraphs: [
            "Situs ini menyediakan informasi mengenai UDD PMI Kota Depok, termasuk informasi stok darah, jadwal kegiatan donor, berita, aktivitas, galeri, serta sarana komunikasi dengan petugas.",
            "Informasi pada situs ditujukan untuk membantu pengunjung memperoleh informasi dan bukan merupakan konfirmasi ketersediaan layanan secara langsung.",
          ],
        },
        {
          title: "Informasi stok dan jadwal",
          paragraphs: [
            "Stok darah dan jadwal kegiatan dapat berubah mengikuti kondisi operasional. Tampilan stok pada situs merupakan informasi saat terakhir diperbarui dan tidak menjamin golongan darah tertentu selalu tersedia ketika dibutuhkan.",
            "Untuk memastikan ketersediaan darah, jadwal, persyaratan, atau informasi kegiatan, silakan hubungi UDD PMI Kota Depok melalui kontak resmi yang tercantum di situs. Ketentuan pendaftaran kegiatan dapat mengikuti informasi pada masing-masing kegiatan.",
          ],
        },
        {
          title: "Bukan pengganti saran medis",
          paragraphs: [
            "Informasi dalam situs ini bersifat umum dan tidak menggantikan pemeriksaan, diagnosis, atau saran dari tenaga kesehatan. Untuk keputusan terkait kondisi kesehatan dan transfusi darah, konsultasikan dengan tenaga kesehatan yang menangani Anda.",
          ],
        },
        {
          title: "Penggunaan yang diperbolehkan",
          paragraphs: [
            "Pengunjung wajib menggunakan situs secara wajar dan tidak melakukan tindakan yang mengganggu, merusak, atau berupaya memperoleh akses tanpa izin ke situs maupun sistem yang mendukungnya.",
          ],
          bullets: [
            "Tidak mengirimkan pesan yang melanggar hukum, mengandung ancaman, penipuan, spam, atau menyalahgunakan formulir dan fitur chat.",
            "Tidak menyamar sebagai orang atau pihak lain, atau mengirimkan informasi yang diketahui tidak benar.",
            "Tidak mencoba mengakses data atau akun yang bukan milik Anda.",
          ],
        },
        {
          title: "Pengajuan akun untuk rumah sakit",
          paragraphs: [
            <>
              Perwakilan rumah sakit dapat mengajukan akses akun layanan melalui{" "}
              <Link
                href="/#kontak"
                className="font-semibold text-brand-700 underline underline-offset-2"
              >
                formulir kontak
              </Link>
              . Sampaikan nama rumah sakit, identitas dan peran Anda, serta
              informasi yang diperlukan untuk dihubungi. Saat ini pengajuan
              disampaikan melalui kolom pesan pada formulir tersebut.
            </>,
            "Pengajuan tidak langsung membuat akun. Petugas PMI akan meninjau dan memverifikasi identitas serta keterkaitan pemohon dengan rumah sakit. Akun hanya dapat diberikan setelah pengajuan dinilai valid dan disetujui oleh PMI. PMI dapat meminta informasi tambahan atau menolak pengajuan yang tidak dapat diverifikasi.",
            "Pemohon bertanggung jawab memastikan informasi yang disampaikan benar dan hanya mengajukan akses atas nama instansi yang berhak diwakilinya. Akun yang diberikan harus digunakan oleh pemegang akun yang berwenang dan tidak boleh dibagikan kepada pihak lain.",
          ],
        },
        {
          title: "Tautan dan layanan pihak lain",
          paragraphs: [
            "Situs dapat memuat tautan menuju layanan atau situs pihak lain, misalnya tautan pendaftaran kegiatan dan media sosial. Layanan tersebut memiliki ketentuan dan kebijakan privasi masing-masing; UDD PMI Kota Depok tidak mengendalikan isi maupun praktik pada situs eksternal tersebut.",
          ],
        },
        {
          title: "Perubahan layanan dan ketentuan",
          paragraphs: [
            "Fitur, isi, dan informasi situs dapat diperbarui dari waktu ke waktu untuk menyesuaikan kebutuhan layanan. Ketentuan ini juga dapat diperbarui; versi terbaru akan ditampilkan pada halaman ini.",
          ],
        },
      ]}
    />
  );
}
