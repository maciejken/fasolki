import * as React from "react";
import { useMemo } from "react";
import { RelayEnvironmentProvider } from "react-relay";
import { createEnvironment } from "./environment";
import { useAppSelector } from "@/store/hooks";
import { selectAuthToken } from "@/features/auth";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function RelayEnvironment({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const token = useAppSelector(selectAuthToken);

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
    <RelayEnvironmentProvider environment={environment}>
      {children}
    </RelayEnvironmentProvider>
  );
}