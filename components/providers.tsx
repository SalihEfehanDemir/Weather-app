'use client'

import { useState } from 'react'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { ProfileProvider } from '@/context/ProfileContext'
import { createClient } from '@supabase/supabase-js'

export default function Providers({ children }: { children: React.ReactNode }) {
  const [supabaseClient] = useState(() => createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  ))

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      <ProfileProvider>
        {children}
      </ProfileProvider>
    </SessionContextProvider>
  )
} 