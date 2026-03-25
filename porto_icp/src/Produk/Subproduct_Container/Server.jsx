import React from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import SubProduk from "../SubProduct/Subproduk.jsx";
import DetailProduk from "../SubProduct/DetailProduk.jsx";
import serverData from "../server.json";

// ─── SEO constants ───────────────────────────────────────────────────────────
const BASE_URL = "https://www.infoduta.com";
const SITE_NAME = "Infoduta Computindo Perkasa";

const SERVER_SEO = {
  title: `Produk Server Terbaik untuk Bisnis & Enterprise | ${SITE_NAME}`,
  description:
    "Temukan berbagai pilihan Server terbaik — rack server, tower server, blade server — dari brand terpercaya Dell, HP, dan Lenovo. Cocok untuk kebutuhan enterprise maupun UKM. Cek katalog lengkap kami.",
  keywords:
    "server bisnis, rack server, tower server, blade server, Dell server, HP server, Lenovo server, beli server jakarta, server enterprise, server UKM, Infoduta Computindo Perkasa",
  canonicalUrl: `${BASE_URL}/produk/server`,
  ogImage: `${BASE_URL}/og/server-catalog.jpg`,
};

// ─── Helper: konversi path gambar lokal → URL publik ─────────────────────────
// server.json memakai field "gambar" (bukan "images")
// contoh: "assets/produk/server/dell/1.png" → "https://www.infoduta.com/assets/produk/server/dell/1.png"
const toPublicImageUrl = (imagePath) => {
  if (!imagePath) return null;
  // Hapus leading slash atau "src/" jika ada, lalu tambah BASE_URL
  const cleaned = imagePath
    .replace(/^\/src\//, "/")
    .replace(/^(?!\/)/, "/"); // pastikan ada leading slash
  return `${BASE_URL}${cleaned}`;
};

// ─── JSON-LD: BreadcrumbList ──────────────────────────────────────────────────
const breadcrumbJsonLd = {
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
      name: "Server",
      item: SERVER_SEO.canonicalUrl,
    },
  ],
};

// ─── JSON-LD: ItemList — dibangun dari server.json ────────────────────────────
const serverCatalogJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Katalog Server — Infoduta Computindo Perkasa",
  description: SERVER_SEO.description,
  url: SERVER_SEO.canonicalUrl,
  numberOfItems: serverData.length,
  itemListElement: serverData.map((product, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Product",
      "@id": `${BASE_URL}/produk/server/${product.id}`,
      name: product.name,
      description: product.description || "",
      brand: {
        "@type": "Brand",
        name: product.brand,
      },
      category: product.chassis || "Server",
      url: `${BASE_URL}/produk/server/${product.id}`,
      ...(product.gambar && {
        image: toPublicImageUrl(product.gambar),
      }),
      // Specs server: processor, memory, OS, chassis
      additionalProperty: [
        product.processor && {
          "@type": "PropertyValue",
          name: "Processor",
          value: product.processor,
        },
        product.memory && {
          "@type": "PropertyValue",
          name: "Memory",
          value: product.memory,
        },
        product.chassis && {
          "@type": "PropertyValue",
          name: "Chassis",
          value: product.chassis,
        },
        product.os && {
          "@type": "PropertyValue",
          name: "Operating System",
          value: product.os,
        },
      ].filter(Boolean),
      offers: {
        "@type": "Offer",
        priceCurrency: "IDR",
        availability: "https://schema.org/InStock",
        seller: { "@type": "Organization", name: SITE_NAME },
      },
    },
  })),
};

// ─── JSON-LD: Organization ────────────────────────────────────────────────────
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

// ─── JSON-LD: WebPage ─────────────────────────────────────────────────────────
const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: SERVER_SEO.title,
  description: SERVER_SEO.description,
  url: SERVER_SEO.canonicalUrl,
  inLanguage: "id-ID",
  isPartOf: {
    "@type": "WebSite",
    name: SITE_NAME,
    url: BASE_URL,
  },
  breadcrumb: breadcrumbJsonLd,
};

// ─── Helper: serialize JSON-LD ────────────────────────────────────────────────
const toJsonLd = (obj) => JSON.stringify(obj);

