import React from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import SubProduk from "../SubProduct/Subproduk.jsx";
import DetailProduk from "../SubProduct/DetailProduk.jsx";
import hardwareData from "../hardware.json";

// ─── SEO constants ────────────────────────────────────────────────────────────
const BASE_URL = "https://www.infoduta.com";
const SITE_NAME = "Infoduta Computindo Perkasa";

const HARDWARE_SEO = {
  title: `Produk Hardware Terbaik untuk Bisnis & Kantor | ${SITE_NAME}`,
  description:
    "Temukan berbagai pilihan Hardware terbaik — printer, scanner, networking, UPS, proyektor — dengan harga kompetitif. Cocok untuk kebutuhan perusahaan maupun personal. Cek katalog lengkap kami.",
  keywords:
    "hardware komputer, perangkat keras, printer bisnis, scanner kantor, networking, switch, router, UPS, proyektor, beli hardware jakarta, Infoduta Computindo Perkasa, hardware HP, hardware Canon, hardware Epson",
  canonicalUrl: `${BASE_URL}/produk/hardware`,
  ogImage: `${BASE_URL}/og/hardware-catalog.jpg`,
};

// ─── Helper: konversi path gambar lokal → URL publik ─────────────────────────
const toPublicImageUrl = (imagePath) => {
  if (!imagePath) return null;
  const cleaned = imagePath.replace(/^\/src\//, "/");
  return `${BASE_URL}${cleaned}`;
};

// ─── Helper: buat brand slug untuk URL ───────────────────────────────────────
const toBrandSlug = (brand) => brand.replace(/\s+/g, "-");

// ─── Helper: serialize JSON-LD ────────────────────────────────────────────────
const toJsonLd = (obj) => JSON.stringify(obj);

// ─── JSON-LD: Organization (dipakai di katalog & detail) ─────────────────────
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: "Indonesian",
  },
};

// ─── JSON-LD: BreadcrumbList (katalog) ───────────────────────────────────────
const catalogBreadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Beranda",
      item: BASE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Produk",
      item: `${BASE_URL}/produk`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Hardware",
      item: HARDWARE_SEO.canonicalUrl,
    },
  ],
};

// ─── JSON-LD: ItemList katalog — hanya ListItem + URL, tanpa offers/harga ─────
// Google akan crawl tiap URL ini secara individual untuk ambil data Product
// dari halaman detail masing-masing. Ini cara paling aman dan bebas error GSC.
const hardwareCatalogJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Katalog Hardware — Infoduta Computindo Perkasa",
  description: HARDWARE_SEO.description,
  url: HARDWARE_SEO.canonicalUrl,
  numberOfItems: hardwareData.length,
  itemListElement: hardwareData.map((product, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: product.name,
    url: `${BASE_URL}/produk/hardware/${toBrandSlug(product.brand)}/${product.id}`,
  })),
};

// ─── JSON-LD: WebPage katalog ─────────────────────────────────────────────────
const catalogWebPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: HARDWARE_SEO.title,
  description: HARDWARE_SEO.description,
  url: HARDWARE_SEO.canonicalUrl,
  inLanguage: "id-ID",
  isPartOf: {
    "@type": "WebSite",
    name: SITE_NAME,
    url: BASE_URL,
  },
  breadcrumb: catalogBreadcrumbJsonLd,
};

