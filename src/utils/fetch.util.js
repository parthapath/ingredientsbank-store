import { cookies } from "next/headers";

import { api_server } from "@/config";

const customFetch = async (url, options = {}) => {
  const token = cookies().get("token");
  let mergedOptions = null;
  if (token) {
    const defaultOptions = {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    };

    mergedOptions = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    };
  } else {
    mergedOptions = {
      ...options,
      headers: {
        ...options.headers,
      },
    };
  }

  const response = await fetch(api_server + url, mergedOptions);
  return response;
};

export default customFetch;
