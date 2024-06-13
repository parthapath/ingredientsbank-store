const dev = process.env.NODE_ENV !== "production";

  export const api_server = dev
  ? "http://localhost:3002"
  : "https://api.ingredientsbank.com";
