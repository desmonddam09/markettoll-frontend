import React, { useContext, useEffect, useState } from "react";
import ProductCard from "../Global/ProductCard";
import axios from "axios";
import { BASE_URL } from "../../api/api";
import { AuthContext } from "../../context/authContext";
import Loader from "../Global/Loader";


const MyProductsList = ({ postType, isApproved, eBayStore }) => {
  const [myProducts, setMyProducts] = useState([]);
  const { user } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);


  const fetchMyProducts = async () => {
    setLoading(true);
    console.log(postType);
    try {
      const res = await axios.get(
        postType === "Post"
          ? `${BASE_URL}/users/seller-products/${user?._id}?approveStatus=${isApproved}&page=${page}`
          : `${BASE_URL}/users/products-boosted?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      setMyProducts(res?.data?.data);
    } catch (error) {
      console.log("my products err >>>>", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(eBayStore) {
      const response = axios.get(`${BASE_URL}/ebay/products`, 
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      console.log("ebay_result", response.data);
    }
    fetchMyProducts();
  }, [postType, isApproved, eBayStore]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="mt-10 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {myProducts?.length > 0 ? (
        <>
          {myProducts?.map((product, index) => {
            return (
              <ProductCard
                product={product}
                key={index}
                fetchMyProducts={fetchMyProducts}
              />
            );
          })}
        </>
      ) : (
        <div className="w-full min-h-[50vh]">
          <h2 className="font-bold blue-text text-lg px-2 mt-10">
            No Products Found
          </h2>
        </div>
      )}
    </div>
  );
};

export default MyProductsList;
