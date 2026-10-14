import type { Metadata } from "next";
import Link from "next/link";

import LegalDocumentPage from "@/features/landing/components/LegalDocumentPage";

export const metadata: Metadata = {
  title: "Kebijakan Privasi | UDD PMI Kota Depok",
  description: "Kebijakan privasi situs UDD PMI Kota Depok.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalDocumentPage
      title="Kebijakan Privasi"
      intro="Kebijakan ini menjelaskan data yang Anda kirim melalui fitur situs UDD PMI Kota Depok dan bagaimana data tersebut digunakan untuk menyediakan layanan komunikasi."
      sections={[
        {
          title: "Data yang Anda berikan",
          paragraphs: [
            "Saat menggunakan formulir kontak, Anda diminta memberikan nama, alamat email, subjek, dan isi pesan. Nomor telepon bersifat opsional. Isi pesan dapat memuat informasi lain yang Anda pilih untuk disampaikan.",
            "Jika mengajukan akun atas nama rumah sakit, Anda dapat menyertakan nama instansi, peran atau jabatan, dan informasi yang diperlukan untuk memverifikasi keterkaitan Anda dengan instansi tersebut. Formulir saat ini menggunakan kolom pesan bebas untuk pengajuan ini; mohon hanya mengirimkan informasi yang relevan dan tidak menyertakan dokumen identitas atau data sensitif kecuali diminta melalui saluran resmi.",
            "Jika menggunakan fitur chat, isi percakapan dan informasi akun yang diperlukan untuk mengenali percakapan akan diproses agar pesan dapat diterima dan ditanggapi oleh petugas.",
          ],
        },
        {
          title: "Tujuan penggunaan data",
          paragraphs: [
            "Data digunakan untuk menerima dan menanggapi pertanyaan atau masukan, mengelola percakapan pada fitur chat, serta menjalankan dan menjaga fungsi layanan komunikasi pada situs.",
            "Untuk pengajuan akun rumah sakit, informasi yang disampaikan juga digunakan oleh petugas untuk meninjau pengajuan dan memverifikasi identitas serta keterkaitan pemohon dengan rumah sakit. Pengajuan ditinjau oleh petugas dan tidak menghasilkan akun secara otomatis. Jika pengajuan disetujui, informasi kontak yang diberikan dapat digunakan untuk menyampaikan tindak lanjut mengenai akses akun.",
          ],
        },
        {
          title: "Akses dan pengungkapan",
          paragraphs: [
            "Pesan dan informasi yang Anda kirim tersedia bagi petugas yang berwenang untuk menangani komunikasi tersebut. Data tidak ditampilkan sebagai konten publik pada situs.",
            "Informasi dapat diungkapkan apabila diwajibkan oleh peraturan yang berlaku atau diperlukan untuk menindaklanjuti permintaan resmi yang sah.",
          ],
        },
        {
          title: "Penyimpanan dan keamanan",
          paragraphs: [
            "Data disimpan dalam sistem yang digunakan untuk menjalankan layanan. Lama penyimpanan dapat bergantung pada kebutuhan penanganan pesan, operasional, dan kewajiban yang berlaku. Jangan mengirimkan kata sandi, data pembayaran, atau informasi kesehatan sensitif melalui formulir kontak atau chat kecuali memang diperlukan dan diminta melalui saluran resmi.",
          ],
        },
        {
          title: "Tautan eksternal",
          paragraphs: [
            "Situs ini dapat menautkan Anda ke situs pihak lain. Setelah meninggalkan situs UDD PMI Kota Depok, penggunaan data Anda mengikuti kebijakan privasi penyedia situs tersebut.",
          ],
        },
        {
          title: "Permintaan terkait data dan perubahan kebijakan",
          paragraphs: [
            <>
              Untuk menanyakan, memperbarui, atau mengajukan permintaan terkait
              informasi yang pernah Anda kirim, hubungi UDD PMI Kota Depok
              melalui{" "}
              <Link
                href="/#kontak"
                className="font-semibold text-brand-700 underline underline-offset-2"
              >
                formulir kontak
              </Link>{" "}
              atau email{" "}
              <span
                className="font-semibold text-brand-700 underline underline-offset-2"
              >
                info@pmikotadepok.or.id
              </span>
              . Sertakan konteks pesan atau pengajuan akun rumah sakit agar
              petugas dapat meninjau permintaan. Kami mungkin perlu memastikan
              identitas dan kewenangan pemohon sebelum menindaklanjutinya.
            </>,
            "Kebijakan ini dapat diperbarui seiring perubahan layanan. Perubahan terbaru akan dicantumkan pada halaman ini beserta tanggal pembaruannya.",
          ],
        },
      ]}
    />
  );
}
