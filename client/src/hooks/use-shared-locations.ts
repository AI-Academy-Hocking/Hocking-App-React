import { useState, useEffect, useCallback } from 'react';
import { useWebSocket } from './use-websocket';
import { User } from '@shared/schema';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getQueryFn } from '../lib/queryClient';

type UserWithoutPassword = Omit<User, 'password'>;

interface LocationUpdateMessage {
  type: 'location_update';
  data: UserWithoutPassword[];
}

export function useSharedLocations() {
  // Setup WebSocket connection
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  const wsUrl = `${protocol}//${window.location.host}/ws`;
  const { lastMessage } = useWebSocket(wsUrl, {
    onMessage: (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'location_update') {
          queryClient.setQueryData(['locations', 'shared'], data.data);
        }
      } catch (err) {
        console.error('Error parsing WebSocket message:', err);
      }
    }
  });

  const queryClient = useQueryClient();

  // Fetch initial shared locations from REST API
  const { data: locations, isLoading, error } = useQuery({
    queryKey: ['locations', 'shared'],
    queryFn: getQueryFn<UserWithoutPassword[]>({ on401: 'returnNull' }),
  });

  // Update user location
  const updateLocation = useCallback(async (userId: number, lat: number, lng: number, isShared: boolean = true) => {
    try {
      const response = await fetch(`/api/users/${userId}/location`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lat, lng, isLocationShared: isShared }),
      });

      if (!response.ok) {
        throw new Error('Failed to update location');
      }

      // Re-fetch the shared locations to update the UI
      queryClient.invalidateQueries({ queryKey: ['locations', 'shared'] });
      return await response.json();
    } catch (error) {
      console.error('Error updating location:', error);
      throw error;
    }
  }, [queryClient]);

  return {
    sharedLocations: locations || [],
    isLoading,
    error,
    updateLocation,
  };
}