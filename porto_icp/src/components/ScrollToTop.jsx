import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Cek apakah halaman memiliki hero section
    const heroSection = document.querySelector(".home-hero-section");

    if (heroSection) {
      // Jika ada hero section, scroll ke posisi hero section
      heroSection.scrollIntoView({
        behavior: "instant", // gunakan 'instant' agar langsung, atau 'smooth' untuk animasi
        block: "start",
      });
    } else {
      // Jika tidak ada hero section, scroll ke paling atas
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    }
  }, [pathname]);

  return null;
}
