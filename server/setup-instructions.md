# MemeForge AI Setup Instructions

## 🚀 Quick Setup

### 1. Get Your Free Hugging Face API Key
1. Go to [Hugging Face](https://huggingface.co/join)
2. Create a free account
3. Go to [Settings > Access Tokens](https://huggingface.co/settings/tokens)
4. Click "New token" → "Read" access is enough
5. Copy your token

### 2. Configure Environment
1. In the `server` folder, create a `.env` file:
```bash
HUGGINGFACE_API_KEY=hf_your_token_here
```

### 3. Install Dependencies
```bash
cd server
npm install
```

### 4. Start the Server
```bash
npm run dev
```

## 🎯 API Comparison

| API Service | Free Tier | Paid Plans | Quality | Speed |
|-------------|-----------|------------|---------|-------|
| **Hugging Face** ⭐ | 1000/month | $9/month unlimited | Excellent | Fast |
| Stability AI | 25 credits | $10/month | Excellent | Fast |
| OpenAI DALL-E | $5 credit | Pay per use | Good | Medium |
| Replicate | Free tier | Pay per use | Good | Medium |

## ✅ Why Hugging Face?
- **Free tier**: 1000 images/month
- **Affordable**: $9/month for unlimited
- **Reliable**: 99.9% uptime
- **High quality**: Stable Diffusion 2.1
- **No rate limits** on paid plans
- **Easy integration**

## 🔧 Troubleshooting

### Error: "AI service not configured"
- Make sure `.env` file exists in `server` folder
- Check that `HUGGINGFACE_API_KEY` is set correctly

### Error: "Authentication failed"
- Verify your API key is correct
- Make sure token has "Read" permissions

### Error: "Rate limit exceeded"
- You've used your free quota
- Upgrade to paid plan for unlimited usage

## 📈 Usage Limits
- **Free**: 1000 requests/month
- **Pro ($9/month)**: Unlimited requests
- **Enterprise**: Custom limits

Perfect for unlimited meme generation! 🎨