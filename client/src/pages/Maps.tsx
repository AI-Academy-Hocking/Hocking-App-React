import { useState, useEffect, useRef, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Search, Plus, Minus, Navigation, MapPin, Users } from "lucide-react";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";
import { toast } from "../hooks/use-toast";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useAuth } from "../lib/auth";
import { useSharedLocations } from "../hooks/use-shared-locations";

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
  const [isLocationSharing, setIsLocationSharing] = useState(false);
  const [viewingSharedLocations, setViewingSharedLocations] = useState(false);
  const [userMarkers, setUserMarkers] = useState<L.Marker[]>([]);
  const [userLocationMarker, setUserLocationMarker] = useState<L.Marker | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedBuildingId, setSelectedBuildingId] = useState<string | null>(null);
  
  const { user } = useAuth();
  const { sharedLocations, updateLocation } = useSharedLocations();
  
  const { data: buildings } = useQuery<Building[]>({
    queryKey: ['/api/buildings'],
  });

  // Add static housing buildings if not present
  const staticHousingBuildings: Building[] = [
    { id: 'north-hall', name: 'North Hall', description: 'Male Only Residence Hall', category: 'housing', lat: 0, lng: 0 },
    { id: 'downhour', name: 'Downhour', description: 'Female Only Residence Hall', category: 'housing', lat: 0, lng: 0 },
    { id: 'summit', name: 'Summit', description: 'Co-Ed Residence Hall', category: 'housing', lat: 0, lng: 0 },
    { id: 'sycamore', name: 'Sycamore', description: 'Co-Ed Residence Hall', category: 'housing', lat: 0, lng: 0 },
  ];

  // Add static dining buildings
  const staticDiningBuildings: Building[] = [
    { id: 'hawks-nest', name: 'Hawks Nest', description: 'Main campus dining hall with a variety of food options.', category: 'dining', lat: 39.4442, lng: -82.2207 },
    { id: 'diamond-dawgz', name: 'Diamond Dawgz', description: 'Quick hotdogs, burgers, fries, and ice cream.', category: 'dining', lat: 39.4450, lng: -82.2212 },
    { id: 'rhapsody', name: 'Rhapsody', description: 'Student-run restaurant with casual fine dining and live music.', category: 'dining', lat: 39.4580, lng: -82.2310 },
  ];

  // Add static parking buildings if not present
  const staticParkingBuildings: Building[] = [
    { id: 'student-center-lot', name: 'Student Center Lot', description: 'Parking Lot', category: 'parking', lat: 0, lng: 0 },
    { id: 'hocking-heights-downhour-lot', name: 'Hocking Heights / Downhour Lot', description: 'Parking Lot', category: 'parking', lat: 0, lng: 0 },
    { id: 'john-light-lot', name: 'John Light Lot', description: 'Parking Lot', category: 'parking', lat: 0, lng: 0 },
  ];

  let allBuildings = buildings ? [...buildings] : [];
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
    return matchesSearch && matchesCategory;
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
      
      // Create a custom icon for the location
      // @ts-ignore: Property 'icon' does not exist on type 'typeof import("leaflet")'.
      const locationIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
      
      // @ts-ignore: Property 'icon' does not exist on type 'typeof import("leaflet")'.
      const mainMarker = L.marker(location as L.LatLngExpression, { icon: locationIcon })
        .addTo(leafletMap)
        .bindPopup(`
          <div class="text-center">
            <b class="text-lg">Location</b><br>
            <span class="text-sm">Latitude: 39.44374</span><br>
            <span class="text-sm">Longitude: -82.22048</span>
          </div>
        `);
      
      setMap(leafletMap);
      
      return () => {
        leafletMap.remove();
      };
    }
  }, []);

  // Get and update user location
  const getUserLocation = useCallback(() => {
    if (!user || !map) return;
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          // Update location in backend if sharing is enabled
          if (isLocationSharing) {
            try {
              await updateLocation(user.id, latitude, longitude, true);
              toast({
                title: "Location shared",
                description: "Your location is now visible to other users",
              });
            } catch (error) {
              console.error('Error updating location:', error);
              toast({
                title: "Error sharing location",
                description: "Could not update your location",
                variant: "destructive",
              });
            }
          }
          
          // Update marker on map
          if (userLocationMarker) {
            userLocationMarker.setLatLng([latitude, longitude]);
          } else {
            const marker = L.marker([latitude, longitude])
              .addTo(map)
              .bindPopup("Your location");
            
            setUserLocationMarker(marker);
          }
          
          // Center map on user location with higher zoom
          map.setView([latitude, longitude], 19);
        },
        (error) => {
          console.error('Error getting location:', error);
          toast({
            title: "Location error",
            description: "Could not get your current location. Please check your browser permissions.",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "Location not supported",
        description: "Geolocation is not supported by your browser",
        variant: "destructive",
      });
    }
  }, [user, map, isLocationSharing, userLocationMarker, updateLocation]);
  
  // Handle location sharing toggle
  const handleLocationSharingToggle = async (enabled: boolean) => {
    setIsLocationSharing(enabled);
    
    if (enabled) {
      getUserLocation();
    } else if (user) {
      // Update user to stop sharing location
      try {
        await updateLocation(user.id, 0, 0, false);
        toast({
          title: "Location sharing disabled",
          description: "Your location is no longer shared with others",
        });
      } catch (error) {
        console.error('Error updating location:', error);
      }
    }
  };
  
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
    
    // Clear existing markers
    userMarkers.forEach(marker => marker.remove());
    setUserMarkers([]);
    
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker && layer !== userLocationMarker) {
        map.removeLayer(layer);
      }
    });
    
    // Add markers for filtered buildings
    if (filteredBuildings) {
      filteredBuildings.forEach((building: Building) => {
        // Use colored icon based on building type
        const marker = L.marker([building.lat, building.lng], { icon: getMarkerIcon(building.category) })
          .addTo(map)
          .bindPopup(`<b>${building.name}</b><br>${building.description}`);
      });
    }
    
    // Add markers for other users if viewing shared locations
    if (viewingSharedLocations) {
      const newUserMarkers: L.Marker[] = [];
      
      sharedLocations.forEach((sharedUser: any) => {
        // Don't show current user marker twice
        if (user && sharedUser.id === user.id) return;
        
        // Make sure lat/lng are valid
        if (sharedUser.lat !== null && sharedUser.lng !== null) {
          // @ts-ignore: Property 'icon' does not exist on type 'typeof import("leaflet")'.
          const marker = L.marker([sharedUser.lat, sharedUser.lng], {
            icon: getMarkerIcon(sharedUser.category)
          })
            .addTo(map)
            .bindPopup(`<b>${sharedUser.name || sharedUser.username}</b><br>Last updated: ${
              sharedUser.lastLocationUpdate ? new Date(sharedUser.lastLocationUpdate).toLocaleTimeString() : 'Unknown'
            }`);
          
          newUserMarkers.push(marker);
        }
      });
      
      setUserMarkers(newUserMarkers);
    }
  }, [map, filteredBuildings, sharedLocations, user, userLocationMarker, viewingSharedLocations]);

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

  return (
    <div className="space-y-6 p-6 bg-white dark:bg-[#151c26] min-h-screen">
      <section>
        <h2 className="text-xl font-heading font-semibold mb-4 text-black dark:text-white">Campus Maps</h2>
        
        <Card className="border-2 border-blue-600 rounded-lg shadow-sm bg-white dark:bg-[#353e4a]">
          {/* Map container */}
          <div ref={mapRef} className="h-72 bg-neutral-light dark:bg-[#353e4a] relative"></div>
          
          {/* Map controls */}
          <div className="absolute bottom-4 right-4 flex flex-col space-y-2 z-[1000]">
            <Button 
              size="icon" 
              variant="default" 
              className="rounded-full" 
              onClick={handleZoomIn}
            >
              <Plus className="h-4 w-4 text-blue-500 dark:text-blue-400" />
            </Button>
            <Button 
              size="icon" 
              variant="default" 
              className="rounded-full" 
              onClick={handleZoomOut}
            >
              <Minus className="h-4 w-4 text-blue-500 dark:text-blue-400" />
            </Button>
          </div>
          
          {/* Map search and filters */}
          <CardContent className="p-4 border-t border-neutral-light bg-white dark:bg-[#353e4a]">
            <div className="flex items-center bg-neutral-lightest dark:bg-[#2a3240] rounded-lg p-2 mb-4">
              <Search className="text-neutral-dark dark:text-blue-400 ml-1 mr-2 h-4 w-4" />
              <Input 
                type="text" 
                placeholder="Search for a building..." 
                className="bg-transparent border-none shadow-none focus:ring-0 w-full text-black dark:text-white placeholder:text-neutral-400 dark:placeholder:text-white/60"
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
                  className={`rounded-full text-sm ${
                    activeCategory === category.id 
                      ? "bg-primary text-white dark:bg-blue-500 dark:text-white" 
                      : "bg-neutral-lightest text-neutral-dark dark:bg-[#2a3240] dark:text-white"
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
      
      {user && !user.isGuest && (
        <section>
          <h2 className="text-xl font-heading font-semibold mb-4 text-black dark:text-white">Location Sharing</h2>
          
          <Card className="border-2 border-blue-600 rounded-lg shadow-sm bg-white dark:bg-[#353e4a]">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-primary dark:text-blue-400" />
                  <Label htmlFor="location-sharing" className="text-base font-medium text-black dark:text-white">
                    Share my location
                  </Label>
                </div>
                <Switch
                  id="location-sharing"
                  checked={isLocationSharing}
                  onCheckedChange={handleLocationSharingToggle}
                />
              </div>
              
              <p className="text-sm text-neutral-dark dark:text-white">
                {isLocationSharing 
                  ? "Your location is currently being shared with other users."
                  : "Enable location sharing to let others see where you are on campus."}
              </p>
              
              {isLocationSharing && (
                <Button 
                  variant="ghost" 
                  size="default"
                  className="w-full text-primary dark:text-blue-400"
                  onClick={getUserLocation}
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Update my location
                </Button>
              )}
            </div>
          </Card>
          
          <div className="mt-4">
            <Card className="border-2 border-blue-600 rounded-lg shadow-sm bg-white dark:bg-[#353e4a]">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-primary dark:text-blue-400" />
                  <Label htmlFor="view-shared-locations" className="text-base font-medium text-black dark:text-white">
                    View shared locations
                  </Label>
                </div>
                <Switch
                  id="view-shared-locations"
                  checked={viewingSharedLocations}
                  onCheckedChange={setViewingSharedLocations}
                />
              </div>
              
              <p className="text-sm text-neutral-dark dark:text-white mt-2">
                {viewingSharedLocations
                  ? `Showing ${sharedLocations.length} users on the map.`
                  : "Enable to see other users' locations on the map."}
              </p>
            </Card>
          </div>
        </section>
      )}
      
      <section>
        <h2 className="text-xl font-heading font-semibold mb-4 text-black dark:text-white">Building Directory</h2>
        
        <Card className="border-2 border-blue-600 rounded-lg shadow-sm bg-white dark:bg-[#353e4a]">
          <ul className="divide-y divide-neutral-light dark:divide-[#2a3240]">
            {filteredBuildings.length > 0 ? (
              filteredBuildings.map((building) => (
                <li key={building.id} className="p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <span className={`inline-block w-5 h-5 rounded-full border-2 transition-colors duration-200 mr-2 ${selectedBuildingId === building.id ? 'bg-blue-600 border-blue-700 dark:bg-blue-400 dark:border-blue-500' : 'bg-neutral-200 border-neutral-400 dark:bg-[#2a3240] dark:border-white'}`}></span>
                      <div>
                        <h3 className={`font-semibold ${selectedBuildingId === building.id ? 'text-black dark:text-white' : 'text-black dark:text-white'}`}>{building.name}</h3>
                        <p className="text-sm text-neutral-dark dark:text-white">{building.description}</p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-primary hover:text-primary-dark dark:text-blue-400"
                      onClick={() => {
                        setSelectedBuildingId(building.id);
                        if (map) map.setView([building.lat, building.lng], 18);
                      }}
                    >
                      <Navigation className="h-5 w-5" />
                    </Button>
                  </div>
                </li>
              ))
            ) : (
              <li className="p-4 text-center text-neutral-dark dark:text-white">No buildings found</li>
            )}
          </ul>
        </Card>
      </section>
    </div>
  );
}
