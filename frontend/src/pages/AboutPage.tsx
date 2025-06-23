import React from 'react';
//import { Helmet } from 'react-helmet-async'; // Import Helmet
import { ChapFarmLogo } from '../components/ChapFarmLogo';
import { MapPin, Check, Cloud, Brain, Phone, Zap, Leaf, Globe, Lightbulb, Truck, Users } from 'lucide-react'; // Added more icons
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutPage = () => {
  return (
    <div>
      {/* Helmet for SEO */}
     

      <Navbar />

      {/* Hero Section - Emphasize African-led & Kampala */}
      <section className="bg-chapfarm-800 text-white py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          
          <h2 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
            ChapFarm: An African Solution 
          </h2>
          <p className="text-xl md:text-2xl text-chapfarm-100 max-w-4xl mx-auto opacity-90">
            Headquartered in <b>Kampala, Uganda</b>, ChapFarm is a proud African initiative, transforming agriculture through <strong>accessible AI</strong> and smart, inclusive technology.
          </p>
        </div>
      </section>

      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission & Our Roots</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                ChapFarm's core mission is to <strong>empower Ugandan farmers</strong> with climate-smart tools and services that enhance agricultural resilience, boost productivity, and improve market access. As a <strong>homegrown solution from Kampala</strong>, we deeply understand the unique challenges and opportunities within the Ugandan agricultural landscape.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We're committed to bridging the digital divide. By leveraging <strong>USSD technology</strong>, we ensure that advanced agricultural support, powered by cutting-edge <strong>AWS Generative AI (specifically AWS Bedrock)</strong>, is accessible to every farmer, even those using basic feature phones. This means vital information is always just a dial away.
              </p>
              <p className="text-gray-600 leading-relaxed">
                By seamlessly connecting farmers with agricultural authorities and transport providers, we're building a <strong>sustainable, integrated ecosystem</strong>. This approach benefits everyone in the agricultural value chain, from seed to market, fostering a stronger and more prosperous future for Ugandan agriculture.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1607791426955-b3b227970def?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Ugandan farmers in a field"
                className="rounded-xl shadow-xl border-4 border-chapfarm-100"
              />
              <div className="absolute -bottom-6 -left-6 bg-chapfarm-600 text-white p-6 rounded-lg shadow-lg hidden md:block transform rotate-2">
                <p className="font-semibold text-lg">
                  "Empowering farmers with AI, accessible to all, from the heart of Uganda."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Dual Approach Section - Emphasize 2G & Next-Gen Capabilities */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Our Unique Dual Approach: 2G Accessibility Meets Next-Gen Power
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* 2G USSD for Farmers */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-chapfarm-100 flex flex-col items-center text-center">
              <div className="bg-chapfarm-100 h-16 w-16 flex items-center justify-center rounded-full text-chapfarm-700 font-bold text-2xl mb-6">
                <Phone className="h-9 w-9" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Reach All Farmers with 2G USSD</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We believe in <strong> inclusive technology </strong>. By leveraging <strong>USSD</strong>, ChapFarm ensures that every farmer in Uganda, regardless of internet access or smartphone ownership, can benefit from our services. Farmers simply dial a code to:
              </p>
              <ul className="list-disc list-inside text-left text-gray-700 space-y-2 mb-4">
                <li className="flex items-start"><Check className="h-5 w-5 text-chapfarm-600 mr-2 mt-0.5 flex-shrink-0" /><p>Access <strong> AI-powered advice</strong> on crops and pests.</p></li>
                <li className="flex items-start"><Check className="h-5 w-5 text-chapfarm-600 mr-2 mt-0.5 flex-shrink-0" /><p>Receive <strong> critical weather alerts </strong> (powered by OpenWeatherMap).</p></li>
                <li className="flex items-start"><Check className="h-5 w-5 text-chapfarm-600 mr-2 mt-0.5 flex-shrink-0" /><p>Report <strong> agricultural issues </strong> directly to authorities.</p></li>
                <li className="flex items-start"><Check className="h-5 w-5 text-chapfarm-600 mr-2 mt-0.5 flex-shrink-0" /><p>Request <strong> transport services </strong> for their produce to market.</p></li>
              </ul>
              <p className="text-gray-600 mt-auto leading-relaxed">
                This simple, widely available technology is the bedrock of our farmer empowerment.
              </p>
            </div>

            {/* Next-Gen Platform for Authorities & Transport */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-chapfarm-100 flex flex-col items-center text-center">
              <div className="bg-chapfarm-100 h-16 w-16 flex items-center justify-center rounded-full text-chapfarm-700 font-bold text-2xl mb-6">
                <Zap className="h-9 w-9" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Empowering Partners with Next-Gen Web Platform</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                For agricultural authorities and transport providers, we offer a robust <strong>web-based dashboard</strong>. This platform is designed for efficiency and informed decision-making, capable of leveraging <strong>future 5G infrastructure</strong> for enhanced speed and data processing:
              </p>
              <ul className="list-disc list-inside text-left text-gray-700 space-y-2 mb-4">
                <li className="flex items-start"><Check className="h-5 w-5 text-chapfarm-600 mr-2 mt-0.5 flex-shrink-0" /><p>Visualize <strong>real-time farmer reports</strong> and trends.</p></li>
                <li className="flex items-start"><Check className="h-5 w-5 text-chapfarm-600 mr-2 mt-0.5 flex-shrink-0" /><p>Issue <strong>targeted advisories</strong> and emergency broadcasts.</p></li>
                <li className="flex items-start"><Check className="h-5 w-5 text-chapfarm-600 mr-2 mt-0.5 flex-shrink-0" /><p>Efficiently manage and <strong>optimize transport logistics</strong>.</p></li>
                <li className="flex items-start"><Check className="h-5 w-5 text-chapfarm-600 mr-2 mt-0.5 flex-shrink-0" /><p>Access comprehensive <strong>environmental data</strong> for strategic planning.</p></li>
              </ul>
              <p className="text-gray-600 mt-auto leading-relaxed">
                This dual-layer approach ensures seamless information flow, from the most remote farm to national decision-makers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How ChapFarm Works - Detailed (Retained and slightly enhanced) */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            The ChapFarm Workflow: Connecting Every Link
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg shadow-md border border-gray-100">
              <div className="bg-chapfarm-50 h-14 w-14 flex items-center justify-center rounded-full text-chapfarm-700 font-bold text-xl mb-6">
                <Phone className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">1. Farmer Connectivity (USSD)</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-chapfarm-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Farmers dial a <strong>simple USSD code</strong> on any phone.</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-chapfarm-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>They report issues (pests, diseases, drought) or ask questions.</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-chapfarm-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Farmers can also request transport for their harvests.</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-chapfarm-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Receive <strong>instant, AI-powered advice</strong> and weather alerts.</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg shadow-md border border-gray-100">
              <div className="bg-chapfarm-50 h-14 w-14 flex items-center justify-center rounded-full text-chapfarm-700 font-bold text-xl mb-6">
                <Users className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">2. Agricultural Authorities (Web Platform)</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-chapfarm-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Authorities access a <strong>secure web dashboard</strong>.</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-chapfarm-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>They view and manage farmer reports in <strong>real-time</strong>.</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-chapfarm-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Send <strong>targeted advisories</strong> (e.g., pest outbreaks) via USSD/SMS.</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-chapfarm-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Monitor overall agricultural health and trends in districts.</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg shadow-md border border-gray-100">
              <div className="bg-chapfarm-50 h-14 w-14 flex items-center justify-center rounded-full text-chapfarm-700 font-bold text-xl mb-6">
                <Truck className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">3. Transport Providers (Web Platform)</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-chapfarm-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Transport companies receive <strong>farmer requests</strong> via the dashboard.</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-chapfarm-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>They can accept, reject, and <strong>schedule pickups</strong>.</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-chapfarm-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span><strong>Optimize routes</strong> and manage fleet efficiently.</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-chapfarm-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>This minimizes post-harvest losses and improves market access.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Impact & Vision Section - New Section */}
      <section className="py-16 bg-gradient-to-br from-chapfarm-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact & Future Vision</h2>
            <p className="text-gray-600 max-w-4xl mx-auto">
              ChapFarm is more than just a technological solution; it's a commitment to a <strong>resilient and equitable agricultural future for Uganda</strong>. We are relentlessly pursuing:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-md border border-chapfarm-100 transform hover:scale-105 transition-transform duration-300">
              <Leaf className="h-10 w-10 text-chapfarm-700 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sustainable Agriculture</h3>
              <p className="text-gray-600 text-sm">Empowering farmers with knowledge to adopt climate-smart practices, leading to higher yields and reduced environmental impact, protecting Uganda's natural resources.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-md border border-chapfarm-100 transform hover:scale-105 transition-transform duration-300">
              <Globe className="h-10 w-10 text-chapfarm-700 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Digital & Economic Inclusion</h3>
              <p className="text-gray-600 text-sm">Ensuring cutting-edge AI and digital services are accessible to <em>every</em> farmer, bridging the technology gap and boosting their economic well-being across the nation.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-md border border-chapfarm-100 transform hover:scale-105 transition-transform duration-300">
              <Lightbulb className="h-10 w-10 text-chapfarm-700 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Community Empowerment</h3>
              <p className="text-gray-600 text-sm">Fostering stronger, more responsive connections between farmers, agricultural authorities, and market providers for a robust and adaptive agricultural ecosystem in Uganda.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Map (Remains largely the same, strong visual focus) */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Regions We Proudly Serve Across Uganda
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              {/* Consider a more visually appealing Uganda map if possible, maybe with highlighted regions */}
              <div className="bg-gray-200 rounded-lg p-4 h-80 flex items-center justify-center border-2 border-gray-300 shadow-md">
                <p className="text-gray-500 text-lg font-medium">Visual map of Uganda showing ChapFarm's active regions.</p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-6 text-gray-900">Currently Active In All Major Regions:</h3>
              <div className="grid grid-cols-2 gap-4 text-gray-700">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-chapfarm-600 mr-2 mt-0.5" />
                  <span><strong>Central Region</strong></span>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-chapfarm-600 mr-2 mt-0.5" />
                  <span><strong>Eastern Region</strong></span>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-chapfarm-600 mr-2 mt-0.5" />
                  <span><strong>Northern Region</strong></span>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-chapfarm-600 mr-2 mt-0.5" />
                  <span><strong>Western Region</strong></span>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-semibold mb-2 text-gray-900">Key Districts Where We Operate:</h4>
                <p className="text-gray-600 leading-relaxed">
                  Including <strong>Kampala, Wakiso, Jinja, Mbale, Gulu, Lira, Mbarara, Fort Portal, Masaka, Arua, Soroti, Kabale, Hoima</strong>, and continuously expanding our reach.
                </p>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold mb-2 text-gray-900">Our Future: Expanding Across Uganda</h4>
                <p className="text-gray-600 leading-relaxed">
                  We are actively working to expand our comprehensive coverage to <strong>all districts in Uganda</strong>, ensuring every farmer can access ChapFarm's empowering services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section (Slightly reworded for impact) */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            Our Valued Collaborators and Partners
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex items-center justify-center h-24 bg-white rounded-lg shadow-sm p-4 border border-gray-100">
              <p className="text-gray-500 font-semibold text-center">Ministry of Agriculture, Animal Industry and Fisheries</p>
            </div>
            <div className="flex items-center justify-center h-24 bg-white rounded-lg shadow-sm p-4 border border-gray-100">
              <p className="text-gray-500 font-semibold text-center">National Farmers Federation of Uganda</p>
            </div>
            <div className="flex items-center justify-center h-24 bg-white rounded-lg shadow-sm p-4 border border-gray-100">
              <p className="text-gray-500 font-semibold text-center">Uganda Transporters Association</p>
            </div>
            <div className="flex items-center justify-center h-24 bg-white rounded-lg shadow-sm p-4 border border-gray-100">
              <p className="text-gray-500 font-semibold text-center">Leading Ugandan Telecom Providers</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;