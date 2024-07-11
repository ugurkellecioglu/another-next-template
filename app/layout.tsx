// This is the root layout component for your Next.js app.
// Learn more: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
import { Toaster } from "@/components/ui/toaster"
import { cn } from "@/lib/utils"
import { Manrope } from "next/font/google"
import "./globals.css"

const fontHeading = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
})

const fontBody = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={cn("antialiased", fontHeading.variable, fontBody.variable)}
      >
        {children}
        <Toaster />
      </body>
    </html>
  )
}
