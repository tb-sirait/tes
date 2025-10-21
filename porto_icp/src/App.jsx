import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./Navigation/Navbar";
import Homepage from "./Homepage/Homepage";
import Layanan from "./Layanan/Layanan";
import Produk from "./Produk/Produk";
import Tentang from "./Tentang/Tentang";
import Karir from "./Karir/Karir";
import BioLinks from "./BioLink/BioLink";
import Chatbot from "./Chatbot/Chatbot";

import Computer from "./Produk/Produk_Pages/Computer";
import Hardware from "./Produk/Produk_Pages/Hardware";
import Software from "./Produk/Produk_Pages/Software";
import Sparepart from "./Produk/Produk_Pages/Sparepart";
import Smartphone from "./Produk/Produk_Pages/Smartphone";
import Laptop from "./Produk/Produk_Pages/Laptop";
import Server from "./Produk/Produk_Pages/Server";

import CookieConsent from "./components/CookieConsent";
import ScrollToTop from "./components/ScrollToTop";
import { database } from "./firebaseConfig";
import { push, ref, runTransaction } from "firebase/database";

function TrackVisitorActivity() {
  const location = useLocation();

  useEffect(() => {
    async function fetchAndPushVisitorData() {
      const now = new Date();
      const day = String(now.getDate()).padStart(2, "0");
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const year = now.getFullYear();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      const formattedDateTime = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;

      let ipAddress = "unknown";
      let httpStatus = "unknown";
      let httpDetail = "";
      let country = "unknown";
      let region = "unknown";
      let city = "unknown";

      try {
        // 1️⃣ Ambil IP publik pengguna
        const response = await fetch("https://api.ipify.org?format=json");
        httpStatus = response.ok ? "OK" : `Error ${response.status}`;

        if (response.ok) {
          const data = await response.json();
          ipAddress = data.ip || "unknown";

          // 2️⃣ Ambil info lokasi berdasarkan IP
          const geoResponse = await fetch(`https://ipapi.co/${ipAddress}/json/`);
          if (geoResponse.ok) {
            const geoData = await geoResponse.json();
            country = geoData.country_name || "unknown";
            region = geoData.region || "unknown";
            city = geoData.city || "unknown";
          } else {
            httpDetail += ` | Failed to fetch location (status ${geoResponse.status})`;
          }
        } else {
          httpDetail = `Failed to fetch IP: HTTP ${response.status}`;
        }
      } catch (error) {
        httpStatus = "Error";
        httpDetail = error.message || "Unknown error";
        console.warn("Failed to fetch IP or location:", error);
      }

      // 3️⃣ Gabungkan semua data pengunjung
      const visitorData = {
        timestamp: formattedDateTime,
        path: location.pathname,
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        ipAddress: ipAddress,
        httpStatus: httpStatus,
        httpDetail: httpDetail,
        country: country,
        region: region,
        city: city,
      };

      // 4️⃣ Simpan ke Firebase
      const visitorsRef = ref(database, "visitors");
      push(visitorsRef, visitorData);
    }

    fetchAndPushVisitorData();
  }, [location]);

  return null;
}

function AppContent() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <Chatbot />
      <TrackVisitorActivity />
      {/* Kondisi: Navbar hanya muncul kalau bukan di /telusuri-kami */}
      {location.pathname !== "/telusuri-kami" && <Navbar />}
      <Routes>
        <Route path="/" element={<Homepage />} />

        {/* Produk detail */}
        <Route path="/produk" element={<Produk />} />
        <Route path="/produk/:brand/:id" element={<Produk />} />


        {/* Software */}
        <Route path="/produk/software" element={<Software />} />
        <Route path="/produk/software/:id" element={<Software />} />

        {/* Hardware */}
        <Route path="/produk/hardware" element={<Hardware />} />
        <Route path="/produk/hardware/:brand/:id" element={<Hardware />} />

        {/* Sparepart */}
        <Route path="/produk/sparepart" element={<Sparepart />} />
        <Route path="/produk/sparepart/:id" element={<Sparepart />} />

        {/* Computer */}
        <Route path="/produk/computer" element={<Computer />} />
        <Route path="/produk/computer/:brand/:id" element={<Computer />} />

        {/* Smartphone */}
        <Route path="/produk/smartphone" element={<Smartphone />} />
        <Route path="/produk/smartphone/:brand/:id" element={<Smartphone />} />

        {/* Laptop */}
        <Route path="/produk/laptop" element={<Laptop />} />
        <Route path="/produk/laptop/:brand/:id" element={<Laptop />} />

        {/* Server */}
        <Route path="/produk/server" element={<Server />} />
        <Route path="/produk/server/:brand/:id" element={<Server />} />

        <Route path="/telusuri-kami" element={<BioLinks />} />

        <Route path="/layanan" element={<Layanan />} />

        <Route path="/tentang" element={<Tentang />} />

        <Route path="/karir" element={<Karir />} />

        {/* fallback */}
        <Route path="*" element={<Homepage />} />
      </Routes>

      {/* CookieConsent tetap muncul di semua halaman */}
      <CookieConsent />
    </>
  );
}

function App() {
  useEffect(() => {
    const visitorCountRef = ref(database, "visitorCount");
    runTransaction(visitorCountRef, (currentCount) => {
      return (currentCount || 0) + 1;
    });
  }, []);

  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
