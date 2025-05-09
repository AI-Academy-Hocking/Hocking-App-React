import { useState, useEffect, useRef, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Search, Plus, Minus, Navigation, MapPin, Users } from "lucide-react";
import { Building } from "@shared/schema";
import { useAuth } from "../lib/auth";
import { useSharedLocations } from "../hooks/use-shared-locations";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";
import { toast } from "../hooks/use-toast";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function Maps() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [map, setMap] = useState<L.Map | null>(null);
  const [isLocationSharing, setIsLocationSharing] = useState(false);
  const [viewingSharedLocations, setViewingSharedLocations] = useState(false);
  const [userMarkers, setUserMarkers] = useState<L.Marker[]>([]);
  const [userLocationMarker, setUserLocationMarker] = useState<L.Marker | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  
  const { user } = useAuth();
  const { sharedLocations, updateLocation } = useSharedLocations();
  
  const { data: buildings } = useQuery<Building[]>({
    queryKey: ['/api/buildings'],
  });

  // Filter buildings based on search and category
  const filteredBuildings = buildings?.filter(building => {
    const matchesSearch = searchQuery === "" || 
      building.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || 
      building.category === activeCategory;
    return matchesSearch && matchesCategory;
  }) || [];

  // Initialize map
  useEffect(() => {
    if (mapRef.current && !map) {
      // Hocking College coordinates (3301 Hocking Pkwy, Nelsonville, OH 45764)
      const hockingCollege = [39.4616, -82.2366];
      
      const leafletMap = L.map(mapRef.current).setView(hockingCollege as L.LatLngExpression, 16);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(leafletMap);
      
      // Add a marker for Hocking College main campus
      L.marker(hockingCollege as L.LatLngExpression)
        .addTo(leafletMap)
        .bindPopup("<b>Hocking College</b><br>3301 Hocking Pkwy, Nelsonville, OH 45764");
      
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
            (userLocationMarker as any).setLatLng([latitude, longitude]);
          } else {
            // Create a marker for user location
            const marker = L.marker([latitude, longitude])
              .addTo(map)
              .bindPopup("Your location");
            setUserLocationMarker(marker);
          }
          
          // Center map on user location
          map.setView([latitude, longitude], 17);
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
  
  // Add markers for buildings and other users
  useEffect(() => {
    if (!map) return;
    
    // Clear existing markers
    userMarkers.forEach(marker => (marker as any).remove());
    setUserMarkers([]);
    
    map.eachLayer((layer: any) => {
      if (layer instanceof L.Marker && layer !== userLocationMarker) {
        map.removeLayer(layer);
      }
    });
    
    // Add markers for filtered buildings
    if (buildings) {
      filteredBuildings.forEach(building => {
        const marker = L.marker([building.lat, building.lng])
          .addTo(map)
          .bindPopup(`<b>${building.name}</b><br>${building.description}`);
      });
    }
    
    // Add markers for other users if viewing shared locations
    if (viewingSharedLocations) {
      const newUserMarkers: L.Marker[] = [];
      
      sharedLocations.forEach(sharedUser => {
        // Don't show current user marker twice
        if (user && sharedUser.id === user.id) return;
        
        // Make sure lat/lng are valid
        if (sharedUser.lat !== null && sharedUser.lng !== null) {
          const marker = L.marker([sharedUser.lat, sharedUser.lng], {
            icon: (L as any).divIcon({
              className: 'bg-blue-500 rounded-full w-4 h-4 flex items-center justify-center border-2 border-white',
              iconSize: [20, 20],
              html: `<div class="bg-blue-500 rounded-full w-4 h-4 flex items-center justify-center border-2 border-white"></div>`
            })
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
  }, [map, buildings, filteredBuildings, sharedLocations, user, userLocationMarker, viewingSharedLocations]);

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
    <div className="space-y-6">
      <section>
        <h2 className="text-xl font-heading font-semibold mb-4">Campus Maps</h2>
        
        <Card className="overflow-hidden">
          {/* Map container */}
          <div ref={mapRef} className="h-72 bg-neutral-light relative"></div>
          
          {/* Map controls */}
          <div className="absolute bottom-4 right-4 flex flex-col space-y-2 z-[1000]">
            <Button 
              size="icon" 
              variant="secondary" 
              className="rounded-full" 
              onClick={handleZoomIn}
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Button 
              size="icon" 
              variant="secondary" 
              className="rounded-full" 
              onClick={handleZoomOut}
            >
              <Minus className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Map search and filters */}
          <CardContent className="p-4 border-t border-neutral-light">
            <div className="flex items-center bg-neutral-lightest rounded-lg p-2 mb-4">
              <Search className="text-neutral-dark ml-1 mr-2 h-4 w-4" />
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
                  variant={activeCategory === category.id ? "default" : "outline"}
                  size="sm"
                  className={`rounded-full text-sm ${
                    activeCategory === category.id 
                      ? "bg-primary text-white" 
                      : "bg-neutral-lightest text-neutral-dark"
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
          <h2 className="text-xl font-heading font-semibold mb-4">Location Sharing</h2>
          
          <Card className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <Label htmlFor="location-sharing" className="text-base font-medium">
                    Share my location
                  </Label>
                </div>
                <Switch
                  id="location-sharing"
                  checked={isLocationSharing}
                  onCheckedChange={handleLocationSharingToggle}
                />
              </div>
              
              <p className="text-sm text-neutral-dark">
                {isLocationSharing 
                  ? "Your location is currently being shared with other users."
                  : "Enable location sharing to let others see where you are on campus."}
              </p>
              
              {isLocationSharing && (
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full"
                  onClick={getUserLocation}
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Update my location
                </Button>
              )}
            </div>
          </Card>
          
          <div className="mt-4">
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-primary" />
                  <Label htmlFor="view-shared-locations" className="text-base font-medium">
                    View shared locations
                  </Label>
                </div>
                <Switch
                  id="view-shared-locations"
                  checked={viewingSharedLocations}
                  onCheckedChange={setViewingSharedLocations}
                />
              </div>
              
              <p className="text-sm text-neutral-dark mt-2">
                {viewingSharedLocations
                  ? `Showing ${sharedLocations.length} users on the map.`
                  : "Enable to see other users' locations on the map."}
              </p>
            </Card>
          </div>
        </section>
      )}
      
      <section>
        <h2 className="text-xl font-heading font-semibold mb-4">Building Directory</h2>
        
        <Card>
          <ul className="divide-y divide-neutral-light">
            {filteredBuildings.length > 0 ? (
              filteredBuildings.map((building) => (
                <li key={building.id} className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{building.name}</h3>
                      <p className="text-sm text-neutral-dark">{building.description}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-primary hover:text-primary-dark"
                      onClick={() => {
                        if (map) map.setView([building.lat, building.lng], 18);
                      }}
                    >
                      <Navigation className="h-5 w-5" />
                    </Button>
                  </div>
                </li>
              ))
            ) : (
              <li className="p-4 text-center text-neutral-dark">No buildings found</li>
            )}
          </ul>
        </Card>
      </section>
    </div>
  );
}
