const dev = process.env.NODE_ENV !== "production";

export const server = dev
  ? "http://localhost:3000"
  : "https://nest-nextjs.vercel.app";

export const api_server = dev
  ? "http://localhost:3002"
  : "https://nest-nextjs.vercel.app";
