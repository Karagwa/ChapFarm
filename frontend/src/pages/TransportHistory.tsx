import React from 'react';
import TransportLayout from '../components/layouts/TransportLayout';

const TransportHistoryPage = () => {
  const history = [
    {
      id: 'TR-00123',
      farmer: 'Treasure',
      crop: 'Maize',
      quantity: '500 kg',
      location: 'Kampala, Central Region',
      destination: 'Kampala Main Market',
      status: 'Delivered',
      action: 'Accepted',
      requestedAt: '2025-06-20',
    },
    {
      id: 'TR-00124',
      farmer: 'Okello',
      crop: 'Millet',
      quantity: '300 kg',
      location: 'Mbale, Eastern Region',
      destination: 'Jinja Market',
      status: 'Pending',
      action: 'Accepted',
      requestedAt: '2025-06-21',
    },
    {
      id: 'TR-00125',
      farmer: 'Sarah',
      crop: 'Beans',
      quantity: '150 kg',
      location: 'Lira, Northern Region',
      destination: 'Gulu Market',
      status: 'Rejected',
      action: 'Rejected',
      requestedAt: '2025-06-19',
    },
    {
      id: 'TR-00126',
      farmer: 'Ayaan',
      crop: 'Yams',
      quantity: '600 kg',
      location: 'Soroti, Eastern Region',
      destination: 'Mbale Market',
      status: 'Delivered',
      action: 'Accepted',
      requestedAt: '2025-06-18',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <TransportLayout>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Transport Request History</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-6 py-3 text-sm font-semibold text-gray-600">Request ID</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-600">Farmer</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-600">Crop</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-600">Quantity</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-600">From</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-600">To</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-600">Status</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-600">Action</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-600">Requested On</th>
            </tr>
          </thead>
          <tbody>
            {history.map((req, index) => (
              <tr key={index} className="border-t">
                <td className="px-6 py-4">{req.id}</td>
                <td className="px-6 py-4">{req.farmer}</td>
                <td className="px-6 py-4">{req.crop}</td>
                <td className="px-6 py-4">{req.quantity}</td>
                <td className="px-6 py-4">{req.location}</td>
                <td className="px-6 py-4">{req.destination}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(req.status)}`}>
                    {req.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`text-sm font-medium ${
                      req.action === 'Rejected' ? 'text-red-600' : 'text-green-600'
                    }`}
                  >
                    {req.action}
                  </span>
                </td>
                <td className="px-6 py-4">{req.requestedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </TransportLayout>
  );
};

export default TransportHistoryPage;
