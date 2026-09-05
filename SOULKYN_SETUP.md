# Soulkyn - Free AI Character Chat App

A beautiful, immersive AI roleplay application with custom character avatars and memory management. Built with React, Tailwind CSS, and powered by free AI models.

## 🚀 Features

- **Character Selection**: Choose from multiple AI personalities with unique avatars
- **Immersive Chat**: Real-time conversations with dynamic character responses
- **Character Memory**: Context-aware conversations that maintain character personality
- **Beautiful UI**: Dark theme with gradient accents and smooth animations
- **Responsive Design**: Works on desktop and tablet devices
- **Free & Open**: Uses 100% free tier services with no credit card required

## 🛠 Tech Stack

| Component | Technology | Cost |
|-----------|-----------|------|
| Frontend | React 18 + Vite | Free |
| UI Framework | Tailwind CSS + Shadcn | Free |
| Backend | Supabase Edge Functions | Free tier |
| AI Model | OpenRouter / Hugging Face | Free tier |
| Hosting | Vercel / Render | Free tier |
| Database | Supabase PostgreSQL | Free tier |

## 📋 Prerequisites

- Node.js 16+ and npm
- Git
- Free accounts for:
  - [Vercel](https://vercel.com) (hosting)
  - [Supabase](https://supabase.com) (database)
  - [OpenRouter](https://openrouter.ai) or [Hugging Face](https://huggingface.co) (AI API)

## 🔧 Local Development

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd soulkyn
npm install
```

### 2. Set Up Environment Variables

Create `.env.local`:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5173`

## 🤖 AI Model Integration

### Option A: OpenRouter (Recommended)

1. Sign up at [OpenRouter.ai](https://openrouter.ai)
2. Get your free API key
3. Store in Buildify Cloud Vault:
   - Service: `openrouter`
   - Key Name: `OPENROUTER_API_KEY`

**Free Models Available:**
- Mistral 7B Instruct (fast, roleplay-friendly)
- Mythomax 13B (creative, uncensored)
- Llama 2 Chat (balanced)

### Option B: Hugging Face Inference API

1. Sign up at [HuggingFace.co](https://huggingface.co)
2. Create an API token
3. Store in Buildify Cloud Vault:
   - Service: `huggingface`
   - Key Name: `HUGGINGFACE_API_KEY`

## 📦 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Connect repo to [Vercel](https://vercel.com)
3. Set environment variables in Vercel settings
4. Deploy with one click

### Deploy to Render

1. Create account at [Render.com](https://render.com)
2. Connect GitHub repo
3. Select "Static Site" for frontend
4. Deploy Supabase functions separately

## 🗄 Database Setup (Supabase)

### Create Tables

1. Go to Supabase Dashboard → SQL Editor
2. Run migrations to create:
   - `characters` - Store AI character profiles
   - `chat_histories` - Store conversation logs
   - `user_preferences` - Store user settings

### Row Level Security (RLS)

Enable RLS on all tables to protect user data:

```sql
ALTER TABLE chat_histories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own chats"
  ON chat_histories FOR SELECT
  USING (auth.uid() = user_id);
```

## 🎨 Customization

### Add New Characters

Edit `src/pages/Index.tsx` and add to `SAMPLE_CHARACTERS`:

```typescript
{
  id: '4',
  name: 'Your Character',
  description: 'Character description',
  personality: 'Personality traits',
  avatar: 'https://images.unsplash.com/...',
  systemPrompt: 'System instruction for the AI...',
}
```

### Modify UI Theme

Edit `src/index.css` to change color scheme:

```css
:root {
  --primary: 210 40% 98%;
  --background: 222.2 84% 4.9%;
  /* ... more tokens ... */
}
```

## 🔐 Security Best Practices

1. **API Keys**: Never commit API keys - use Buildify Cloud Vault
2. **Rate Limiting**: Implement rate limits on edge functions
3. **Input Validation**: Validate all user inputs server-side
4. **CORS**: Configure CORS properly for your domain
5. **Authentication**: Add user auth via Supabase Auth (optional)

## 📊 Performance Tips

- Use React.memo for character cards to prevent unnecessary re-renders
- Implement pagination for long chat histories
- Cache character profiles in localStorage
- Lazy load images with Unsplash CDN parameters
- Use Supabase's built-in caching

## 🐛 Troubleshooting

### Chat not responding?
- Check API key is stored in Buildify Cloud Vault
- Verify free tier rate limits not exceeded
- Check browser console for errors

### Images not loading?
- Verify Unsplash URLs are accessible
- Check CORS settings in Supabase
- Ensure image dimensions are correct

### Slow performance?
- Reduce chat history pagination size
- Enable Supabase query caching
- Use CDN for static assets (Vercel auto-handles this)

## 📚 API Reference

### Chat Edge Function

**Endpoint:** `POST /functions/v1/chat`

**Request:**
```json
{
  "messages": [
    { "role": "user", "content": "Hello!" }
  ],
  "character": {
    "name": "Luna",
    "systemPrompt": "You are Luna..."
  }
}
```

**Response:**
```json
{
  "content": "AI response text",
  "role": "assistant"
}
```

## 📄 License

MIT - Free to use and modify

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repo
2. Create feature branch
3. Submit pull request

## 📞 Support

- Check [Supabase Docs](https://supabase.com/docs)
- Visit [OpenRouter Docs](https://openrouter.ai/docs)
- Read [React Docs](https://react.dev)

## 🎯 Next Steps

1. ✅ Frontend UI complete
2. ⬜ Connect real AI API (OpenRouter/Hugging Face)
3. ⬜ Add Supabase database integration
4. ⬜ Implement user authentication
5. ⬜ Add character creation tool
6. ⬜ Deploy to production
7. ⬜ Add voice chat (optional)
8. ⬜ Implement image generation for avatars

---

**Built with ❤️ using free open-source tools**
