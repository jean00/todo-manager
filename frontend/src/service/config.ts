type Endpoints = typeof endpoints;

const BASE_URL = "/api/v1/";

const endpoints = {
  todos: "todos/",
};

export const getEndpoints = async (): Promise<Endpoints> => {
  return Object.fromEntries(
    Object.entries(endpoints).map(([k, value]) => [k, BASE_URL + value])
  ) as Endpoints;
};
