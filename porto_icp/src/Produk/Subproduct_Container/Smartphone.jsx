import React from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import SubProduk from "../SubProduct/Subproduk.jsx";
import DetailProduk from "../SubProduct/DetailProduk.jsx";
import produkData from "../produk.json";

// ─── SEO constants ────────────────────────────────────────────────────────────
const BASE_URL = "https://www.infoduta.com";
const SITE_NAME = "Infoduta Computindo Perkasa";

const SMARTPHONE_SEO = {
  title: `Produk Smartphone Terbaik untuk Bisnis & Personal | ${SITE_NAME}`,
  description:
    "Temukan berbagai pilihan Smartphone terbaik — iPhone, Samsung, dan brand terpercaya lainnya — dengan harga kompetitif. Cocok untuk kebutuhan bisnis maupun personal. Cek katalog lengkap kami.",
  keywords:
    "smartphone bisnis, handphone terbaik, iPhone, Samsung Galaxy, beli smartphone jakarta, mobile phone kantor, smartphone enterprise, Infoduta Computindo Perkasa, Apple iPhone, Samsung, Xiaomi",
  canonicalUrl: `${BASE_URL}/produk/smartphone`,
  ogImage: `${BASE_URL}/og/smartphone-catalog.jpg`,
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

// ─── Filter hanya produk smartphone dari produk.json ─────────────────────────
const smartphoneData = produkData.filter(
  (p) => p.jenis?.toLowerCase() === "smartphone",
);

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
      name: "Smartphone",
      item: SMARTPHONE_SEO.canonicalUrl,
    },
  ],
};

// ─── JSON-LD: ItemList katalog — hanya ListItem + URL, tanpa offers/harga ─────
// Google akan crawl tiap URL ini secara individual untuk ambil data Product
// dari halaman detail masing-masing. Ini cara paling aman dan bebas error GSC.
const smartphoneCatalogJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Katalog Smartphone — Infoduta Computindo Perkasa",
  description: SMARTPHONE_SEO.description,
  url: SMARTPHONE_SEO.canonicalUrl,
  numberOfItems: smartphoneData.length,
  itemListElement: smartphoneData.map((product, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: product.name,
    url: `${BASE_URL}/produk/smartphone/${toBrandSlug(product.brand)}/${product.id}`,
  })),
};

// ─── JSON-LD: WebPage katalog ─────────────────────────────────────────────────
const catalogWebPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: SMARTPHONE_SEO.title,
  description: SMARTPHONE_SEO.description,
  url: SMARTPHONE_SEO.canonicalUrl,
  inLanguage: "id-ID",
  isPartOf: {
    "@type": "WebSite",
    name: SITE_NAME,
    url: BASE_URL,
  },
  breadcrumb: catalogBreadcrumbJsonLd,
};

// ─── Helmet: halaman katalog ──────────────────────────────────────────────────
const SmartphoneCatalogHelmet = () => (
  <Helmet>
    <html lang="id" />
    <title>{SMARTPHONE_SEO.title}</title>
    <meta name="description" content={SMARTPHONE_SEO.description} />
    <meta name="keywords" content={SMARTPHONE_SEO.keywords} />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href={SMARTPHONE_SEO.canonicalUrl} />

    {/* Open Graph */}
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content={SITE_NAME} />
    <meta property="og:title" content={SMARTPHONE_SEO.title} />
    <meta property="og:description" content={SMARTPHONE_SEO.description} />
    <meta property="og:url" content={SMARTPHONE_SEO.canonicalUrl} />
    <meta property="og:image" content={SMARTPHONE_SEO.ogImage} />
    <meta property="og:locale" content="id_ID" />

    {/* Twitter Card */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={SMARTPHONE_SEO.title} />
    <meta name="twitter:description" content={SMARTPHONE_SEO.description} />
    <meta name="twitter:image" content={SMARTPHONE_SEO.ogImage} />

    {/* JSON-LD Structured Data */}
    <script type="application/ld+json">{toJsonLd(catalogWebPageJsonLd)}</script>
    <script type="application/ld+json">
      {toJsonLd(catalogBreadcrumbJsonLd)}
    </script>
    <script type="application/ld+json">
      {toJsonLd(smartphoneCatalogJsonLd)}
    </script>
    <script type="application/ld+json">{toJsonLd(organizationJsonLd)}</script>
  </Helmet>
);

// ─── Helmet: halaman detail produk ───────────────────────────────────────────
const SmartphoneDetailHelmet = ({ brand, id }) => {
  const brandDecoded = decodeURIComponent(brand).replace(/-/g, " ");
  const detailUrl = `${BASE_URL}/produk/smartphone/${brand}/${id}`;

  // Ambil data produk dari produk.json berdasarkan id & jenis smartphone
  const product = produkData.find(
    (p) =>
      String(p.id) === String(id) && p.jenis?.toLowerCase() === "smartphone",
  );

  const productName = product?.name || `Smartphone ${brandDecoded}`;
  const productDesc =
    product?.description ||
    `Spesifikasi dan detail smartphone ${brandDecoded} — temukan informasi lengkap produk ini di katalog Infoduta Computindo Perkasa.`;
  const productImage = product?.images?.[0]
    ? toPublicImageUrl(product.images[0])
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
        name: "Smartphone",
        item: SMARTPHONE_SEO.canonicalUrl,
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
  // Specs smartphone lengkap (cpu, ram, storage, gpu, display, camera, battery)
  // tetap dipertahankan via additionalProperty — tidak membutuhkan harga
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: productName,
    description: productDesc,
    category: "Smartphone",
    brand: { "@type": "Brand", name: brandDecoded },
    url: detailUrl,
    ...(productImage && { image: productImage }),

    // Specs smartphone lengkap — dipertahankan, tidak butuh harga
    ...(product?.specs && {
      additionalProperty: [
        product.specs.cpu && {
          "@type": "PropertyValue",
          name: "Processor",
          value: product.specs.cpu,
        },
        product.specs.ram && {
          "@type": "PropertyValue",
          name: "RAM",
          value: product.specs.ram,
        },
        product.specs.storage && {
          "@type": "PropertyValue",
          name: "Storage",
          value: product.specs.storage,
        },
        product.specs.gpu && {
          "@type": "PropertyValue",
          name: "GPU",
          value: product.specs.gpu,
        },
        product.specs.display && {
          "@type": "PropertyValue",
          name: "Display",
          value: product.specs.display,
        },
        product.specs.camera && {
          "@type": "PropertyValue",
          name: "Camera",
          value: product.specs.camera,
        },
        product.specs.battery && {
          "@type": "PropertyValue",
          name: "Battery",
          value: product.specs.battery,
        },
      ].filter(Boolean),
    }),

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
      <script type="application/ld+json">
        {toJsonLd(detailBreadcrumbJsonLd)}
      </script>
      <script type="application/ld+json">{toJsonLd(organizationJsonLd)}</script>
    </Helmet>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────
const Smartphone = () => {
  const { brand, id } = useParams();

  // ── Halaman Detail Produk ──
  if (brand && id) {
    return (
      <>
        <SmartphoneDetailHelmet brand={brand} id={id} />
        <DetailProduk dataSource="../produk.json" />
      </>
    );
  }

  // ── Halaman Katalog ──
  return (
    <>
      <SmartphoneCatalogHelmet />
      <SubProduk
        jenisBarang="smartphone"
        title="Smartphone"
        description="Temukan berbagai pilihan Smartphone dengan kualitas terbaik yang sesuai dengan kebutuhan perusahaan Anda."
        dataSource="../produk.json"
      />
    </>
  );
};

export default Smartphone;
