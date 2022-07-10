export const createSWRFetcher =
  (token: string | null) => async (input: RequestInfo | URL, init?: RequestInit) => {
    const { headers, ...rest } = init ?? {};

    const customInt: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        "X-Access-Token": token ?? "",
        ...headers,
      },
      ...rest,
    };

    const host = process.env.REACT_APP_API_URL ?? ""
    const res = await fetch(`${host}/${input}`, customInt);
    return await res.json();
  };
