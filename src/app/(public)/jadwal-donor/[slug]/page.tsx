import Footer from "@/features/landing/components/Footer";
import Navbar from "@/features/landing/components/Navbar";
import TopBar from "@/features/landing/components/TopBar";
import PublicDonorEventDetailPage from "@/features/donor-event/pages/PublicDonorEventDetailPage";

export default async function DonorEventDetailRoute({
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
        <PublicDonorEventDetailPage slug={slug} />
      </div>
      <Footer />
    </>
  );
}
