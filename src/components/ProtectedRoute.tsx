import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";
import { useEffect, useState } from "react";

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);
    
    if (!authStatus) {
      router.push("/login");
    }
  }, [router]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};