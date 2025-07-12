import { Inter } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Hannover Malayalis",
  description: "Aaravam 3.0 Onam Celebration Welcome to Aaravam 3.0, an extravagant celebration of Onam, happening live on September 6, 2025, at Kilkenny IE9, 20254, Navanro. Starting at 10:00 AM, this event promises to be a day filled with vibrant cultural performances, exciting traditional games, and a delicious grand feast.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
