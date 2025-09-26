import { Navigate } from "react-router-dom";
import { PropsWithChildren } from "react";

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};