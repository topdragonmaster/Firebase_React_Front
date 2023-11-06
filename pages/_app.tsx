import '@/styles/globals.css'

import type { Metadata } from 'next'
import type { AppProps } from 'next/app'
import { ProtectRoute } from '@/context/userContext'
import UserProvider from '@/context/userContext'
import { firebaseApp } from '@/network/firebase'
import { getFirestore } from 'firebase/firestore'
const db = getFirestore(firebaseApp);


export const metadata: Metadata = {
  title: 'Next TODO',
  description: 'Todo app built with Next.js by Farshad Hatami'
}

export default function App({ Component, pageProps }: AppProps) {
  return <UserProvider>
    <ProtectRoute>
      <Component {...pageProps} />
    </ProtectRoute>
  </UserProvider>

}
