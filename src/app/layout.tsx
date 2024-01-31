import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomNavbar from "@/components/CustomNavbar";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yatzy",
  description: "Save your intense yatzy games",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="dark text-foreground bg-background min-h-[100vh] ">
          <CustomNavbar />
          <main className="mx-2" >
            {children}
          </main> 
          <Toaster position='top-right' />
        </div>
      </body>
    </html>
  );
}
