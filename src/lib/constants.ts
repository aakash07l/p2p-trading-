import { polygon } from "thirdweb/chains";

export const SUPPORTED_CHAIN = polygon;

// USDT contract on Polygon
export const USDT_CONTRACT_ADDRESS = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F";

export const PAYMENT_METHODS = [
    { id: "upi", label: "UPI", icon: "📱" },
    { id: "imps", label: "IMPS", icon: "🏦" },
    { id: "neft", label: "NEFT", icon: "🏛️" },
    { id: "bank", label: "Bank Transfer", icon: "💳" },
    { id: "paytm", label: "Paytm", icon: "💰" },
    { id: "gpay", label: "Google Pay", icon: "📲" },
    { id: "phonepe", label: "PhonePe", icon: "📞" },
] as const;

export const ORDER_STATUS = {
    OPEN: "open",
    IN_PROGRESS: "in_progress",
    COMPLETED: "completed",
    CANCELLED: "cancelled",
    DISPUTED: "disputed",
} as const;

export const TRADE_STATUS = {
    PENDING: "pending",
    PAYMENT_SENT: "payment_sent",
    PAYMENT_CONFIRMED: "payment_confirmed",
    RELEASED: "released",
    CANCELLED: "cancelled",
    DISPUTED: "disputed",
} as const;

export const DEFAULT_USDT_INR_RATE = 85.5;
