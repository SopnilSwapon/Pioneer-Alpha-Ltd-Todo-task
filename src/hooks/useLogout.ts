"use client";

import { useRouter } from "next/navigation";
import { TokenService } from "@/lib/auth/token";

export function useLogout() {
  const router = useRouter();

  const logout = () => {
    TokenService.clear();
    router.push("/sign-in");
  };

  return logout;
}
