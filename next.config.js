/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["via.placeholder.com"],
    unoptimized: true, 
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production", // Hanya nonaktifkan log di production
  },
};

module.exports = nextConfig;

// Injected content via Sentry wizard below

const { withSentryConfig } = require("@sentry/nextjs");

module.exports = withSentryConfig(module.exports, {
  org: "intermedia-fa",
  project: "iitc-fe",
  silent: !process.env.CI,
  widenClientFileUpload: true,
  tunnelRoute: "/monitoring",
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: true,
});

// Menambahkan log untuk memastikan environment
console.log(`Running in ${process.env.NODE_ENV} mode`);
