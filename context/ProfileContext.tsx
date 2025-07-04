'use client'

import { createContext, useCallback, useContext, useState } from 'react'
import type { Database } from '@/lib/database.types'

type BaseProfile = Database['public']['Tables']['profiles']['Row']
interface Profile extends BaseProfile {
  main_location_id: number | null;
}
type LocationDto = Database['public']['Tables']['locations']['Row']

export type Location = LocationDto;

interface ProfileContextType {
  profile: Profile | null
  locations: Location[]
  mainLocation: Location | null
  loading: boolean
  updateProfile: (updates: Partial<Profile>) => Promise<void>
  addLocation: (location: Omit<Location, 'id' | 'user_id' | 'created_at'>) => Promise<Location | void>
  deleteLocation: (id: number) => Promise<void>
  setMainLocation: (location: Location) => Promise<void>
}

const mockLocations = [
  {
    id: 1,
    name: 'Istanbul',
    country: 'Turkey',
    lat: 41.015137,
    lon: 28.979530,
    is_main: true,
    user_id: 'mock-user-id',
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    name: 'London',
    country: 'UK',
    lat: 51.509865,
    lon: -0.118092,
    is_main: false,
    user_id: 'mock-user-id',
    created_at: new Date().toISOString()
  }
];

const ProfileContext = createContext<ProfileContextType | undefined>(undefined)

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [locations, setLocations] = useState<Location[]>(mockLocations)
  const [mainLocation, setMainLocationState] = useState<Location | null>(mockLocations[0])
  
  const updateProfile = useCallback(async (updates: Partial<Profile>) => {
    setProfile(prev => prev ? { ...prev, ...updates } : null)
  },[])

  const addLocation = async (location: Omit<Location, 'id' | 'user_id' | 'created_at'>) => {
    const newLocation = {
      ...location,
      id: locations.length + 1,
      user_id: 'mock-user-id',
      created_at: new Date().toISOString(),
      is_main: false
    };
    
    setLocations(prev => [...prev, newLocation]);
    return newLocation;
  };

  const deleteLocation = useCallback(async (id: number) => {
    setLocations(prev => prev.filter(loc => loc.id !== id))
  }, [])

  const setMainLocation = async (location: Location) => {
    setMainLocationState(location);
    setLocations(currentLocations => 
      currentLocations.map(loc => ({
        ...loc,
        is_main: loc.id === location.id
      }))
    );
  };

  const value = {
    profile,
    locations,
    mainLocation,
    loading,
    updateProfile,
    addLocation,
    deleteLocation,
    setMainLocation,
  }

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
}

export const useProfile = () => {
  const context = useContext(ProfileContext)
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider')
  }
  return context
} 