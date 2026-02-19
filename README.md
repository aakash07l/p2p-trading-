# P2P.exchange — USDT ↔ INR Trading Platform

A peer-to-peer cryptocurrency trading platform for swapping **USDT ↔ INR** with embedded wallets. Built with **Next.js 14**, **Thirdweb SDK**, and deployable on **Vercel**.

## Features

- 🔐 **Embedded Wallet** — Users sign up with email/phone/Google (powered by Thirdweb, no MetaMask needed)
- 💱 **USDT ↔ INR** — Focus on Indian market with UPI, IMPS, NEFT, Google Pay, PhonePe, Paytm
- ⚡ **Blazing Fast** — Polygon network for low gas fees
- 🛡️ **Secure** — Smart contract escrow model for trades
- 🌙 **Premium Dark UI** — Glassmorphism, animations, fully responsive
- 📱 **Mobile Responsive** — Works perfectly on all screen sizes

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Wallet/Web3**: Thirdweb SDK v5 (In-App Wallet)
- **Chain**: Polygon (USDT on Polygon)
- **Icons**: Lucide React
- **Deployment**: Vercel

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/p2p-trading.git
cd p2p-trading
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your **Thirdweb Client ID** (get it free from [thirdweb.com/dashboard](https://thirdweb.com/dashboard)):

```
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your_client_id_here
```

### 4. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/app` | Dashboard |
| `/app/buy` | Buy USDT (see sell orders) |
| `/app/sell` | Sell USDT (see buy orders) |
| `/app/create-order` | Create buy/sell order |
| `/app/trade/[id]` | Active trade with chat |
| `/app/orders` | Order history |
| `/app/profile` | Profile & payment methods |

## Deploy to Vercel

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repo
4. Add environment variable: `NEXT_PUBLIC_THIRDWEB_CLIENT_ID`
5. Deploy!

## License

MIT
