import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav";
import useRedirectLogoutUsers from "../../hooks/redirectLogoutUsers";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function SProductEdit() {
  useRedirectLogoutUsers("/login");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productAmount, setProductAmount] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImages, setProductImages] = useState([null, null, null]);
  const [currentImages, setCurrentImages] = useState(["", "", ""]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/goods/get-single/${id}`,
          {
            withCredentials: true,
          }
        );
        const product = response.data;
        setProductName(product.product_name);
        setProductPrice(product.product_price);
        setProductAmount(product.product_quantity);
        setProductDescription(product.product_description);
        setCurrentImages(product.product_images);
      } catch (error) {
        toast.error("Error fetching product details: " + error.message);
      }
    };
    fetchProduct();
  }, [id]);

  const handleImageChange = (index, event) => {
    const files = [...productImages];
    files[index] = event.target.files[0];
    setProductImages(files);

    const reader = new FileReader();
    reader.onload = (e) => {
      const newCurrentImages = [...currentImages];
      newCurrentImages[index] = e.target.result;
      setCurrentImages(newCurrentImages);
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("product_name", productName);
    formData.append("product_price", productPrice);
    formData.append("product_quantity", productAmount);
    formData.append("product_description", productDescription);
    productImages.forEach((image, index) => {
      if (image) {
        formData.append(`image${index + 1}`, image);
      }
    });

    try {
      const response = await axios.put(
        `${BACKEND_URL}/goods/update/${id}`,
        formData,
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(response.data.message);
      setTimeout(() => {
        navigate("/shop owner");
      }, 3000);
    } catch (error) {
      toast.error("Error updating product: " + error.message);
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
            <div className="min-h-screen mt-20 bg-green-950 text-white p-4 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-center text-golden mb-8">
          Edit Product
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white text-green-950 rounded-lg shadow-lg p-6 w-full max-w-lg space-y-6"
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
          <div>
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
          <div>
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
            {currentImages.map((img, index) => (
              <div key={index} className="mb-4">
                {img && (
                  <img
                    src={img}
                    alt={`Product Image ${index + 1}`}
                    className="mb-2 w-full h-32 object-cover rounded"
                  />
                )}
                <input
                  type="file"
                  onChange={(event) => handleImageChange(index, event)}
                  className="w-full px-3 py-2 border rounded"
                  accept="image/*"
                />
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="w-full bg-golden text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default SProductEdit;
