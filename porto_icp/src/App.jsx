import React, { useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"

import Navbar from "./Navigation/Navbar"
import Homepage from "./Homepage/Homepage"
import Layanan from "./Layanan/Layanan"
import Produk from "./Produk/Produk"
import Tentang from "./Tentang/Tentang"
import Karir from "./Karir/Karir"

import Computer from "./Produk/Produk_Pages/Computer"
import Hardware from "./Produk/Produk_Pages/Hardware"
import Software from "./Produk/Produk_Pages/Software" 
import Sparepart from "./Produk/Produk_Pages/Sparepart"
import Smartphone from "./Produk/Produk_Pages/Smartphone"
import Laptop from "./Produk/Produk_Pages/Laptop"

import CookieConsent from "./components/CookieConsent"
import ScrollToTop from "./components/ScrollToTop"
import { database } from "./firebaseConfig"
import { push, ref, runTransaction } from "firebase/database"

function TrackVisitorActivity() {
  const location = useLocation()

  useEffect(() => {
    async function fetchAndPushVisitorData() {
      // Get current date and time in "DD-MM-YYYY HH:mm:ss" format
      const now = new Date()
      const day = String(now.getDate()).padStart(2, '0')
      const month = String(now.getMonth() + 1).padStart(2, '0') // Months are zero-based
      const year = now.getFullYear()
      const hours = String(now.getHours()).padStart(2, '0')
      const minutes = String(now.getMinutes()).padStart(2, '0')
      const seconds = String(now.getSeconds()).padStart(2, '0')
      const formattedDateTime = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`

      // Fetch visitor IP address from public API
      let ipAddress = "unknown"
      try {
        const response = await fetch("https://api.ipify.org?format=json")
        if (response.ok) {
          const data = await response.json()
          ipAddress = data.ip || "unknown"
        }
      } catch {
        // Ignore errors and keep ipAddress as "unknown"
      }

      const visitorData = {
        timestamp: formattedDateTime,
        path: location.pathname,
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        ipAddress: ipAddress,
      }
      const visitorsRef = ref(database, "visitors")
      push(visitorsRef, visitorData)
    }

    fetchAndPushVisitorData()
  }, [location])

  return null
}

function App() {
  useEffect(() => {
    const visitorCountRef = ref(database, "visitorCount");

    // Increment visitor count once per visit
    runTransaction(visitorCountRef, (currentCount) => {
      return (currentCount || 0) + 1;
    });

  }, []);

  return (
    <Router>
      <ScrollToTop />
      <TrackVisitorActivity />
      <Navbar />
      {/* Visitor count display hidden as per user request */}
      {/* <div style={{ position: "fixed", top: 10, right: 10, backgroundColor: "#eee", padding: "5px 10px", borderRadius: "5px", zIndex: 1000 }}>
        Visitors: {visitorCount}
      </div> */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/produk" element={<Produk />} />
        <Route path="/layanan" element={<Layanan />} />
        <Route path="/tentang" element={<Tentang />} />
        <Route path="/karir" element={<Karir />} />
        <Route path="/software" element={<Software />} />
        <Route path="/hardware" element={<Hardware />} />
        <Route path="/sparepart" element={<Sparepart />} />
        <Route path="/computer" element={<Computer />} />
        <Route path="/smartphone" element={<Smartphone />} />
        <Route path="/laptop" element={<Laptop />} />
        <Route path="*" element={<Homepage />} />
      </Routes>
      <CookieConsent />
    </Router>
  )
}

export default App
