import { LayoutGridDemo } from "@/components/gridimage";
import { AboutPage } from "@/components/homePage/aboutpage";
import ContactPage2 from "@/components/homePage/contact2";
import HeroSection from "@/components/homePage/herosection";
import ServicesPage from "@/components/homePage/services";
import SmService from "@/components/homePage/smservice";

export default function Home() {

  return (
    <div className="relative flex flex-col justify-center items-center bg-background font-sans">
      {/* Hero Section */}
      <div id="home" className="relative ">
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[60vw] h-[50vh] md:w-[70vw] md:h-[70vh] bg-grad rounded-full blur-3xl opacity-70"></div>
        <HeroSection/>
      </div>
      {/* Who We Are Section */}
      <section id="about" className="py-16 items-center justify-center flex px-6 max-w-7xl ">
        <AboutPage/>
      </section> 


       <section
      className="w-full pb-16 min-w-[100vw]"
    >
     <LayoutGridDemo/>
    </section>
    {/* <section
      className=" flex items-center justify-center w-screen "
    >
     <ContactPage/>
    </section> */}
      {/* Services Section */}
      
<section id="services">
  {/* Show ServicesPage on md screens and larger */}
  <div className="hidden md:block">
    <ServicesPage />
  </div>
  
  {/* Show SmService on screens smaller than md */}
  <div className="block md:hidden">
    <SmService />
  </div>
</section>

    <section
      id="contact"
      className="py-5 "
    >
      <div className="w-screen h-[2px] bg-primary/80 mb-1" />
      <div className="w-screen h-[2px] bg-primary/80" />
     <ContactPage2/>
    </section>

    </div>
  );
}
