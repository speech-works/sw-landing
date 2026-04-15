This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Launch updates capture

The `Get launch updates` section submits directly to Google Forms from the browser. This works with the site's GitHub Pages static export.

- Set `NEXT_PUBLIC_GOOGLE_FORM_ACTION_URL` to your form's `formResponse` URL.
- Set `NEXT_PUBLIC_GOOGLE_FORM_EMAIL_ENTRY_ID` to the Google Forms email field key such as `entry.380438183`.
- Optional: set `NEXT_PUBLIC_GOOGLE_FORM_SOURCE_ENTRY_ID` if your form also has a source field.
- See `.env.example` for the expected variables.

### Google Form setup

- Create a Google Form with an email field.
- Copy the form's `formResponse` URL into `NEXT_PUBLIC_GOOGLE_FORM_ACTION_URL`.
- To get the email entry ID, use Google Form's "Get pre-filled link" flow and copy the parameter name that looks like `entry.123456789`.

### GitHub Pages via Actions

- In GitHub, go to `Settings` → `Secrets and variables` → `Actions` → `Variables`.
- Add `NEXT_PUBLIC_GOOGLE_FORM_ACTION_URL`
- Add `NEXT_PUBLIC_GOOGLE_FORM_EMAIL_ENTRY_ID`
- Optionally add `NEXT_PUBLIC_GOOGLE_FORM_SOURCE_ENTRY_ID`
- The deploy workflow reads those variables at build time and bakes them into the static site.
