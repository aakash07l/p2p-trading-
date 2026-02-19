import { NextRequest, NextResponse } from "next/server";
import type { Order } from "@/types";
import { generateId } from "@/lib/utils";
import { DEFAULT_USDT_INR_RATE } from "@/lib/constants";

// In-memory store (demo)
const orders: Order[] = [
    { id: "s1", type: "sell", walletAddress: "0x1234", userName: "CryptoKing", amount: 500, price: 85.5, minLimit: 5000, maxLimit: 42750, paymentMethods: ["upi", "gpay"], status: "open", completedTrades: 142, totalTrades: 150, createdAt: new Date().toISOString() },
    { id: "s2", type: "sell", walletAddress: "0x5678", userName: "TraderPro", amount: 1000, price: 85.3, minLimit: 10000, maxLimit: 85300, paymentMethods: ["imps", "bank"], status: "open", completedTrades: 89, totalTrades: 95, createdAt: new Date().toISOString() },
    { id: "b1", type: "buy", walletAddress: "0xaaaa", userName: "INRBuyer", amount: 800, price: 85.2, minLimit: 5000, maxLimit: 68160, paymentMethods: ["upi"], status: "open", completedTrades: 98, totalTrades: 105, createdAt: new Date().toISOString() },
];

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const filtered = type ? orders.filter((o) => o.type === type) : orders;
    return NextResponse.json({ orders: filtered, total: filtered.length });
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    const newOrder: Order = {
        id: generateId(),
        type: body.type || "buy",
        walletAddress: body.walletAddress || "",
        userName: body.userName || "Anonymous",
        amount: body.amount || 0,
        price: body.price || DEFAULT_USDT_INR_RATE,
        minLimit: body.minLimit || 1000,
        maxLimit: body.maxLimit || body.amount * body.price,
        paymentMethods: body.paymentMethods || ["upi"],
        status: "open",
        completedTrades: 0,
        totalTrades: 0,
        createdAt: new Date().toISOString(),
    };
    orders.push(newOrder);
    return NextResponse.json({ order: newOrder }, { status: 201 });
}
