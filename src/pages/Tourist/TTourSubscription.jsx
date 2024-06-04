import React, { useEffect, useState } from "react";
import key from "../../assets/key.png";
import logo from "../../assets/logo.png";
import chapalogo from "../../assets/chapalogo.png";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill, faBed } from "@fortawesome/free-solid-svg-icons";
import Nav from "../../components/Nav";
import useRedirectLogoutUsers from "../../hooks/redirectLogoutUsers";

function THotelReservation() {
    useRedirectLogoutUsers("/login");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [quantity, setQuantity] = useState("");
  const [pack, setPackage] = useState([]);
  const {tid } = useParams();
  const info = {
    // tid: tid,
    quantity: quantity,
    // from: from,
    // to: to,
  };

  useEffect(() => {
    async function fetchTour() {
      const result = await axios.get(`${BACKEND_URL}/tours/get-single/${tid}`);
        setPackage(result.data);
        console.log(result.data)
    }
    fetchTour();
  }, [tid]);

  async function subscribe(e) {
    e.preventDefault();

    try {
      const result = await axios.post(
        `${BACKEND_URL}/subscribe/subscribe-tour/${tid}`,
        info,
        { withCredentials: true }
      );
      console.log(result);
      if (result.data.msg) {
        window.alert(result.data.msg);
        window.location.href = result.data.paymentUrl;
      } else if (result.data) {
        window.alert(result.data.msg);
      } else {
        window.alert(result.data.message);
      }
    } catch (error) {
      console.error("There was an error making the reservation:", error);
    }
  }

  return (
    <>
      <Nav
        href0="/tourist"
        link1="Discover"
        href1="/tourist/destinations"
        link2="Blogs"
        href2="/tourist/see-blogs"
        link3="Hotels"
        href3="/tourist/see-hotels"
        link4="Tours"
        href4="/tourist/tours"
        link5="Shops"
        href5="/tourist/see-shops"
      />
      <div className="w-11/12 mx-auto mt-8">
        <p className="text-3xl font-bold mb-6">Subscription</p>
        <div className="flex flex-wrap md:flex-nowrap gap-6">
          <div className="w-full md:w-2/3 border-2 border-green-800 p-4 rounded bg-white shadow">
            <p className="text-2xl font-bold mb-4">{pack.package_name}</p>
            <p className="mb-4">{pack.package_description}</p>
            <div className="flex items-center gap-4 mb-4">
              <FontAwesomeIcon icon={faMoneyBill} className="text-green-800" />
              <p>{pack.package_price} Birr</p>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <FontAwesomeIcon icon={faBed} className="text-green-800" />
              <p>{pack.space_left} seats available</p>
            </div>
            <div className="flex overflow-x-scroll gap-2">
              {pack.image &&
                pack.image.map((image, index) => (
                  <img
                    key={index}
                    className="h-64 rounded"
                    src={image}
                    alt={`Package Image ${index}`}
                  />
                ))}
            </div>
          </div>
          <div className="w-full md:w-1/3 border-2 border-green-800 bg-gray-100 p-5 rounded shadow">
            <h1 className="font-bold text-center text-xl my-2">
              Enter The Information
            </h1>
            <div className="mb-4">
              <label htmlFor="amount" className="block mb-2">
                Number of Peoples:{" "}
              </label>
              <input
                id="amount"
                className="w-full p-2 border rounded mb-2"
                type="number"
                min="0"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(0, e.target.value))}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Your Total will be:</label>
              <p className="text-right text-xl">
                {quantity * pack.package_price} Birr
              </p>
            </div>
            <button
              className="bg-green-800 w-full py-2 text-white rounded-md"
              onClick={(e) => subscribe(e)}
            >
              Reserve Now
            </button>
            <div className="flex items-center gap-2 mt-4">
              <img src={key} alt="Key" className="w-6 h-6" />
              <p className="text-sm">
                Note: When you click reserve now, you will be redirected to
                Chapa payment page.
              </p>
            </div>
            <div className="flex justify-between mt-8">
              <img className="h-16" src={logo} alt="Logo" />
              <img className="h-16" src={chapalogo} alt="Chapa Logo" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default THotelReservation;
