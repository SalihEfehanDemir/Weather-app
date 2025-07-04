"use client"

import { useProfile } from '@/context/ProfileContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Mail, Check, Edit } from "lucide-react"
import { useState, useEffect } from 'react'
import type { Tables } from '@/lib/database.types'

type Profile = Tables<'profiles'>;

export function ProfilePage() {
  const { profile, loading, updateProfile } = useProfile()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<Partial<Profile>>({})
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name,
        time_format: profile.time_format,
      })
    }
  }, [profile])

  if (loading) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin" /></div>
  }

  if (!profile) {
    return <div className="text-center">Please log in to view your profile.</div>
  }
  
  const handleEditToggle = async () => {
    if (isEditing) {
      setIsSaving(true);
      await updateProfile(formData);
      setIsSaving(false);
      setIsEditing(false);
    } else {
      setIsEditing(true)
    }
  }
  
  const handleCancel = () => {
    if(profile) {
        setFormData({
            full_name: profile.full_name,
            time_format: profile.time_format,
        })
    }
    setIsEditing(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  }

  const handleSelectChange = (id: keyof Profile, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Profile Header */}
      <Card className="glass-strong">
        <CardHeader className="flex flex-col md:flex-row items-center gap-6 p-4 md:p-6">
          <Avatar className="h-24 w-24 border-4 border-gray-700">
            <AvatarImage src={profile.avatar_url || ''} alt={profile.full_name || 'User'} />
            <AvatarFallback>{profile.full_name?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
          <div className="text-center md:text-left flex-grow">
            {isEditing ? (
              <Input id="full_name" placeholder="Your Name" value={formData.full_name || ''} onChange={handleInputChange} className="text-2xl font-bold mb-2 glass-input" />
            ) : (
              <CardTitle className="text-3xl font-bold">{profile.full_name || 'Anonymous User'}</CardTitle>
            )}
            <CardDescription className="flex items-center justify-center md:justify-start gap-2 text-gray-400">
              <Mail className="h-4 w-4" /> {profile.id}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            {isEditing && (
              <Button onClick={handleCancel} variant="ghost">Cancel</Button>
            )}
            <Button onClick={handleEditToggle} disabled={isSaving}>
              {isSaving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : (isEditing ? <Check className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />)}
              {isSaving ? 'Saving...' : (isEditing ? 'Save Profile' : 'Edit Profile')}
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Display Preferences */}
      <Card className="glass-strong">
        <CardHeader>
          <CardTitle>Display Preferences</CardTitle>
          <CardDescription>Customize how weather information is displayed.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="time_format">Time Format</Label>
            {isEditing ? (
                <Select value={formData.time_format || '24-hour'} onValueChange={value => handleSelectChange('time_format', value)}>
                    <SelectTrigger className="glass-input"><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="12-hour">12-hour (e.g., 4:00 PM)</SelectItem>
                        <SelectItem value="24-hour">24-hour (e.g., 16:00)</SelectItem>
                    </SelectContent>
                </Select>
            ) : (
                <p className="text-lg font-medium glass-output">{profile.time_format === '12-hour' ? '12-hour' : '24-hour'}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Achievements Section */}
      <Card className="glass-strong">
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
          <CardDescription>Your unlocked milestones and badges.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {/* Placeholder Achievements */}
            <div className="flex flex-col items-center gap-2 p-4 rounded-lg glass-subtle text-center">
                <span className="text-4xl">🌍</span>
                <p className="font-semibold text-sm">Globetrotter</p>
                <p className="text-xs text-gray-400">Saved 5 locations</p>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 rounded-lg glass-subtle text-center opacity-50">
                <span className="text-4xl">🧐</span>
                <p className="font-semibold text-sm">Weather Watcher</p>
                <p className="text-xs text-gray-400">Viewed 100 forecasts</p>
            </div>
             <div className="flex flex-col items-center gap-2 p-4 rounded-lg glass-subtle text-center opacity-50">
                <span className="text-4xl">☀️</span>
                <p className="font-semibold text-sm">Sun Chaser</p>
                <p className="text-xs text-gray-400">Checked a sunny location</p>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 rounded-lg glass-subtle text-center opacity-50">
                <span className="text-4xl">🗓️</span>
                <p className="font-semibold text-sm">Veteran User</p>
                <p className="text-xs text-gray-400">1 year on WeatherPro</p>
            </div>
        </CardContent>
      </Card>
    </div>
  )
}
