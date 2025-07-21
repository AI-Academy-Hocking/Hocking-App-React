import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ArrowLeft, AlertTriangle, DollarSign, Users, Shield, Calendar, Utensils, CreditCard, Home, FileCheck } from 'lucide-react';
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

interface ContractSection {
  title: string;
  icon: React.ReactNode;
  content: string[];
  important?: boolean;
  category: string;
}

const contractSections: ContractSection[] = [

  {
    title: "General Contract Terms",
    icon: <FileCheck className="h-5 w-5" />,
    category: "general",
    content: [
      "All students who choose to live in Hocking College Residence Halls (Downhour, Hocking Heights, North, Summit and Sycamore), are required to fill out the Application for Housing and pay the application fee.",
      "Students who elect to live in the residence halls in the Fall semester are required to sign up for the Spring semester and MUST pay the initial fee for Spring.",
      "In the event that a student decides not to live in the residence hall in the Spring semester, they forfeit the initial fees that are required to reserve their room.",
      "Students may receive a partial refund of fees for Spring if they notify the College prior to November 1 of the academic year. No proration or refunds will be given after that date.",
      "If you are approved to live in campus housing, you are required to sign the Residence Hall Contract and the Contract will serve as an official Contract between Hocking College and the Resident student.",
      "All incoming Summer Students who apply for and are granted a Contract for Residential Housing will be committing to living in campus housing for the entire semester, unless otherwise released from the housing obligations explained in the Contract.",
      "Summer and Spring only housing are available upon request. There is not an option for a Fall semester only contract unless the applicant graduates at the end of the Fall term.",
      "If an applicant is graduating at the end of the Fall semester, notification in writing must be submitted within 30 calendar days to the end of the academic term."
    ],
    important: true
  },
  {
    title: "Application Information",
    icon: <FileCheck className="h-5 w-5" />,
    category: "application",
    content: [
      "Financial aid may not be used to cover the application or reservations fees (student should apply for financial aid as soon as possible to try to defray these expenses).",
      "The required fees must be paid in order to process the application.",
      "The date the completed application and payment of the application and reservation fees are received will determine the applicant's priority number when assigning facility and room type.",
      "Applications must be submitted electronically (apply.hocking.edu). Any other means will not be accepted.",
      "If applying for Summer semester housing and the applicant intends to reside in the residence halls for Summer semester, the applicant must submit a second application for Fall/Spring semester.",
      "Applying for Summer semester housing does not automatically enroll you in housing for Fall/Spring semester.",
      "The application fee is paid per year and 30 calendar days prior to the Summer semester.",
      "All applicants are billed for the type of accommodations in which they are residing during the ninth week of each semester, if changes have occurred.",
      "Changes will not be made to the applicant's account after the ninth week. Accounts are not prorated for partial semester assignments.",
      "The applicant will be held responsible for the fees for the entire semester of the contract.",
      "Applicants who do not fulfill the Fall/Spring semester will still be required to pay for the entire contract period unless the student has been released from their contract.",
      "Dropping below 12 credit hours can disqualify a student from on-campus housing, but does not release an applicant from their contractual obligations. Students dropping below half-time status must provide documentation from their academic advisor as to the need for this status."
    ],
    important: true
  },
  {
    title: "Application Fee and Security Deposit",
    icon: <DollarSign className="h-5 w-5" />,
    category: "fees",
    content: [
      "A $60 non-refundable application fee is required at the time of submission of the housing application. Financial aid cannot be used to cover this fee.",
      "A $250 Security Deposit (SD) is due, in full, before a room assignment will be made. Financial aid cannot be used to cover this fee.",
      "The SD is refundable depending on the condition of the room at the end of the term as determined by College Personnel at the time of check out.",
      "The SD may not be refunded if the Resident did not properly check out of their room on or before the stated hall closing day and time.",
      "The SD will be credited to the applicant's housing charges should the contract be successfully fulfilled. If there is a refund, it will be mailed to the address on file with the College.",
      "The SD is refundable the first term of residence if cancellation, in writing, is received 30 days prior to the first day of term for which the applicant is applying."
    ],
    important: true
  },
  {
    title: "Housing Eligibility Requirements",
    icon: <Users className="h-5 w-5" />,
    category: "eligibility",
    content: [
      "Any person who is over the age of 18 at the time of move-in, a matriculated student, and is enrolled as a (12 credit hours) Hocking College student is eligible to live in the residence halls.",
      "Currently maintaining a balance of less than $1,500 on their student account, with a payment plan in place.",
      "In good standing academically and behaviorally with the college.",
      "A parent or guardian's signature is required at the time of application for applicants under age of 18.",
      "Hocking College, in accordance with the Hocking College Police Department, reserves the right to review applicants with prior felony convictions, including violent offenses as defined in Ohio Revised Code 2901.01 and any offense listed as a violation of section 2903.01, 2903.02, 2903.03, 2903.04, 2903.11, 2903.12, 2903.13, 2903.15, 2903.21, 2903.211, 2903,22, 2905.01, 2905.02, 2905.11, 2905.32, 2907.02, 2907.03, 2907.05, 2909.02, 2909.03, 2909.24, 2911.01, 2911.02, 2911.11, 2917.01, 2917.02, 2917.03, 2917.31, 2919.25, 2921.03, 2921.04, 2921.34, or 2923.161, of division (A)(1) of section 2903.34, of division (A)(1), (2), or (3) of section 2911.12, or of division (B)(I), (2), (3), or (4) of section 2919.22 of the Revised Code or felonious sexual penetration in violation of former section 2907.12 of the Revised Code.",
      "A felony conviction does not automatically disqualify an applicant from on-campus residency. Any felony conviction must be submitted in writing to the Housing office for review. Submissions can be made to housing@hocking.edu. Cases will be reviewed on a case-by-case basis."
    ]
  },
  {
    title: "Rates and Payment Terms",
    icon: <DollarSign className="h-5 w-5" />,
    category: "payment",
    content: [
      "The rate for the room is established and published in advance and must be paid upon the commencement of selected Semester for the academic year.",
      "The student agrees to pay late fees if the payment is not received by the aforementioned due dates. Fees for late payments will be assessed at a rate established by the College's Cashier Office.",
      "Failure to make timely payments may result in the termination of this contract by the College.",
      "Applicants whose payment is returned due insufficient funds or any other reason agrees to pay a returned check processing fee and any other late fees incurred.",
      "This contract is executed when the application, application fee, reservation fee, and signed contract are received. A signed contract and submission of all fees must be received by the payment deadline. Failure to meet the specified timelines may result in the termination of the housing status.",
      "The Hocking College reserves the right to alter the fee schedule when necessary. Students will be given a 30 calendar day notice of such changes.",
      "Students who do not pay the agreed upon payment schedule will be prohibited from registering for semester classes until the balance is paid in full.",
      "The student agrees that failure to make a payment as described above does not release the student from the housing contract.",
      "The student understands that non-payment of fees and fines may result in the subsequent denial of the release of a diploma, certificates, transcripts, or other documents until the balance is paid in full."
    ]
  },
  {
    title: "Joint and Several Liability",
    icon: <Shield className="h-5 w-5" />,
    category: "liability",
    content: [
      "Residents of each room are severally responsible for all charges arising from this contract.",
      "If two Residents share a room, each shall be individually responsible for the full amount of all charges."
    ]
  },
  {
    title: "Room Assignment and Availability",
    icon: <Home className="h-5 w-5" />,
    category: "assignment",
    content: [
      "The College cannot guarantee room facility assignment although all efforts will be made to honor the preferences listed on the housing application.",
      "Students with disabilities or in need of assistive adaptations will be given preference."
    ]
  },
  {
    title: "Liability, Safety, Sanitation, and Inspection",
    icon: <Shield className="h-5 w-5" />,
    category: "safety",
    content: [
      "The College is not liable for damage, fire, or loss of money or valuables to any person, or for the loss of damage to any Resident's property or personal injury sustained on the premises except such damage or injury caused by the active neglect of the College.",
      "The College urges all Residents to obtain the appropriate insurance coverage.",
      "The College and the Resident further agree that each forfeits the right of action it may later require against the other for loss or damage to property in which may have interest, where such loss is caused by fire or other hazards covered by the College's insurance on said premises.",
      "The College and its property owners or agents shall not be held responsible or liable for any damages, loss or any injury to the student or property or his/her family member/guest's property or person from whatever cause arising from the occupancy of said premise.",
      "The Resident is responsible for any damages caused by the Resident and/or guests including family members to the room, its appliances and equipment.",
      "The Resident is responsible for maintaining the room in a safe and sanitary manner.",
      "The Resident shall permit the College access to the premises for inspection.",
      "The applicant agrees to entry and search of rooms by a college official/property owner and law enforcement officials for ensuring that residents are following college regulations, federal, state, and local laws and will be subject to the college policy on entry, search and seizure.",
      "A College official or property owner or his agent shall be privileged to visit, enter, and be upon said premises at any reasonable hour for the purposes of inspecting the same for making repairs, improvements or occupancy status.",
      "The Resident shall remove all trash from the room, discarding in the designated waste disposal areas.",
      "The Resident shall not store combustible or flammable material within the premises.",
      "The Resident agrees to be directly and financially responsible for keeping the assigned room and furnishings found therein clean and free from damage and to advise the residence hall staff of any deteriorated conditions of the room furnishings therein.",
      "Relocation of furnishings, modification to room or other parts of the building(s) is prohibited without written permission from the Director of Residence Life.",
      "The Resident agrees to use public areas, residential corridors, room, equipment, and furnishings in a careful and proper manner."
    ]
  },
  {
    title: "Release from Contract, Early Termination and Cancellation",
    icon: <Calendar className="h-5 w-5" />,
    category: "termination",
    content: [
      "The College may at its discretion, release a Resident from his or her obligations under this contract. Requests must be submitted in writing.",
      "A Resident requesting to terminate their room contract must provide a detailed written explanation with supporting verifiable documentation for the reasons and must meet one the following criteria listed.",
      "Failure to provide the necessary documentation will result in housing changes and penalties on the students account and possible further legal action.",
      "If the student is not attending classes because of academic or personal behavior the student will not be excused or waived from the full financial responsibility for payment of resident fees even if the student has been asked to leave the residence hall because of non-compliance with student conduct and academic rules.",
      "Appeals relating to the release of the contract must be made in writing within five (5) business days of determination and notification sent to the Housing Account Appeals Committee at housing-mealappeal@hocking.edu.",
      "Criteria for release: Completion of Graduation Requirements; Marriage; Compulsory Military Duty; Birth or Adoption of a child; Medical/Dietary Limitations/Reasons (with recent medical documentation); Financial Hardship (with verifiable documentation).",
      "The following are not eligible for review: financial savings, commuting to campus, reaching a certain age, or previously living on campus. Additionally, students who self-withdraw or are suspended or expelled for disciplinary or academic reasons."
    ]
  },
  {
    title: "Refund Policy",
    icon: <DollarSign className="h-5 w-5" />,
    category: "refunds",
    content: [
      "Room fees are refundable at the following rates and are only available in the event that the student is no longer enrolled because of the reasons stated in the release criteria.",
      "Refunds are processed in accordance with the on-campus refund policy of the College. Please allow ten business days for refunds to be processed.",
      "If a balance is owed on the account, the refund will be applied to the student's account balance. No checks will be issued without credit showing on the student's Hocking College account.",
      "The refund is calculated from the time the Resident has removed all their belongings from their Residential assignment and has officially checked out with a residence hall staff member.",
      "100% before move-in date or the first day of the semester, whichever comes first.",
      "85% from the move-in date or first day of the semester until the 15th calendar day of the semester.",
      "There will not be any refunds issued after the 15th day of the semester start."
    ]
  },
  {
    title: "Conditions of Occupancy",
    icon: <Home className="h-5 w-5" />,
    category: "occupancy",
    content: [
      "Residents agree to maintain eligibility to live in the College Residential room, as determined by this contract, the Student's Rights and Responsibilities, Hocking College Student Handbook, the laws and rules of the State of Ohio, Athens County, city of Nelsonville, and all applicable federal rules and regulations.",
      "Failure to maintain eligibility constitutes a material breach of the contract. Resident agrees to vacate the room no later than the last day in which he/she is no longer eligible to live in College premises.",
      "The Resident agrees further not to sublet or assign any part of the premises to another person."
    ]
  },
  {
    title: "Conduct and Behavior",
    icon: <Shield className="h-5 w-5" />,
    category: "conduct",
    content: [
      "The College reserves the right to refer any Resident for judicial misconduct to the Office of Student Conduct should the student violate the Student Code of Conduct or Residence Hall Policy.",
      "The student agrees to not use or possess intoxicating beverages, marijuana, tobacco, firearms, firecrackers, gunpowder, explosive devices, or deadly weapon which means any instrument, device, or thing capable of inflicting death, and designed or specially adapted for use as a weapon, or possessed, carried, or used as a weapon or any other weapon listed in the Ohio Revised Code 2923.11.",
      "The use of alcohol by minors on the premises constitutes a breach of this Contract by the Resident, allowing the College to terminate this Contract."
    ]
  },
  {
    title: "Delivery and Destruction of Premises",
    icon: <Home className="h-5 w-5" />,
    category: "premises",
    content: [
      "It is mutually understood and agreed by the Resident and the College that in the event the College shall be unable, for any reason, to deliver possession of the premises at the beginning of the Contract Period, the College shall not be liable to Resident for damage caused by such failure to deliver possession, nor shall the Contract become void for that reason, but in such event the Resident shall not be liable for payment until complete possession is delivered or the College supplies other housing options.",
      "If the premises are damaged or destroyed by fire or casualty, the College may terminate this contract by notice to the Resident (Casualty Termination Option).",
      "The notice of termination must begin within 15 calendar days after the occurrence of the casualty.",
      "Within 15 calendar days after notice of termination has been given, the Resident must surrender the premises to the College (Surrender Date).",
      "After the Surrender Date, the College and the Resident are released from any further obligations or liability under this Contract, with exceptions for charges accruing through the Surrender Date and reservation fee handling."
    ]
  },
  {
    title: "Illegal Drugs",
    icon: <AlertTriangle className="h-5 w-5" />,
    category: "drugs",
    content: [
      "Residents agree that violation of any federal, state, or local laws regarding the use of controlled substances, in or around the premises constitutes a breach of this Contract.",
      "The College may recover possession of the premises by summary proceedings when the Resident holds over the premises for twenty-four hours after service of a written demand by the College for possession or termination of this Contract under this provision.",
      "The use of alcohol by minors on the premises constitutes a breach of this Contract by the Resident, allowing the College to terminate this Contract."
    ]
  },
  {
    title: "Vacating Premises",
    icon: <Home className="h-5 w-5" />,
    category: "vacating",
    content: [
      "Each Resident must arrange a checkout time with the Housing Office at the conclusion of each academic semester.",
      "An improper checkout which is defined as departing the premise without checking out with a Residence Life staff member OR failing to checkout of the building prior to the announced Hall Closing date and time will be assessed an additional $50.00.",
      "At that time, the Resident will provide a forwarding address and surrender the room and all keys.",
      "If the Resident fails to follow the established checkout procedure, the College will change the lock on the room and charge the costs of the lock change to the Resident.",
      "Upon termination of this Contract, or if Resident shall have abandoned the room, the College shall have, and is hereby granted, full and free license to remove all property of the Resident or others from the room without being guilty of trespass, eviction, or forcible entry and detainer.",
      "After thirty calendar days, the College shall have the right to dispose of unclaimed property as it sees fit."
    ]
  },
  {
    title: "Additional Contract Terms",
    icon: <FileText className="h-5 w-5" />,
    category: "additional",
    content: [
      "The Resident agrees to abide by the rules and regulations of the College as published in the College Catalog, Resident Handbook, Student Code of Conduct and other College publications.",
      "The Resident agrees to comply with all Federal, State and local laws.",
      "The Resident shall not interfere with the lawful and proper use and enjoyment of the room, building or any part thereon by the College, its agents or employees, nor shall the Resident interfere with lawful and proper use of other rooms in the building or common areas of the building by Residents of other rooms.",
      "The Resident shall not permit the playing of radios, televisions, stereos, or musical instruments or sounds/noises at levels loud enough to be heard by Residents in any other room or at levels and in locations where it becomes a nuisance or disturbance to others.",
      "The College reserves the right to make such rules and regulations and/or amend current rules and regulations from time to time as may be deemed necessary and proper for the safety, care and cleanliness of the premises, and for securing the comfort and welfare of all occupants.",
      "In the event that Resident is suspended from student status for any reason, Resident agrees to immediately vacate the College Campus and this College room pending any investigation or appeal rights associated with such suspension, unless otherwise waived in writing by the College."
    ]
  },
  {
    title: "Abandoned Property",
    icon: <Home className="h-5 w-5" />,
    category: "abandoned",
    content: [
      "If the Resident is physically absent from the room/apartment and owes unpaid rent, and if the College has reason to believe in good faith that Resident has vacated the room/apartment with no intent to continue residence, then the room will be deemed conclusively to have been abandoned by Resident and the College may immediately terminate the Contract and retake possession of the premises.",
      "The College may enter the abandoned premises to perform decorating and repairs and to re-rent the room/apartment.",
      "The Hocking College Housing Office should also be notified during occupancy in the event that Resident anticipates extended absences from the room/apartment in excess of 14 calendar days, no later than the first day of the extended absence.",
      "A determination that the premises have been abandoned shall also constitute a conclusive determination that all personal property of the Resident remaining on the premises has been abandoned.",
      "Residents shall pay to the College any costs associated with removing such personal property from the premises."
    ]
  },
  {
    title: "Inventory and Room Condition",
    icon: <FileCheck className="h-5 w-5" />,
    category: "inventory",
    content: [
      "At the time of initial occupancy of a room, each Resident shall complete a Room Condition Report.",
      "This document will be completed with the Residence Life staff upon checking into the room and prior to the Resident taking possession of the room.",
      "Except for those items specifically noted by the Resident in detail on the Room Condition Report, the Resident accepts the premises and the appliances and furnishings in good condition.",
      "The inventory is used only to assess damages and is not a warranty or promise by the College that any item listed on the inventory but not present on the premises will be provided.",
      "Residents may not remove or loan any item provided with the premises."
    ]
  },
  {
    title: "Use of Public Areas",
    icon: <Home className="h-5 w-5" />,
    category: "public",
    content: [
      "Entrance Ways, landings, stairways, and other public areas shall not be obstructed by the Resident or Resident's guest(s), nor used for any other purpose than ingress or egress to the premises.",
      "No furniture or bulky articles shall be stored in any public area of the building any time.",
      "Furnishings located in these areas must remain in their assigned location."
    ]
  },
  {
    title: "Additional Facilities",
    icon: <Home className="h-5 w-5" />,
    category: "facilities",
    content: [
      "The College provides paid parking spaces, laundry facilities and other such facilities and the College shall not be liable for any loss of property through theft, loss, casualty, or otherwise, or for any damage or injury whatsoever to person or property related to their use."
    ]
  },
  {
    title: "Maintenance and Alterations",
    icon: <Home className="h-5 w-5" />,
    category: "maintenance",
    content: [
      "The Resident agrees that no alterations or improvements, including but not limited to, paint, wallpaper, and permanent shelving units or mounting systems, will be made to or upon the premises without written consent from the College.",
      "The Resident shall refrain from placing nails, any other hole indentations or scratches on any surfaces on, in, or around the premises and will not fasten items to the walls without permission from the College.",
      "Resident agrees that any additional fixtures other than those supplied by the College are subject to the approval of the College.",
      "The Resident shall not duplicate any College-issued keys. Resident agrees to report lost keys immediately to the College, which keys will be replaced by the College at the resident's expense."
    ]
  },
  {
    title: "Delay in Repairs",
    icon: <Home className="h-5 w-5" />,
    category: "repairs",
    content: [
      "The Resident understands and agrees that if repairs to be made by the College are delayed by circumstances reasonably beyond its control, the obligations of the Resident herein shall not be affected whatsoever, nor shall any claim accrue to the Resident against the College for such delay."
    ]
  },
  {
    title: "Soliciting",
    icon: <Users className="h-5 w-5" />,
    category: "soliciting",
    content: [
      "The Resident agrees not to give solicitors or salespersons access to the premises unless approved in advance by the College."
    ]
  },
  {
    title: "Pets Policy",
    icon: <Home className="h-5 w-5" />,
    category: "pets",
    content: [
      "Pets are not allowed in College rooms/apartments with the exception of fish. Aquariums are limited to 10 gallons or less.",
      "Students with disabilities in need of service/therapy animals are to contact the Office of Disability Services on campus to make the appropriate accommodations and necessary arrangements.",
      "Students who are part of the Animal Assisted Therapy program should contact the program manager to make the appropriate arrangements to live with their animal."
    ]
  },
  {
    title: "College Remedies Upon Default",
    icon: <AlertTriangle className="h-5 w-5" />,
    category: "remedies",
    content: [
      "If Resident causes or allows to be caused serious and continuing health hazard or imminent danger thereof or causes or allows to be caused extensive and continuing physical injury or property damage or imminent danger thereof, or if Resident, a member of Resident's household, or other person under the Resident's control unlawfully manufactures, delivers, possesses with intent to deliver, or possesses a controlled substance or illegal drug in the room/apartment in violation of federal, state, or local law, the College may treat such an event as a termination of the Contract entitling it to possession of the premises after twenty-four hours written notice to the Resident.",
      "The College reserves the right to take any and all legal remedies it deems necessary to collect any money owed by the applicant to the College.",
      "Defaults in the payment of any single installation of payments for the use of this room or of any other sum required to be paid under this Contract, or under the terms of any other Contract between the Resident and the College, if such default is not cured within seven days of written notice to the Resident, the College may treat such event as a breach of this Contract and may terminate this Contract.",
      "Non-payment of fees will result in collection proceedings and the student is responsible for any and all collection costs associated with the proceedings.",
      "Defaults in the performance of any other covenant or contract/agreement contained within this Contract, and such default is not corrected by Resident within seven (7) days after written notice to the Resident (unless the default involves a hazardous condition which shall be cured forthwith upon written notice as provided above), the College may treat such event as a breach of this Contract and may terminate this Contract."
    ]
  },
  {
    title: "Resident Remedies",
    icon: <Shield className="h-5 w-5" />,
    category: "resident-remedies",
    content: [
      "If the College defaults in the performance of any covenant or contract/agreement hereof and such default is not corrected within a reasonable time after the College receives written notice from the Resident, the Resident may treat such event as a breach of this Contract and may terminate this Contract by setting forth the basis and the date of termination in writing and delivering it to the Hocking College Housing Office.",
      "The Resident must vacate on or before said date, with housing costs paid through the semester, in order for the provisions of this Contract to be effective.",
      "Pre-paid payments for use of the room/apartment, if any, shall be refunded to the Resident."
    ]
  },
  {
    title: "Legal Action",
    icon: <Shield className="h-5 w-5" />,
    category: "legal",
    content: [
      "The Resident understands and agrees that in the event it becomes necessary for the College to enforce the terms and conditions of the Contract by legal means, or otherwise, and if by such action the College suffers additional expense, including attorney fees and court costs, then the Resident shall reimburse the College for such costs and expenses as additional monies due under this Contract.",
      "The Resident and College agree that due to the unique academic living environment provided by the College campus and room/apartment, and the unique relationship the College has with its students and room/apartment residents, notice and other requirements placed upon landlords by Ohio law do not apply to the College and to this Contract.",
      "The Resident hereby waives any and all statutory rights which a tenant otherwise would have since the Resident's legal status is not that of a tenant, but as a licensee of Hocking College."
    ]
  },
  {
    title: "Meal Plan Requirements",
    icon: <Utensils className="h-5 w-5" />,
    category: "meal-plan",
    content: [
      "All Residential students are required to purchase at least a 14 meals per week a semester meal plan or may upgrade to a 19 meals per week for a semester.",
      "Summer residents are required to purchase a meal plan based on a per week meal plan. This cost is calculated based on the daily rate for Fall/Spring plans but will be reduced in Summer due to a shorter-semester duration. These fees are subject to change with 30 calendar day's prior notice.",
      "Students seeking a medical or dietary exemption from the meal plan must submit in writing a request with accompanying medical documentation and a detailed plan on how they provide for themselves prior to their move-in date or within 5 days of the determination."
    ]
  },
  {
    title: "Meal Plan Terms and Conditions",
    icon: <Utensils className="h-5 w-5" />,
    category: "meal-terms",
    content: [
      "This meal plan contract/agreement is for the entire term of the contract.",
      "The weekly meal allotments do not roll forward to subsequent weeks.",
      "Hawk Bucks do not roll forward to subsequent terms.",
      "Students may choose ala carte options at a pay per item price.",
      "Additional funds may be added to the meal plan (minimum $100) via the Cashier Office.",
      "Meal plan amount is valid from the first day of the semester until the last day of the semester.",
      "Supplemental meal plan may be purchased to cover special events including athletics camps or student orientations that are outside of the typical academic calendar."
    ]
  },
  {
    title: "How the Meal Plan Works",
    icon: <Utensils className="h-5 w-5" />,
    category: "meal-how",
    content: [
      "Student IDs are issued by the Hocking College ID office prior to the start of the semester. This ID functions similar to a debit card and is swiped when the student checks out.",
      "Students are provided with a predetermined number of meals indicated by their plan selection.",
      "A la carte pricing is available for students to spend their Hawk Bucks as well as combination platters featuring a main dish, side dishes and a drink for their allotted weekly swipes.",
      "Weekly allotments reset at the close of business on Saturday and are refreshed at the opening of business Sunday.",
      "The meal plan owner must be present to purchase meals using their meal plan.",
      "Cashiers are instructed to confiscate any ID in the possession of a user other than the owner."
    ]
  },
  {
    title: "Meal Plan Refunds",
    icon: <DollarSign className="h-5 w-5" />,
    category: "meal-refunds",
    content: [
      "If a student cancels/withdraws, the meal plan refund will be as follows:",
      "Prior to move-in or the first day of the semester, whichever first, the student will receive a full refund.",
      "After move-in or the first day of the semester, whichever first, up through the 15th calendar day of the semester, the student will receive an 85% refund on their meal plan.",
      "After the 15th day of the semester there will be no refund issued for the current semester."
    ]
  },
  {
    title: "Student ID Cards",
    icon: <CreditCard className="h-5 w-5" />,
    category: "id-cards",
    content: [
      "Students are issued a Photo ID Card with a photo.",
      "It is the responsibility of the student to safeguard his/her Hocking College ID as it serves as the student's meal plan and access to their Residential facility.",
      "The student's ID must be presented to the dining staff at each transaction.",
      "The student's ID must be swiped to gain access to their residence hall.",
      "The student must present his/her ID to any College Official upon request.",
      "Non-working Student ID's, because of normal wear or use, may be replaced free of charge upon surrendering the original card.",
      "Lost or stolen cards should be reported immediately to the Hocking College ID office to be deactivated.",
      "A $25 replacement charge will be assessed for lost or stolen cards. The student is responsible for all charges incurred if the card is not reported lost or stolen."
    ]
  },

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

export default function Contract() {
  const categories = [
    { name: "Contract Basics", sections: ["general"], color: "blue" },
    { name: "Application & Fees", sections: ["application", "fees", "payment"], color: "green" },
    { name: "Eligibility & Assignment", sections: ["eligibility", "assignment"], color: "purple" },
    { name: "Safety & Liability", sections: ["safety", "liability", "conduct", "drugs"], color: "red" },
    { name: "Occupancy & Maintenance", sections: ["occupancy", "premises", "vacating", "inventory", "public", "facilities", "maintenance", "repairs"], color: "orange" },
    { name: "Termination & Refunds", sections: ["termination", "refunds", "abandoned"], color: "yellow" },
    { name: "Additional Terms", sections: ["additional", "soliciting", "pets", "remedies", "resident-remedies", "legal"], color: "indigo" },
    { name: "Meal Plan & ID Cards", sections: ["meal-plan", "meal-terms", "meal-how", "meal-refunds", "id-cards"], color: "teal" }
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
          <FileText className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-primary">Residence Hall Contract</h1>
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Review the complete Residence Hall Contract terms and conditions. This information helps you understand your rights, responsibilities, and obligations when living in Hocking College housing.
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
            yellow: {
              border: "border-yellow-300 dark:border-yellow-600",
              bg: "bg-yellow-50 dark:bg-yellow-900/20",
              text: "text-yellow-800 dark:text-yellow-200",
              icon: "text-yellow-600"
            },
            indigo: {
              border: "border-indigo-300 dark:border-indigo-600",
              bg: "bg-indigo-50 dark:bg-indigo-900/20",
              text: "text-indigo-800 dark:text-indigo-200",
              icon: "text-indigo-600"
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
                  <FileText className={`mr-3 h-5 w-5 ${colors.icon}`} />
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
                  {contractSections
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