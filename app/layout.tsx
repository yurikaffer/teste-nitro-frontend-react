import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@nextui-org/link";
import clsx from "clsx";
import { Providers } from "./providers";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { ThemeSwitch } from "@/components/theme-switch/theme-switch";
import { GithubIcon } from "@/components/icons/icons";
import { EmailsProvider } from "@/context/EmailsContext";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <EmailsProvider>
          <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
            <div className="relative flex flex-col h-screen">
              <main className="container mx-auto my-auto">{children}</main>
              <footer className="w-full flex flex-col items-center justify-center py-3">
                <div className="flex gap-2 mb-2">
                  <ThemeSwitch />
                  <Link
                    isExternal
                    className="text-default-500 cursor-pointer"
                    href="https://github.com/yurikaffer"
                  >
                    <GithubIcon />
                  </Link>
                </div>
                <Link
                  isExternal
                  className="flex items-center gap-1 text-current"
                  href="https://yurikaffer.dev/"
                >
                  <span className="text-default-600 font-medium">{`Desenvolvido com ❤️`}</span>
                  <p className="text-primary font-medium">Yuri Kaffer</p>
                </Link>
              </footer>
            </div>
          </Providers>
        </EmailsProvider>
      </body>
    </html>
  );
}
