const host = "http://localhost:5000/";

export const createApiClient =
  (token?: string): typeof fetch =>
  (input, init = {}): Promise<Response> => {
    const { headers, ...rest } = init;

    const customInt: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        "X-Access-Token": token ?? "",
        ...headers,
      },
      ...rest,
    };

    const host = process.env.REACT_APP_API_URL ?? ""
    return fetch(`${host}/${input}`, customInt);
  };
