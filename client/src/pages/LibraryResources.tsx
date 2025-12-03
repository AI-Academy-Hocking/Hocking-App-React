import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, LibraryBig, Phone, Mail, MapPin, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

function LibraryResources() {
  const [openAccordion, setOpenAccordion] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);

  const handleAccordionChange = (value: string) => {
    setOpenAccordion(value === openAccordion ? "" : value);
  };

  // Close accordion when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpenAccordion("");
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="container mx-auto py-8 px-4 dark:bg-popover min-h-screen">
      <div className="flex items-center mb-6">
        <Link href="/academic-success">
          <button className="flex items-center text-primary hover:text-primary-dark dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>Back to Academic Success Center</span>
          </button>
        </Link>
      </div>

      <div className="flex items-center gap-4 mb-8">
        <LibraryBig className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        <h1 className="text-3xl font-bold text-primary dark:text-blue-300">Library Resources</h1>
      </div>

      <Alert className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Welcome to the Hocking College Library! We're here to support your academic success.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader className="bg-primary-light/10">
            <CardTitle className="text-xl">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                <span>Davidson Hall, First Floor</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                <span>3301 Hocking Parkway, Nelsonville, OH 45764</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-blue-600" />
                <a href="tel:740-753-6332" className="hover:text-blue-600">
                  740-753-6332
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-blue-600" />
                <a href="mailto:library@hocking.edu" className="hover:text-blue-600">
                  library@hocking.edu
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-primary-light/10">
            <CardTitle className="text-xl">Library Staff</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              <div className="font-semibold">LaDora Ousley</div>
              <div className="text-neutral-dark">Manager of Library Services</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <span>DVD 111</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <a href="tel:740-753-6338" className="hover:text-blue-600">
                    740-753-6338
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <a href="mailto:ousleyl@hocking.edu" className="hover:text-blue-600">
                    ousleyl@hocking.edu
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader className="bg-primary-light/10">
          <CardTitle className="text-xl">Mission Statement</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <p className="text-neutral-dark mb-4">
            The Hocking College Library is committed to the advancement of teaching and learning by providing resources and services that support the core values of the college and enriching the experience by creating a community of lifelong learners.
          </p>
          <p className="text-neutral-dark">
            Hocking College Library supports the American Library Association's "Library Bill of Rights," "Intellectual Freedom Principles for Academic Libraries" and "Freedom to View" statement. The Library complies with all provisions of U.S. Copyright Law (17 U.S.C.) and its amendments. We support the Fair Use section of the Copyright Law (17 U.S.C. 107) which permits and protects citizens' rights to reproduce and make use of copyrighted works for the purposes of teaching, scholarship and research.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader className="bg-primary-light/10">
          <CardTitle className="text-xl">Policies & Services</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <Accordion type="single" collapsible className="w-full" value={openAccordion} onValueChange={handleAccordionChange}>
            <AccordionItem value="borrowing">
              <AccordionTrigger>Borrowing Materials</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p>The Hocking College Library is an OhioLINK member. All faculty, staff and currently registered students can borrow books from the Library or from other OhioLINK member libraries through the OhioLINK Catalog, or on site at other OhioLINK libraries.</p>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold">Student IDs</h3>
                    <p>Student IDs are preferred for checkout of Library materials. IDs can be obtained by visiting the Concourse area of the John Light Building. Students may alternately present a photo ID and provide their student ID number.</p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Loan Periods for Students</h3>
                    <div className="space-y-2">
                      <h4 className="font-medium">Books</h4>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Students may have 15 books charged out at one time</li>
                        <li>Hocking College Library books: 21 days, renewable 6 times</li>
                        <li>OhioLINK books: 21 days, renewable 6 times</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Media</h4>
                      <ul className="list-disc list-inside space-y-1">
                        <li>OhioLINK media: 7 days, renewable 3 times</li>
                        <li>Hocking College media: Library use only</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Loan Periods for Faculty/Staff</h3>
                    <div className="space-y-2">
                      <h4 className="font-medium">Books</h4>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Hocking College Library books: Duration of academic quarter</li>
                        <li>OhioLINK books: 42 days, renewable 6 times</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Media</h4>
                      <ul className="list-disc list-inside space-y-1">
                        <li>7 days, renewable 3 times</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Community Borrowers</h3>
                    <p>Members of the community who live within 50 miles of the Nelsonville campus can register to become patrons of the Hocking College Library. You will need to present a photo ID and proof of local residency.</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Hocking College Library books: 21 days, renewable 4 times</li>
                      <li>OhioLINK is not available to community borrowers</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="fines">
              <AccordionTrigger>Fines & Fees</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <ul className="list-disc list-inside space-y-2">
                    <li>No daily fines for Hocking College Library materials</li>
                    <li>OhioLINK materials: $0.50 per day overdue</li>
                    <li>Recalled materials: $2.00 per day</li>
                    <li>Items overdue more than 30 days will be billed</li>
                    <li>Hocking College Library: Replacement cost plus processing fee</li>
                    <li>OhioLINK: $125.00 (reduced to $50.00 if returned)</li>
                    <li>Magazine articles from OhioLINK: $0.10 per page</li>
                  </ul>
                  <p className="text-sm text-neutral-dark">
                    Note: Unpaid charges can prevent registration and transcript requests.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="services">
              <AccordionTrigger>Services</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold">Photocopying</h3>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Black and white: $0.05 per page</li>
                      <li>Color: $0.25 per page</li>
                      <li>Change available at circulation desk</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold">Study Areas</h3>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Quiet study area: Located at rear of library (no talking)</li>
                      <li>Open table study: Front of library (group and individual study)</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="gifts">
              <AccordionTrigger>Gift Policy</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold">Accepted Materials</h3>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Hardcover or paperback books in good to excellent condition</li>
                      <li>CDs and DVDs in good working condition</li>
                      <li>Selected periodicals (non-duplicate)</li>
                      <li>Monetary donations</li>
                      <li>Art and furniture (subject to evaluation)</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold">Not Accepted</h3>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Textbooks over 5 years old</li>
                      <li>Workbooks</li>
                      <li>Foreign language books</li>
                      <li>Items in poor condition</li>
                      <li>Duplicate copies</li>
                      <li>VHS and cassette tapes</li>
                      <li>Most magazines/journals</li>
                      <li>Photocopied materials</li>
                      <li>Copyright-circumventing media</li>
                    </ul>
                  </div>

                  <p className="text-sm text-neutral-dark">
                    Note: The library cannot appraise items for tax-deduction purposes. Donors are responsible for following IRS rules.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button className="w-full md:w-auto">
          Visit Library Website
        </Button>
      </div>
    </div>
  );
}

export default LibraryResources; 
