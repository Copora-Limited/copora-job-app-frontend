/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "res.cloudinary.com",
      "copora-candidates.lon1.digitaloceanspaces.com", // Add your new domain here
    ], // Add the Cloudinary domain here
  },
};

export default nextConfig;
