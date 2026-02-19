export function formatINR(amount: number): string {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
}

export function formatUSDT(amount: number): string {
    return `${amount.toFixed(2)} USDT`;
}

export function shortenAddress(address: string): string {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function timeAgo(date: Date | string): string {
    const now = new Date();
    const past = new Date(date);
    const diffMs = now.getTime() - past.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
}

export function generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function getCompletionRate(completed: number, total: number): number {
    if (total === 0) return 0;
    return Math.round((completed / total) * 100);
}
