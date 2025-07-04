'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"

export default function Login() {
  const router = useRouter()

  const handleDemoLogin = () => {
    router.replace('/')
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800/50 backdrop-blur-md rounded-2xl shadow-lg">
        <div className="text-center">
            <div className="flex justify-center items-center mb-6">
              <Image 
                src="/logo.png" 
                alt="HavaPro Logo" 
                width={700} 
                height={280} 
                className="h-48 sm:h-56 w-auto"
                priority
              />
            </div>
            <p className="text-gray-400">Welcome to HavaPro Weather Dashboard</p>
        </div>
        <div className="space-y-4 mt-8">
          <p className="text-center text-gray-400">
            Temporarily in demo mode for deployment
          </p>
          <Button 
            className="w-full py-6 bg-blue-500 hover:bg-blue-600"
            onClick={handleDemoLogin}
          >
            Continue to Demo
          </Button>
        </div>
      </div>
    </div>
  )
} 