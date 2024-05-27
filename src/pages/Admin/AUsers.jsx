import axios from "axios";
import React, { useEffect, useState } from "react";
import useRedirectLogoutUsers from "../../hooks/redirectLogoutUsers";
import Nav from "../../components/Nav";

function AUsers() {
  useRedirectLogoutUsers("/login");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [users, setUsers] = useState([]);
  const [cont, setCont] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/user/get-all-users`, {
        withCredentials: true,
      })
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, [cont]);

  useEffect(() => {
    if (selectedUser) {
      axios
        .get(`${BACKEND_URL}/user/get-single-user`, {
          params: { id: selectedUser },
          withCredentials: true,
        })
        .then((response) => {
          setUserDetails(response.data);
        })
        .catch((error) => console.error("Error fetching user details:", error));
    }
  }, [selectedUser]);

  async function verifyUser(userId) {
    try {
      const result = await axios.put(
        `${BACKEND_URL}/user/verify-user`,
        {
          id: userId,
        },
        { withCredentials: true }
      );
      console.log(result.data);
      setCont(!cont);
    } catch (error) {
      console.error("Error verifying user:", error);
    }
  }

  const banUser = async (userId) => {
    try {
      await axios
        .put(
          `${BACKEND_URL}/user/ban-user`,
          {
            id: userId,
          },
          { withCredentials: true }
        )
        .then((response) => {
          console.log(response.data);
        });
      setCont(!cont);
    } catch (error) {
      console.error("Error banning user:", error);
    }
  };

  const handleUserClick = (userId) => {
    setSelectedUser(userId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    setUserDetails(null);
  };

  return (
    <>
      <Nav
        href0="/admin"
        link1="Destinations"
        href1="/admin/add-destination"
        link2="Blogs"
        href2="/admin/add-blog"
        link3="Users"
        href3="/admin/manage-user"
      />
      <div className="min-h-screen flex flex-col items-center justify-center bg-green-950">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
          <h1 className="text-3xl font-bold mb-4 text-green-950">Users List</h1>
          <ul className="space-y-4">
            {users.map((user, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-4 border-b border-gray-300 bg-gray-50 hover:bg-gray-100 transition-colors rounded-md cursor-pointer"
                onClick={() => handleUserClick(user._id)}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-lg font-semibold text-green-950">
                    {user.full_name} ({user.role})
                  </div>
                  <div className="text-sm text-gray-500">===={">"}</div>
                  <div
                    className={`text-sm ${
                      user.verification_status === "verified"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {user.verification_status}
                  </div>
                </div>
                <div className="space-x-4">
                  <button
                    className="bg-green-950 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
                    onClick={(e) => {
                      e.stopPropagation();
                      verifyUser(user._id);
                    }}
                  >
                    Verify
                  </button>
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
                    onClick={(e) => {
                      e.stopPropagation();
                      banUser(user._id);
                    }}
                  >
                    Ban
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {isModalOpen && userDetails && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md md:max-w-lg lg:max-w-xl max-h-screen overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4 text-green-950">
                User Details
              </h2>
              {userDetails.body.profile_image && (
                <img
                  src={userDetails.body.profile_image}
                  alt="Profile"
                  className="mb-4 rounded-full mx-auto w-24 h-24"
                />
              )}
              {userDetails.body.full_name && (
                <p className="text-green-950">
                  <strong>Name:</strong> {userDetails.body.full_name}
                </p>
              )}
              {userDetails.body.email && (
                <p className="text-green-950">
                  <strong>Email:</strong> {userDetails.body.email}
                </p>
              )}
              {userDetails.body.role && (
                <p className="text-green-950">
                  <strong>Role:</strong> {userDetails.body.role}
                </p>
              )}
              {userDetails.body.verification_status && (
                <p className="text-green-950">
                  <strong>Verification Status:</strong>{" "}
                  {userDetails.body.verification_status}
                </p>
              )}
              {userDetails.body.company_name && (
                <p className="text-green-950">
                  <strong>Company Name:</strong> {userDetails.body.company_name}
                </p>
              )}
              {userDetails.body.description && (
                <p className="text-green-950">
                  <strong>Description:</strong> {userDetails.body.description}
                </p>
              )}
              {userDetails.body.phone_number && (
                <p className="text-green-950">
                  <strong>Phone Number:</strong> {userDetails.body.phone_number}
                </p>
              )}
              {userDetails.body.passport_id && (
                <p className="text-green-950">
                  <strong>Passport ID:</strong> {userDetails.body.passport_id}
                </p>
              )}
              {userDetails.body.bussiness_license && (
                <p className="text-green-950">
                  <strong>Business License:</strong>{" "}
                  <a
                    href={userDetails.body.bussiness_license}
                    className="text-golden-600"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View License
                  </a>
                </p>
              )}
              {userDetails.body.images &&
                userDetails.body.images.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    {userDetails.body.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Image ${index + 1}`}
                        className="rounded-lg"
                      />
                    ))}
                  </div>
                )}
              <button
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded mt-4"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AUsers;
