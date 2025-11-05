import Hero from "./components/Hero";
import About from "./components/About";
import Research from "./components/Research";

import SmoothScroll from "./components/SmoothScroll";
import Footer from "./components/footer";

export default function HomePage() {
  return (
    <SmoothScroll>
      <Hero />
      <About />
      <Research/>
      <Footer/>
    </SmoothScroll>
  );
}
