import {
  Background,
  Navbar,
  Hero,
  Terminal,
  Features,
  HowItWorks,
  Pricing,
  TechStack,
  CTA,
  Footer,
} from "@/components";

export default function Home() {
  return (
    <main>
      <Background />
      <Navbar />
      <Hero />
      <Terminal />
      <Features />
      <HowItWorks />
      <Pricing />
      <TechStack />
      <CTA />
      <Footer />
    </main>
  );
}
