import Hero from "../components/hero/Hero";
import About from "../components/about/About";
import Capabilities from "../components/capabilities/Capabilities";
import LiveBuilds from "../components/liveBuilds/LiveBuilds";
import FeaturedProducts from "../components/featuredProducts/FeaturedProducts";
import Lab from "../components/lab/Lab";
import EngineeringStack from "../components/stack/EngineeringStack";
import Process from "../components/process/Process";
import Contact from "../components/contact/Contact";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

function HomePage() {
  useDocumentTitle(
    "Alpha Yohanna — Software Engineer, Product Builder, Creative Technologist",
  );

  return (
    <>
      <Hero />

      <div className="mx-auto max-w-6xl px-5">
      <About />
      <Capabilities />
      <LiveBuilds />
      <FeaturedProducts />
      <Lab />
      <EngineeringStack />
      <Process />
      <Contact />

      </div>
    </>
  );
}

export default HomePage;
