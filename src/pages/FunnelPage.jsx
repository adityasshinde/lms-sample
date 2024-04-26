import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../asset/images/takshLogo.png";

function NamePhonePage() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false); // State to manage loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phoneNumber || !city || !email || loading) {
      // Check loading state
      return;
    }
    setLoading(true); // Set loading state to true during submission

    // Phone number regex validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      toast.error("Please enter a valid phone number", {
        position: "top-center",
        autoClose: 2000,
      });
      setLoading(false); // Reset loading state
      return;
    }

    // Name regex validation
    const nameRegex = /^[a-zA-Z\s]*$/;
    if (!nameRegex.test(name)) {
      toast.error("Please enter a valid name", {
        position: "top-center",
        autoClose: 2000,
      });
      setLoading(false); // Reset loading state
      return;
    }

    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address", {
        position: "top-center",
        autoClose: 2000,
      });
      setLoading(false); // Reset loading state
      return;
    }

    const formData = { name, phone: phoneNumber, city, email };

    try {
      await axios.post(
        "https://sheet.best/api/sheets/07ca20d2-46c4-4c69-b085-fbe43ea6ee8a",
        formData
      );
      toast.success("Form submitted successfully", {
        position: "top-center",
        autoClose: 2000,
      });
      setName("");
      setPhoneNumber("");
      setCity("");
      setEmail("");
      window.location.href =
        "https://drive.google.com/file/d/10uFdHOKYTCR8MMGCrRCokMWSSGdOAArh/view?usp=sharing";
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("An error occurred, please try again later", {
        position: "top-center",
        autoClose: 2000,
      });
    } finally {
      setLoading(false); // Reset loading state after submission
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#2B527A]">
      <div className="max-w-md bg-white p-8 rounded-lg shadow-md">
        <img src={logo} alt="logo" className="w-36 mx-auto mb-8" />
        <h1 className="text-2xl font-bold text-center mb-4">
          Access Maths Study Material
        </h1>
        <p className="text-center mb-8">
          Please provide your information to access the eBook.
        </p>
        <form name="google-sheet" onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Your Phone Number"
            maxLength={10}
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Your City"
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            disabled={loading} // Disable button when loading
            className={`w-full mt-8 px-4 py-2 bg-[#207EB8] text-white rounded-md focus:outline-none focus:bg-blue-600 ${
              loading && "opacity-50 cursor-not-allowed"
            }`} // Apply styles based on loading state
          >
            {loading ? "Loading..." : "Next"}{" "}
            {/* Show loading text if loading */}
          </button>
        </form>
      </div>
    </div>
  );
}

export default NamePhonePage;
