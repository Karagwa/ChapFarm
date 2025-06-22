import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowRight, Phone, Users, Truck, Shield } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StatCard from '../components/StatCard';
import FeatureCard from '../components/FeatureCard';
import SectionDivider from '../components/SectionDivider';
import video1 from '../assets/video1.mp4';


const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-pattern text-white">
        <div className="container mx-auto px-4 py-20 md:py-28 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 animate-fade-in">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Empowering Ugandan Farmers with Climate-Smart Solutions
            </h1>
            <p className="text-chapfarm-100 text-lg mb-8 max-w-lg">
              ChapFarm connects farmers with authorities and transport providers to improve agricultural resilience and logistics in the face of climate change.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/about">
                <Button className="w-full sm:w-auto text-chapfarm-800 bg-white hover:bg-gray-100 font-medium">
                  Learn More <ArrowRight className="ml-2" size={16} />
                </Button>
              </Link>
              <Link to="/login">
                <Button className="w-full sm:w-auto bg-chapfarm-500 hover:bg-chapfarm-600 font-medium">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center animate-slide-in">
            <video
              src={video1}
              autoPlay
              loop
              muted
              playsInline
              className="rounded-xl shadow-2xl max-w-full object-cover h-[400px] border-4 border-white/20 hover:scale-[1.02] transition-transform duration-300"
            />
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Bridging Technology and Agriculture</h2>
            <p className="text-lg text-gray-600 mb-8">
              ChapFarm is a revolutionary platform that bridges the gap between technology and traditional farming through
              our innovative USSD-based system, making agricultural information accessible to everyone, even in the most remote areas.
            </p>
            <SectionDivider className="my-8" />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How ChapFarm Works</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our simple but powerful platform connects all stakeholders in the agricultural ecosystem.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              title="USSD Access"
              description="Farmers use simple feature phones to access ChapFarm through USSD codes, making it accessible even in remote areas without smartphones or internet."
              icon={<Phone className="h-6 w-6 text-chapfarm-700" />}
            />
            
            <FeatureCard 
              title="Authority Response"
              description="Agricultural authorities receive reports, provide guidance, and send alerts to help farmers respond to challenges and optimize their farming practices."
              icon={<Shield className="h-6 w-6 text-chapfarm-700" />}
            />
            
            <FeatureCard 
              title="Transport Coordination"
              description="Transport providers connect with farmers to facilitate efficient movement of crops to markets, reducing post-harvest losses and improving income."
              icon={<Truck className="h-6 w-6 text-chapfarm-700" />}
            />
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/about">
              <Button variant="outline" className="border-chapfarm-600 text-chapfarm-700 hover:bg-chapfarm-50">
                Explore All Features <ArrowRight className="ml-2" size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              ChapFarm is transforming agricultural practices across Uganda with measurable results.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard value="5,000+" label="Farmers Connected" />
            <StatCard value="20+" label="Districts Covered" />
            <StatCard value="200+" label="Transport Providers" />
            <StatCard value="30%" label="Increase in Farmer Income" />
          </div>
          
          <div className="mt-16 bg-chapfarm-50 rounded-xl p-8 border border-chapfarm-100">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-6 md:mb-0 md:mr-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Real Stories, Real Impact</h3>
                <p className="text-gray-600 mb-4">
                  "ChapFarm has revolutionized how I manage my farm. I now get timely weather alerts and can easily find transport for my produce. My income has increased by over 40% in just one season!"
                </p>
                <p className="font-medium text-chapfarm-700">— Sarah Nakato, Farmer in Mbarara</p>
              </div>
              <div className="md:w-1/3">
                <img 
                  src="https://images.unsplash.com/photo-1517022812141-23620dba5c23?q=80&w=300&auto=format" 
                  alt="Ugandan farmer with crops" 
                  className="rounded-lg shadow-md object-cover w-full h-48 md:h-64"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Partners</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We collaborate with leading organizations to maximize our impact.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {/* These would be actual partner logos in production */}
            <div className="bg-white p-6 rounded-md shadow-sm flex items-center justify-center h-20 w-40">
              <div className="text-gray-400 font-semibold">Partner 1</div>
            </div>
            <div className="bg-white p-6 rounded-md shadow-sm flex items-center justify-center h-20 w-40">
              <div className="text-gray-400 font-semibold">Partner 2</div>
            </div>
            <div className="bg-white p-6 rounded-md shadow-sm flex items-center justify-center h-20 w-40">
              <div className="text-gray-400 font-semibold">Partner 3</div>
            </div>
            <div className="bg-white p-6 rounded-md shadow-sm flex items-center justify-center h-20 w-40">
              <div className="text-gray-400 font-semibold">Partner 4</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-chapfarm-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join ChapFarm?</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Become part of our network of agricultural authorities and transport providers helping Ugandan farmers adapt to climate change.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            
            <Link to="/contact">
              <Button variant="outline" className="border-white text-white hover:bg-chapfarm-600 w-full sm:w-auto">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
