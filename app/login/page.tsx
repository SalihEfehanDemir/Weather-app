'use client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { Cloud } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useSession } from '@supabase/auth-helpers-react'
import { useEffect } from 'react'

export default function Login() {
  const supabaseClient = useSupabaseClient()
  const session = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.replace('/')
    }
  }, [session, router])

  if (session) {
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800/50 backdrop-blur-md rounded-2xl shadow-lg">
        <div className="text-center">
            <div className="flex justify-center items-center gap-3 mb-4">
              <div className="p-3 bg-gray-700/50 rounded-2xl">
                <Cloud className="h-8 w-8 text-blue-400" />
              </div>
              <h1 className="text-3xl font-light text-white">
                  Hava<span className="font-semibold">Pro</span>
              </h1>
            </div>
            <p className="text-gray-400">Sign in to access your weather dashboard</p>
        </div>
        <Auth
          supabaseClient={supabaseClient}
          appearance={{ theme: ThemeSupa,
            style: {
                button: { background: '#3b82f6', borderColor: '#3b82f6', color: 'white' },
                anchor: { color: '#60a5fa' },
                input: { background: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.1)', color: 'white' },
                label: { color: '#9ca3af' },
                message: { color: '#ef4444' },
            },
          }}
          providers={['github', 'google']}
          theme="dark"
          socialLayout="horizontal"
        />
      </div>
    </div>
  )
} 