import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ProductCard from "../Global/ProductCard";
import { IoClose } from "react-icons/io5";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import { AuthContext } from "../../context/authContext";
import MyServicesList from "./MyServicesList";
import MyProductsList from "./MyProductsList";
import ConnectEbay from "../ebay/ConnectEbay";
import ConnectAmazon from "../ebay/ConnectAmazon";
import ConnectTiktok from "../ebay/ConnectTiktok";

const MyProductsAndServices = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [connectStore, setConnectStore] = useState(false);
  const [state, setState] = useState(false);
  const [isApproved, setIsApproved] = useState('approved');
  const [postType, setPostType] = useState("Post");
  const [isEBay, setIsEBay] = useState(false);
  const [isAmazon, setIsAmazon] = useState(false);
  const [isTiktok, setIsTiktok] = useState(false);

  const location = useLocation();
  console.log("postType >>>", postType);
  console.log("isApproved >>>", isApproved);


  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('ebayConnected') === '1') {
      toast.success('eBay store connected successfully!');
      setIsEBay(true);
    }
  }, [location]);

  const handleShowPopup = () => {
    setShowPopup(!showPopup);
  };

  const handleConnectStore = () => {
    setConnectStore(!connectStore);
  };

  return (
    <div className="w-full">
      <SellPopup showPopup={showPopup} handleShowPopup={handleShowPopup} />
      <StorePopup connectStore={connectStore} handleConnectStore={handleConnectStore} />
      <div className="w-full flex items-center justify-between">
        <h2 className="blue-text text-[28px] font-bold">My Products</h2>
        <div className="flex flex-row gap-10">
          <button
            type="button"
            onClick={handleConnectStore}
            className="blue-bg px-3 py-2 rounded-xl flex items-center gap-2"
            >
            <span className="font-bold text-base text-white">Connect Your Store</span>
          </button>
          <button
            type="button"
            onClick={handleShowPopup}
            className="blue-bg px-3 py-2 rounded-xl flex items-center gap-2"
            >
            <span className="font-bold text-base text-white">Sell</span>
            <img
              src="/plus-icon.png"
              alt="plus-icon"
              className="w-[15px] h-[15px]"
              />
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-6 gap-5">
        <div className="flex md:items-center md:flex-row flex-col gap-5">
        <div>
          <button
            type="button"
            onClick={() => setState(false)}
            className={`${
              state ? "bg-[#F7F7F7] text-black" : "blue-bg text-white"
            } rounded-l-xl px-4 py-2.5 font-bold`}
          >
            Products
          </button>
          <button
            type="button"
            onClick={() => setState(true)}
            className={`${
              !state ? "bg-[#F7F7F7] text-black" : "blue-bg text-white"
            } rounded-r-xl px-4 py-2.5 font-bold`}
          >
            Services
          </button>
        </div>
        { postType === 'Post' && <div>
          <button
            type="button"
            onClick={() => setIsApproved('approved')}
            className={`${
              isApproved ==='approved' ? "blue-bg text-white" : "bg-[#F7F7F7] text-black"
            } rounded-l-xl px-4 py-2.5 font-bold`}
          >
            Approved
          </button>
          <button
            type="button"
            onClick={() => setIsApproved('rejected')}
            className={`${
              isApproved==='rejected' ? "blue-bg text-white" : "bg-[#F7F7F7] text-black"
            } px-4 py-2.5 font-bold`}
          >
            Rejected
          </button>
          <button
            type="button"
            onClick={() => setIsApproved('pending_review')}
            className={`${
              isApproved==='pending_review' ? "blue-bg text-white" : "bg-[#F7F7F7] text-black"
            } rounded-r-xl px-4 py-2.5 font-bold`}
          >
            Pending Review
          </button>
        </div>
        }
        </div>
        <div>
          <select
            id="countries"
            value={postType}
            onChange={(e) => setPostType(e.target.value)}
            className="bg-gray-50 border border-gray-300 !appearance-auto text-gray-900 text-sm rounded-lg block w-full p-2 outline-none"
          >
            <option defaultValue="post">Post</option>
            <option value="boosted">Boosted</option>
          </select>
        </div>
      </div>
      {state ? (
        <MyServicesList postType={postType} isApproved={isApproved}/>
      ) : (
        <MyProductsList postType={postType} isApproved={isApproved} eBayStore={isEBay}/>
      )}
    </div>
  );
};

export default MyProductsAndServices;

const SellPopup = ({ showPopup, handleShowPopup }) => {
  return (
    showPopup && (
      <div className="w-full h-screen fixed z-50 inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center overflow-hidden">
        <div className="w-[90%] lg:w-[532px] h-[288px] relative rounded-[12px] bg-white py-12 px-5 flex flex-col items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleShowPopup}
            className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center absolute top-5 p-1 right-5"
            aria-label="Close Popup"
          >
            <IoClose className="w-full h-full" />
          </button>
          <h3 className="text-[18px] font-bold blue-text mb-4">Select Type</h3>

          <Link
            to="/add-product"
            className="w-full md:w-[343px] h-[56px] rounded-[14px] p-4 bg-[#F2F2F2] flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <div className="w-[32px] h-[32px] blue-bg rounded-full flex items-center justify-center p-2">
                <FiPlus className="w-full h-full text-white" />
              </div>
              <span className="text-sm font-medium">Add Product</span>
            </div>
            <MdOutlineKeyboardArrowRight className="text-xl" />
          </Link>
          <Link
            to="/add-service"
            className="w-full md:w-[343px] h-[56px] rounded-[14px] p-4 bg-[#F2F2F2] flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <div className="w-[32px] h-[32px] blue-bg rounded-full flex items-center justify-center p-2">
                <FiPlus className="w-full h-full text-white" />
              </div>
              <span className="text-sm font-medium">Add Service</span>
            </div>
            <MdOutlineKeyboardArrowRight className="text-xl" />
          </Link>
        </div>
      </div>
    )
  );
};

const StorePopup = ({ connectStore, handleConnectStore }) => {
  return (
    connectStore && (
      <div className="w-full h-screen fixed z-50 inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center overflow-hidden">
        <div className="w-[90%] lg:w-[532px] h-[288px] relative rounded-[12px] bg-white py-12 px-5 flex flex-col items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleConnectStore}
            className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center absolute top-5 p-1 right-5"
            aria-label="Close Popup"
          >
            <IoClose className="w-full h-full" />
          </button>
          <h3 className="text-[18px] font-bold blue-text mb-4">Select Store</h3>
          <ConnectEbay handleConnectStore={handleConnectStore}/>
          <ConnectAmazon handleConnectStore={handleConnectStore} />
          <ConnectTiktok handleConnectStore={handleConnectStore}/>
        </div>
      </div>
    )
  );
};
