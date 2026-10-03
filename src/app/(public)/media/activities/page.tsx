import Footer from "@/features/landing/components/Footer";
import Navbar from "@/features/landing/components/Navbar";
import TopBar from "@/features/landing/components/TopBar";
import PublicActivityListPage from "@/features/media/activity/pages/PublicActivityListPage";

export default function ActivitiesPage() {
  return (
    <>
      <TopBar />
      <Navbar />
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <PublicActivityListPage />
      </div>
      <Footer />
    </>
  );
}
