import "./globals.scss";
import { Inter } from "next/font/google";
import { AppProviders } from "./components/AppProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Web3-react demo",
  description: "Chedda markets",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./favicon.ico" />
      </head>
      <body className={`${inter.className} bg-no-repeat`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
