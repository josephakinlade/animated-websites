import { AboutSection } from "./components/AboutSection";
import { AppSection } from "./components/AppSection";
import { DiscoverSection } from "./components/DiscoverSection";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { LifeSection } from "./components/LifeSection";
import { ProductSection } from "./components/ProductSection";
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
