import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from 'lucide-react';
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface ContractSection {
  title: string;
  content: string[];
  important?: boolean;
}

const contractSections: ContractSection[] = [
  {
    title: "Application Information",
    content: [
      "Financial aid may not be used to cover the application or reservations fees (student should apply for financial aid as soon as possible to try to defray these expenses)",
      "The required fees must be paid in order to process the application",
      "The date the completed application and payment of the application and reservation fees are received will determine the applicant's priority number when assigning facility and room type",
      "Applications must be submitted electronically (apply.hocking.edu). Any other means will not be accepted",
      "If applying for Summer semester housing and the applicant intends to reside in the residence halls for Summer semester, the applicant must submit a second application for Fall/Spring semester",
      "Applying for Summer semester housing does not automatically enroll you in housing for Fall/Spring semester",
      "The application fee is paid per year and 30 calendar days prior to the Summer semester",
      "All applicants are billed for the type of accommodations in which they are residing during the ninth week of each semester, if changes have occurred",
      "Changes will not be made to the applicant's account after the ninth week. Accounts are not prorated for partial semester assignments",
      "The applicant will be held responsible for the fees for the entire semester of the contract",
      "Applicants who do not fulfill the Fall/Spring semester will still be required to pay for the entire contract period unless the student has been released from their contract",
      "Dropping below 12 credit hours can disqualify a student from on-campus housing, but does not release an applicant from their contractual obligations. Students dropping below half-time status must provide documentation from their academic advisor as to the need for this status"
    ],
    important: true
  },
  {
    title: "Application Fee and Security Deposit",
    content: [
      "A $60 non-refundable application fee is required at the time of submission of the housing application. Financial aid cannot be used to cover this fee",
      "A $250 Security Deposit (SD) is due, in full, before a room assignment will be made. Financial aid cannot be used to cover this fee",
      "The SD is refundable depending on the condition of the room at the end of the term as determined by College Personnel at the time of check out",
      "The SD may not be refunded if the Resident did not properly check out of their room on or before the stated hall closing day and time",
      "The SD will be credited to the applicant's housing charges should the contract be successfully fulfilled. If there is a refund, it will be mailed to the address on file with the College",
      "The SD is refundable the first term of residence if cancellation, in writing, is received 30 days prior to the first day of term for which the applicant is applying"
    ],
    important: true
  },
  {
    title: "Housing Eligibility",
    content: [
      "Any person who is over the age of 18 at the time of move-in, a matriculated student, and is enrolled as a (12 credit hours) Hocking College student is eligible to live in the residence halls",
      "Currently maintaining a balance of less than $1,500 on their student account, with a payment plan in place",
      "In good standing academically and behaviorally with the college",
      "A parent or guardian's signature is required at the time of application for applicants under age of 18",
      "Hocking College, in accordance with the Hocking College Police Department, reserves the right to review applicants with prior felony convictions"
    ]
  },
  {
    title: "Meal Plan",
    content: [
      "All Residential students are required to purchase at least a 14 meals per week a semester meal plan or may upgrade to a 19 meals per week for a semester",
      "Summer residents are required to purchase a meal plan based on a per week meal plan",
      "Students seeking a medical or dietary exemption from the meal plan must submit in writing a request with accompanying medical documentation and a detailed plan on how they provide for themselves prior to their move-in date or within 5 days of the determination"
    ]
  },
  {
    title: "Student ID Cards",
    content: [
      "Students are issued a Photo ID Card with a photo",
      "It is the responsibility of the student to safeguard his/her Hocking College ID as it serves as the student's meal plan and access to their Residential facility",
      "The student's ID must be presented to the dining staff at each transaction",
      "The student's ID must be swiped to gain access to their residence hall",
      "The student must present his/her ID to any College Official upon request",
      "Non-working Student ID's, because of normal wear or use, may be replaced free of charge upon surrendering the original card",
      "Lost or stolen cards should be reported immediately to the Hocking College ID office to be deactivated",
      "A $25 replacement charge will be assessed for lost or stolen cards. The student is responsible for all charges incurred if the card is not reported lost or stolen"
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

export default function Contract() {
  return (
    <div className="container mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 mb-8"
      >
        <div className="p-3 bg-primary/10 rounded-full">
          <FileText className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Residence Hall Contract</h1>
          <p className="text-muted-foreground">Complete your housing agreement</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="lg:col-span-2 space-y-6"
        >
          {contractSections.map((section) => (
            <motion.div key={section.title} variants={item}>
              <Card className={`hover-card ${section.important ? "border-blue-200" : ""}`}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <CardTitle>{section.title}</CardTitle>
                    {section.important && (
                      <Badge variant="default">Important</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {section.content.map((item, index) => (
                      <li key={index} className="text-sm text-muted-foreground">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          <motion.div variants={item}>
            <Card>
              <CardHeader>
                <CardTitle>Contract Application</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Applicant Legal Name</Label>
                    <Input id="name" placeholder="Enter your full legal name" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="studentId">Student ID Number</Label>
                    <Input id="studentId" placeholder="Enter your student ID" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="terms">Selected Terms</Label>
                    <select
                      id="terms"
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="">Select terms</option>
                      <option value="fall-spring">Fall & Spring</option>
                      <option value="fall-only">Fall Only (Graduating)</option>
                      <option value="spring-only">Spring Only</option>
                      <option value="summer-only">Summer Only</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signature">Digital Signature</Label>
                    <Textarea
                      id="signature"
                      placeholder="Type your full name to sign"
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input type="date" id="date" />
                  </div>

                  <Button className="w-full">Submit Contract</Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-900">Important Notice</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-blue-900">
                  By signing this contract, I affirm that I am at least 18 years of age and will abide by the Residence Hall Terms and Conditions as stated in this document as well as the Hocking College Code of Conduct. If the named applicant is not 18 years of age, a parent/guardian must sign this form in addition to the applicant and takes full responsibility for the contract obligations stated.
                </p>
                <p className="text-sm text-blue-900 mt-4">
                  I am aware that Hocking College offers equal educational, housing, and employment opportunities without regard for race, color, nation of origin, sex, age, or disability.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 