"use client";

import React from "react";
import { ThirdwebProvider } from "thirdweb/react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <ThirdwebProvider>
            <div className="app-container">
                {children}
            </div>

            <style jsx>{`
        .app-container {
          min-height: 100vh;
          background: var(--bg-primary);
        }
      `}</style>
        </ThirdwebProvider>
    );
}
