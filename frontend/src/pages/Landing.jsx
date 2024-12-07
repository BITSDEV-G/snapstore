import { Element } from 'react-scroll';
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import AboutUs from "../components/AboutUs";
import Blog from "../components/Blog";
import Team from "../components/Team";
import Testimonials from "../components/Testimonials";
import ContactUs from "../components/ContactUs";
import Footer from "../components/Footer";

export default function Landing() {
  return (
    <div>
      <Navbar />
      <Element name="hero" id="hero">
        <Hero />
      </Element>
      <Element name="features" id="features">
        <Features />
      </Element>
      <Element name="about-us" id="about-us">
        <AboutUs />
      </Element>
      <Element name="blog" id="blog">
        <Blog />
      </Element>
      <Element name="team" id="team">
        <Team />
      </Element>
      <Element name="testimonials" id="testimonials">
        <Testimonials />
      </Element>
      <Element name="contact-us" id="contact-us">
        <ContactUs />
      </Element>
      <Footer />
    </div>
  );
}
