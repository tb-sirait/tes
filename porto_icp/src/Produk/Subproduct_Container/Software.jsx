import React from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import SubProduk from "../SubProduct/Subproduk.jsx";
import DetailProduk from "../SubProduct/DetailProduk.jsx";
import softwareData from "../software.json";

// ─── SEO constants ───────────────────────────────────────────────────────────
const BASE_URL = "https://www.infoduta.com";
const SITE_NAME = "Infoduta Computindo Perkasa";

const SOFTWARE_SEO = {
  title: `Produk Software Terbaik untuk Bisnis & Produktivitas | ${SITE_NAME}`,
  description:
    "Temukan berbagai pilihan Software terbaik — Microsoft Office, Windows, Adobe, AutoCAD, antivirus, dan lainnya — dengan lisensi resmi dan harga kompetitif. Cocok untuk kebutuhan bisnis maupun personal. Cek katalog lengkap kami.",
  keywords:
    "software bisnis, Microsoft Office 365, Windows 11, Adobe Photoshop, AutoCAD, antivirus, software lisensi resmi, beli software jakarta, Infoduta Computindo Perkasa, Figma, ChatGPT Team, SketchUp",
  canonicalUrl: `${BASE_URL}/produk/software`,
  ogImage: `${BASE_URL}/og/software-catalog.jpg`,
};

// ─── Helper: buat brand slug untuk URL ───────────────────────────────────────
const toBrandSlug = (brand) => brand.replace(/\s+/g, "-");

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
      name: "Software",
      item: SOFTWARE_SEO.canonicalUrl,
    },
  ],
};

// ─── JSON-LD: ItemList — dibangun dari software.json ─────────────────────────
// Software tidak punya field images/gambar di JSON (pakai softwareImageMap di
// komponen), jadi field image di JSON-LD dikosongkan — tidak masalah untuk SEO.
const softwareCatalogJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Katalog Software — Infoduta Computindo Perkasa",
  description: SOFTWARE_SEO.description,
  url: SOFTWARE_SEO.canonicalUrl,
  numberOfItems: softwareData.length,
  itemListElement: softwareData.map((product, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "SoftwareApplication",
      "@id": `${BASE_URL}/produk/software/${toBrandSlug(product.brand)}/${product.id}`,
      name: product.name,
      description: product.description || product.usage || "",
      brand: {
        "@type": "Brand",
        name: product.brand,
      },
      applicationCategory: product.category || "BusinessApplication",
      url: `${BASE_URL}/produk/software/${toBrandSlug(product.brand)}/${product.id}`,
      // Tambahan info lisensi jika ada di data
      ...(product.license_type && {
        license: product.license_type,
      }),
      ...(product.usage && {
        featureList: product.usage,
      }),
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
  name: SOFTWARE_SEO.title,
  description: SOFTWARE_SEO.description,
  url: SOFTWARE_SEO.canonicalUrl,
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
const SoftwareCatalogHelmet = () => (
  <Helmet>
    <html lang="id" />
    <title>{SOFTWARE_SEO.title}</title>
    <meta name="description" content={SOFTWARE_SEO.description} />
    <meta name="keywords" content={SOFTWARE_SEO.keywords} />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href={SOFTWARE_SEO.canonicalUrl} />

    {/* Open Graph */}
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content={SITE_NAME} />
    <meta property="og:title" content={SOFTWARE_SEO.title} />
    <meta property="og:description" content={SOFTWARE_SEO.description} />
    <meta property="og:url" content={SOFTWARE_SEO.canonicalUrl} />
    <meta property="og:image" content={SOFTWARE_SEO.ogImage} />
    <meta property="og:locale" content="id_ID" />

    {/* Twitter Card */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={SOFTWARE_SEO.title} />
    <meta name="twitter:description" content={SOFTWARE_SEO.description} />
    <meta name="twitter:image" content={SOFTWARE_SEO.ogImage} />

    {/* JSON-LD Structured Data */}
    <script type="application/ld+json">{toJsonLd(webPageJsonLd)}</script>
    <script type="application/ld+json">{toJsonLd(breadcrumbJsonLd)}</script>
    <script type="application/ld+json">{toJsonLd(softwareCatalogJsonLd)}</script>
    <script type="application/ld+json">{toJsonLd(organizationJsonLd)}</script>
  </Helmet>
);

// ─── Helmet untuk halaman detail produk ───────────────────────────────────────
const SoftwareDetailHelmet = ({ brand, id }) => {
  const brandDecoded = decodeURIComponent(brand).replace(/-/g, " ");
  const detailUrl = `${BASE_URL}/produk/software/${brand}/${id}`;

  // Cari data produk nyata dari software.json berdasarkan id
  const product = softwareData.find((p) => String(p.id) === String(id));

  const productName = product?.name || `Software ${brandDecoded}`;
  const productDesc =
    product?.description ||
    product?.usage ||
    `Spesifikasi dan harga software ${brandDecoded} — temukan detail lengkap produk ini di katalog Infoduta Computindo Perkasa.`;

  const detailTitle = `${productName} | ${SITE_NAME}`;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: productName,
    description: productDesc,
    applicationCategory: product?.category || "BusinessApplication",
    brand: { "@type": "Brand", name: brandDecoded },
    url: detailUrl,
    ...(product?.license_type && { license: product.license_type }),
    ...(product?.usage && { featureList: product.usage }),
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
        name: "Software",
        item: SOFTWARE_SEO.canonicalUrl,
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

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={detailTitle} />
      <meta name="twitter:description" content={productDesc} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">{toJsonLd(productJsonLd)}</script>
      <script type="application/ld+json">{toJsonLd(detailBreadcrumb)}</script>
      <script type="application/ld+json">{toJsonLd(organizationJsonLd)}</script>
    </Helmet>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────
const Software = () => {
  const { brand, id } = useParams();

  // ── Halaman Detail Produk ──
  if (brand && id) {
    return (
      <>
        <SoftwareDetailHelmet brand={brand} id={id} />
        <DetailProduk dataSource="../software.json" />
      </>
    );
  }

  // ── Halaman Katalog ──
  return (
    <>
      <SoftwareCatalogHelmet />
      <SubProduk
        jenisBarang="software"
        title="Software"
        description="Temukan berbagai pilihan Software dengan kualitas terbaik yang sesuai dengan kebutuhan perusahaan Anda."
        dataSource="../software.json"
      />
    </>
  );
};

export default Software;