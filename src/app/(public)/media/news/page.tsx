import Footer from "@/features/landing/components/Footer";
import Navbar from "@/features/landing/components/Navbar";
import TopBar from "@/features/landing/components/TopBar";
import PublicNewsListPage from "@/features/media/news/pages/PublicNewsListPage";

export default function NewsPage() {
  return (
    <>
      <TopBar />
      <Navbar />
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <PublicNewsListPage />
      </div>
      <Footer />
    </>
  );
}
