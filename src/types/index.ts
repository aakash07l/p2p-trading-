export interface Order {
    id: string;
    type: "buy" | "sell";
    walletAddress: string;
    userName: string;
    amount: number; // USDT amount
    price: number; // INR per USDT
    minLimit: number; // Minimum INR
    maxLimit: number; // Maximum INR
    paymentMethods: string[];
    status: string;
    completedTrades: number;
    totalTrades: number;
    createdAt: string;
}

export interface Trade {
    id: string;
    orderId: string;
    buyerAddress: string;
    sellerAddress: string;
    buyerName: string;
    sellerName: string;
    amount: number; // USDT
    totalINR: number;
    price: number; // INR per USDT
    paymentMethod: string;
    status: string;
    messages: ChatMessage[];
    createdAt: string;
    updatedAt: string;
    expiresAt: string;
}

export interface ChatMessage {
    id: string;
    sender: string;
    senderName: string;
    message: string;
    timestamp: string;
    type: "text" | "system";
}

export interface UserProfile {
    walletAddress: string;
    name: string;
    email?: string;
    completedTrades: number;
    totalVolume: number;
    rating: number;
    paymentMethods: PaymentMethod[];
    createdAt: string;
}

export interface PaymentMethod {
    id: string;
    type: string;
    details: string;
    label: string;
}

export interface PriceData {
    usdtInr: number;
    change24h: number;
    lastUpdated: string;
}
