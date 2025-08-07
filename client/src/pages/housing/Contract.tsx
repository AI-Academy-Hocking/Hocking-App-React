import { FileText, ArrowLeft, AlertTriangle, DollarSign, Users, Shield, Utensils, CreditCard, Home, FileCheck } from 'lucide-react';
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface ContractSection {
  title: string;
  icon: React.ReactNode;
  content: string[];
  important?: boolean;
  category: string;
}

const contractSections: ContractSection[] = [

  {
    title: "Residence Halls Service Agreement",
    icon: <FileCheck className="h-5 w-5" />,
    category: "general",
    content: [
      "This Residence Halls Service Agreement (this 'Agreement') is entered into between Hocking College (hereinafter referred to as 'College'), and the Resident.",
      "If Resident qualifies and is approved by College, College agrees to provide a space in Downhour Hall, Hocking Heights, North Hall, Sycamore Hall, Summit Hall, Columbus Street Residences, or Opportunity House (the 'College-Operated Residence Halls') during the academic year (the 'License Term').",
      "Residency in College-Operated Residence Halls is available only to full-time students enrolled and in good standing at Hocking College (each, a 'Student'). If Resident does not qualify as a Student at the time this Agreement is signed and submitted to the College, or at any time during the License Term, College may terminate this Agreement in accordance with the provisions of the Residence Halls Service Agreement Terms and Conditions.",
      "This Agreement is Resident's personal, non-transferable license to occupy and use the residence space assigned to the Resident (the 'Unit') for limited purposes and is not a lease of College property.",
      "Resident's occupancy of the Unit is governed by and subject to Resident's compliance with the Terms and Conditions and the Student Code of Conduct Handbook and the Residence Hall Handbook published by the College on its website (https://www.hocking.edu/student-conduct), incorporated as an exhibit hereto, as may be amended from time to time.",
      "College reserves the right, at its sole discretion to determine if any past behavior, conduct, or activity of any student is such that the interest of College, Resident, and/or other students would be best served by terminating this Agreement.",
      "Resident acknowledges that convicted and/or registered sexual offenders are not allowed to live in College-Operated Residence Halls. Resident hereby certifies that Resident is not a convicted and/or registered sexual offender and covenants that Resident will not permit access to College-Operated Residence Halls to any convicted and/or registered sexual offender.",
      "Resident must submit, with this Agreement, sixty dollars ($60) in good and immediate funds as a non-refundable annual Application Fee.",
      "This Agreement is legal and binding for the term set forth above in this Agreement and is in effect when College receives the Application Fee and an executed copy of this Agreement, which may be accomplished via electronic means.",
      "If Resident is not yet eighteen (18) years of age at the time this Agreement is executed, Resident's parent or legal guardian must also execute and be a party to this Agreement for the Agreement to be valid and enforceable."
    ],
    important: true
  },
  {
    title: "Attestation and Signature",
    icon: <FileCheck className="h-5 w-5" />,
    category: "application",
    content: [
      "I understand that I am entering into a legally binding contract with Hocking College. I am aware that Hocking College offers equal educational, housing, and employment opportunities without regard for race, color, nation of origin, sex, age, or disability.",
      "I have carefully read and reviewed this Agreement, along with the Terms and Conditions below and the up-to-date Student Code of Conduct and Residence Hall Handbook, of which I am subject to and agree to abide by.",
      "I am further aware that I am required to disclose and immediately notify the Housing Office of any felony conviction in writing, through mail address and/or email address below.",
      "By signing this Agreement, I agree to accept a Unit for the License Term and comply with this Agreement, which is subject to the Terms and Conditions and up-to-date Student Code of Conduct and Residence Hall Handbook.",
      "By requesting housing and signing below, Resident and their parent or guardian (if applicable) acknowledges that Resident is subject to Terms and Conditions and the current Student Code of Conduct and Residence Hall Handbook in effect at the time of the License Term, and agrees and covenants that Student will abide by them."
    ],
    important: true
  },
  {
    title: "Application Fee and Security Deposit",
    icon: <DollarSign className="h-5 w-5" />,
    category: "fees",
    content: [
      "All Residents are required to pay an annual sixty-dollar ($60) Application Fee in good and immediate funds as a non-refundable Application Fee.",
      "All Residents are required to make a two hundred and fifty-dollar ($250) Security Deposit in good and immediate funds. The Security Deposit is refundable after checkout if Resident meets all of the following criteria:",
      "Resident successfully and fully completes the proper College determined Check Out Process.",
      "The Condition of the Unit is determined by College to be acceptable at time of Check Out.",
      "If Resident owes College any balance to the College, for housing, tuition, fees, and/or any other reason, then Resident authorizes College to offset any Security Deposits to those balances owed to the College.",
      "The Security Deposit is non-refundable if dorm cancellation occurs between the date that is thirty (30) days before the start of the semester and fifteen (15) days after the start of the semester."
    ],
    important: true
  },
  {
    title: "Assignment of Unit",
    icon: <Home className="h-5 w-5" />,
    category: "assignment",
    content: [
      "The Agreement does not cover a specific room or building and College cannot guarantee room facility assignment although all reasonable efforts will be made to honor the preferences listed on the housing application. No guarantee of a specific assignment, room occupancy, area of campus, building, or roommate is implied.",
      "Resident agrees that occupancy of Unit is limited only to residents assigned to that Unit, that the Unit will be used only as a living space, and that the Unit may not be occupied or used by non-residents.",
      "Resident acknowledges and agrees that College has the right to reassign Resident to Units and/or adjust the occupancy of Units to maximize space utilization or for any other reason. Resident agrees to accept any other Student as a roommate.",
      "College, in compliance with the Civil Rights Act of 1964, Title IX of the Higher Education Act, and other laws, does not discriminate on the basis of age, race, ethnic background, national origin, handicap, veteran status, or gender in any of its policies, practices, or procedures."
    ]
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
    title: "Rates and Payments",
    icon: <DollarSign className="h-5 w-5" />,
    category: "payment",
    content: [
      "Resident acknowledges and agrees that they have entered into a Financial Responsibility Statement with College and that all charges resulting from housing and/or meal plans is included in the Resident's Financial Responsibility and that this Agreement does not alter or modify the Resident's Financial Responsibility Statement.",
      "The Unit is charged by semester and payment is due concurrently with the deadline for payment of tuition and fees. If any payment is fifteen (15) days or more past due, College reserves the right to terminate this Agreement, require that Resident vacate the Unit, and/or suspend or terminate the Meal Plan.",
      "College reserves the right to change rates to its housing and meal plans.",
      "Resident agrees and understands that they waive their right to appeal any additional charge related to the Unit (such as, by way of example and not of limitation, damage, cleaning and/or fire safety) unless the written appeal is received by Student Housing and Residential Life within thirty (30) days of the charge.",
      "Occupancy of the Unit during winter break and the spring to fall break is expressly excluded from the license under the Agreement."
    ]
  },
  {
    title: "Meal Plans",
    icon: <Utensils className="h-5 w-5" />,
    category: "meals",
    content: [
      "Resident must obtain and pay for a College meal plan during the entire License Term, failure to do so will result in the Resident being in default of its obligations under the Agreement and College will have the option to exercise its remedies including, but not limited to, termination.",
      "In addition to the foregoing, College shall have the option, but not the obligation, and Resident hereby authorizes College on Resident's behalf to select the default meal plan and charge Resident's account with the cost for such meal plan.",
      "Resident acknowledges and agrees that refunds are not made for unused meals and are not carried over to following weeks.",
      "Resident acknowledges and agrees that unused Hawk Bucks are not carried forward to the following semester.",
      "College's Dining Services may, at its sole discretion, consolidate dining services and reduce serving hours in the dining facilities for various reasons."
    ]
  },
  {
    title: "Joint and Several Liability",
    icon: <Shield className="h-5 w-5" />,
    category: "liability",
    content: [
      "Residents of each Unit are jointly and severally responsible for all charges arising from this Agreement. If multiple Residents share a Unit, each shall be individually responsible for the full amount of all charges."
    ]
  },
  {
    title: "Liability and Risk Assumption",
    icon: <Shield className="h-5 w-5" />,
    category: "liability",
    content: [
      "College acknowledges, and the Resident is hereby made aware, that criminal activity, personal injury, and theft occur in residence halls, and the risk exists for such future occurrences on College premises, specifically within and around Housing and Residence Education facilities. Therefore, Resident agrees to assume responsibility for their own personal safety and security, as well as for their own personal belongings.",
      "College does not assume responsibility for Resident's or Resident's guest's losses or injuries, including, but not limited to the loss of money or valuables, the loss of or damage to property, the cost of replacement for such losses, or injuries, personal or otherwise, sustained on or about the College.",
      "Resident acknowledges that in the event of any pending or future public health crisis, Resident may be assuming additional risks to their health and safety by residing in Unit and using the dining services. Resident agrees that Resident is knowingly, voluntarily, and expressly assuming this risk and responsibility for any damages, liabilities, loss, or expenses related to a public health crisis that they may incur as a result of residing in College housing. Resident further acknowledges that during a public health crisis, College may have limited staff availability and/or reduce or eliminate certain services in its sole discretion for health and safety reasons, including but not limited to, reduction in dining service offerings and elimination of residence hall programming."
    ]
  },
  {
    title: "Legal Action",
    icon: <Shield className="h-5 w-5" />,
    category: "legal",
    content: [
      "Resident understands and agrees that in the event it becomes necessary for College to enforce the terms and conditions of the Contract by legal means, or otherwise, and if by such action College suffers additional expense, including attorney and legal fees, including court costs, then the Resident shall reimburse College for such costs and expenses as additional monies due under this Contract.",
      "The rights and remedies of College set forth herein are in addition to all other rights and remedies allowed under law and equity. Resident agrees to be bounds by all the Terms and Conditions stated herein and adhere to written policies and procedures of College.",
      "This Agreement shall be construed in accordance with the laws of the State of Ohio, regardless of the place of execution. Any legal action arising pursuant to this contract shall be brought in a court of competent jurisdiction in the State of Ohio.",
      "If any provision of this Agreement between College and Resident is determined to be invalid or unenforceable, the remainder of the Agreement shall not be affected and shall remain in full force and effect."
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
    title: "Termination of Agreement by College",
    icon: <AlertTriangle className="h-5 w-5" />,
    category: "termination",
    content: [
      "College may terminate the Agreement upon written notice to Resident because of Resident's default of its obligations to College, including but not limited to Resident's obligations under the Agreement. The amount of notice Resident will receive of College's termination depends on the seriousness of the cause. At the College's discretion, it may provide notice to allow for sufficient opportunity for Resident to cure their default.",
      "If College has reasonable cause to believe that Resident's conduct constitutes a threat of imminent harm to Resident, others, or to College property, College shall have the immediate right to exclude Resident from College-Operated Residence Halls.",
      "Resident's dismissal from College for any reason, or Resident's violation of the rules and regulations of College (including, but not limited to, these Terms and Conditions, the Student Code of Conduct and/or Residence Hall Handbook), or any other conduct by Resident for which the sanction of removal from College-Operated Residence Halls is assessed, shall constitute a material breach of the Agreement by Resident and shall be grounds for the immediate termination of the Agreement at College's discretion.",
      "College may terminate Agreement for failure to attend classes, falling below twelve (12) credits per semester, or violating the code of conduct.",
      "If Resident fails to check into the Unit assigned to them by the first day of classes following the Date of Occupancy, College may, at its discretion, terminate the Agreement.",
      "If College Terminates Agreement, Resident's account at the College will be debited for all costs, including charges and fees incurred by Resident or by College on behalf of or because of Resident, and Resident will not be eligible for a refund of any charges."
    ]
  },
  {
    title: "Termination of Agreement by Resident",
    icon: <AlertTriangle className="h-5 w-5" />,
    category: "termination",
    content: [
      "All termination requests must be submitted to Student Housing & Residential Life by the Resident. Termination requests must be received in writing. Termination of the contract by Resident does not excuse or waive financial responsibility for any charges incurred or to be incurred by Resident for housing per the terms of this contract.",
      "College may at its discretion, release Resident from their obligations under this Agreement. A Resident requesting to terminate this Agreement and be released from their obligations must provide a detailed written explanation with supporting verifiable documentation for the reason(s) indicated and must meet one the acceptable criteria listed below.",
      "The request must be made in writing and in a timely manner and the appeal and supporting documentation must be sent to the Housing Account Appeals Committee at housing-mealappeal@hocking.edu.",
      "IMPORTANT NOTE: If Resident is not attending classes because of academic or personal behavior, Resident will not be excused or waived from the full financial responsibility for payment of resident fees, even if the Resident has been asked to leave the residence hall because of non-compliance with student conduct and academic rules, this includes students who self-withdraw or are suspended/expelled for disciplinary or academic reasons.",
      "Acceptable criteria for Resident to be released from their obligations to this Agreement are: Completion of Graduation Requirements, Marriage, Compulsory Military Duty, Birth or Adoption of a Child, Medical/Dietary Limitations/Reasons (with recent medical documentation), and Financial Hardship (with verifiable documentation of extreme financial hardship)."
    ]
  },
  {
    title: "Refunds",
    icon: <DollarSign className="h-5 w-5" />,
    category: "refunds",
    content: [
      "Housing charges are refundable only in the following circumstances.",
      "Please note that refunds are processed in accordance with the on-campus refund policy of the College. Please allow ten (10) business days for refunds to be processed. If a balance is owed on the account, the refund will be applied to the Resident's account balance. No refunds will be issued without credit showing on the Resident's Hocking College account.",
      "The refund is calculated from the time the Resident has removed all their belongings from their Residential assignment and has officially checked out with a residence hall staff member.",
      "Please note that Security Deposits will be issued at the end of the academic year (or rolled over to the next academic year for students remaining in dorms for the next academic year).",
      "100% refund will be issued for Residents who provide written notice to Housing before move-in date or the first day of the semester, whichever comes first.",
      "85% refund will be issued if Resident provides written notice to Housing from the move-in date or first day of the semester until the 15th calendar day of the semester.",
      "A pro-rated refund will be issued for Residents who are approved to receive one by College for an approved circumstance as outlined in Section 5.",
      "EXCEPT FOR SECTION 7d, NO REFUNDS WILL BE ISSUED FIFTEEN DAYS AFTER THE START OF THE SEMESTER OR ANY TIME THEREAFTER."
    ]
  },
  {
    title: "College Reserves Rights",
    icon: <Shield className="h-5 w-5" />,
    category: "rights",
    content: [
      "The rights reserved by College includes but is not limited to:",
      "To prohibit convicted and/or registered sexual offenders from living in campus housing.",
      "To enter any room (including the Unit) without permission for the purpose of inspection, repair, cleaning, inventory, health and safety reviews, emergencies, etc. Conditions that necessitate immediate entry include but are not limited to: perceived threat of physical harm and/or danger to any person; damage to College property, or reasonable danger thereof; to determine if Resident has vacated during a fire alarm or drill; when necessary for the health, safety or welfare of Resident or anyone else in the Unit; and for other reasons determined necessary by College.",
      "To make rules and regulations and/or modify rules and regulations as College deems necessary for the proper safety, care, comfort, welfare, and cleanliness of the premises.",
      "To review applicants with prior felony convictions, including violent offenses, and consider for disqualification of on-campus residency. College reserves the right to review such matters on a case-by-case-basis. A felony conviction does not automatically disqualify a student from on-campus residency.",
      "To change or cancel Resident's Unit assignment in the interest of order, health or safety, discipline, or other administrative reasons.",
      "To levy and collect charges for attorney and legal fees, including court costs; damages to Unit, furnishings, and/or the building; unauthorized use of Unit, furnishings, and /or building; alterations of any room, furnishings, and/or building facilities; and/or special cleaning necessitated by improper or unreasonable care of room, furnishings, and/or building.",
      "To change billing rates and to terminate the Agreement."
    ]
  },
  {
    title: "Conditions of Occupancy",
    icon: <Home className="h-5 w-5" />,
    category: "occupancy",
    content: [
      "Resident agrees to maintain eligibility to live at the College, as determined by this contract, the Residence Hall Handbook, the laws and rules of the State of Ohio, Athens County, city of Nelsonville, and all applicable federal rules and regulations. Failure to maintain eligibility constitutes a material breach of the Agreement and Resident agrees to vacate the Unit, remove all their personal belongings, and return the Unit key no later than the last day in which he/she is no longer eligible to live in College premises.",
      "If Resident fails to vacate by the end of their last day, College may take possession of the Unit, change the locks to the Unit, mailbox, etc. and charge all costs associated with such changes to the Resident.",
      "Minimum Requirement to Stay in Housing: Residents must meet the following criteria to maintain eligibility for on-campus housing: Maintain full-time credit hours per semester; Attend all classes; Comply with community standards in the Student Code of Conduct; Attend new student orientation; Attend mandatory housing meetings; Attend Convocation; Attend Professional Development Day each semester."
    ]
  },
  {
    title: "Conduct Behavior",
    icon: <Shield className="h-5 w-5" />,
    category: "conduct",
    content: [
      "The College reserves the right to refer any Resident for judicial misconduct to the Office of Student Conduct should the Resident violate the Student Code of Conduct or Residence Hall Handbook.",
      "The Resident agrees to not use or possess intoxicating beverages, marijuana, illegal drugs, and/or tobacco on Hocking College property.",
      "The Resident agrees to not use or possess firearms, firecrackers, gunpowder, explosive devices, and/or deadly weapon which means any instrument, device, or thing capable of inflicting death, and designed or specially adapted for use as a weapon, or possessed, carried, or used as a weapon or any other weapon listed in the Ohio Revised Code 2923.11.",
      "The Resident agrees to not store combustible or flammable material within the premises.",
      "The Resident agrees to use public areas, residential corridors, rooms, equipment, and furnishings in a careful and proper manner.",
      "Entranceways, landings, stairways, and other public areas shall not be obstructed by the Resident or Resident's guest(s), nor used for any other purpose than ingress or egress to the premises. No furniture or bulky articles shall be stored in any public area of the building any time. Furnishings located in these areas must remain in their assigned location.",
      "The Resident agrees to not interfere with the lawful and proper use and enjoyment of the Unit or building by College, its agents/employees, or other Residents.",
      "The Resident shall not permit the playing of radios, televisions, other electronics, or musical instruments at levels loud enough to be heard by Residents in any other room or at levels and in locations where it becomes a nuisance or disturbance to others.",
      "Resident agrees not to give solicitors or salespersons access to the premises unless approved in advance by College."
    ]
  },
  {
    title: "Pets",
    icon: <Home className="h-5 w-5" />,
    category: "pets",
    content: [
      "Pets are not allowed in College room/apartments with the exception of fish. Aquariums for fish are limited to 10 gallons or less.",
      "Residents with disabilities in need of service/therapy animals are to contact the Office of Disability Services on campus to make the appropriate accommodations and necessary arrangements.",
      "Residents who are part of the Animal Assisted Therapy program should contact the program manager to make the appropriate arrangements to live with their animal."
    ]
  },
  {
    title: "Personal & College Property",
    icon: <Home className="h-5 w-5" />,
    category: "property",
    content: [
      "Resident may not, and will not authorize or empower another to, remove, alter or damage any furniture or other furnishings provided and located by College within the Unit or any College-Operated Residence Halls; such conduct is considered theft and Resident will be charged the full replacement cost of missing furniture.",
      "College is not responsible for loss or damage to personal property or injury to person, regardless of cause. Residents are strongly encouraged to insure their personal property and carry liability insurance.",
      "Any personal property remaining in the Unit after it has been vacated by Resident, whether willingly or not, will be deemed abandoned. Abandoned property will be disposed of as determined by College in its sole discretion. College is given the authority to act in good faith to determine if a Resident has vacated the Residence Halls."
    ]
  },
  {
    title: "Additional Facilities",
    icon: <Home className="h-5 w-5" />,
    category: "facilities",
    content: [
      "College provides paid parking spaces, laundry facilities and other such facilities and College shall not be liable for any loss of property through theft, loss, casualty, or otherwise, or for any damage or injury whatsoever to person or property related to their use."
    ]
  },
  {
    title: "Utilities; Services; Repairs",
    icon: <Home className="h-5 w-5" />,
    category: "utilities",
    content: [
      "Each Unit in College-Operated Residence Halls is connected for utility service. College agrees to use commercially reasonable efforts to provide utility-powered services (such as, by way of example and not of limitation, ventilation, heating and air conditioning as well as, depending on the building and the Unit, elevator service, water and wastewater).",
      "Under no circumstances will College be held responsible or liable for interruptions in utility service.",
      "College's responsibility to restore utility-powered services after an interruption is limited to commercially reasonable efforts.",
      "Resident understands and agrees that any repairs to be made by College may be delayed beyond circumstances reasonably beyond its control, the obligations of the Resident herein shall not be affected whatsoever, nor shall any claim accrue to the Resident against College for such delay.",
      "While College will provide light housekeeping to common areas, Resident is responsible for the upkeep of their own areas, including removal of trash to designated dumpsters and cleaning."
    ]
  },
  {
    title: "Maintenance",
    icon: <Home className="h-5 w-5" />,
    category: "maintenance",
    content: [
      "Resident agrees that no alterations or improvements, including but not limited to, paint, wallpaper, miscellaneous fixtures, and permanent shelving units or mounting systems, will be made to or upon the premises without written consent from College.",
      "Resident shall refrain from placing nails, any other hole indentations, or scratches on any surfaces on, in, or around the premises and will not fasten items to the walls without permission from College.",
      "Resident shall not duplicate any College-issued keys. Resident agrees to report lost keys immediately to College, which keys will be replaced by College at Resident's expense."
    ]
  },
  {
    title: "Destruction of Premises",
    icon: <Home className="h-5 w-5" />,
    category: "premises",
    content: [
      "If the premises are damaged or destroyed by fire or casualty, College may terminate this contract at its discretion by notice to Resident. Should this occur, College and Resident are released from any further obligations to each other except the Resident will be responsible for a prorated charge through the destruction date."
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