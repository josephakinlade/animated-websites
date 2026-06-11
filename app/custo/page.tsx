import { AboutSection } from "./_components/AboutSection";
import { AppSection } from "./_components/AppSection";
import { DiscoverSection } from "./_components/DiscoverSection";
import { Footer } from "./_components/Footer";
import { Header } from "./_components/Header";
import { HeroSection } from "./_components/HeroSection";
import { LifeSection } from "./_components/LifeSection";
import { ProductSection } from "./_components/ProductSection";
import styles from "./custo.module.css";

export default function CustoPage() {
  return (
    <main className={`${styles.custoPage} bg-white text-black`}>
      <Header />
      <HeroSection />
      <DiscoverSection />
      <ProductSection />
      <LifeSection />
      <AppSection />
      <AboutSection />
      <Footer />
    </main>
  );
}