// ─── Helmet: halaman katalog ──────────────────────────────────────────────────
const HardwareCatalogHelmet = () => (
  <Helmet>
    <html lang="id" />
    <title>{HARDWARE_SEO.title}</title>
    <meta name="description" content={HARDWARE_SEO.description} />
    <meta name="keywords" content={HARDWARE_SEO.keywords} />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href={HARDWARE_SEO.canonicalUrl} />

    {/* Open Graph */}
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content={SITE_NAME} />
    <meta property="og:title" content={HARDWARE_SEO.title} />
    <meta property="og:description" content={HARDWARE_SEO.description} />
    <meta property="og:url" content={HARDWARE_SEO.canonicalUrl} />
    <meta property="og:image" content={HARDWARE_SEO.ogImage} />
    <meta property="og:locale" content="id_ID" />

    {/* Twitter Card */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={HARDWARE_SEO.title} />
    <meta name="twitter:description" content={HARDWARE_SEO.description} />
    <meta name="twitter:image" content={HARDWARE_SEO.ogImage} />

    {/* JSON-LD Structured Data */}
    <script type="application/ld+json">{toJsonLd(catalogWebPageJsonLd)}</script>
    <script type="application/ld+json">{toJsonLd(catalogBreadcrumbJsonLd)}</script>
    <script type="application/ld+json">{toJsonLd(hardwareCatalogJsonLd)}</script>
    <script type="application/ld+json">{toJsonLd(organizationJsonLd)}</script>
  </Helmet>
);

// ─── Helmet: halaman detail produk ───────────────────────────────────────────
const HardwareDetailHelmet = ({ brand, id }) => {
  const brandDecoded = decodeURIComponent(brand).replace(/-/g, " ");
  const detailUrl = `${BASE_URL}/produk/hardware/${brand}/${id}`;

  // Ambil data produk dari hardware.json berdasarkan id
  const product = hardwareData.find((p) => String(p.id) === String(id));

  const productName = product?.name || `Hardware ${brandDecoded}`;
  const productDesc =
    product?.description ||
    `Spesifikasi dan detail hardware ${brandDecoded} — temukan informasi lengkap produk ini di katalog Infoduta Computindo Perkasa.`;
  const productType = product?.type || "Hardware";
  const productImage = product?.images
    ? toPublicImageUrl(product.images)
    : null;

  const detailTitle = `${productName} | ${SITE_NAME}`;

  // ── Breadcrumb detail ───────────────────────────────────────────────────────
  const detailBreadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: BASE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Produk",
        item: `${BASE_URL}/produk`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Hardware",
        item: HARDWARE_SEO.canonicalUrl,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: productName,
        item: detailUrl,
      },
    ],
  };

  // ── Product JSON-LD — tanpa offers/harga, ganti potentialAction ─────────────
  // Menggunakan "CommunicateAction" sebagai sinyal bahwa produk tersedia
  // untuk ditanyakan/dipesan, tanpa mensyaratkan harga dari schema.org
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: productName,
    description: productDesc,
    category: productType,
    brand: { "@type": "Brand", name: brandDecoded },
    url: detailUrl,
    ...(productImage && { image: productImage }),

    // potentialAction menggantikan offers — tidak butuh harga,
    // tapi tetap memberi sinyal ke Google bahwa produk bisa dihubungi/dipesan
    potentialAction: {
      "@type": "CommunicateAction",
      name: "Hubungi untuk Informasi Harga",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/kontak?produk=${encodeURIComponent(productName)}`,
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
    },
  };

  return (
    <Helmet>
      <html lang="id" />
      <title>{detailTitle}</title>
      <meta name="description" content={productDesc} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={detailUrl} />

      {/* Open Graph */}
      <meta property="og:type" content="product" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={detailTitle} />
      <meta property="og:description" content={productDesc} />
      <meta property="og:url" content={detailUrl} />
      <meta property="og:locale" content="id_ID" />
      {productImage && <meta property="og:image" content={productImage} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={detailTitle} />
      <meta name="twitter:description" content={productDesc} />
      {productImage && <meta name="twitter:image" content={productImage} />}

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">{toJsonLd(productJsonLd)}</script>
      <script type="application/ld+json">{toJsonLd(detailBreadcrumbJsonLd)}</script>
      <script type="application/ld+json">{toJsonLd(organizationJsonLd)}</script>
    </Helmet>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────
const Hardware = () => {
  const { brand, id } = useParams();

  // ── Halaman Detail Produk ──
  if (brand && id) {
    return (
      <>
        <HardwareDetailHelmet brand={brand} id={id} />
        <DetailProduk dataSource="../hardware.json" />
      </>
    );
  }

  // ── Halaman Katalog ──
  return (
    <>
      <HardwareCatalogHelmet />
      <SubProduk
        jenisBarang="hardware"
        title="Hardware"
        description="Temukan berbagai pilihan Hardware dengan kualitas terbaik yang sesuai dengan kebutuhan perusahaan Anda."
        dataSource="../hardware.json"
      />
    </>
  );
};

export default Hardware;