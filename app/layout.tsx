import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import LightRays from "../components/lightRays/LightRays";
import Navbar from "@/components/navbar/navbar";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "DevEvent",
  description: "The Hup for every Dev Event You Mustn't miss",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geist.variable}>
      <body>
        <Navbar/>
        <div className="fixed inset-0 z-0 min-h-screen">
          <LightRays
            raysOrigin="top-center-offset"
            raysColor="#5dfeca"
            raysSpeed={0.5}
            lightSpread={0.9}
            rayLength={1.4}
            followMouse={true}
            mouseInfluence={0.02}
            noiseAmount={0}
            distortion={0}
            className="custom-rays"
            pulsating={false}
            fadeDistance={1}
            saturation={1}
          />
        </div>

        <main className="relative z-10 pt-60">{children}</main>
      </body>
    </html>
  );
}