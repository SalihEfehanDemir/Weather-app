'use client'

// Temporarily disable Supabase auth for Vercel deployment
const mockClient = {
  auth: {
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    onAuthStateChange: () => { return { data: { subscription: { unsubscribe: () => {} } } } }
  }
};

import { ProfileProvider } from '@/context/ProfileContext'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
    </div>
  )
} 