import Footer from "@/features/landing/components/Footer";
import Navbar from "@/features/landing/components/Navbar";
import TopBar from "@/features/landing/components/TopBar";
import PublicGalleryDetailPage from "@/features/media/gallery/pages/PublicGalleryDetailPage";

export default async function GalleryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <>
      <TopBar />
      <Navbar />
      <div>
        <PublicGalleryDetailPage slug={slug} />
      </div>
      <Footer />
    </>
  );
}
