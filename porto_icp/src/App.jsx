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
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        if (response.ok) {
          const data = await response.json();
          ipAddress = data.ip || "unknown";
        }
      } catch {
        console.warn("Failed to fetch IP address");
      }

      const visitorData = {
        timestamp: formattedDateTime,
        path: location.pathname,
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        ipAddress: ipAddress,
      };
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
      <TrackVisitorActivity />
      {/* Kondisi: Navbar hanya muncul kalau bukan di /telusuri-kami */}
      {location.pathname !== "/telusuri-kami" && <Navbar />}

      <Routes>
  <Route path="/" element={<Homepage />} />
  <Route path="/produk" element={<Produk />} />

  {/* Produk detail */}
  <Route path="/produk/:brand/:id" element={<Produk />} />

  <Route path="/layanan" element={<Layanan />} />
  <Route path="/tentang" element={<Tentang />} />
  <Route path="/karir" element={<Karir />} />

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
