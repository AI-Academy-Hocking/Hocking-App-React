import { Card, CardContent } from "../components/ui/card";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { useBackNavigation } from "../hooks/use-back-navigation";

export default function NotFound() {
  const { goBack } = useBackNavigation();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      {/* Back Navigation */}
      <div className="absolute top-6 left-6">
        <button 
          onClick={goBack}
          className="flex items-center text-primary hover:text-primary-dark transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>Back</span>
        </button>
      </div>
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">404 Page Not Found</h1>
          </div>

          <p className="mt-4 text-sm text-gray-600">
            Did you forget to add the page to the router?
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
