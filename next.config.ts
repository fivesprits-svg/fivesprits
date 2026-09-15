import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  compress: true,
  async headers() {
    return [
      {
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/customer-flow/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*.(svg|jpg|jpeg|png|webp|avif|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/offers",
        destination: "/combo-offers",
        permanent: false,
      },
      {
        source: "/offers/gifts",
        destination: "/gift-offers",
        permanent: false,
      },
      {
        source: "/offers/gifts/select",
        destination: "/gift-offers/select",
        permanent: false,
      },
      {
        source: "/offers/:offerId",
        destination: "/combo-offers/:offerId",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
