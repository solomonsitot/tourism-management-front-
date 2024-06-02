import React, { useState } from "react";
import Nav from "../../components/Nav";
import useRedirectLogoutUsers from "../../hooks/redirectLogoutUsers";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function SProduct() {
  useRedirectLogoutUsers("/login");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productAmount, setProductAmount] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImages, setProductImages] = useState([null, null, null]);
  const [imagePreviews, setImagePreviews] = useState([null, null, null]);
  const navigate = useNavigate();

  const handleImageChange = (index, event) => {
    const files = [...productImages];
    const previews = [...imagePreviews];
    files[index] = event.target.files[0];
    previews[index] = URL.createObjectURL(event.target.files[0]);
    setProductImages(files);
    setImagePreviews(previews);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("product_name", productName);
    formData.append("product_price", productPrice);
    formData.append("product_quantity", productAmount);
    formData.append("product_description", productDescription);
    productImages.forEach((image, index) => {
      formData.append(`image${index + 1}`, image);
    });

    try {
      const response = await axios.post(
        `${BACKEND_URL}/goods/create-new`,
        formData,
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast(response.data.message);
      setTimeout(() => {
        navigate("/hotel manager");
      }, 3000);
    } catch (error) {
      console.error("Error creating Product:", error);
      toast.error("Error creating Product: " + error.message);
    }
  };

  return (
    <div>
      <Nav
        href0="/shop owner"
        link1="Add Product"
        href1="/shop owner/add-product"
        link2="Purchases"
        href2="/shop owner/see-purchasement"
      />
      <div className="min-h-screen mt-20 bg-gray-100 text-gray-800 p-4 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Add New item
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white text-gray-900 rounded-lg shadow-lg p-6 w-full max-w-lg space-y-6"
        >
          <div>
            <label
              className="block text-lg font-semibold mb-2"
              htmlFor="productName"
            >
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="flex space-x-4">
            <div className="flex-1">
              <label
                className="block text-lg font-semibold mb-2"
                htmlFor="productPrice"
              >
                Product Price
              </label>
              <input
                type="number"
                id="productPrice"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div className="flex-1">
              <label
                className="block text-lg font-semibold mb-2"
                htmlFor="productAmount"
              >
                Product Amount
              </label>
              <input
                type="number"
                id="productAmount"
                value={productAmount}
                onChange={(e) => setProductAmount(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
          </div>
          <div>
            <label
              className="block text-lg font-semibold mb-2"
              htmlFor="productDescription"
            >
              Product Description
            </label>
            <textarea
              id="productDescription"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-lg font-semibold mb-2">
              Product Images
            </label>
            {[0, 1, 2].map((index) => (
              <div key={index} className="mb-4">
                <input
                  type="file"
                  id={`file-input-${index}`}
                  className="hidden"
                  onChange={(event) => handleImageChange(index, event)}
                  accept="image/*"
                  required
                />
                <label
                  htmlFor={`file-input-${index}`}
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700 transition-colors"
                >
                  {productImages[index]
                    ? productImages[index].name
                    : `Choose Image ${index + 1}`}
                </label>
                {imagePreviews[index] && (
                  <img
                    src={imagePreviews[index]}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-48 object-cover mt-2 rounded"
                  />
                )}
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800 transition-colors"
          >
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default SProduct;
