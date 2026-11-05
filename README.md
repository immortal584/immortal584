# Amr — Full-stack Developer Portfolio

Responsive bilingual (English/Arabic) portfolio with an Express API and optional Resend email delivery.

## Run locally

```bash
npm install
npm start
```

The app listens on the port provided by the host, or `3000` locally.

## Deploy free on Render

1. Sign in at https://render.com/ and choose **New → Web Service**.
2. Connect the GitHub repository `immortal584/immortal584`.
3. Use the repository root as the Root Directory.
4. Set **Build Command** to `npm install` and **Start Command** to `npm start`.
5. Choose the Free instance plan and deploy. Render will provide a free `onrender.com` address.

## API

- `GET /api/health` — health check
- `GET /api/projects` — showcase project data
- `POST /api/contact` — validates and sends enquiries to `Magichell5@gmail.com` through Resend when configured.

## Email setup

Add `RESEND_API_KEY` and `CONTACT_FROM` as environment variables in Render. `CONTACT_FROM` must use a domain verified with Resend. Never commit real API keys or `.env` files. `.env.example` contains placeholders only.

Until email delivery is configured, the form tells visitors to email `Magichell5@gmail.com` directly rather than claiming a message was delivered.

## Before launch

The four portfolio entries are **demo concepts**, not completed client deployments. Keep that disclosure visible until you build real demos. Replace profile/social details and list only technologies you can confidently use in client work. Add rate limiting, spam protection, and a privacy notice before public production use.
