import logo from "./logo.svg";

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Logout from "./pages/logout";
import Navebar from "./components/navebar";
import Home2 from "./pages/Home2";
import Booking from "./pages/booking";
import Profile from "./pages/profile";
import EditProfile from "./pages/edit_profile";
import Mybooking from "./pages/mybooking";
// import BookingPage from "./pages/bookingPage.js";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="signup/" element={<Signup />} />
      <Route path="login/" element={<Login />} />
      <Route path="logout/" element={<Logout />} />
      <Route path="navebar/" element={<Navebar />} />
      <Route path="home2/" element={<Home2 />} />
      <Route path="/book/:id" element={<Booking />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="edit_profile/" element={<EditProfile />} />
      <Route path="/mybooking" element={<Mybooking />} />
      {/* <Route path="/book/:id" element={<BookingPage />} /> */}
    </Routes>
  );
}

export default App;
