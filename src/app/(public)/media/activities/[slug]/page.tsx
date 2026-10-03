import Footer from "@/features/landing/components/Footer";
import Navbar from "@/features/landing/components/Navbar";
import TopBar from "@/features/landing/components/TopBar";
import PublicActivityDetailPage from "@/features/media/activity/pages/PublicActivityDetailPage";

export default async function ActivityDetailRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <>
      <TopBar />
      <Navbar />
      <div className="bg-gray-50 pb-6 sm:pb-8 lg:pb-12">
        <PublicActivityDetailPage slug={slug} />
      </div>
      <Footer />
    </>
  );
}
