import React, { useContext } from 'react';
import { BASE_URL } from '../../api/api';
import { AuthContext } from '../../context/authContext';

export default function ConnectTiktok({handleConnectStore}) {

  const {user} = useContext(AuthContext);

  const connect = () => {
    const currentPath = window.location.pathname + window.location.search;
    const returnTo = `${currentPath}?ebayConnected=1`;
    console.log("user", user?._id);
    const state = encodeURIComponent(
      JSON.stringify({ userId: user?._id, returnTo: returnTo })
    );
    window.location.href = `${BASE_URL}/ebay/connect?state=${state}`;
    handleConnectStore();
  };

  return (
    <button onClick={connect} className="blue-bg text-white px-4 py-2 rounded-xl w-2/3">
      <span className='font-bold'>Connect <span className='text-[#ffff00] text-lg'>Tiktok Shop</span> Store</span>
    </button>
  );
}
