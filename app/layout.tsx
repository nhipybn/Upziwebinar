import type { Metadata } from 'next'
import { Bricolage_Grotesque, Manrope, Inter } from 'next/font/google'
import './globals.css'

// Cấu hình font Bricolage Grotesque cho Tiêu đề
const bricolage = Bricolage_Grotesque({
  subsets: ['vietnamese'],
  variable: '--font-bricolage',
})

// Cấu hình font Manrope cho nội dung chính
const manrope = Manrope({
  subsets: ['vietnamese'],
  variable: '--font-manrope',
})

// Cấu hình font Inter bổ trợ
const inter = Inter({ 
  subsets: ['latin', 'vietnamese'],
  variable: '--font-inter', 
})

export const metadata: Metadata = {
  title: 'Upzi Online Webinar',
  description: 'Cách tiếp cận, thu hút & tuyển dụng đúng nhân sự Gen Z chất lượng. Webinar exclusive từ chuyên gia Navigos Group.',
  icons: {
    icon: [
      {
        url: '/icicon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icicon-light-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icicon-light-32x32.png',
        type: 'image/svg+xml',
      },
    ],
    apple: '/icicon-light-32x32.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" className={`${bricolage.variable} ${manrope.variable} ${inter.variable} bg-[#faf8f3]`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}