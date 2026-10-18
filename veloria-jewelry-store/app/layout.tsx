import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VELORIA — Jewellery, made timeless",
  description: "Discover considered jewellery, sculptural gold and luminous stones at VELORIA.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "VELORIA — Jewellery, made timeless",
    description: "Modern heirlooms, thoughtfully made.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
