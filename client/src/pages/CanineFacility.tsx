import { ArrowLeft, PawPrint, Phone, Mail, MapPin, Clock, Star, Award, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";

export default function CanineFacility() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-6">
        <Link href="/tools">
          <button className="flex items-center text-primary hover:text-primary-dark transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>Back to Student Tools</span>
          </button>
        </Link>
      </div>

      <div className="flex items-center gap-4 mb-8">
        <PawPrint className="h-8 w-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-primary">Canine Boarding & Grooming at Hocking College</h1>
      </div>

      <Card className="mb-8">
        <CardHeader className="bg-primary-light/10">
          <CardTitle className="text-xl">About Our Facility</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Treat your pet to a top-quality boarding and grooming experience while supporting student learning in our facility! 
            Operated as a hands-on lab for the Canine Assisted Services and grooming certificate programs, our services are 
            offered under expert supervision by licensed professionals including:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              <span className="font-medium">Licensed Veterinary Technician</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-blue-600" />
              <span className="font-medium">Certified Groomer (NDGAA-certified)</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-blue-600" />
              <span className="font-medium">Certified Pet Trainer (CPDT-KA)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader className="bg-primary-light/10">
            <CardTitle className="text-xl">Operating Hours & Contact</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">Lobby Hours:</p>
                  <p>Mon–Fri, 7:30 AM–5:30 PM</p>
                  <p className="text-sm text-gray-600">Weekend & after-hours: By appointment only</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                <span>222 Myers Street, Nelsonville, OH 45764</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-blue-600" />
                <a href="mailto:hcbg@hocking.edu" className="hover:text-blue-600">
                  hcbg@hocking.edu
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-blue-600" />
                <a href="tel:740-300-5056" className="hover:text-blue-600">
                  740‑300‑5056
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-primary-light/10">
            <CardTitle className="text-xl">Why Choose Hocking's Facility?</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-3 text-gray-700 dark:text-gray-300">
              <p>• Expert care with licensed, experienced staff (30+ years each)</p>
              <p>• Supervision by professionally certified grooming and training students</p>
              <p>• Clean, calm, climate-controlled environment praised by clients</p>
              <p>• Live-learning experience supports future canine-care professionals</p>
              <p>• Available for both dogs and cats</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader className="bg-primary-light/10">
            <CardTitle className="text-xl">Boarding Services</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Daycare Boarding:</h4>
                <div className="space-y-1 text-gray-700 dark:text-gray-300">
                  <p>• $10 for up to 4 hours</p>
                  <p>• $20 for full day</p>
                  <p>• Daycare + Training: $30/day (includes training sessions)</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Overnight Boarding:</h4>
                <div className="space-y-1 text-gray-700 dark:text-gray-300">
                  <p>• $25–$35/night (based on size/accommodations)</p>
                  <p>• Including supervised outdoor time, quality bedding, toys</p>
                  <p>• Cat Boarding: $20/night, in a separate, cat-only area</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Health & Safety:</h4>
                <div className="space-y-1 text-gray-700 dark:text-gray-300">
                  <p>• Indoor, climate-controlled environment</p>
                  <p>• Frequent enclosure cleaning and supervised play</p>
                  <p>• Medications and special diets accommodated (owner must provide)</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-primary-light/10">
            <CardTitle className="text-xl">Grooming Services</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                Prioritized as a low-cost, high-quality service with benefits you'll appreciate:
              </p>
              <div>
                <h4 className="font-semibold mb-2">All-inclusive TLC Treatment:</h4>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  Includes HydroSurge bath, nail trimming, ear cleaning, anal gland check, dematting, deshedding, and paw trim
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-3">Typical grooming takes 3–6 hours</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Rates:</h4>
                <div className="space-y-1 text-gray-700 dark:text-gray-300">
                  <p>• Dogs: start at $20 (≤15 lbs), up to $55+ (over 101 lbs)</p>
                  <p>• Cats: start at $50 (≤10 lbs), $55+ (over 10 lbs)</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Additional Services:</h4>
                <div className="space-y-1 text-gray-700 dark:text-gray-300">
                  <p>• Nail grinding – $5</p>
                  <p>• Paw treatment package – $20</p>
                  <p>• Flea/tick shampoos – $10–$20</p>
                  <p>• Extra scissoring/clipper work – $10/15 min</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader className="bg-primary-light/10">
          <CardTitle className="text-xl">Training Services</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              Options designed for puppies and adult dogs:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Daycare with Training:</h4>
                <p className="text-gray-700 dark:text-gray-300">$30/day – includes manners and confidence-building supervised by certified trainers</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Group Canine Basic Manners Class:</h4>
                <p className="text-gray-700 dark:text-gray-300">$80 for 6 weeks (1-hour weekly sessions) + AKC CGC testing ($25 exam fee + AKC processing)</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Private Sessions:</h4>
                <div className="space-y-1 text-gray-700 dark:text-gray-300">
                  <p>• With Certified Trainer: $60/hr</p>
                  <p>• With Intern Trainer (supervised): $30/hr</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader className="bg-primary-light/10">
          <CardTitle className="text-xl">Required Pet Health & Intake</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              Before your first visit, please submit pet documentation:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Current vaccinations:</h4>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <div>
                    <p className="font-medium">Dogs:</p>
                    <p>Parvo, Rabies, Distemper; Recommended: Bordetella, fecal exam</p>
                  </div>
                  <div>
                    <p className="font-medium">Cats:</p>
                    <p>FVRCP, Rabies; Recommended: FeLV testing</p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Additional Requirements:</h4>
                <div className="space-y-1 text-gray-700 dark:text-gray-300">
                  <p>• Flea/tick prevention 48–72 hrs before visit</p>
                  <p>• Provide veterinary records at drop-off or via email within 72 hours of appointment</p>
                  <p>• Bring medications, food, and toys; bedding provided but optional</p>
                  <p>• Trial Day Recommended before first overnight stay</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="bg-primary-light/10">
          <CardTitle className="text-xl">Client Feedback & Pet Stories</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-6">
            <div className="border-l-4 border-blue-600 pl-4">
              <p className="font-semibold">Ken & Buddy (Mixed Breed, Grooming Client)</p>
              <p className="text-gray-700 dark:text-gray-300 italic">
                "The Boarding and Grooming facility is outstanding. It's the cleanest, calmest place we've been to. 
                Buddy used to hate nail trims, but now he trots right in like it's a spa day. I wouldn't go anywhere else."
              </p>
            </div>
            
            <div className="border-l-4 border-blue-600 pl-4">
              <p className="font-semibold">Maria & Luna (Golden Retriever, Boarding & Grooming)</p>
              <p className="text-gray-700 dark:text-gray-300 italic">
                "Luna always comes back so soft, happy, and smells amazing. The staff took the time to learn her quirks, 
                and I love that the students treat the dogs like family. Five stars from both of us!"
              </p>
            </div>
            
            <div className="border-l-4 border-blue-600 pl-4">
              <p className="font-semibold">DeShawn & Pepper (Shih Tzu, Grooming)</p>
              <p className="text-gray-700 dark:text-gray-300 italic">
                "I've paid double the price for half the care at other places. Hocking's grooming services are affordable, 
                professional, and personal. Pepper's haircut was perfect—and she got a paw treatment too!"
              </p>
            </div>
            
            <div className="border-l-4 border-blue-600 pl-4">
              <p className="font-semibold">Amanda & Thor (German Shepherd, Daycare + Training)</p>
              <p className="text-gray-700 dark:text-gray-300 italic">
                "We enrolled Thor in daycare with training, and it was the best decision. He went from wild pup to 
                well-mannered companion in just a few weeks. He's excited every time we pull into the parking lot."
              </p>
            </div>
            
            <div className="border-l-4 border-blue-600 pl-4">
              <p className="font-semibold">Jason & Cleo (Domestic Shorthair Cat, Boarding)</p>
              <p className="text-gray-700 dark:text-gray-300 italic">
                "Finding a good place to board cats is hard. But Cleo was well cared for in a separate, quiet room, 
                and they even let us bring her favorite blanket. The team kept us updated and she came home calm."
              </p>
            </div>
            
            <div className="border-l-4 border-blue-600 pl-4">
              <p className="font-semibold">Jasmine & Max (Boxer Mix, Overnight Boarding)</p>
              <p className="text-gray-700 dark:text-gray-300 italic">
                "We had to leave town unexpectedly, and Hocking fit Max in last-minute. They handled his meds, 
                special diet, and even sent us a photo update. It was such a relief knowing he was in good hands."
              </p>
            </div>
            
            <div className="border-l-4 border-blue-600 pl-4">
              <p className="font-semibold">Bryan & Oakley (Labradoodle, Grooming + Training)</p>
              <p className="text-gray-700 dark:text-gray-300 italic">
                "Oakley is high-energy and anxious, but the staff at Hocking made her feel right at home. 
                Her groomer took extra time to de-shed and detangle her coat, and the trainer worked on leash manners—win-win!"
              </p>
            </div>
            
            <div className="border-l-4 border-blue-600 pl-4">
              <p className="font-semibold">Heather & Binx (Senior Cat, Grooming)</p>
              <p className="text-gray-700 dark:text-gray-300 italic">
                "At 13, Binx doesn't tolerate strangers well, but the groomer was so patient. They used calming techniques 
                and finished without any stress. You can tell these folks love what they do."
              </p>
            </div>
            
            <div className="border-l-4 border-blue-600 pl-4">
              <p className="font-semibold">Paul & Niko (Doberman, Private Training)</p>
              <p className="text-gray-700 dark:text-gray-300 italic">
                "We tried training before, but it didn't stick. The one-on-one sessions at Hocking were a game-changer. 
                Niko's confidence has grown, and so has mine as an owner. Highly recommended for big breeds."
              </p>
            </div>
            
            <div className="border-l-4 border-yellow-400 pl-4 bg-yellow-50 dark:bg-yellow-900/20">
              <p className="font-semibold flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                Alicia & Peanut (Yorkie, Full Groom)
              </p>
              <p className="text-gray-700 dark:text-gray-300 italic">
                "Peanut is tiny and nervous, but they handled him like a prince. The HydroSurge bath and full TLC package 
                left him fluffier than ever. Bonus: they even tied a little bow on his collar!"
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 