// ─── Helmet untuk halaman katalog ─────────────────────────────────────────────
const ServerCatalogHelmet = () => (
  <Helmet>
    <html lang="id" />
    <title>{SERVER_SEO.title}</title>
    <meta name="description" content={SERVER_SEO.description} />
    <meta name="keywords" content={SERVER_SEO.keywords} />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href={SERVER_SEO.canonicalUrl} />

    {/* Open Graph */}
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content={SITE_NAME} />
    <meta property="og:title" content={SERVER_SEO.title} />
    <meta property="og:description" content={SERVER_SEO.description} />
    <meta property="og:url" content={SERVER_SEO.canonicalUrl} />
    <meta property="og:image" content={SERVER_SEO.ogImage} />
    <meta property="og:locale" content="id_ID" />

    {/* Twitter Card */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={SERVER_SEO.title} />
    <meta name="twitter:description" content={SERVER_SEO.description} />
    <meta name="twitter:image" content={SERVER_SEO.ogImage} />

    {/* JSON-LD Structured Data */}
    <script type="application/ld+json">{toJsonLd(webPageJsonLd)}</script>
    <script type="application/ld+json">{toJsonLd(breadcrumbJsonLd)}</script>
    <script type="application/ld+json">{toJsonLd(serverCatalogJsonLd)}</script>
    <script type="application/ld+json">{toJsonLd(organizationJsonLd)}</script>
  </Helmet>
);

// ─── Helmet untuk halaman detail produk ───────────────────────────────────────
// Server URL: /produk/server/:id (tanpa brand di URL)
const ServerDetailHelmet = ({ id }) => {
  const detailUrl = `${BASE_URL}/produk/server/${id}`;

  // Cari data produk nyata dari server.json berdasarkan id
  const product = serverData.find((p) => String(p.id) === String(id));

  const productName = product?.name || `Server`;
  const productBrand = product?.brand || "Server";
  const productDesc =
    product?.description ||
    `Spesifikasi dan detail server ${productBrand} — temukan informasi lengkap produk ini di katalog Infoduta Computindo Perkasa.`;
  const productImage = product?.gambar
    ? toPublicImageUrl(product.gambar)
    : null;

  const detailTitle = `${productName} | ${SITE_NAME}`;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: productName,
    description: productDesc,
    category: product?.chassis || "Server",
    brand: { "@type": "Brand", name: productBrand },
    url: detailUrl,
    ...(productImage && { image: productImage }),
    // Specs server lengkap
    additionalProperty: [
      product?.processor && {
        "@type": "PropertyValue",
        name: "Processor",
        value: product.processor,
      },
      product?.memory && {
        "@type": "PropertyValue",
        name: "Memory",
        value: product.memory,
      },
      product?.chassis && {
        "@type": "PropertyValue",
        name: "Chassis",
        value: product.chassis,
      },
      product?.os && {
        "@type": "PropertyValue",
        name: "Operating System",
        value: product.os,
      },
    ].filter(Boolean),
    offers: {
      "@type": "Offer",
      priceCurrency: "IDR",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: SITE_NAME },
    },
  };

  const detailBreadcrumb = {
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
        name: "Server",
        item: SERVER_SEO.canonicalUrl,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: productName,
        item: detailUrl,
      },
    ],
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
      <script type="application/ld+json">{toJsonLd(detailBreadcrumb)}</script>
      <script type="application/ld+json">{toJsonLd(organizationJsonLd)}</script>
    </Helmet>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────
const Server = () => {
  // Server hanya pakai { id } — tidak ada { brand } di URL
  const { id } = useParams();

  // ── Halaman Detail Produk ──
  if (id) {
    return (
      <>
        <ServerDetailHelmet id={id} />
        <DetailProduk dataSource="../server.json" />
      </>
    );
  }

  // ── Halaman Katalog ──
  return (
    <>
      <ServerCatalogHelmet />
      <SubProduk
        jenisBarang="server"
        title="Server"
        description="Temukan berbagai pilihan Server dengan kualitas terbaik yang sesuai dengan kebutuhan perusahaan Anda."
        dataSource="../server.json"
      />
    </>
  );
};

export default Server;