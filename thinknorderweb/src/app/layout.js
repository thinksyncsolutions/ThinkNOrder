import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* ================= SEO METADATA ================= */

export const metadata = {
  metadataBase: new URL("https://thinknorder.in"), // change if domain differs
  title: {
    default: "ThinkNOrder | Next Gen Restaurant Ordering System",
    template: "%s | ThinkNOrder",
  },
  description:
    "ThinkNOrder is a modern QR-based restaurant ordering and management system designed to streamline dining experiences and restaurant operations.",
  keywords: [
    "QR Menu System",
    "Restaurant Ordering Software",
    "Digital Menu India",
    "ThinkNOrder",
    "Restaurant Management System",
  ],
  verification: {
    google: "YOUR_GOOGLE_CONSOLE_CODE",
  },
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "ThinkNOrder | Smart Restaurant Ordering",
    description:
      "Transform your restaurant with QR ordering, live kitchen tracking, and seamless customer experience.",
    url: "https://thinknorder.in",
    siteName: "ThinkNOrder",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

/* ================= GOOGLE ANALYTICS ================= */

const GA_MEASUREMENT_ID = "G-XXXXXXXXXX"; // replace

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* STRUCTURED DATA (Software Application Schema) */}
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "ThinkNOrder",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              url: "https://thinknorder.in",
              description:
                "A next-generation restaurant ordering system with QR menus, live order tracking, and digital billing.",
              provider: {
                "@type": "Organization",
                name: "ThinkSync Solutions",
                url: "https://thinksync.solutions",
              },
            }),
          }}
        />

        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}