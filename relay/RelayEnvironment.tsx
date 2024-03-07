import * as React from "react";
import { useMemo } from "react";
import { RelayEnvironmentProvider } from "react-relay";
import { createEnvironment } from "./environment";
import LoadingSpinner from "@/components/LoadingSpinner";
import AppContext from "@/appContext";

export default function RelayEnvironment({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const { token } = React.useContext(AppContext);

  const environment = useMemo(() => {
    if (token) {
      return createEnvironment(token);
    }
    return null;
  }, [token]);

  if (!token) {
    return <LoadingSpinner />;
  }

  return (
    <RelayEnvironmentProvider environment={environment!}>
      {children}
    </RelayEnvironmentProvider>
  );
}