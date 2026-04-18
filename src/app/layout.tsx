import type { Metadata } from "next";
import Link from "next/link";
import { ClerkProvider, UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import "./globals.css";
import SearchModal from "../components/SearchModal";

export const metadata: Metadata = {
  title: "MB Midterm Prep — Money & Banking Study Tool",
  description:
    "Interactive study tool for BUSN 33401 Money & Banking at Chicago Booth",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en" className="h-full antialiased">
        <body className="min-h-full flex flex-col bg-background text-foreground">
          <nav className="sticky top-0 z-40 border-b border-card-border bg-background/80 backdrop-blur-md">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
              <div className="flex items-center gap-6">
                <Link
                  href="/"
                  className="text-base font-bold tracking-tight text-foreground hover:text-accent transition-colors"
                >
                  MB Midterm Prep
                </Link>
                <div className="hidden sm:flex items-center gap-4">
                  <Link
                    href="/"
                    className="text-sm text-muted hover:text-foreground transition-colors"
                  >
                    Topics
                  </Link>
                  <Link
                    href="/connections"
                    className="text-sm text-muted hover:text-foreground transition-colors"
                  >
                    Connections
                  </Link>
                  <Link
                    href="/readings"
                    className="text-sm text-muted hover:text-foreground transition-colors"
                  >
                    Readings
                  </Link>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <SearchModal />
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "h-8 w-8",
                    },
                  }}
                />
              </div>
            </div>
          </nav>
          <main className="flex-1">{children}</main>
          <footer className="border-t border-card-border py-6 text-center text-xs text-muted">
            Built for BUSN 33401 — Money &amp; Banking &middot; Prof. Kroszner
            &middot; Chicago Booth
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
