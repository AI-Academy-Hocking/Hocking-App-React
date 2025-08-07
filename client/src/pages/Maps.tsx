import { useState, useEffect, useRef, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Search, Plus, Minus, Navigation, MapPin, ArrowLeft } from "lucide-react";

import { toast } from "../hooks/use-toast";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useAuth } from "../lib/auth";

import { useBackNavigation } from "../hooks/use-back-navigation";

// Fix for Leaflet marker icons
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Use L.icon for default marker icon
// @ts-ignore: Property 'icon' does not exist on type 'typeof import("leaflet")'.
const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Local Building type definition
type Building = {
  id: string;
  name: string;
  description: string;
  category: string;
  lat: number;
  lng: number;
};

export default function Maps() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [map, setMap] = useState<L.Map | null>(null);
  const [userMarkers, setUserMarkers] = useState<L.Marker[]>([]);
  const [userLocationMarker, setUserLocationMarker] = useState<L.Marker | null>(null);
  const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'prompt' | 'unknown'>('unknown');
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedBuildingId, setSelectedBuildingId] = useState<string | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<Building | null>(null);
  const buildingMarkersRef = useRef<L.Marker[]>([]);
  
  const { user } = useAuth();
  
  // Debug user state
  console.log('Maps component - User state:', { 
    user: user ? { id: user.id, isGuest: user.isGuest } : null,
    locationPermission 
  });
  
  const { data: buildings = [] } = useQuery<Building[]>({
    queryKey: ['/api/buildings'],
    queryFn: async () => {
      try {
        const response = await fetch('/api/buildings');
        if (!response.ok) {
          throw new Error('Failed to fetch buildings');
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching buildings:', error);
        return [];
      }
    },
  });

  // Add static academic buildings (including Davidson Hall)
  const staticAcademicBuildings: Building[] = [
    { id: 'davidson-hall', name: 'Davidson Hall', description: 'Academic building', category: 'academic', lat: 39.44078, lng: -82.22025 },
    { id: 'student-center', name: 'Student Center', description: 'Student Center', category: 'academic', lat: 39.44200, lng: -82.22071 },
  ];

  // Add static housing buildings if not present
  const staticHousingBuildings: Building[] = [
    { id: 'north-hall', name: 'North Hall', description: 'Male Only Residence Hall', category: 'housing', lat: 39.44334, lng: -82.22274 },
    { id: 'downhour', name: 'DownHour Hall', description: 'Female Only Residence Hall', category: 'housing', lat: 39.44287, lng: -82.22264 },
    { id: 'summit', name: 'Summit Hall', description: 'Co-Ed Residence Hall', category: 'housing', lat: 39.44839, lng: -82.22052 },
    { id: 'sycamore', name: 'Sycamore Hall', description: 'Co-Ed Residence Hall', category: 'housing', lat: 39.44874, lng: -82.22119 },
  ];

  // Add static dining buildings
  const staticDiningBuildings: Building[] = [
    { id: 'hawks-nest', name: 'Hawks Nest', description: 'Main campus dining hall with a variety of food options.', category: 'dining', lat: 39.44341, lng: -82.22194 },
    { id: 'diamond-dawgz', name: 'Diamond Dawgz', description: 'Quick hotdogs, burgers, fries, and ice cream.', category: 'dining', lat: 39.45925, lng: -82.23453 },
    { id: 'rhapsody', name: 'Rhapsody Restaurant', description: 'Student-run restaurant with casual fine dining and live music.', category: 'dining', lat: 39.46029, lng: -82.23170 },
  ];

  // Add static parking buildings if not present
  const staticParkingBuildings: Building[] = [
    { id: 'student-center-lot', name: 'Student Center Lot', description: 'Parking Lot', category: 'parking', lat: 39.44245, lng: -82.21952 },
    { id: 'hocking-heights-downhour-lot', name: 'Hocking Heights / Downhour Lot', description: 'Parking Lot', category: 'parking', lat: 39.44227, lng: -82.22279 },
    { id: 'john-light-lot', name: 'John Light Lot', description: 'Parking Lot', category: 'parking', lat: 39.44386, lng: -82.22031 },
  ];

  let allBuildings = buildings ? [...buildings] : [];
  staticAcademicBuildings.forEach(staticBldg => {
    if (!allBuildings.some(b => b.name.toLowerCase() === staticBldg.name.toLowerCase())) {
      allBuildings.push(staticBldg);
    }
  });
  staticHousingBuildings.forEach(staticBldg => {
    if (!allBuildings.some(b => b.name.toLowerCase() === staticBldg.name.toLowerCase())) {
      allBuildings.push(staticBldg);
    }
  });
  staticDiningBuildings.forEach(staticBldg => {
    if (!allBuildings.some(b => b.name.toLowerCase() === staticBldg.name.toLowerCase())) {
      allBuildings.push(staticBldg);
    }
  });
  staticParkingBuildings.forEach(staticBldg => {
    if (!allBuildings.some(b => b.name.toLowerCase() === staticBldg.name.toLowerCase())) {
      allBuildings.push(staticBldg);
    }
  });

  let filteredBuildings = allBuildings.filter(building => {
    const matchesSearch = searchQuery === "" || 
      building.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || 
      building.category === activeCategory;
    const hasValidCoordinates = typeof building.lat === 'number' && typeof building.lng === 'number' && 
      !isNaN(building.lat) && !isNaN(building.lng) && building.lat !== 0 && building.lng !== 0;
    
    return matchesSearch && matchesCategory && hasValidCoordinates;
  });

  // If the selected building is not in the filtered list, clear the selection
  if (selectedBuildingId && !filteredBuildings.some(b => b.id === selectedBuildingId)) {
    setSelectedBuildingId(null);
  }

  // Initialize map
  useEffect(() => {
    if (mapRef.current && !map) {
      // Updated coordinates for the new location
      const location = [39.44374, -82.22048];
      
      const leafletMap = L.map(mapRef.current).setView(location as L.LatLngExpression, 15);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(leafletMap);
      
      // No default marker - only show user location when requested
      
      setMap(leafletMap);
      
      return () => {
        leafletMap.remove();
      };
    }
  }, []);

  // Get and update user location
  const getUserLocation = useCallback(() => {
    if (!map) return;
    
    if (navigator.geolocation) {
      // Show loading toast
      toast({
        title: "Getting your location...",
        description: "Please allow location access if prompted",
      });
      
      // Force permission request by calling with high accuracy
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          // Show success toast
          toast({
            title: "Location found",
            description: "Your current location has been marked on the map",
          });
          
          // Create custom user location icon
          const userIcon = L.divIcon({
            className: 'user-location-marker',
            html: '<div style="background-color: #3b82f6; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.3);"></div>',
            iconSize: [20, 20],
            iconAnchor: [10, 10],
          });
          
          // Update marker on map
          if (userLocationMarker) {
            userLocationMarker.setLatLng([latitude, longitude]);
          } else {
            const marker = L.marker([latitude, longitude], { icon: userIcon })
              .addTo(map)
              .bindPopup(`
                <div style="min-width: 200px; font-family: system-ui, sans-serif;">
                  <div style="font-weight: 600; font-size: 16px; color: #1f2937; margin-bottom: 8px;">
                    📍 Your Location
                  </div>
                  <div style="font-size: 14px; color: #6b7280; margin-bottom: 8px;">
                    You are currently here
                  </div>
                  <div style="font-size: 12px; color: #9ca3af; border-top: 1px solid #e5e7eb; padding-top: 8px;">
                    <div>Latitude: ${latitude.toFixed(6)}</div>
                    <div>Longitude: ${longitude.toFixed(6)}</div>
                    <div>Updated: ${new Date().toLocaleTimeString()}</div>
                  </div>
                </div>
              `);
            
            setUserLocationMarker(marker);
          }
          
          // Center map on user location with higher zoom
          map.setView([latitude, longitude], 19);
        },
        (error) => {
          console.error('Error getting location:', error);
          let errorMessage = "Could not get your current location.";
          
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = "Location permission denied. Please enable location access in your browser settings.";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = "Location information is unavailable. Please try again.";
              break;
            case error.TIMEOUT:
              errorMessage = "Location request timed out. Please try again.";
              break;
          }
          
          toast({
            title: "Location error",
            description: errorMessage,
            variant: "destructive",
          });
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 30000
        }
      );
    } else {
      toast({
        title: "Location not supported",
        description: "Geolocation is not supported by your browser",
        variant: "destructive",
      });
    }
  }, [user, map, userLocationMarker]);
  

  
  // Define colored marker icons for each building type
  const iconUrls = {
    academic: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    housing: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    dining: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
    parking: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
    other: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
  };

  function getMarkerIcon(category: string) {
    // @ts-ignore: Property 'icon' does not exist on type 'typeof import("leaflet")'.
    return L.icon({
      iconUrl: iconUrls[category as keyof typeof iconUrls] || iconUrls.other,
      shadowUrl: iconShadow,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
  }

  // Add markers for buildings and other users
  useEffect(() => {
    if (!map) return;
    
    // Clear existing building markers
    buildingMarkersRef.current.forEach(marker => {
      map.removeLayer(marker);
    });
    buildingMarkersRef.current = [];
    
    // Add markers for all filtered buildings
    filteredBuildings.forEach(building => {
      // Validate that lat and lng are valid numbers
      if (typeof building.lat === 'number' && typeof building.lng === 'number' && 
          !isNaN(building.lat) && !isNaN(building.lng) &&
          building.lat !== 0 && building.lng !== 0) {
        
        const marker = L.marker([building.lat, building.lng], { icon: getMarkerIcon(building.category) })
          .addTo(map)
          .bindPopup(`
            <div style="min-width: 200px; font-family: system-ui, sans-serif;">
              <div style="font-weight: 600; font-size: 16px; color: #1f2937; margin-bottom: 8px;">
                ${building.name}
              </div>
              <div style="font-size: 14px; color: #6b7280; margin-bottom: 8px;">
                ${building.description}
              </div>
              <div style="font-size: 12px; color: #9ca3af; border-top: 1px solid #e5e7eb; padding-top: 8px;">
                <div>Category: ${building.category.charAt(0).toUpperCase() + building.category.slice(1)}</div>
                <div>Coordinates: ${building.lat.toFixed(6)}, ${building.lng.toFixed(6)}</div>
                <button onclick="window.dispatchEvent(new CustomEvent('showMarkerDetails', {detail: '${building.id}'}))" 
                        style="margin-top: 8px; padding: 4px 8px; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">
                  View Full Details
                </button>
              </div>
            </div>
          `);
        
        buildingMarkersRef.current.push(marker);
        
        // If this is the selected building, center the map on it
        if (selectedBuildingId === building.id) {
          map.setView([building.lat, building.lng], 18);
        }
      } else {
        console.warn(`Invalid coordinates for building ${building.name}: lat=${building.lat}, lng=${building.lng}`);
      }
    });
  }, [map, filteredBuildings, user]);



  // Check location permissions on mount
  useEffect(() => {
    const checkPermissions = async () => {
      try {
        if (navigator.permissions && navigator.permissions.query) {
          const result = await navigator.permissions.query({ name: 'geolocation' as PermissionName });
          setLocationPermission(result.state);
          
          result.addEventListener('change', () => {
            setLocationPermission(result.state);
          });
        } else {
          // Fallback for browsers that don't support permissions API
          setLocationPermission('prompt');
        }
      } catch (error) {
        console.log('Permissions API not supported, defaulting to prompt');
        setLocationPermission('prompt');
      }
    };
    
    checkPermissions();
  }, []);

  // Force location permission request
  const requestLocationPermission = useCallback(() => {
    if (!navigator.geolocation) {
      toast({
        title: "Location not supported",
        description: "Geolocation is not supported by your browser",
        variant: "destructive",
      });
      return;
    }

    // This will trigger the permission prompt
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationPermission('granted');
        toast({
          title: "Location access granted!",
          description: "You can now use location features",
        });
        // Get the actual location
        getUserLocation();
      },
      (error) => {
        console.error('Permission denied:', error);
        setLocationPermission('denied');
        let errorMessage = "Location access was denied.";
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location permission denied. Please enable location access in your browser settings.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable. Please try again.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out. Please try again.";
            break;
        }
        
        toast({
          title: "Location access denied",
          description: errorMessage,
          variant: "destructive",
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0 // Force fresh location
      }
    );
  }, [getUserLocation]);



  // Cleanup user location marker on unmount
  useEffect(() => {
    return () => {
      if (userLocationMarker) {
        userLocationMarker.remove();
      }
    };
  }, [userLocationMarker]);

  // Listen for marker detail events from popup buttons
  useEffect(() => {
    const handleMarkerDetails = (event: CustomEvent) => {
      const buildingId = event.detail;
      const building = filteredBuildings.find(b => b.id === buildingId);
      if (building) {
        setSelectedMarker(building);
      }
    };

    window.addEventListener('showMarkerDetails', handleMarkerDetails as EventListener);
    
    return () => {
      window.removeEventListener('showMarkerDetails', handleMarkerDetails as EventListener);
    };
  }, [filteredBuildings]);

  // Handle zoom in/out
  const handleZoomIn = () => {
    if (map) map.zoomIn();
  };

  const handleZoomOut = () => {
    if (map) map.zoomOut();
  };

  // Categories for filter buttons
  const categories = [
    { id: "all", label: "All Buildings" },
    { id: "academic", label: "Academic" },
    { id: "housing", label: "Housing" },
    { id: "dining", label: "Dining" },
    { id: "parking", label: "Parking" },
  ];

  const { goBack } = useBackNavigation();

  return (
    <div className="space-y-6 p-6 bg-white dark:bg-[#151c26] min-h-screen">
      {/* Back Navigation */}
      <div className="flex items-center mb-6">
        <button 
          onClick={goBack}
          className="flex items-center text-primary hover:text-primary-dark transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>Back</span>
        </button>
      </div>

      <section>
        <h2 className="text-xl font-heading font-semibold mb-4 text-black dark:text-blue-300">Campus Maps</h2>
        
        <Card className="border-2 border-blue-600 dark:border-transparent rounded-xl shadow-sm bg-white dark:bg-[#353e4a] overflow-hidden">
          {/* Map container */}
          <div ref={mapRef} className="h-72 bg-neutral-light dark:bg-[#353e4a] relative">
            {/* Location Permission Banner */}
            {user && !user.isGuest && locationPermission === 'prompt' && (
              <div className="absolute top-0 left-0 right-0 z-[1001] bg-yellow-500 text-white p-3 text-center">
                <div className="flex items-center justify-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm font-medium">Enable location access to see your position on the map</span>
                  <Button 
                    onClick={requestLocationPermission}
                    size="sm"
                    className="bg-white text-yellow-600 hover:bg-gray-100 ml-2"
                  >
                    Enable
                  </Button>
                </div>
              </div>
            )}
            {/* Map controls */}
            <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
              <Button
                variant="default"
                size="sm"
                className="w-10 h-10 p-0 rounded-full bg-white/90 hover:bg-white shadow-lg text-gray-700 hover:text-gray-900"
                onClick={handleZoomIn}
                title="Zoom In"
              >
                <Plus className="h-4 w-4" />
              </Button>
              <Button
                variant="default"
                size="sm"
                className="w-10 h-10 p-0 rounded-full bg-white/90 hover:bg-white shadow-lg text-gray-700 hover:text-gray-900"
                onClick={handleZoomOut}
                title="Zoom Out"
              >
                <Minus className="h-4 w-4" />
              </Button>
              {/* Find My Location Button - Always visible */}
              <Button
                variant="default"
                size="sm"
                className="w-10 h-10 p-0 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg"
                onClick={getUserLocation}
                title="Find My Location"
              >
                <Navigation className="h-4 w-4" />
              </Button>
              
              {/* Location Permission Button - Show when permission is needed */}
              {locationPermission === 'prompt' && (
                <Button
                  variant="default"
                  size="sm"
                  className="w-10 h-10 p-0 rounded-full bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg"
                  onClick={requestLocationPermission}
                  title="Enable Location Access"
                >
                  <MapPin className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            {/* Map Legend */}
            <div className="absolute bottom-4 left-4 z-[1000] bg-white/95 dark:bg-gray-800/95 rounded-lg p-3 shadow-lg border border-gray-200 dark:border-gray-600">
              <div className="text-xs font-semibold mb-2 text-gray-800 dark:text-gray-200">Map Legend</div>
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full border border-white"></div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Academic</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full border border-white"></div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Housing</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full border border-white"></div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Dining</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-500 rounded-full border border-white"></div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Parking</span>
                </div>
                {user && !user.isGuest && (
                  <>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-600 rounded-full border-2 border-white shadow-sm"></div>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">You</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-sm"></div>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">Other Users</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          
          {/* Map search and filters */}
          <CardContent className="p-4 border-t border-neutral-light dark:border-transparent bg-white dark:bg-[#353e4a]">
            <div className="flex items-center bg-neutral-lightest dark:bg-[#2a3240] rounded-xl p-2 mb-4">
              <Search className="text-neutral-dark dark:text-blue-400 ml-1 mr-2 h-4 w-4" />
              <Input 
                type="text" 
                placeholder="Search for a building..." 
                className="bg-transparent border-none shadow-none focus:ring-0 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button 
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "ghost"}
                  size="default"
                  className={`rounded-xl text-sm ${
                    activeCategory === category.id 
                      ? "bg-blue-600 text-white hover:bg-blue-700" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
      
      <section>
        <h2 className="text-xl font-heading font-semibold mb-4 text-black dark:text-blue-300">Location Services</h2>
          
          {/* Location Permission Status */}
          {locationPermission === 'denied' && (
            <Card className="border-2 border-red-600 dark:border-red-500 rounded-xl shadow-sm bg-white dark:bg-[#353e4a] mb-4">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-red-700 dark:text-red-300">Location Access Denied</h3>
                    <p className="text-sm text-red-600 dark:text-red-400">
                      Please enable location access in your browser settings to use location features.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          {locationPermission === 'prompt' && (
            <Card className="border-2 border-yellow-600 dark:border-yellow-500 rounded-xl shadow-sm bg-white dark:bg-[#353e4a] mb-4">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-yellow-700 dark:text-yellow-300">Enable Location Access</h3>
                    <p className="text-sm text-yellow-600 dark:text-yellow-400 mb-3">
                      Allow location access to see your position on the map and share it with others.
                    </p>
                    <Button 
                      onClick={requestLocationPermission}
                      className="bg-yellow-600 hover:bg-yellow-700 text-white"
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      Enable Location Access
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          {locationPermission === 'granted' && (
            <Card className="border-2 border-green-600 dark:border-green-500 rounded-xl shadow-sm bg-white dark:bg-[#353e4a] mb-4">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-green-700 dark:text-green-300">Location Access Granted</h3>
                    <p className="text-sm text-green-600 dark:text-green-400">
                      Your location services are enabled and ready to use.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          

        </section>
      
      <section>
        <h2 className="text-xl font-heading font-semibold mb-4 text-black dark:text-blue-300">Building Directory</h2>
        
        <Card className="border-2 border-blue-600 dark:border-transparent rounded-xl shadow-sm bg-white dark:bg-[#353e4a]">
          <ul className="">
            {filteredBuildings.length > 0 ? (
              filteredBuildings.map((building) => (
                <li key={building.id} className="p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <span className="inline-block w-5 h-5 rounded-full border-2 bg-blue-600 border-blue-600 dark:bg-blue-400 dark:border-blue-400 flex-shrink-0"></span>
                      <div>
                        <h3 className="font-semibold text-black dark:text-blue-300">{building.name}</h3>
                        <p className="text-sm text-neutral-dark dark:text-white">{building.description}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-primary hover:text-primary-dark dark:text-blue-400 dark:hover:text-blue-300"
                        onClick={() => setSelectedMarker(building)}
                        title="View Details"
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-primary hover:text-primary-dark dark:text-blue-400 dark:hover:text-blue-300"
                        onClick={() => {
                          // Validate coordinates before navigating
                          if (typeof building.lat === 'number' && typeof building.lng === 'number' && 
                              !isNaN(building.lat) && !isNaN(building.lng) &&
                              building.lat !== 0 && building.lng !== 0) {
                            setSelectedBuildingId(building.id);
                            if (map) map.setView([building.lat, building.lng], 18);
                          } else {
                            toast({
                              title: "Invalid location",
                              description: `${building.name} has invalid coordinates and cannot be located on the map.`,
                              variant: "destructive",
                            });
                          }
                        }}
                        title="Center on Map"
                      >
                        <Navigation className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li className="p-4 text-center text-neutral-dark">No buildings found</li>
            )}
          </ul>
        </Card>
      </section>
      
      {/* Marker Details Overlay */}
      {selectedMarker && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {selectedMarker.name}
                </h2>
                <button
                  onClick={() => setSelectedMarker(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Description
                  </h3>
                  <p className="mt-1 text-gray-900 dark:text-white">
                    {selectedMarker.description}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Category
                  </h3>
                  <p className="mt-1 text-gray-900 dark:text-white capitalize">
                    {selectedMarker.category}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Coordinates
                  </h3>
                  <p className="mt-1 text-gray-900 dark:text-white font-mono text-sm">
                    {selectedMarker.lat.toFixed(6)}, {selectedMarker.lng.toFixed(6)}
                  </p>
                </div>
                
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    onClick={() => {
                      if (map) {
                        map.setView([selectedMarker.lat, selectedMarker.lng], 18);
                        setSelectedMarker(null);
                      }
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Navigation className="h-4 w-4 mr-2" />
                    Center on Map
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
