import React from 'react';
import { BASE_URL } from '../../api/api';

export default function ConnectEbay() {
  const connect = () => {
    window.location.href = `${BASE_URL}/ebay/connect`;
  };

  return (
    <button onClick={connect} className="bg-blue-600 text-white px-4 py-2 rounded">
      Connect eBay Store
    </button>
  );
}
