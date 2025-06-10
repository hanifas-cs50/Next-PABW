## Getting Started

First, run the push the database:

```bash
npm run push
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Poppins](https://vercel.com/font), a new font family for Vercel.


## Todo:
- Continuous scroll / pagination for User
- Filter / search for Admin
- Admin settings page (Make another page)
- Any User data change should log the user out of any logged device they logged in on (Making another table for session)
- Delete post choice:
  - When deleting post, it shouldn't actually delete it, just make it invisible for regular user (add another column)
  - When deleting post, it should delete the uploaded picture (edit post delete function)
- I need to make a better system for determining who is admin, as of right now it's not good

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
