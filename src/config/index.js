const dev = process.env.NODE_ENV !== "production";

export const server = dev
  ? "http://localhost:3000"
  : "http://localhost:3000";

export const api_server = dev
  ? "http://localhost:3002"
  : "http://localhost:3002";
