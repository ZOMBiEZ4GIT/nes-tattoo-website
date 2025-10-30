"use client";

import { useState, useEffect } from "react";

interface PasswordGateProps {
  children: React.ReactNode;
}

export default function PasswordGate({ children }: PasswordGateProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Check if password protection is enabled
  const isEnabled = process.env.NEXT_PUBLIC_PASSWORD_PROTECT === "true";
  const correctPassword = process.env.NEXT_PUBLIC_SITE_PASSWORD || "preview";

  useEffect(() => {
    // Check if already authenticated in this session
    if (isEnabled) {
      const auth = sessionStorage.getItem("nes-tattoo-auth");
      if (auth === "true") {
        setIsAuthenticated(true);
      }
    } else {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, [isEnabled]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password === correctPassword) {
      sessionStorage.setItem("nes-tattoo-auth", "true");
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password. Please try again.");
      setPassword("");
    }
  };

  // Show loading state briefly
  if (isLoading) {
    return null;
  }

  // If not enabled or authenticated, show children
  if (!isEnabled || isAuthenticated) {
    return <>{children}</>;
  }

  // Show password gate
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-12">
          <h1 className="font-serif text-[clamp(2.5rem,6vw,3.5rem)] font-light mb-6 text-black">
            NES TATTOO
          </h1>
          <p className="text-base text-gray leading-relaxed mb-2">
            This site is currently in preview mode.
          </p>
          <p className="text-sm text-gray">
            Enter the password to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="Enter password"
              className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-black text-center text-lg"
              autoFocus
            />
            {error && (
              <p className="text-sm text-black mt-3 text-center">{error}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full px-8 py-4 bg-black text-white hover:opacity-90 transition-opacity duration-200 uppercase tracking-wider font-medium"
          >
            Enter
          </button>
        </form>

        <div className="mt-12 text-center">
          <p className="text-xs text-gray">
            Custom tattoo art & cover-ups
          </p>
        </div>
      </div>
    </div>
  );
}
