'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
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

const ProfileContext = createContext<ProfileContextType | undefined>(undefined)

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const session = useSession()
  const supabase = useSupabaseClient<Database>()
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [locations, setLocations] = useState<Location[]>([])
  const [mainLocation, setMainLocationState] = useState<Location | null>(null)

  const fetchProfileAndLocations = useCallback(async () => {
    if (!session) return

    setLoading(true)
    try {
      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single()
      
      if (profileError) {
        console.error('Error fetching profile:', profileError)
      } else {
        setProfile(profileData as Profile)
      }

      // Fetch locations
      const { data: locationsData, error: locationsError } = await supabase
        .from('locations')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: true });

      if (locationsError) {
        console.error('Error fetching locations:', locationsError)
      } else {
        setLocations(locationsData || [])

        // Determine main location from the profile's main_location_id
        if (profileData && (profileData as any).main_location_id && locationsData) {
          const mainLoc = locationsData.find(loc => loc.id === (profileData as any).main_location_id)
          setMainLocationState(mainLoc || null)
        } else if (locationsData && locationsData.length > 0) {
          // If no main location set but we have locations, use the first one
          setMainLocationState(locationsData[0])
        } else {
          setMainLocationState(null)
        }
      }
    } catch (error) {
      console.error('Error in fetchProfileAndLocations:', error)
    } finally {
      setLoading(false)
    }
  }, [session, supabase])

  useEffect(() => {
    if (session) {
      fetchProfileAndLocations()
    } else {
      setLoading(false)
      setProfile(null)
      setLocations([])
      setMainLocationState(null)
    }
  }, [session, fetchProfileAndLocations])
  
  const updateProfile = useCallback(async (updates: Partial<Profile>) => {
    if (!session) throw new Error("Not authenticated")
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', session.user.id)
        .select()
        .single()
        
      if (error) throw error
      setProfile(prev => prev ? { ...prev, ...updates } : null)
    } catch (error) {
      console.error('Error updating profile:', error)
      throw error
    }
  },[session, supabase])

  const addLocation = async (location: Omit<Location, 'id' | 'user_id' | 'created_at'>) => {
    if (!session) return;

    try {
      // Add user_id to the location object
      const locationData = { ...location, user_id: session.user.id };

      const { data, error } = await supabase
        .from('locations')
        .insert(locationData)
        .select()
        .single();

      if (error) {
        throw error;
      }
      
      if (data) {
        setLocations(currentLocations => [...currentLocations, data]);
        
        // If this is the first location, set it as main
        if (locations.length === 0) {
          setMainLocation(data);
        }
        
        return data;
      }
    } catch (error) {
      console.error('Error adding location:', error)
    }
  };

  const deleteLocation = useCallback(async (id: number) => {
    if (!session) return
    
    try {
      const { error } = await supabase
        .from('locations')
        .delete()
        .eq('id', id)
        
      if (error) throw error
      setLocations(prev => prev.filter(loc => loc.id !== id))
      
      // If we deleted the main location, set a new one if available
      if (mainLocation && mainLocation.id === id) {
        const remainingLocations = locations.filter(loc => loc.id !== id)
        if (remainingLocations.length > 0) {
          setMainLocationState(remainingLocations[0])
        } else {
          setMainLocationState(null)
        }
      }
    } catch (error) {
      console.error('Error deleting location:', error)
      throw error
    }
  }, [session, supabase, locations, mainLocation])

  const setMainLocation = async (location: Location) => {
    if (!session) return;
    
    try {
      const { id } = location;
      
      // Update local state first for responsive UI
      setMainLocationState(location);
      setLocations(currentLocations => 
        currentLocations.map(loc => ({
          ...loc,
          is_main: loc.id === id
        }))
      );
      
      // Then update in database
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ main_location_id: id })
        .eq('id', session.user.id);

      if (updateError) throw updateError;
    } catch (error) {
      console.error('Error setting main location:', error);
    }
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