import {
  Environment,
  Network,
  Observable,
  RecordSource,
  Store,
} from "relay-runtime";
import type { FetchFunction, IEnvironment } from "relay-runtime";

const getFetchFn = (token: string): FetchFunction => (params, variables) => {
  const apiUrl: string | undefined = process.env.EXPO_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error("apiUrl is undefined");
  }

  const response = fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: params.text,
      variables,
    }),
  });

  const data = Observable.from(response.then(async (data) => {
    const json = await data.json();
    if (process.env.EXPO_PUBLIC_LOG_LEVEL === "debug") {
      console.debug("relay/environment.ts:", JSON.stringify(json));
    }
    return json;
  }));

  return data;
};

export function createEnvironment(token: string): IEnvironment {
  const network = Network.create(getFetchFn(token));
  const store = new Store(new RecordSource());
  return new Environment({ store, network });
}
