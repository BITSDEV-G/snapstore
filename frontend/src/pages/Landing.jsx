import { Element } from 'react-scroll';
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Benefits from "../components/Benefits";
import FeaturedPhotographers from "../components/FeaturedPhotographers";
import EventTypes from "../components/EventTypes";
import CTASection from "../components/CTASection";
import AboutUs from "../components/AboutUs";
import Blog from "../components/Blog";
import Team from "../components/Team";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import ContactUs from "../components/ContactUs";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";

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
      <Element name="how-it-works" id="how-it-works">
        <HowItWorks />
      </Element>
      <Element name="benefits" id="benefits">
        <Benefits />
      </Element>
      <Element name="featured-photographers" id="featured-photographers">
        <FeaturedPhotographers />
      </Element>
      <Element name="event-types" id="event-types">
        <EventTypes />
      </Element>
      <CTASection
        title="Ready to Find Your Perfect Photographer?"
        subtitle="Join SnapStore today and connect with talented photographers for your next event."
        buttonText="Get Started"
        buttonLink="/role-selection"
      />
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
      <Element name="faq" id="faq">
        <FAQ />
      </Element>
      <CTASection
        title="Become a SnapStore Photographer"
        subtitle="Showcase your talent and grow your photography business with SnapStore."
        buttonText="Join as Photographer"
        buttonLink="/role-selection"
      />
      <Element name="contact-us" id="contact-us">
        <ContactUs />
      </Element>
      <Footer />
      <Chatbot websiteUrl="https://yourwebsite.com" />
    </div>
  );
}
