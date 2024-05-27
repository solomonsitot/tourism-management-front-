import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import Cridential from "../pages/Auth/Cridential";
import THome from "../pages/Tourist/THome";
import AHome from "../pages/Admin/AHome";
import ABlogs from "../pages/Admin/ABlogs";
import ADestinations from "../pages/Admin/ADestinations";
import AUsers from "../pages/Admin/AUsers";
import TDestinations from "../pages/Tourist/TDestinations";
import TBlogs from "../pages/Tourist/TBlogs";
import THotels from "../pages/Tourist/THotels";
import TTours from "../pages/Tourist/TTours";
import HHome from "../pages/Hotel/HHome";
import HRoom from "../pages/Hotel/HRoom";
import HReservations from "../pages/Hotel/HReservations";
import THotelDetail from "../pages/Tourist/THotelDetail";
import THotelReservation from "../pages/Tourist/THotelReservation";
import ABlogEdit from "../pages/Admin/ABlogEdit";
import ADestinationEdit from "../pages/Admin/ADestinationEdit";
import TGHome from "../pages/TourGuide/TGHome";
import TGTours from "../pages/TourGuide/TGTours";
import TGSubscriptions from "../pages/TourGuide/TGSubscriptions";
import TGTourEdit from "../pages/TourGuide/TGTourEdit";
import HRoomEdit from "../pages/Hotel/HRoomEdit";
import ThankYou from "../components/ThankYou";
import TTourDetail from "../pages/Tourist/TTourDetail";
import TTourSubscription from "../pages/Tourist/TTourSubscription";

function Layout() {
  return (
    // <Cridential/>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Signup />} />
      <Route path="/cridentials/:role?/:id?" element={<Cridential />} />
      <Route path="/thanks" element={<ThankYou />} />
      <Route path="/tourist">
        <Route path="" element={<THome />} />
        <Route path="destinations" element={<TDestinations />} />
        <Route path="see-blogs" element={<TBlogs />} />
        <Route path="see-hotels" element={<THotels />} />
        <Route path="see-hotels/detail/:id?" element={<THotelDetail />} />
        <Route
          path="see-hotels/detail/:id?/reserve/:rid?"
          element={<THotelReservation />}
        />
        <Route path="tours" element={<TTours />} />
        <Route path="tours/detail/:id?" element={<TTourDetail />} />
        <Route
          path="tours/detail/:id?/subscribe/:tid?"
          element={<TTourSubscription />}
        />
      </Route>
      <Route path="/admin">
        <Route path="" element={<AHome />} />
        <Route path="add-blog" element={<ABlogs />} />
        <Route path="add-destination" element={<ADestinations />} />
        <Route path="manage-user" element={<AUsers />} />
        <Route path="blogs/edit/:id?" element={<ABlogEdit />} />
        <Route path="destinations/edit/:id?" element={<ADestinationEdit />} />
      </Route>
      <Route path="/hotel manager">
        <Route path="" element={<HHome />} />
        <Route path="add-room" element={<HRoom />} />
        <Route path="edit-room/:id?" element={<HRoomEdit />} />
        <Route path="see-reservation" element={<HReservations />} />
      </Route>
      <Route path="/tour guide">
        <Route path="" element={<TGHome />} />
        <Route path="add-tour" element={<TGTours />} />
        <Route path="edit-tour/:id?" element={<TGTourEdit />} />
        <Route path="see-subscriptions" element={<TGSubscriptions />} />
      </Route>
    </Routes>
  );
}

export default Layout;
