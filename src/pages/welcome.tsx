import Navbar from "@/sections/Navbar";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Explore from "@/sections/Explore";

const Welcome = () => {
  return(
      <>
          <div className={'bg-primary-black overflow-hidden'}>
                <Navbar/>
                <Hero/>
              {/*<div className={'text-red-700'}>sdasd</div>*/}
              <div className={'relative'}>
                  <About />
                  <div className="gradient-03 z-0"/>
                  <Explore/>
              </div>
          </div>
      </>
  )
}
export default Welcome;