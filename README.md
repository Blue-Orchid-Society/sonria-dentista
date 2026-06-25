# Sonria Dentistry of Arlington

Bilingual (EN/ES) website for Dr. Deepti Namineni's dental practice. Built with Next.js 16 + Tailwind v4. Self-hosted on Vercel.

```
npm install
npm run dev      # http://localhost:3000 → redirects to /es
npm run build
npm run deploy   # vercel deploy --prod --scope syndicate-e66a97a1
```

## Contact form email

The contact form sends patient inquiries through Resend. Configure these in Vercel:

```
RESEND_API_KEY=...
CONTACT_RECIPIENT=info@sonriadentista.com
CONTACT_FROM=Sonria Website <onboarding@resend.dev>
```

`CONTACT_FROM` should be changed to a verified Sonria sender after the domain is configured in Resend.

See `CLAUDE.md` for editing conventions, `.context/HANDOFF.md` for the source-of-truth content captured from the original site.
