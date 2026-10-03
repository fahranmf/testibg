import TopBar from "./components/TopBar";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import QuoteSection from "./components/QuoteSection";
import BloodStock from "./components/BloodStock";
import Aktivitas from "./components/Activities";
import DonorGuide from "./components/DonorGuide";
import MediaCenter from "./components/MediaCenter";
import DonorSchedule from "./components/DonorSchedule";
import MapsSection from "./components/MapsSection";
import CtaBanner from "./components/CtaBanner";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Navbar />
      <main>
        <Hero />
        <QuoteSection />
        <BloodStock />
        <DonorSchedule />
        <DonorGuide />
        <MediaCenter />
        <CtaBanner />
        <ContactForm />
        <MapsSection />
      </main>
      <Footer />
    </div>
  );
}
