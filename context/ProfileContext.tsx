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
      if (profileError) throw profileError
      setProfile(profileData as Profile)

      // Fetch locations
      const { data: locationsData, error: locationsError } = await supabase
        .from('locations')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: true });

      if (locationsError) throw locationsError
      setLocations(locationsData || [])

      // Determine main location from the profile's main_location_id
      if (profileData && (profileData as any).main_location_id && locationsData) {
        const mainLoc = locationsData.find(loc => loc.id === (profileData as any).main_location_id)
        setMainLocationState(mainLoc || null)
      } else {
        setMainLocationState(null)
      }

    } catch (error) {
      console.error('Error fetching profile and locations:', error)
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
  }, [session?.user.id, fetchProfileAndLocations])
  
  const updateProfile = useCallback(async (updates: Partial<Profile>) => {
      if (!session) throw new Error("Not authenticated")
      const { data, error } = await supabase.from('profiles').update(updates).eq('id', session.user.id).select().single()
      if(error) throw error
      setProfile(data as Profile)
  },[session, supabase])

  const addLocation = async (location: Omit<Location, 'id' | 'user_id' | 'created_at'>) => {
    if (!profile || !session) return;

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
        return data; // Return the newly created location
      }
    } catch (error) {
      console.error('Error adding location:', error)
    }
  };

  const deleteLocation = useCallback(async (id: number) => {
    if(!session) return
    const {error} = await supabase.from('locations').delete().eq('id', id)
    if(error) throw error
    setLocations(prev => prev.filter(loc => loc.id !== id))
  }, [session, supabase])

  const setMainLocation = async (location: Location) => {
    if (!session) return;
    try {
      const { id } = location;
      // Step 1: Set the new main location
      const { error: updateError } = await supabase
        .from('locations')
        .update({ is_main: true })
        .eq('id', id)
        .eq('user_id', session.user.id);

      if (updateError) throw updateError;
      
      // Step 2: Unset the old main location (if one exists)
      if (mainLocation && mainLocation.id !== id) {
        const { error: resetError } = await supabase
          .from('locations')
          .update({ is_main: false })
          .eq('id', mainLocation.id)
          .eq('user_id', session.user.id);
        
        if (resetError) throw resetError;
      }

      // Step 3: Update local state to trigger re-render
      setMainLocationState(location);
      setLocations(currentLocations => 
        currentLocations.map(loc => ({
          ...loc,
          is_main: loc.id === id
        }))
      );
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