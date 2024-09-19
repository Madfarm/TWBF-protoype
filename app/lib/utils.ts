import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { useMemo } from "react";
import { useMatches } from "@remix-run/react";
import { AuthUser } from "./auth.server";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export function useMatchesData(
  id: string
): any {
  const matchingRoutes = useMatches();
  const route = useMemo(
    () => matchingRoutes.find((route) => route.id === id),
    [matchingRoutes, id]
  );
  return route?.data;
}

function isUser(user: any): user is AuthUser {
  return user && typeof user === "object" && typeof user.userId === "string";
}

export function useOptionalUser(): AuthUser | undefined {
  const data = useMatchesData("root");
  if (!data || !isUser(data.user)) {
    return undefined;
  }
  return data.user;
}

export function useUser(): AuthUser {
  const maybeUser = useOptionalUser();
  if (!maybeUser) {
    throw new Error(
      "No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead.",
    );
  }
  return maybeUser;
}
