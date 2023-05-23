import { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'
import Image from 'next/image'

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
        <header className='flex gap-2 h-28 p-2 pt-3 items-start px-4'>
        
          <div className="flex items-center w-full">
            <a
            href="/"
            rel="noopener noreferrer">
              <Image
                src="/images/arne.png"
                alt="Arne Næss Logo"
                className="dark:invert cursor-pointer"
                width={100}
                height={40}
                priority
              />
          </a>

            <Image
              src="/images/menu-hamburger-nav.png"
              alt="Meny knapp"
              className="dark:invert ml-auto cursor-pointer"
              width={30}
              height={30}
              priority
            />
          </div>
        </header>
        {children}
      </body>
    </html>
  )
}
