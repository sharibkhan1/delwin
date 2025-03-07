import { LayoutGridDemo } from "@/components/gridimage";
import { AboutPage } from "@/components/homePage/aboutpage";
import ContactPage from "@/components/homePage/contact";
import HeroSection from "@/components/homePage/herosection";
import ProfilePage from "@/components/homePage/profilePage";
import ServicesPage from "@/components/homePage/services";


export default function Home() {

  return (
    <div className="relative flex flex-col justify-center items-center bg-[#f9f8f4] text-[#3a3a3a] font-sans">
      {/* Hero Section */}
      <div id="home" className="relative ">
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[60vw] h-[50vh] md:w-[70vw] md:h-[70vh] bg-gradient-to-t from-[#3d2e25] via-[#7a5e47] to-[#f7f4f1] rounded-full blur-3xl opacity-70"></div>
        <HeroSection/>
      </div>
      {/* Who We Are Section */}
      <section id="about" className="py-16 items-center justify-center flex px-6 max-w-7xl ">
        <AboutPage/>
      </section> 


       <section
      className="w-full min-w-[100vw]"
    >
     <LayoutGridDemo/>
    </section>


    
      <section       id="services"
 className="w-full relative  py-16 px-6 bg-brown-ivory1">
      <ProfilePage/>
</section>

      {/* Services Section */}
      {/* <section id="services" className="bg-[#f3f1ed] py-16 px-6 rounded-t-[2rem]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-[#5c4b36] mb-6">How We Simplify Your Furnishing Experience</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-medium text-[#5c4b36] mb-2">End-to-End Solutions</h3>
              <p>From consultation to installation, we've got you covered.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-medium text-[#5c4b36] mb-2">After-Sales Support</h3>
              <p>We ensure lasting satisfaction with dedicated maintenance services.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-medium text-[#5c4b36] mb-2">No Variety Restrictions</h3>
              <p>Choose from a wide range of styles, sizes, and finishes.</p>
            </div>
          </div>
        </div>
      </section>  */}

      {/* Services Section */}
      
      <section
    >
     <ServicesPage/>
    </section>

    <section
      id="contact"
      className="py-5 "
    >
      <div className="w-screen h-[2px] bg-yellow-900 mb-1" />
      <div className="w-screen h-[2px] bg-yellow-900 " />
     <ContactPage/>
    </section>

    </div>
  );
}
