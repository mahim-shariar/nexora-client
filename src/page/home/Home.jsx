import React from "react";
import NexoraHero from "../../components/home/NexoraHero";
import AboutSection from "../../components/home/AboutSection";
import ShowreelPlayer from "../../components/home/ShowreelPlayer";
import WhyChooseUsSection from "../../components/home/WhyChooseUsSection";
import NextGenServicesSection from "../../components/home/NextGenServicesSection";
import CosmicClientReviews from "../../components/home/CosmicClientReviews";
import CosmicContactSection from "../../components/home/CosmicContactSection";
import CosmicFooter from "../../components/home/CosmicFooter";
import CosmicNavbar from "../../components/home/CosmicNavbar";

const Home = () => {
  return (
    <div className="bg-black min-h-screen">
      <CosmicNavbar />
      <NexoraHero />
      <AboutSection />
      <ShowreelPlayer />
      <WhyChooseUsSection />
      <NextGenServicesSection />
      <CosmicClientReviews />
      <CosmicContactSection />
      <CosmicFooter />
    </div>
  );
};

export default Home;
