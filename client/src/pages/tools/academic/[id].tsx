import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";

type StudentTool = {
  id: string;
  name: string;
  description: string;
  category: string;
  url: string;
};

export default function AcademicToolDetail() {
  const [match, params] = useRoute("/tools/academic/:id");
  const [tool, setTool] = useState<StudentTool | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!params?.id) return;
    setLoading(true);
    fetch(`/api/student-tools/${params.id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => {
        setTool(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Tool not found");
        setLoading(false);
      });
  }, [params?.id]);

  return (
    <div className="container mx-auto py-8 px-4 dark:bg-popover min-h-screen">
      <div className="flex items-center mb-6">
        <Link href="/tools">
          <button className="flex items-center text-primary hover:text-primary-dark dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>Back to Student Tools</span>
          </button>
        </Link>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : tool ? (
        <Card>
          <CardHeader className="bg-primary-light/10">
            <CardTitle className="text-2xl text-primary">{tool.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <p>{tool.description}</p>
            {tool.url && tool.url !== "#" && (
              <a href={tool.url} className="text-primary" target="_blank" rel="noopener noreferrer">
                Go to {tool.name}
              </a>
            )}
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
} 