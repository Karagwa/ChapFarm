import React from 'react';
import { ChapFarmLogo } from '../components/ChapFarmLogo';
import { MapPin, Check } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutPage = () => {
  return (
    <div>
        <Navbar />
      {/* Hero Section */}
      <section className="bg-chapfarm-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <ChapFarmLogo className="h-16 w-16 mx-auto mb-6" />
          <h1 className="text-3xl md:text-5xl font-bold mb-4">About ChapFarm</h1>
          <p className="text-xl text-chapfarm-100 max-w-3xl mx-auto">
            Transforming Ugandan agriculture through accessible technology and connected services.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-600 mb-6">
                ChapFarm's mission is to empower Ugandan farmers with climate-smart tools and services 
                that improve agricultural resilience, increase productivity, and enhance market access.
              </p>
              <p className="text-gray-600 mb-6">
                We bridge the digital divide by leveraging USSD technology, making advanced 
                agricultural support accessible to farmers using basic feature phones.
              </p>
              <p className="text-gray-600">
                By connecting farmers directly with agricultural authorities and transport 
                providers, we're creating a sustainable ecosystem that benefits everyone in the 
                agricultural value chain.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?q=80&w=500&auto=format" 
                alt="Farmers in field" 
                className="rounded-lg shadow-xl" 
              />
              <div className="absolute -bottom-6 -left-6 bg-chapfarm-600 text-white p-6 rounded-lg shadow-lg hidden md:block">
                <p className="font-semibold">
                  "Connecting farmers, authorities, and transport to build resilient agriculture"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How ChapFarm Works - Detailed */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            How ChapFarm Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-chapfarm-50 h-12 w-12 flex items-center justify-center rounded-full text-chapfarm-700 font-bold text-xl mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold mb-4">Farmer Connectivity</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-chapfarm-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Farmers dial USSD codes on feature phones</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-chapfarm-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Report agricultural issues (pests, drought, etc.)</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-chapfarm-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Request transport for crops to market</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-chapfarm-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Receive alerts and advisories</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-chapfarm-50 h-12 w-12 flex items-center justify-center rounded-full text-chapfarm-700 font-bold text-xl mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold mb-4">Agricultural Authority</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-chapfarm-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>View and manage farmer reports</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-chapfarm-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Send targeted alerts and advisories</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-chapfarm-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Broadcast emergency information</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-chapfarm-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Track response effectiveness</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-chapfarm-50 h-12 w-12 flex items-center justify-center rounded-full text-chapfarm-700 font-bold text-xl mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold mb-4">Transport Provider</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-chapfarm-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Receive transport requests from farmers</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-chapfarm-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Accept or reject based on availability</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-chapfarm-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Schedule pickups and deliveries</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-chapfarm-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Track transport history and performance</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Map */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Regions We Serve
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-gray-200 rounded-lg p-4 h-80 flex items-center justify-center">
                <p className="text-gray-500 text-lg">Map of Uganda showing coverage regions</p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-6">Currently Active In:</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-chapfarm-600 mr-2 mt-0.5" />
                  <span>Central Region</span>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-chapfarm-600 mr-2 mt-0.5" />
                  <span>Eastern Region</span>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-chapfarm-600 mr-2 mt-0.5" />
                  <span>Northern Region</span>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-chapfarm-600 mr-2 mt-0.5" />
                  <span>Western Region</span>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="font-semibold mb-2">Key Districts:</h4>
                <p className="text-gray-600">
                  Kampala, Wakiso, Jinja, Mbale, Gulu, Lira, Mbarara, Fort Portal, 
                  Masaka, Arua, Soroti, Kabale, Hoima, and expanding to more.
                </p>
              </div>
              
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Expanding Soon:</h4>
                <p className="text-gray-600">
                  We are actively working to expand our coverage to all districts in Uganda.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team and Partners */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            Our Partners
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex items-center justify-center h-24 bg-white rounded-lg shadow-sm p-4">
              <p className="text-gray-400">Agriculture Ministry</p>
            </div>
            <div className="flex items-center justify-center h-24 bg-white rounded-lg shadow-sm p-4">
              <p className="text-gray-400">Farmers Association</p>
            </div>
            <div className="flex items-center justify-center h-24 bg-white rounded-lg shadow-sm p-4">
              <p className="text-gray-400">Transport Union</p>
            </div>
            <div className="flex items-center justify-center h-24 bg-white rounded-lg shadow-sm p-4">
              <p className="text-gray-400">Telecom Provider</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AboutPage;