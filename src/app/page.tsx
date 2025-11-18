import Hero from "./components/Hero";
import ClientSlider from "./components/ClientSlider";
import About from "./components/About";
import Research from "./components/Research";

import SmoothScroll from "./components/SmoothScroll";
import Footer from "./components/footer";

export default function HomePage() {
  return (
    <SmoothScroll>
      <Hero />
      <ClientSlider />
      <About />
      <Research/>
      <Footer/>
    </SmoothScroll>
  );
}
