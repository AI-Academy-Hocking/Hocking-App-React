import { Book, Building2, ArrowLeft, Users, Shield, Home, FileText, Calendar, MapPin, AlertTriangle, DollarSign, Wrench, Mail, Car, Volume2, Leaf, Tv, Users2, Zap, Trash2, Wifi, Heart, Star } from 'lucide-react';
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface HandbookSection {
  title: string;
  icon: React.ReactNode;
  category: string;
  content: string[];
  important?: boolean;
}

const handbookSections: HandbookSection[] = [
  {
    title: "A Message from the Department of Residence Life",
    icon: <Book className="h-5 w-5" />,
    category: "introduction",
    content: [
      "The Residence Life staff of Hocking College welcomes you to campus living in the Hocking College residence halls means daily interaction with people of diverse backgrounds, values, and lifestyles. It can be an exciting and challenging experience.",
      "As a member of the community, residents are responsible for any behaviors that might infringe upon an individuals and groups rights, and/or jeopardize the health and safety of an individual or their property, both personal and/or college.",
      "All residents and their guests must abide by the Hocking College Code of Conduct and the residence hall policies.",
      "The mission of the Residence Life staff is to provide meaningful support for those who live and work in Hocking College housing facilities.",
      "We aspire to provide meaningful support by:",
      "• Promoting a sense of community for those who live and work in Hocking College housing facilities",
      "• Promoting the academic success of residents living in the community",
      "• Promoting the holistic development of those who live and work in the community",
      "• Promoting an appreciation of differences among all community members",
      "• Promoting a improved quality of life for all community members",
      "Hocking College Mission Statement: We serve as a pathway to prosperity, teaching and inspiring all who seek to learn; growing careers and changing lives"
    ],
    important: true
  },
  {
    title: "College Connections: A Guide to Roommates, Community and Success",
    icon: <Users className="h-5 w-5" />,
    category: "roommates",
    content: [
      "After you have arrived on campus, said good-bye to your friends and family, unpacked your bags, and situated your room, what do you do next? If you haven't done so already, connecting with your roommate may be the very next thing on your mind.",
      "This guide will help you make the connection with your roommate and hopefully help you through any rough patches that you may experience. If all else fails, don't forget about the Residence Life staff!"
    ]
  },
  {
    title: "Your Roommate - Fact or Fiction",
    icon: <Users className="h-5 w-5" />,
    category: "roommates",
    content: [
      "\"In order for my roommate and I to get along, we need to have a lot in common.\" - FICTION: Take the opportunity of living with a new person to expand your horizons and learn from the experiences of others.",
      "\"The people I meet in the residence hall will continue to be friends long after we leave college.\" - FACT…to some extent: Many people meet some of their best friends in the residence halls.",
      "\"My roommate and I need to be best friends and do everything together.\" - FICTION: Being roommates doesn't necessarily mean that people have to be best friends. Instead, a healthy roommate relationship should focus on mutual respect."
    ]
  },
  {
    title: "Open Lines of Communication",
    icon: <Users className="h-5 w-5" />,
    category: "roommates",
    content: [
      "Communication works two ways: talking and listening. Neither one is effective without the other.",
      "To build a successful roommate relationship you need to keep the lines of communication open.",
      "Most roommate conflicts are the result of miscommunication or, in some cases, a lack of communication.",
      "Tips for healthy communication:",
      "1. Talk to your roommate directly when something is bothering you",
      "2. Be direct and clear about what is bothering you",
      "3. Create a win-win situation when resolving conflicts",
      "4. Respect each other's differences"
    ]
  },
  {
    title: "The Art of Respect",
    icon: <Users className="h-5 w-5" />,
    category: "roommates",
    content: [
      "Living in a new place is never easy. Working with your roommate to find mutual ground in your personal space, property, and actions can ease the transition to living on campus.",
      "Key principles:",
      "• Be Clear About Your Expectations From the Beginning",
      "• Address Problems When They're Little",
      "• Respect Your Roommate's Stuff",
      "• Be Mindful of Who You Bring Into Your Room—and How Often",
      "• Lock the Door and Windows",
      "• Be Friendly, Without Expecting to Be Best Friends",
      "• Be Open to New Things",
      "• Stay Open to Change",
      "• Address Problems When They're Big, Too",
      "• If Nothing Else, Follow the Golden Rule"
    ]
  },
  {
    title: "Roommate Agreement Template",
    icon: <FileText className="h-5 w-5" />,
    category: "roommates",
    content: [
      "In an effort to assist you and your new roommate come to common ground regarding some of the more frequent roommate conflicts, an example of a roommate agreement has been provided.",
      "Keep the following in mind when filling this form out with your roommate:",
      "1) Be sure the both your rights are being respected",
      "2) This document can change at a later date if both of you are feel that it does not reflect your needs any longer",
      "3) This is an agreement, not a contract. Should dispute arise, talk to your Residence Life staff member",
      "The template includes agreements on: room cleanliness, cleaning schedules, study times, guest policies, quiet hours, personal belongings usage, and more."
    ]
  },
  {
    title: "Your Community",
    icon: <Users className="h-5 w-5" />,
    category: "community",
    content: [
      "Your living environment isn't solely restricted to your room. Around you live other individuals whose actions impact you and vice versa.",
      "Tips for developing relationships with neighbors:",
      "• Respect others and their beliefs",
      "• Take the first step: Introduce yourself",
      "• Learn and use names",
      "• Give a helping hand",
      "• Love where you live",
      "• Attend Hall Meetings",
      "SAFETY should always be a concern. A healthy community includes people looking out for each other."
    ]
  },
  {
    title: "Success - Campus Resources",
    icon: <Star className="h-5 w-5" />,
    category: "success",
    content: [
      "Access Center - Do you have a documented disability? Talk to Erin Bowald in the Access Center.",
      "Student Conduct - Questions about the Student Code of Conduct or appropriate actions on campus? Talk to Erick Smith in the main concourse of John Light Hall.",
      "Campus Police (HCPD) - Did you lock your keys in your car, need a jump, want to report a crime? Talk to any of the friendly officers at Campus Safety.",
      "Financial Aid – Do you have questions about your financial aid, scholarships, loans, or grants? Talk to one of our Financial Aid experts on the first floor of John Light Hall.",
      "Hawks Center for Well-Being (JL) – Do you need an immunization, physical or other form of basic medical care? Call the Wellness Center at <a href=\"tel:740-753-7079\" className=\"text-blue-600 hover:underline\">740-753-7079</a> or stop in to John Light 241.",
      "Counseling Services – Need to talk to someone about personal matters? Visit with one of our counselors in John Light 241 completely free of charge."
    ]
  },
  {
    title: "Staying Healthy",
    icon: <Heart className="h-5 w-5" />,
    category: "success",
    content: [
      "The busy, hectic life of a college student doesn't leave much time for healthy living. Staying healthy should take a major role in your life.",
      "Tips for a healthier lifestyle:",
      "• Make time to work out - Exercise should be one of the last things to go",
      "• Nutrition is the building block for a successful college experience",
      "• Don't leave your meals to chance - Plan what you are going to eat for the day",
      "• Bring your snacks with you - This will save you money and help your waistline",
      "• Stress management: Talk to friends and family, workout or go for a walk, use a journal, read a good book, find a hobby, get plenty of rest",
      "• Sleep! Aim for about eight hours a night"
    ]
  },
  {
    title: "Being You",
    icon: <Star className="h-5 w-5" />,
    category: "success",
    content: [
      "College can put a lot of pressure on a person. Even the strongest willed individual can come under succumb to peer pressure.",
      "Questions to ask yourself before making any decision:",
      "• What would my parents think if they knew what I was doing? Would they be proud?",
      "• Who will be affected by this decision (or your actions)?",
      "• Will the outcome of this decision affect any of my long term goals?",
      "Ultimately, you are the creator of your destiny. You are the product of the choices you have made and will be the end result of the choices you will make in the future."
    ]
  },
  {
    title: "Your Rights and Responsibilities",
    icon: <Shield className="h-5 w-5" />,
    category: "rights",
    content: [
      "1. You have the right to an equal share of space in the room and to expect that your roommate(s) will respect your belongings. You have the responsibility to communicate assertively and respectfully with your roommates.",
      "2. You have the right to a safe, healthy, and clean environment in which to live. You have the responsibility to clean up after yourself, to remind others to clean up after themselves, and to report health and safety concerns.",
      "3. You have the right to a quiet environment conducive to sleeping and studying. You have the responsibility to ask others to be quieter and/or report repeated violations of quiet hours.",
      "4. You have the right to be successful at Hocking College, become involved in campus life, and to enjoy living on campus. You have a responsibility to put effort into your academics, to follow the Hocking College Code of Conduct, and to abide by all Hocking College policies and procedures."
    ],
    important: true
  },
  {
    title: "Residence Life Staff",
    icon: <Users className="h-5 w-5" />,
    category: "staff",
    content: [
      "Hall Directors supervise the daily operations of the residence hall and are available to assist students with involvement opportunities, policy concerns, roommate concerns, room changes and any other concerns.",
      "The Hall Director staff also coordinate inclusive and engaging events that take place in the residence halls as well as providing a variety of opportunities for students to interact with and get to know the other students living in the building.",
      "Hall Directors will also manage disputes that arise in the residence halls as well as facilitate issues with facilities.",
      "Housing Office Staff – the housing office staff are available to connect you with resources available to assist you with all of your needs. Stop into the office in the main concourse of John Light Hall or call (740) 753-7043 or email housing@hocking.edu"
    ]
  },
  {
    title: "Abandoned Property",
    icon: <Trash2 className="h-5 w-5" />,
    category: "policies",
    content: [
      "When residents leave the residence halls or change rooms, all personal items should be removed from their former living area.",
      "Personal items left uncollected on the last day of the term will be considered abandoned property and will disposed of by the Residence Life Staff."
    ]
  },
  {
    title: "Access",
    icon: <Shield className="h-5 w-5" />,
    category: "policies",
    content: [
      "Residence Halls:",
      "• Students living in the residence halls will use their student IDs to access their residence hall",
      "• Main entrance doors of the residence halls are locked at all times",
      "• For safety and security reasons, secondary doors (side doors) are not to be propped or kept open",
      "• Should you misplace your ID you may be charged a fee for replacement",
      "Rooms:",
      "• Summit and Sycamore have combination codes to enter the student rooms",
      "• You may have your door code changed one time at no cost",
      "• Each resident at Downhour, Hocking Heights, and North Halls will be given a key for their room",
      "• Excessive lockouts may result in additional fees"
    ]
  },
  {
    title: "Alcohol",
    icon: <AlertTriangle className="h-5 w-5" />,
    category: "policies",
    content: [
      "In an effort to provide an environment conducive to academic success, no one is permitted to consume, sell, possess, or be impaired by alcohol in the residence halls, the surrounding school property, or in personal vehicles on campus.",
      "Any incident or inappropriate action against members of the Residence Life staff, Campus Safety Officers, law enforcement, or other residents will be counterproductive and may cause the offending resident to face additional penalties.",
      "If a resident is 21 or over, providing the means to obtain or directly giving alcohol to residents or other students under the age of 21 is illegal."
    ]
  },
  {
    title: "Bicycles",
    icon: <Car className="h-5 w-5" />,
    category: "policies",
    content: [
      "Hocking College believes in promoting a healthy, \"green\" environment. Students are encouraged to ride their bicycles rather than drive whenever possible to protect our environment.",
      "Residents of Hocking Heights may store their bicycles at the shelter or in their rooms. All other residents must store their bicycles in the racks provided.",
      "Locks on bicycles stored outside designated areas will be cut and the bicycle removed.",
      "Students are advised to always keep bicycles locked when it is not in use."
    ]
  },
  {
    title: "Check-in and Check-out",
    icon: <Calendar className="h-5 w-5" />,
    category: "policies",
    content: [
      "Check in:",
      "• Residents must check in at the beginning of every term",
      "• Initial check-in (move in) requires residents to sign the pertinent parts of the Room Condition Report (RCR)",
      "• When checking in for Spring term, students should check in with a Residence Life staff member",
      "Check out:",
      "• Residents must check-out with a member of the Residence Life staff or they may forfeit their security deposit",
      "• When leaving the residence halls permanently, check-out procedures include cleaning the room thoroughly, removing all personal items, checking out with a Residence Life staff member, identifying any damage, returning keys, and signing the RCR"
    ]
  },
  {
    title: "Civility",
    icon: <Users className="h-5 w-5" />,
    category: "policies",
    content: [
      "Residents are expected to treat all residents, guests, and staff with courtesy and respect.",
      "Bullying, defined as the repeated use of written, verbal, or electronic/cyber expression and/or communication and/or a verbal, electronic or physical act of gesture or any combination thereof directed at a member of the college or community is unacceptable."
    ]
  },
  {
    title: "Community Areas",
    icon: <Home className="h-5 w-5" />,
    category: "policies",
    content: [
      "Community areas are those areas provided in the residence halls for residents to utilize, such as lounges, study rooms, laundry rooms, etc.",
      "Community areas are available for all residents. Reserving a community area is only permitted with permission from the Hall Director.",
      "Community areas are to be kept free of trash and abandoned personal items out of respect for other residents.",
      "Material deem inappropriate by a reasonable individual is not to be viewed in the community room or in public areas of the building.",
      "Students are not permitted to field dress animals in the residence halls.",
      "Public activities are always encouraged in the community areas, but quiet and courtesy hours should always be observed.",
      "Residence hall public areas are designed for the exclusive use of residential students.",
      "Furniture provided in common areas must remain in these areas. Removal of these items will be treated as theft of institutional property."
    ]
  },
  {
    title: "Confiscation of Property",
    icon: <AlertTriangle className="h-5 w-5" />,
    category: "policies",
    content: [
      "Residents' property can be confiscated if deemed dangerous to person or property, or after the resident has been asked to remove the items in prior instances.",
      "Stereo speakers and other noise making devices may be confiscated if warnings for noise violations are ignored.",
      "Any confiscated property will be stored at the discretion of the Housing Office.",
      "Prohibited items include, but are not limited to: sling shots, blow guns, paint ball guns, BB guns, airsoft guns, crossbow, ammunition, firearms, explosives and other weapons, fire hazards such as ungrounded extension cords, fireworks and candles, stolen property, offensive posters and any alcohol related advertising, routers, candle warmers, toaster ovens."
    ]
  },
  {
    title: "Decorations/Adhesive",
    icon: <Home className="h-5 w-5" />,
    category: "policies",
    content: [
      "Wall hangings must be removed prior to check-out, including any adhesive residue left behind.",
      "Posters, signs, flags, or other wall hangings, are not permitted in the windows or doorways as they are considered fire hazards.",
      "Empty alcohol containers for decorative (or any other) purposes are not permitted.",
      "For health and safety reasons, only 75% of any given wall may be covered. Nothing should be taped to or hung from the ceiling.",
      "Drawing, writing, and/or marking of doors are not permitted. Room doors cost approximately $500.",
      "Offensive, degrading, or indecent material is not permitted on the outside of room doors or in windows.",
      "Do not tamper with the fire evacuation routes posted on the back of your room door."
    ]
  },
  {
    title: "Drugs",
    icon: <AlertTriangle className="h-5 w-5" />,
    category: "policies",
    content: [
      "Illegal drugs (including medical marijuana) or legal medications used in a manner other than directed are prohibited.",
      "Violations will be reported to the Hocking College Police Department."
    ]
  },
  {
    title: "Electrical Appliances",
    icon: <Zap className="h-5 w-5" />,
    category: "policies",
    content: [
      "Each room is equipped with a mini fridge and microwave.",
      "Approved appliances: curling irons, hair dryers, flat irons, electric razors, televisions, VCR/DVD players, game consoles, stereos, personal computers, fish tanks, and grounded surge protectors.",
      "Students who choose to use any of the items above are encouraged to bring power strips with surge protectors.",
      "Appliances not permitted include (but are not limited to): additional refrigerators, additional microwaves, hot plates, single burner units, sandwich makers, toasters, toaster ovens, George Forman grills, and any appliance with an open heating element or electric radiant heaters.",
      "Students are permitted to cook with provided microwaves in their rooms given that the student keeps their room and cooking area in a sanitary condition and remains in the room while cooking."
    ]
  },
  {
    title: "Fire Safety",
    icon: <AlertTriangle className="h-5 w-5" />,
    category: "policies",
    content: [
      "The burning of candles and incense in the residence halls is not permitted.",
      "Lamps with halogen bulbs are not permitted in the residence halls.",
      "Residential rooms should be kept in a condition that would permit easy egress from the room in the event of fire alarm activation.",
      "All fire related equipment, including but not limited to: fire evacuation routes posted on the backs of room doors, fire extinguishers, alarms, EXIT signs, and notices, are available for the purpose of saving lives.",
      "Students are not permitted to cover smoke detector devices in rooms for any reason. Rooms found with covered smoke detectors may be charged a $50 fee.",
      "Hanging of items on sprinkler head cages is not permitted.",
      "Fire drills are held a minimum of once per term.",
      "When the fire alarm sounds you must vacate the building. Failure to evacuate may result in a referral to Campus Judiciaries.",
      "Fire doors must remain closed at all times to contain smoke and fire.",
      "Activating a false alarm (or causing people to believe the alarm is sounding) may result in referral to Campus Police and/or Campus Judiciaries."
    ],
    important: true
  },
  {
    title: "Garbage",
    icon: <Trash2 className="h-5 w-5" />,
    category: "policies",
    content: [
      "Students should place their trash into the large dumpsters provided near the building, except in Downhour and North Halls where trash rooms are provided on each floor.",
      "It is not acceptable to place personal trash in public bathrooms or public areas."
    ]
  },
  {
    title: "Internet Service",
    icon: <Wifi className="h-5 w-5" />,
    category: "policies",
    content: [
      "Individual routers are NOT permitted in any dorm room.",
      "All residence halls have wireless access to the internet. Hocking Heights, Downhour, and North also have Ethernet ports for a hardwire connection.",
      "Students are strongly encouraged to have antivirus software on their personal computers before connecting to the internet.",
      "Wireless routers are not permitted as they interfere with the existing wireless service.",
      "Be careful about the type and size of downloads. The amount of bandwidth used by each port is monitored and excessive consumption of bandwidth may result in the port being deactivated.",
      "Students wishing to purchase supplemental internet packages can do so by contacting Nelsonville TV Cable (<a href=\"tel:740-753-2686\" className=\"text-blue-600 hover:underline\">740-753-2686</a>).",
      "Notice to Students of Claimed Infringement – if a representative of copyrighted content detects illegal downloading or sharing of copyrighted content on the Hocking network, a letter of the alleged infringement will be sent to the university."
    ]
  },
  {
    title: "Laundry and Vending Machines",
    icon: <Wrench className="h-5 w-5" />,
    category: "policies",
    content: [
      "Residence halls are equipped with vending machines and laundry facilities.",
      "Use of these machines is limited to residents of that residential complex only.",
      "Tampering with machines will result in referral to Campus Police and/or Campus Judiciaries.",
      "Sitting or lying on the machines is not permitted.",
      "Should any of the laundry or vending machines fail to work, please notify the Housing Office."
    ]
  },
  {
    title: "Maintenance and Housekeeping",
    icon: <Wrench className="h-5 w-5" />,
    category: "policies",
    content: [
      "A full-time housekeeping staff is employed by Hocking College for Hocking Heights, Downhour, and North Halls. At Summit on the River and Sycamore, the building owners employ the housekeeping staff.",
      "Downhour, Hocking Heights, and North residence halls, maintenance requests should be made to a Residence Life staff member.",
      "Summit and Sycamore Hall students can make requests via e-mail to <a href=\"mailto:workorder@lhxprop.com\" className=\"text-blue-600 hover:underline\">workorder@lhxprop.com</a>.",
      "Students are directly responsible for the housekeeping of their rooms. Rooms should be cleaned on a regular basis, including vacuuming, sweeping, changing and washing personal bedding, and removing trash.",
      "The Residence Life Department reserves the right to take corrective action (including cleaning the room and billing the student) in those situations that present a health or safety concern.",
      "Violations of this policy may result in referral to Campus Judiciaries."
    ]
  },
  {
    title: "Mail",
    icon: <Mail className="h-5 w-5" />,
    category: "policies",
    content: [
      "Each resident has a mailbox in the lobby of their residence hall. A mailbox key or combination will be issued to the resident during check-in. It is the resident's responsibility to return the key upon check-out. There is a $5 fee for lost mailbox keys.",
      "If a package is too large to fit into a mailbox at Summit and Sycamore halls, a slip will be placed in the mailbox and the resident must pick up the package at the staff office of their particular building during office hours from 6pm-4am.",
      "For Hocking Heights, Downhour, and North Halls, if a package is too large to fit into the mailbox, an email will be sent to the student email address of the recipient and the resident must pick up the package at the Warehouse between 8am and 4pm.",
      "Hocking College mail service distributes mail to campus residence halls once daily Monday – Friday by 4:00PM",
      "A photo ID is required to pick up any mail from the mail room."
    ]
  },
  {
    title: "Motorcycles/Hoverboards/Skateboards",
    icon: <Car className="h-5 w-5" />,
    category: "policies",
    content: [
      "For health and safety reasons, motorcycles, including any motorized vehicle, are allowed only on the streets and designated areas for parking of vehicles.",
      "Motorcycles should be parked in designated parking spaces. Individuals choosing to park their motorcycles in undesignated spaces may receive tickets from Campus Police and/or have their motorcycle towed.",
      "No motorized transportation devices, such as hoverboards, skateboards, scooters, bicycles, segways, etc. are allowed in any Hocking College Building.",
      "Hoverboards are not allowed on any Hocking College campus or in any Hocking College Building.",
      "Skateboards must be carried while in any Hocking College Building."
    ]
  },
  {
    title: "Noise",
    icon: <Volume2 className="h-5 w-5" />,
    category: "policies",
    content: [
      "Quiet hours are in place to facilitate studying and personal time in the residence halls. Quiet hours are from 10:00pm- 8:00am on weekdays (Sun-Thurs) and 12:00am-9:00am on weekends (Fri-Sat).",
      "Courtesy hours are in effect all day. Therefore, you should comply if anyone requests that you be quieter.",
      "During finals week, there will be 24-hour quiet time for the entire week",
      "Repeated violations of quiet hours may result in a referral to Campus Judiciaries."
    ]
  },
  {
    title: "Outside Grounds",
    icon: <MapPin className="h-5 w-5" />,
    category: "policies",
    content: [
      "The outside grounds are available for football, Frisbee, hacky-sack, recreational sports/activities, and other events, activities must not get in the way of normal traffic routes or occur in parking lots.",
      "The woods have many miles of hiking trails. Students are free to hike in the woods at any time, however, a campfire is prohibited. All campus policies still apply to this area.",
      "The retaining wall outside Downhour and North Halls is strictly off limits. There is not to be any sledding on the hill between these two halls. Climbing, descending, or sitting on this wall is not permitted."
    ]
  },
  {
    title: "Parking",
    icon: <Car className="h-5 w-5" />,
    category: "policies",
    content: [
      "A parking permit is required for all students who wish to park on campus. Students can obtain their permit by paying the appropriate fees at Cashiers. A new permit is needed each term.",
      "Assigned parking is available in limited quantities outside Hocking Heights and Downhour Hall for students living in Hocking Heights, Downhour, and North Halls. Permits for assigned parking are available from Cashiers.",
      "Residents without assigned parking can park in designated lots on campus.",
      "Parking is available on a first come first serve basis outside Summit and Sycamore Halls and is free of charge.",
      "Please do not park in front of the buildings' doors or in places other than parking spaces except for dropping off or picking up. Cars left in the fire lanes may be ticketed and/or towed at the owner's expense.",
      "Residents are not permitted to drive off the pavement (i.e. to get to the volleyball courts or grills).",
      "Drivers are asked to observe a 15 mph speed limit in all residence hall parking lots.",
      "Sports/recreational activities are not permitted in parking lots and/or driveways.",
      "There are marked visitor spaces outside Hocking Heights for guests. Permits must be obtained from the Campus Police Department immediately upon arrival."
    ]
  },
  {
    title: "Personal Hygiene",
    icon: <Heart className="h-5 w-5" />,
    category: "policies",
    content: [
      "Room cleanliness and personal hygiene greatly impact students' health and ability to be successful in school.",
      "Just as students are expected to keep their rooms clean, residents are also expected to keep themselves clean by showering/bathing regularly.",
      "Residents are expected to wash their clothes and bedding on a regular basis.",
      "Rooms are expected to be free of any potential health hazards."
    ]
  },
  {
    title: "Pets/Animals",
    icon: <Heart className="h-5 w-5" />,
    category: "policies",
    content: [
      "Contact Housing for the Animals on Campus Procedures. Animals are NOT allowed into the Residence Hall until it has been preapproved.",
      "If it is not preapproved BEFORE moving in the resident will be required to find an alternate home for it."
    ]
  },
  {
    title: "Recycling",
    icon: <Leaf className="h-5 w-5" />,
    category: "policies",
    content: [
      "In North and Downhour Halls, recycled goods should be placed in the closets provided on each floor for removal.",
      "In Hocking Heights, recycled goods should be placed in the bins in the community room.",
      "In Summit and Sycamore, residents are responsible for taking items to the recycling receptacle provided.",
      "Recycled goods must be broken down and cleaned out prior to disposal."
    ]
  },
  {
    title: "Residence Hall Damage",
    icon: <DollarSign className="h-5 w-5" />,
    category: "policies",
    content: [
      "The conditions of student rooms are assessed prior to the beginning of Autumn Term and again prior to the student moving out.",
      "Particular attention is given to the cleanliness and damage of the room.",
      "Residents are responsible for the condition of their rooms.",
      "When the students responsible for damage are identified, the cost of the repair will be equally divided amongst those who caused the damage.",
      "Residents are collectively responsible for identifying the students responsible for damages. If the students responsible for damage do not come forward, the charges will be distributed amongst the community.",
      "The pricing guideline provided details estimated costs associated with repairs to the residence halls. Pricing may include additional items and may exceed the listed amounts."
    ]
  },
  {
    title: "Roofs/Ledges/Windows",
    icon: <Home className="h-5 w-5" />,
    category: "policies",
    content: [
      "Students are not allowed on the roofs or ledges of the residence halls. Students also may not sit in open windows.",
      "Where provided, screens are required to be in the resident's windows at all times.",
      "No objects are to be thrown in or out of the windows or off the ledges. Nor should objects be hung outside or placed on the windows.",
      "Speakers should not be placed in the windows."
    ]
  },
  {
    title: "Room or Residence Hall Changes",
    icon: <Home className="h-5 w-5" />,
    category: "policies",
    content: [
      "No reassignments will be made during the first two weeks of either autumn or spring semesters to allow for housing rosters to be solidified.",
      "If a room change is desired, contact the Housing Office for details.",
      "Any change in housing charge as a result for changing rooms is the responsibility of the resident changing rooms.",
      "Individuals who choose to change rooms outside of these guidelines may need to move back into the room they left and approval for future moves may not be granted and may be subject to disciplinary action."
    ]
  },
  {
    title: "Room Furnishings",
    icon: <Home className="h-5 w-5" />,
    category: "policies",
    content: [
      "Furnishings that are provided in the room must remain in the room.",
      "Furniture and kitchen appliances must remain in their assigned area. Relocation of these items is prohibited.",
      "Waterbeds and personal air conditioning units are prohibited in any residence hall room.",
      "Only rubber door stops are permitted to be used to prop any residence hall room door."
    ]
  },
  {
    title: "Room Inspections",
    icon: <Home className="h-5 w-5" />,
    category: "policies",
    content: [
      "College officials may enter your room at any time for matters pertaining to weekly inspections, health and safety, suspected rule violations, and upkeep of college owned furnishings and/or equipment.",
      "Health and Safety inspections will be conducted at least twice per term."
    ]
  },
  {
    title: "Sales and Solicitation",
    icon: <DollarSign className="h-5 w-5" />,
    category: "policies",
    content: [
      "Students are not permitted to conduct business from their residence hall rooms.",
      "Solicitation, whether in person or via telephone is prohibited.",
      "Bulletin boards are provided for promotion of campus events and for official notices. All posters/publicity must be approved by the Hall Director of the building before publicizing. Signs must be removed immediately after the event.",
      "To protect your right to privacy, door-to-door sales are prohibited.",
      "Advertising of private products is permitted only with approval from the Department of Residence Life and only as bulletin board space and time permits.",
      "Should you observe sales or solicitations, please contact a staff member."
    ]
  },
  {
    title: "Severe Weather",
    icon: <AlertTriangle className="h-5 w-5" />,
    category: "policies",
    content: [
      "During severe weather, students should stay alert for changing conditions.",
      "Staff members will provide additional instructions as necessary.",
      "Sign up for Nixle alerts via www.nixle.com. Nixle alerts can cover campus safety issues and local traffic issues in addition to severe weather notifications"
    ]
  },
  {
    title: "Smoking",
    icon: <AlertTriangle className="h-5 w-5" />,
    category: "policies",
    content: [
      "Smoking is only permitted inside personal vehicles in a parking space.",
      "Residents must be in the vehicle. On the roof, hood, or trunk is not considered inside a vehicle, although smoking is permitted in the bed of a truck. Sitting on a motorcycle is not acceptable."
    ]
  },
  {
    title: "Television Services",
    icon: <Tv className="h-5 w-5" />,
    category: "policies",
    content: [
      "Hocking Heights, Downhour and North Halls have cable access provided in all resident rooms and common areas as part of the residence hall fees.",
      "Summit and Sycamore Halls are cable ready.",
      "Students wanting to purchase or upgrade their cable package may do so by contacting Nelsonville TV and Cable at (740) 753-2686.",
      "Financial responsibility for this service is between the student and the cable company.",
      "Tampering with the cable equipment is a serious offense and subject to referral to Campus Police and/or Campus Judiciary"
    ]
  },
  {
    title: "Visitation/Guests",
    icon: <Users2 className="h-5 w-5" />,
    category: "policies",
    content: [
      "The Department of Residence Life defines visitation as the right of the individual student, with permission of his/her roommate(s), to invite and entertain guests in her/her room.",
      "Visiting hours in the Residence Halls are Sunday through Thursday, 5 pm - 10 pm and Friday through Saturday, 5 pm - 12 am.",
      "Guests must sign in at the front desk of my building.",
      "Guests are NOT allowed to stay overnight.",
      "Female only dorms may only have female guests.",
      "Male only dorms may only have male guests.",
      "Violation(s) of any of these rules will results in disciplinary action, up to and including suspension from College.",
      "Guests are limited to two (2) in one room at one time.",
      "The host is responsible for the actions of his/her guests.",
      "The rights of the roommate(s) supersede those of the guest.",
      "Guests need to be escorted by their host at all times when in public areas and may not be left unattended in the building.",
      "All guests must identify themselves and produce a valid picture ID if requested by the Residence Life Staff and/or Campus Police.",
      "Minors (individuals under the age of 18) may not visit the residence halls."
    ]
  },
  {
    title: "Weapons, Firearms, and Explosives",
    icon: <AlertTriangle className="h-5 w-5" />,
    category: "policies",
    content: [
      "In accordance with the Hocking College Code of Conduct, weapons, firearms, and explosives may not be stored in a resident's room, or in their private vehicle on campus. Any object that could be used to cause harm to self or others is subject to confiscation.",
      "Furthermore, sling shots, archery bows, arrows, ammunition, and other gun equipment are not allowed in the residence halls or stored in private vehicles parked on campus.",
      "Refer to the Hocking College Code of Conduct for the campus-wide policy.",
      "Items such as culinary knives, machetes, hatchets and other tools that may be classified as a weapon required for class are not permitted in the residence halls. Students are encouraged to work with their department to make arrangements for the storage of such items."
    ]
  },
  {
    title: "Weight-Lifting Equipment",
    icon: <AlertTriangle className="h-5 w-5" />,
    category: "policies",
    content: [
      "Free weights and/or other weight lifting equipment are not permitted in any of the residence halls."
    ]
  },
  {
    title: "What's in the Area?",
    icon: <MapPin className="h-5 w-5" />,
    category: "area",
    content: [
      "There is a great deal of opportunities for recreation and enjoyment in the area of Nelsonville.",
      "The URL for the Athens County Visitors Guide can be found at: http://athensohio.com/category/view-the-official-guides-to-athens-county/",
      "Local Health Care Facilities include: OhioHealth Urgent Care (Nelsonville & Athens), Fruth Pharmacy, Holzer Clinic-Albany, O'Bleness Hospital ER, Planned Parenthood, Shriver's Pharmacy, and Walmart Clinic & Pharmacy.",
      "Local Dining Options include: Boot Factory Grill, Burr Oak Lodge, FullBrooks Café, General Wok, JJ's Pizza and Subs, Lake Hope Lodge, Little Italy Pizza, Los Mariachi's, Mama Renie's Pizza, Mine Tavern, Rhapsody Fine Dining, and Tammy's Kitchen.",
      "Area Lodging includes: Days Inn, Holiday Inn Express, Ohio University Inn, and Super 8."
    ]
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Handbook() {
  const categories = [
    { name: "Introduction & Welcome", sections: ["introduction"], color: "blue" },
    { name: "Roommates & Community", sections: ["roommates", "community"], color: "green" },
    { name: "Success & Resources", sections: ["success"], color: "purple" },
    { name: "Rights & Staff", sections: ["rights", "staff"], color: "red" },
    { name: "Residence Hall Policies", sections: ["policies"], color: "orange" },
    { name: "Local Area Information", sections: ["area"], color: "teal" }
  ];

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="flex items-center mb-6">
        <Link 
          href="/housing"
          className="flex items-center text-primary hover:text-primary-dark transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>Back to Housing</span>
        </Link>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <Book className="h-8 w-8 text-blue-600" />
            <Building2 className="h-4 w-4 absolute -bottom-1 -right-1 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-primary">Residence Life Handbook</h1>
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Your complete guide to living on campus. Learn about policies, procedures, and resources available to help you succeed in your college experience.
        </p>
      </div>

      {/* Organized Sections */}
      <Accordion type="multiple" className="space-y-4">
        {categories.map((category) => {
          const colorClasses = {
            blue: {
              border: "border-blue-300 dark:border-blue-600",
              bg: "bg-blue-50 dark:bg-blue-900/20",
              text: "text-blue-800 dark:text-blue-200",
              icon: "text-blue-600"
            },
            green: {
              border: "border-green-300 dark:border-green-600",
              bg: "bg-green-50 dark:bg-green-900/20",
              text: "text-green-800 dark:text-green-200",
              icon: "text-green-600"
            },
            purple: {
              border: "border-purple-300 dark:border-purple-600",
              bg: "bg-purple-50 dark:bg-purple-900/20",
              text: "text-purple-800 dark:text-purple-200",
              icon: "text-purple-600"
            },
            red: {
              border: "border-red-300 dark:border-red-600",
              bg: "bg-red-50 dark:bg-red-900/20",
              text: "text-red-800 dark:text-red-200",
              icon: "text-red-600"
            },
            orange: {
              border: "border-orange-300 dark:border-orange-600",
              bg: "bg-orange-50 dark:bg-orange-900/20",
              text: "text-orange-800 dark:text-orange-200",
              icon: "text-orange-600"
            },
            teal: {
              border: "border-teal-300 dark:border-teal-600",
              bg: "bg-teal-50 dark:bg-teal-900/20",
              text: "text-teal-800 dark:text-teal-200",
              icon: "text-teal-600"
            }
          };

          const colors = colorClasses[category.color as keyof typeof colorClasses];

          return (
            <AccordionItem 
              key={category.name} 
              value={category.name}
              className={`border-2 ${colors.border} rounded-lg`}
            >
              <AccordionTrigger className={`${colors.bg} px-6 py-4 hover:no-underline`}>
                <div className={`flex items-center text-lg font-semibold ${colors.text}`}>
                  <Book className={`mr-3 h-5 w-5 ${colors.icon}`} />
                  {category.name}
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <motion.div
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="space-y-6"
                >
                  {handbookSections
                    .filter(section => category.sections.includes(section.category))
                    .map((section) => (
                      <motion.div
                        key={section.title}
                        variants={item}
                        className={`p-4 rounded-lg ${
                          section.important 
                            ? 'bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500' 
                            : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          {section.icon}
                          <h3 className={`font-semibold ${
                            section.important 
                              ? 'text-red-800 dark:text-red-200' 
                              : 'text-gray-800 dark:text-gray-200'
                          }`}>
                            {section.title}
                          </h3>
                          {section.important && (
                            <Badge className="bg-red-600 text-white">Important</Badge>
                          )}
                        </div>
                        <div className={`space-y-2 ${
                          section.important 
                            ? 'text-red-700 dark:text-red-300' 
                            : 'text-gray-700 dark:text-gray-300'
                        }`}>
                          {section.content.map((item, index) => (
                            <p key={index} className="text-sm leading-relaxed">
                              {item}
                            </p>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                </motion.div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
} 