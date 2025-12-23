import React, { useEffect, useRef } from "react";
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

// ✅ SOLUSI 1: Cache IP dan Geolocation di Session Storage
const CACHE_KEY = "visitor_geo_cache";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 jam

function getGeoCache() {
  try {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const data = JSON.parse(cached);
    const now = Date.now();

    // Check if cache expired
    if (now - data.timestamp > CACHE_DURATION) {
      sessionStorage.removeItem(CACHE_KEY);
      return null;
    }

    return data;
  } catch {
    return null;
  }
}

function setGeoCache(data) {
  try {
    sessionStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        ...data,
        timestamp: Date.now(),
      }),
    );
  } catch (error) {
    console.warn("Failed to cache geo data:", error);
  }
}

function TrackVisitorActivity() {
  const location = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // ✅ SOLUSI 2: Skip duplicate calls in React Strict Mode
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

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
      let httpStatus = "OK";
      let httpDetail = "";
      let country = "unknown";
      let region = "unknown";
      let city = "unknown";

      // ✅ SOLUSI 3: Check cache first
      const cachedGeo = getGeoCache();

      if (cachedGeo) {
        // Gunakan data dari cache
        ipAddress = cachedGeo.ipAddress;
        country = cachedGeo.country;
        region = cachedGeo.region;
        city = cachedGeo.city;
        httpDetail = "from_cache";
      } else {
        try {
          // 1️⃣ Ambil IP publik pengguna
          const ipResponse = await fetch("https://api.ipify.org?format=json", {
            signal: AbortSignal.timeout(5000), // timeout 5 detik
          });

          if (ipResponse.ok) {
            const ipData = await ipResponse.json();
            ipAddress = ipData.ip || "unknown";

            // ✅ SOLUSI 4: Gunakan alternatif API atau skip jika error
            try {
              // Coba ipapi.co
              const geoResponse = await fetch(
                `https://ipapi.co/${ipAddress}/json/`,
                {
                  signal: AbortSignal.timeout(5000),
                },
              );

              if (geoResponse.ok) {
                const geoData = await geoResponse.json();

                // Check if we hit rate limit (ipapi.co returns error in JSON)
                if (geoData.error) {
                  throw new Error(
                    `ipapi.co error: ${geoData.reason || "rate limit"}`,
                  );
                }

                country = geoData.country_name || "unknown";
                region = geoData.region || "unknown";
                city = geoData.city || "unknown";

                // Cache successful result
                setGeoCache({ ipAddress, country, region, city });
              } else if (geoResponse.status === 429) {
                // ✅ SOLUSI 5: Fallback ke API alternatif
                httpStatus = "Rate Limited";
                httpDetail = "ipapi.co rate limit - using fallback";

                try {
                  // Fallback: ip-api.com (45 req/minute, gratis unlimited daily)
                  const fallbackResponse = await fetch(
                    `http://ip-api.com/json/${ipAddress}`,
                    { signal: AbortSignal.timeout(5000) },
                  );

                  if (fallbackResponse.ok) {
                    const fallbackData = await fallbackResponse.json();
                    country = fallbackData.country || "unknown";
                    region = fallbackData.regionName || "unknown";
                    city = fallbackData.city || "unknown";

                    // Cache fallback result
                    setGeoCache({ ipAddress, country, region, city });
                  }
                } catch (fallbackError) {
                  console.warn("Fallback API also failed:", fallbackError);
                  httpDetail += ` | fallback failed: ${fallbackError.message}`;
                }
              } else {
                httpDetail = `Geolocation failed: HTTP ${geoResponse.status}`;
              }
            } catch (geoError) {
              httpStatus = "Geo Error";
              httpDetail = geoError.message || "Failed to fetch geolocation";
              console.warn("Geolocation error:", geoError);
              // Tetap simpan data dengan IP saja
            }
          } else {
            httpStatus = `IP Fetch Error ${ipResponse.status}`;
            httpDetail = `Failed to fetch IP`;
          }
        } catch (error) {
          httpStatus = "Network Error";
          httpDetail = error.message || "Unknown error";
          console.warn("Failed to fetch visitor data:", error);
        }
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
      try {
        const visitorsRef = ref(database, "visitors");
        await push(visitorsRef, visitorData);
      } catch (firebaseError) {
        console.error("Firebase error:", firebaseError);
      }
    }

    // ✅ SOLUSI 6: Debounce untuk avoid spam calls
    const timer = setTimeout(() => {
      fetchAndPushVisitorData();
    }, 300);

    return () => clearTimeout(timer);
  }, [location.pathname]); // Only trigger on pathname change

  return null;
}

// Di file router utama Anda (App.jsx)
// Urutkan routes dengan lebih spesifik terlebih dahulu

function AppContent() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <Chatbot />
      <TrackVisitorActivity />
      {location.pathname !== "/telusuri-kami" && <Navbar />}
      <Routes>
        <Route path="/" element={<Homepage />} />

        {/* Route kategori harus SEBELUM route dynamic params */}
        {/* Software */}
        <Route path="/produk/software" element={<Software />} />
        <Route path="/produk/software/:brand/:id" element={<Software />} />

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

        {/* Produk utama - HARUS SETELAH semua kategori */}
        <Route path="/produk" element={<Produk />} />
        <Route path="/produk/:brand/:id" element={<Produk />} />

        <Route path="/telusuri-kami" element={<BioLinks />} />
        <Route path="/layanan" element={<Layanan />} />
        <Route path="/tentang" element={<Tentang />} />
        <Route path="/karir" element={<Karir />} />

        {/* fallback */}
        <Route path="*" element={<Homepage />} />
      </Routes>

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
