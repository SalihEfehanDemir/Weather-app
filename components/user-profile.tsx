"use client"

import { useState, useEffect } from "react"
import { useSupabaseClient, useSession } from '@supabase/auth-helpers-react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useProfile } from "@/context/ProfileContext"

export function UserProfile({ onNavigate }: { onNavigate: (tab: string) => void }) {
  const supabase = useSupabaseClient()
  const session = useSession()
  const { profile } = useProfile()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  const handleLogout = async () => {
    await supabase.auth.signOut()
    onNavigate("dashboard") // Navigate to dashboard on logout
  }

  const getInitials = (name: string | undefined) => {
    if (!name) return "JD"
    const names = name.split(' ')
    if (names.length > 1) {
      return names[0][0] + names[names.length - 1][0]
    }
    return name.substring(0, 2)
  }

  if (!session) {
    return (
      <>
        <Button onClick={() => setIsAuthModalOpen(true)} variant="outline" className="glass-subtle hover:glass">
          Login
        </Button>
        <Dialog open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen}>
          <DialogContent className="bg-gray-800 border-gray-700 text-white">
            <DialogHeader>
              <DialogTitle>Welcome to WeatherPro</DialogTitle>
            </DialogHeader>
            <Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              theme="dark"
              providers={['google', 'github']}
              socialLayout="horizontal"
            />
          </DialogContent>
        </Dialog>
      </>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={profile?.avatar_url || session.user?.user_metadata?.avatar_url} alt={profile?.full_name || ''} />
            <AvatarFallback>{getInitials(profile?.full_name ?? undefined)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{profile?.full_name || 'User'}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {session.user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onNavigate("profile")}>
          Profile
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
