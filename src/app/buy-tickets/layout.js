import "@/styles/globals.css";

export const metadata = {
  title: "Hannover Malayalis",
  description: "Hannover Malayalis - Book your ticket",
};

export default function RootLayout({ children }) {
  return (
    <div className="buy-tickets-body"> {children}
    </div>
  );
}
