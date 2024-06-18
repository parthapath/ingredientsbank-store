/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [process.env.S3_PUBLIC_URL],
  },
};

export default nextConfig;
