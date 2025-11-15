type Endpoints = typeof endpoints;

// Use environment variable for API URL, fallback to local proxy
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api/v1/";

const endpoints = {
  todos: "todos/",
};

export const getEndpoints = async (): Promise<Endpoints> => {
  return Object.fromEntries(
    Object.entries(endpoints).map(([k, value]) => [k, BASE_URL + value])
  ) as Endpoints;
};
