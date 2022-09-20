import { createCookieSessionStorage } from "@remix-run/node"; // or cloudflare/deno

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "__session",
      domain: "remix.run",
      httpOnly: true,
      maxAge: 60,
      path: "/",
      sameSite: "lax",
      secure: true,
    },
  });

export { getSession, commitSession, destroySession };