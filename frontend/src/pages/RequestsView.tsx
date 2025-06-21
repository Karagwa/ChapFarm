import React from 'react';
import TransportLayout from '../components/layouts/TransportLayout';

const TransportRequestView = () => {
  const requests = [
    {
      id: 'TR-00123',
      farmer: 'Treasure',
      crop: 'Maize',
      quantity: '500 kg',
      location: 'Kampala, Central Region',
      destination: 'Kampala Main Market',
      status: 'Pending',
      requestedAt: '2025-06-20',
    },
    {
      id: 'TR-00124',
      farmer: 'Ayaan',
      crop: 'Yam',
      quantity: '589 kg',
      location: 'Mbale, Eastern Region',
      destination: 'Kampala Main Market',
      status: 'Pending',
      requestedAt: '2025-06-20',
    },
    {
      id: 'TR-00125',
      farmer: 'Okello',
      crop: 'Millet',
      quantity: '239 kg',
      location: 'Mbale, Eastern Region',
      destination: 'Kampala Main Market',
      status: 'Pending',
      requestedAt: '2025-06-20',
    },
    {
      id: 'TR-00126',
      farmer: 'Mitchelle',
      crop: 'Sugarcane',
      quantity: '50 kg',
      location: 'Mbale, Eastern Region',
      destination: 'Kampala Main Market',
      status: 'Pending',
      requestedAt: '2025-06-20',
    },
  ];

  return (
    <TransportLayout>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Transport Requests</h1>

      {/* Grid layout for cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map((request, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 mb-1"><strong>Request ID:</strong> {request.id}</p>
            <p className="text-gray-600 mb-1"><strong>Farmer:</strong> {request.farmer}</p>
            <p className="text-gray-600 mb-1"><strong>Crop:</strong> {request.crop}</p>
            <p className="text-gray-600 mb-1"><strong>Quantity:</strong> {request.quantity}</p>
            <p className="text-gray-600 mb-1"><strong>Pickup Location:</strong> {request.location}</p>
            <p className="text-gray-600 mb-1"><strong>Destination:</strong> {request.destination}</p>
            <p className="text-gray-600 mb-4"><strong>Requested On:</strong> {request.requestedAt}</p>

            <div className="flex flex-col gap-2">
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md">
                Accept Request
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">
                Decline
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                Mark as Delivered
              </button>
            </div>
          </div>
        ))}
      </div>
    </TransportLayout>
  );
};

export default TransportRequestView;
