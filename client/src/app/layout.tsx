import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "DajMiLed-CLASSROOM_BUDDY",
  description: "A centralized platform for students and teachers to share and organize academic resources.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        {children}
      </body>
    </html>
  );
}
