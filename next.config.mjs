/** @type {import('next').NextConfig} */
const rawImageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "";
const imageHostname = rawImageBaseUrl
  .replace(/^https?:\/\//, "")
  .split("/")[0]
  .trim();

const remotePatterns = [
  {
    protocol: "https",
    hostname: "flagcdn.com",
    pathname: "/w80/**",
  },
  ...(imageHostname
    ? [
        {
          protocol: "https",
          hostname: imageHostname,
        },
      ]
    : []),
];

const nextConfig = {
  /* config options here */
  reactCompiler: true,
  reactStrictMode: true,
  images:{
    remotePatterns
  }
};

export default nextConfig;
