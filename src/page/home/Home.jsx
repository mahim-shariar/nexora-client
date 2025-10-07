import React from "react";
import NexoraHero from "../../components/home/NexoraHero";
import AboutSection from "../../components/home/AboutSection";
import ShowreelPlayer from "../../components/home/ShowreelPlayer";

const Home = () => {
  return (
    <div className="bg-black min-h-screen">
      <NexoraHero />
      <AboutSection />
      <ShowreelPlayer />
    </div>
  );
};

export default Home;
