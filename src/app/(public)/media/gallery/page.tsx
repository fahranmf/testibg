import Footer from "@/features/landing/components/Footer";
import Navbar from "@/features/landing/components/Navbar";
import TopBar from "@/features/landing/components/TopBar";
import PublicGalleryListPage from "@/features/media/gallery/pages/PublicGalleryListPage";

export default function GalleryPage() {
  return (
    <>
      <TopBar />
      <Navbar />
      <div className="bg-white py-6 sm:py-8 lg:py-12"><PublicGalleryListPage /></div>
      <Footer />
    </>
  );
}
