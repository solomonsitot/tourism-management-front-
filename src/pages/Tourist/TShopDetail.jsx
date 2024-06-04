import React, { useEffect, useState } from "react";
import useRedirectLogoutUsers from "../../hooks/redirectLogoutUsers";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faDollarSign,
  faBed,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
function TShopDetail() {
  useRedirectLogoutUsers("/login");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [shop, setShop] = useState({});
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function fetchShop() {
      const result = await axios.get(
        `${BACKEND_URL}/user/get-single-hotel/${id}`
      );
      setShop(result.data);
    }
    fetchShop();

    async function fetchProducts() {
      const result = await axios.get(
        `${BACKEND_URL}/goods/get-all-products/${id}`
      );
      setProducts(result.data);
    }
    fetchProducts();
  }, [id]);



  return (
    <div className="p-3 mt-20 h-screen overflow-y-scroll bg-gray-100">
      <div className="w-11/12 mx-auto bg-white p-5 rounded shadow">
        <h1 className="font-bold text-3xl pt-3">
          {shop.company_name} / {shop.address}
        </h1>
        <div className="flex items-center pt-3">
          <FontAwesomeIcon
            icon={faMapMarkerAlt}
            className="text-gray-500 mr-2"
          />
          <p className="text-[#6E6C6C]">{shop.address}</p>
        </div>
      </div>
      <div className="w-11/12 mx-auto bg-white p-5 mt-5 rounded shadow">
        <h1 className="text-3xl font-semibold py-3">Overview</h1>
        <p>{shop.description}</p>
      </div>
      {products.map((product, index) => (
        <div
          key={index}
          className="w-11/12 mx-auto bg-white p-5 mt-5 rounded shadow"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <div className="grid grid-cols-2 gap-2">
              {product.product_images.slice(0, 2).map((image, imgIndex) => (
                <img
                  key={imgIndex}
                  src={image}
                  alt={`Product ${index} Image ${imgIndex}`}
                  className="object-cover rounded"
                />
              ))}
            </div>
            <div>
              <img
                src={product.product_images[0]}
                alt={`Product ${index} Main Image`}
                className="object-cover w-full h-64 rounded"
              />
            </div>
          </div>
          <div className="mt-4">
            <h1 className="font-bold text-xl">{product.product_name}</h1>
            <p className="mt-2">{product.product_description}</p>
            <div className="flex justify-between items-center mt-4">
              <div>
                <div className="flex items-center mt-2">
                  <FontAwesomeIcon
                    icon={faDollarSign}
                    className="text-gray-500 mr-2"
                  />
                  <p className="text-lg">{product.product_price} $</p>
                </div>
                <div className="flex items-center mt-2">
                  <FontAwesomeIcon
                    icon={faBed}
                    className="text-gray-500 mr-2"
                  />
                  <p>{product.product_available} products available</p>
                </div>
              </div>
              <button
                onClick={() => navigate(`buy/${product._id}`)}
                className="bg-green-900 px-4 py-2 text-white rounded-lg"
              >
                Buy now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );}

export default TShopDetail;
