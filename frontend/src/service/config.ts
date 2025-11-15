type Endpoints = typeof endpoints;

// Use environment variable for API base URL, otherwise use local proxy
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
  ? `${import.meta.env.VITE_API_BASE_URL}api/v1/`
  : "/api/v1/";

const endpoints = {
  todos: "todos/",
};

export const getEndpoints = async (): Promise<Endpoints> => {
  return Object.fromEntries(
    Object.entries(endpoints).map(([k, value]) => [k, API_BASE_URL + value])
  ) as Endpoints;
};
