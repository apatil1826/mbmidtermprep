"use client";

import { useAuth, SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-muted border-t-accent" />
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="flex min-h-[80vh] flex-col items-center justify-center px-4">
        <h1 className="mb-2 text-2xl font-bold tracking-tight">
          MB Midterm Prep
        </h1>
        <p className="mb-8 text-sm text-muted">
          Sign in to access the study tool
        </p>
        <SignIn appearance={{ baseTheme: dark }} />
      </div>
    );
  }

  return <>{children}</>;
}
