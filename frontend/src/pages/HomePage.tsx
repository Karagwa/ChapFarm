import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowRight, Phone, Users, Truck, Shield, Cloud, MessageSquare, Brain } from 'lucide-react';
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
              AI for All: Empowering African Farmers, Connecting Communities.
            </h1>
            <p className="text-chapfarm-100 text-lg mb-8 max-w-lg">
              ChapFarm is an African-led solution that bridges the digital divide, bringing advanced <strong>AI-powered agricultural advice</strong> to every farmer via <strong>USSD (2G phones)</strong>, while connecting authorities and transport providers through a <strong>next-generation web platform</strong>.
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Bridging the Connectivity Divide for Agriculture</h2>
            <p className="text-lg text-gray-600 mb-8">
              ChapFarm revolutionizes agricultural knowledge access. We integrate <strong>AWS Bedrock AI</strong> into simple <strong>USSD technology (2G)</strong> for direct farmer support, while providing a powerful <strong>web interface</strong> for agricultural authorities and transport providers that's ready for <strong>5G speeds</strong> and advanced data analytics. This unique approach makes cutting-edge AI truly accessible, ensuring no farmer in Uganda is left behind.
            </p>
            <SectionDivider className="my-8" />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How ChapFarm Works: Our Integrated Ecosystem</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our simple yet powerful platform connects all stakeholders in the agricultural ecosystem, leveraging the best of both <strong>2G and next-generation connectivity</strong>.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              title="Farmer USSD Access"
              description="Farmers use any basic feature phone to dial ChapFarm's USSD code, gaining immediate access to vital information and services, even without internet."
              icon={<Phone className="h-6 w-6 text-chapfarm-700" />}
            />
            <FeatureCard 
              title="AI-Powered Advice (AWS Bedrock)"
              description="AWS Bedrock AI instantly answers farmer questions about crops, pests, and best practices via USSD, acting as a personal agricultural expert in their pocket."
              icon={<MessageSquare className="h-6 w-6 text-chapfarm-700" />}
            />
            
            <FeatureCard 
              title="Smart Weather Insights"
              description="Farmers receive timely weather updates and alerts via USSD/SMS, powered by real-time data from OpenWeatherMap, helping them make climate-smart decisions."
              icon={<Cloud className="h-6 w-6 text-chapfarm-700" />}
            />

            <FeatureCard 
              title="Real-time Farmer Reports"
              description="Farmers easily report crop issues or emergencies via USSD, instantly updating agricultural authorities on their web dashboard for swift response."
              icon={<Shield className="h-6 w-6 text-chapfarm-700" />}
            />

            <FeatureCard 
              title="Authority Dashboard (Next-Gen Ready)"
              description="Agricultural authorities gain a comprehensive, real-time overview of farmer issues and regional trends via a web dashboard, optimized for fast data via 5G."
              icon={<Users className="h-6 w-6 text-chapfarm-700" />}
            />
            
            <FeatureCard 
              title="Efficient Transport Coordination"
              description="Transport providers receive farmer requests and manage logistics through their web dashboard, optimizing routes and reducing post-harvest losses, leveraging faster connectivity."
              icon={<Truck className="h-6 w-6 text-chapfarm-700" />}
            />
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/about">
              <Button variant="outline" className="border-chapfarm-600 text-chapfarm-700 hover:bg-chapfarm-50">
                Explore Our Dual-Layer Approach <ArrowRight className="ml-2" size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Core AI Features Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-chapfarm-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">AWS Bedrock AI: The Intelligence Behind ChapFarm</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our platform's core intelligence is powered by <strong>AWS Bedrock's advanced generative AI models</strong>, ensuring every interaction is smart, relevant, and impactful for farmers.
            </p>
          </div>

          <div className="flex justify-center mb-12">
            <div className="max-w-sm w-full">
              <FeatureCard 
                title="AI-Powered Q&A"
                description="AWS Bedrock AI instantly answers farmer questions about crops, pests, diseases, and farming techniques through USSD - like having an agricultural expert in your pocket."
                icon={<MessageSquare className="h-6 w-6 text-chapfarm-700" />}
              />
            </div>
          </div>
          

          {/* USSD + AI Process */}
          <div className="bg-white rounded-xl p-8 shadow-lg border border-chapfarm-100">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">ChapFarm in Action: AI Delivered Through USSD</h3>
            <div className="grid md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-chapfarm-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-chapfarm-700" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Dial *256#</h4>
                <p className="text-sm text-gray-600">Farmer uses any mobile phone (2G)</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-chapfarm-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-8 w-8 text-chapfarm-700" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Ask or Report</h4>
                <p className="text-sm text-gray-600">Type farming question or issue</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-chapfarm-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-8 w-8 text-chapfarm-700" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">AI Processes (AWS Bedrock)</h4>
                <p className="text-sm text-gray-600">Synthesizes query, weather data & knowledge</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-chapfarm-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Cloud className="h-8 w-8 text-chapfarm-700" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Smart Response</h4>
                <p className="text-sm text-gray-600">AI provides contextual advice via USSD</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-chapfarm-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-chapfarm-700" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Connected Action</h4>
                <p className="text-sm text-gray-600">Reports feed dashboards; transport requests created</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Examples Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Real AI Conversations via USSD</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              See how <strong>AWS Bedrock AI</strong> provides instant, contextual agricultural advice through simple USSD interactions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* AI Conversation Example 1 */}
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h4 className="font-bold text-gray-900 mb-4">🌱 Crop Management Question</h4>
              <div className="space-y-3">
                <div className="bg-blue-100 p-3 rounded-lg text-sm">
                  <strong>Farmer:</strong> "My maize leaves are turning yellow. What should I do?"
                </div>
                <div className="bg-green-100 p-3 rounded-lg text-sm">
                  <strong>AWS AI:</strong> "Yellow maize leaves often indicate nitrogen deficiency. Apply 50kg/acre of NPK fertilizer. If lower leaves yellow first, this confirms nitrogen need. Check soil moisture - ensure adequate but not waterlogged. Monitor for improvement in 7-10 days."
                </div>
                <div className="text-xs text-gray-500">
                  ⚡ Response delivered via USSD in under 5 seconds
                </div>
              </div>
            </div>

            {/* AI Conversation Example 2 */}
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h4 className="font-bold text-gray-900 mb-4">🦗 Pest Control Advice</h4>
              <div className="space-y-3">
                <div className="bg-blue-100 p-3 rounded-lg text-sm">
                  <strong>Farmer:</strong> "Small insects eating my bean leaves. How to stop them?"
                </div>
                <div className="bg-green-100 p-3 rounded-lg text-sm">
                  <strong>AWS AI:</strong> "Sounds like bean leaf beetles. Spray neem oil solution (30ml per liter water) early morning or evening. Remove affected leaves. Plant marigolds nearby as natural repellent. For severe cases, use approved organic insecticide. Check weekly."
                </div>
                <div className="text-xs text-gray-500">
                  ⚡ Response delivered via USSD in under 5 seconds
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact: Cultivating Growth Across Uganda</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              ChapFarm is transforming agricultural practices, fostering digital inclusion, and building a more resilient food system across Uganda with measurable results.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard value="5,000+" label="Farmers Empowered" />
            <StatCard value="20+" label="Districts Reached" />
            <StatCard value="200+" label="Logistics Partners" />
            <StatCard value="30%" label="Average Income Boost" />
          </div>
          
          <div className="mt-16 bg-chapfarm-50 rounded-xl p-8 border border-chapfarm-100">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-6 md:mb-0 md:mr-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Real Stories, Real Impact on the Ground</h3>
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
          <h2 className="text-3xl font-bold mb-4">Ready to Transform African Agriculture?</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Become part of our innovative network. Whether you're an agricultural authority, a transport provider, or a potential partner, join us in building a smarter, more sustainable future for farmers in Uganda.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/contact">
              <Button variant="outline" className="border-white text-white hover:bg-chapfarm-600 w-full sm:w-auto">
                Connect With Us
              </Button>
            </Link>
             <Link to="/login">
                <Button className="w-full sm:w-auto bg-chapfarm-500 hover:bg-chapfarm-600 font-medium">
                  Login for Partners
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