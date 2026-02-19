import { NextRequest, NextResponse } from "next/server";
import { generateId } from "@/lib/utils";
import type { Trade } from "@/types";

const trades: Trade[] = [];

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get("address");
    const filtered = address
        ? trades.filter((t) => t.buyerAddress === address || t.sellerAddress === address)
        : trades;
    return NextResponse.json({ trades: filtered });
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    const newTrade: Trade = {
        id: generateId(),
        orderId: body.orderId,
        buyerAddress: body.buyerAddress,
        sellerAddress: body.sellerAddress,
        buyerName: body.buyerName || "Buyer",
        sellerName: body.sellerName || "Seller",
        amount: body.amount,
        totalINR: body.totalINR,
        price: body.price,
        paymentMethod: body.paymentMethod,
        status: "pending",
        messages: [{
            id: generateId(),
            sender: "system",
            senderName: "System",
            message: "Trade initiated. Please proceed with payment.",
            timestamp: new Date().toISOString(),
            type: "system",
        }],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 1800000).toISOString(),
    };
    trades.push(newTrade);
    return NextResponse.json({ trade: newTrade }, { status: 201 });
}
