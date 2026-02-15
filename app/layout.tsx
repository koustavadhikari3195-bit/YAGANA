import type { Metadata } from "next";
import "./globals.css";
import { ErrorBoundary } from "@/lib/error-boundary";
import PreloaderWrapper from "@/components/preloader-wrapper";

export const metadata: Metadata = {
    title: "Rig Photography | Premium Wedding Photography",
    description:
        "Capturing timeless moments of love, joy, and celebration. Professional wedding photography services tailored to your unique story.",
    keywords: [
        "wedding photography",
        "wedding photographer",
        "bridal photography",
        "event photography",
        "portrait photography",
    ],
    openGraph: {
        title: "Rig Photography",
        description: "Wedding Photography That Tells Your Love Story",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700;800&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className="antialiased">
                <PreloaderWrapper>
                    <ErrorBoundary fallbackModule="RootLayout">
                        {children}
                    </ErrorBoundary>
                </PreloaderWrapper>
            </body>
        </html>
    );
}
