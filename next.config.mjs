/** @type {import('next').NextConfig} */

// Check if the environment is production
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ["@svgr/webpack"],
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },

  // Add the production check for GitHub Pages
  assetPrefix: isProd ? "/saas-light/" : "", // Ensure assets are correctly prefixed in production
  basePath: isProd ? "/saas-light" : "", // Set basePath for production deployment on GitHub Pages
  trailingSlash: true, // Ensure pages use trailing slashes for proper static export
  output: "export", // Ensure the app is built as a static site
};

export default nextConfig;
