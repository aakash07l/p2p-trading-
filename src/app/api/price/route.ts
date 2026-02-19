import { NextResponse } from "next/server";
import { DEFAULT_USDT_INR_RATE } from "@/lib/constants";

export async function GET() {
    try {
        // Try CoinGecko free API
        const res = await fetch(
            "https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=inr&include_24hr_change=true",
            { next: { revalidate: 60 } }
        );

        if (res.ok) {
            const data = await res.json();
            return NextResponse.json({
                usdtInr: data.tether?.inr || DEFAULT_USDT_INR_RATE,
                change24h: data.tether?.inr_24h_change || 0,
                lastUpdated: new Date().toISOString(),
            });
        }
    } catch (e) {
        // Fallback to default
    }

    return NextResponse.json({
        usdtInr: DEFAULT_USDT_INR_RATE,
        change24h: 0.45,
        lastUpdated: new Date().toISOString(),
    });
}
