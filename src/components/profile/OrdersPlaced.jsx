import React, { useState, useEffect } from "react";
import PastOrderList from "./PastOrderList";
import CurrentOrderList from "./CurrentOrderList";

const OrdersPlaced = () => {
  const [orderType, setOrderType] = useState(false);

  const handleOrderType = () => {
    setOrderType(!orderType);
  };

  useEffect(() => {
    
  }, []);
  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-start gap-2 mt-4">
        <button
          type="button"
          onClick={() => handleOrderType()}
          className={`${
            !orderType ? "blue-bg text-white" : "bg-[#F7F7F7] text-black"
          } rounded-xl px-6 py-2.5 text-sm font-semibold`}
        >
          Current
        </button>
        <button
          type="button"
          onClick={() => handleOrderType()}
          className={`${
            orderType ? "blue-bg text-white" : "bg-[#F7F7F7] text-black"
          } rounded-xl px-6 py-2.5 text-sm font-semibold`}
        >
          Past
        </button>
      </div>
      <div className="w-ful mt-10 min-h-[50vh]">
        {orderType ? <PastOrderList /> : <CurrentOrderList />}
      </div>
    </div>
  );
};

export default OrdersPlaced;
