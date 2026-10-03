import Footer from "@/features/landing/components/Footer";
import Navbar from "@/features/landing/components/Navbar";
import TopBar from "@/features/landing/components/TopBar";
import PublicNewsDetailPage from "@/features/media/news/pages/PublicNewsDetailPage";

export default async function NewsDetailRoute({
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
        <PublicNewsDetailPage slug={slug} />
      </div>
      <Footer />
    </>
  );
}
