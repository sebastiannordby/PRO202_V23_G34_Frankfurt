import { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'
import { MobileHeader } from './components/client/MobileHeader'
import { NextAuthProvider } from "./providers";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ANCEP',
  description: 'Interaktiv læring'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const [menuVisible, setMenuVisibility] = useState(false);

  return (
    <html lang="en">
      <body className={inter.className + " w-full"}>
        <NextAuthProvider>
          <MobileHeader/>
       
          {children}
        </NextAuthProvider>
      </body>
    </html>
  )
}
