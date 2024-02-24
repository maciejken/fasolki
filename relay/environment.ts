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

  return Observable.from(response.then((data) => data.json()));
};

export function createEnvironment(token: string): IEnvironment {
  const network = Network.create(getFetchFn(token));
  const store = new Store(new RecordSource());
  return new Environment({ store, network });
}
