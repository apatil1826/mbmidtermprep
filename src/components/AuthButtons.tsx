"use client";

import { useAuth, SignInButton, UserButton } from "@clerk/nextjs";

export default function AuthButtons() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) return null;

  if (isSignedIn) {
    return <UserButton />;
  }

  return (
    <SignInButton mode="modal">
      <button className="rounded-lg border border-card-border bg-card px-3 py-1.5 text-sm text-muted transition-colors hover:border-accent/30 hover:text-foreground">
        Sign In
      </button>
    </SignInButton>
  );
}
