import { LoaderFunctionArgs } from "@remix-run/cloudflare";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData,
} from "@remix-run/react";
import "./tailwind.css";

export const loader = async ({ context }: LoaderFunctionArgs) => {
  return json({
    ENV: {
      GA_ID: "xyz",
      ENV: "local",
      GOOGLE_MAPS_KEY: "AIzab1i2312",
      BLOG_GOOGLE_AUTH_CLIENT_ID: "something.apps.googleusercontent.com",
      BASE_URL: "http://localhost:3333",
    },
  });
};

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<typeof loader>();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
          }}
        />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
