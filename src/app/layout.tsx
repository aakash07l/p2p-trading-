import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "P2P.exchange - Swap USDT ↔ INR Instantly",
    description:
        "Trade USDT directly with verified peers using UPI, IMPS, or bank transfer. Embedded wallet — no MetaMask needed. Fast, secure, and decentralized P2P trading platform.",
    keywords: ["USDT", "INR", "P2P", "crypto trading", "UPI", "India", "cryptocurrency"],
    openGraph: {
        title: "P2P.exchange - Swap USDT ↔ INR Instantly",
        description: "Trade USDT directly with verified peers. No bank freeze worries.",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
