import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Perkiraan Cuaca - Prakiraan Cuaca by Sincan Maulana",
  description: "Dapatkan informasi cuaca yang akurat dengan prakiraan per jam dan mingguan. Cari kota manapun di seluruh dunia.",
  keywords: ["cuaca", "prakiraan", "suhu", "iklim", "prakiraan per jam", "prakiraan mingguan"],
  openGraph: {
    title: "Perkiraan Cuaca - Prakiraan Cuaca by Sincan Maulana",
    description: "Dapatkan informasi cuaca yang akurat dengan prakiraan per jam dan mingguan.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${poppins.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
