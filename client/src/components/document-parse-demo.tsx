import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FileUpload from "./file-upload"; // your existing file upload component
import CodeBlock from "./code-block"; // your existing code block component
import { FileText, Upload, Code2, Lightbulb, Zap } from "lucide-react";
import { DOCUMENT_PARSE_EXAMPLES } from "@/lib/constants";

export default function DocumentParseDemo() {
  const [outputFormat, setOutputFormat] = useState("json");
  const [sampleOutputs, setSampleOutputs] = useState({
    html: "",
    markdown: "",
    json: "",
  });

  const outputFormats = [
    { id: "html", label: "HTML" },
    { id: "markdown", label: "Markdown" },
    { id: "json", label: "JSON" },
  ];

  const handleFileUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("document", file);

    try {
      const response = await fetch("/api/document-parse", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to parse document");
      }

      const result = await response.json();
      const firstElement = result?.elements?.[0]?.content;

      setOutputFormat("json");
      setSampleOutputs({
        html: firstElement?.html || "No HTML output",
        markdown: firstElement?.markdown || firstElement?.text || "No Markdown output",
        json: JSON.stringify(result, null, 2),
      });
    } catch (err: any) {
      console.error("Error uploading file:", err);
      setSampleOutputs({
        html: "Error uploading or parsing document.",
        markdown: "Error uploading or parsing document.",
        json: JSON.stringify({ error: err.message }, null, 2),
      });
    }
  };

  return (
    <div id="document-parse" className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 service-doc-parse rounded-full text-2xl mb-4">
          <FileText className="h-8 w-8" />
        </div>
        <h2 className="text-3xl font-bold mb-4">Document Parse Demo</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Transform any document into structured HTML or Markdown with advanced layout detection
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Upload Area */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-[hsl(160,84%,39%)]">
              <Upload className="mr-2 h-5 w-5" />
              Upload Document
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FileUpload
              accept=".pdf,.docx,.pptx,.xlsx,.png,.jpg,.jpeg"
              maxSize={50}
              onFileSelect={handleFileUpload}
            />
          </CardContent>
        </Card>

        {/* Output Display */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-[hsl(160,84%,39%)]">
              <Code2 className="mr-2 h-5 w-5" />
              Parsed Output
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={outputFormat} onValueChange={setOutputFormat}>
              <TabsList className="grid w-full grid-cols-3">
                {outputFormats.map((format) => (
                  <TabsTrigger key={format.id} value={format.id}>
                    {format.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {outputFormats.map((format) => (
                <TabsContent key={format.id} value={format.id}>
                  <CodeBlock
                    code={sampleOutputs[format.id as keyof typeof sampleOutputs]}
                    language={format.id === "json" ? "json" : format.id}
                    title={`${format.label} Output`}
                  />
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

      </div>

        {/* Implementation Examples */}
        <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-[hsl(160,84%,39%)]">
            <Code2 className="mr-2 h-5 w-5" />
            Implementation Examples
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="python">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="python">Python</TabsTrigger>
              <TabsTrigger value="javascript">JavaScript</TabsTrigger>
              <TabsTrigger value="curl">cURL</TabsTrigger>
              <TabsTrigger value="java">Java</TabsTrigger>
            </TabsList>

            {Object.entries(DOCUMENT_PARSE_EXAMPLES).map(([lang, code]) => (
              <TabsContent key={lang} value={lang}>
                <CodeBlock
                  code={code}
                  language={lang === "curl" ? "bash" : lang}
                  title={`${lang.charAt(0).toUpperCase() + lang.slice(1)} Example`}
                  showCopy
                />
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Tips & Best Practices */}
      <Card className="bg-gradient-to-r from-[hsl(160,84%,39%)] to-green-600 text-white">
        <CardContent className="p-6">
          <h4 className="text-lg font-semibold mb-4 flex items-center">
            <Lightbulb className="mr-2 h-5 w-5" />
            Tips & Best Practices
          </h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-medium mb-2 flex items-center">
                <FileText className="mr-2 h-4 w-4" />
                File Optimization:
              </div>
              <ul className="space-y-1 text-green-100">
                <li>• Use high-resolution documents (min 640px width)</li>
                <li>• Ensure text is at least 2.5% of image height</li>
                <li>• Split long PDFs (&gt;100 pages) for better performance</li>
              </ul>
            </div>
            <div>
              <div className="font-medium mb-2 flex items-center">
                <Zap className="mr-2 h-4 w-4" />
                Performance:
              </div>
              <ul className="space-y-1 text-green-100">
                <li>• Sync API: 10 RPS, max 100 pages</li>
                <li>• Async API: 30 RPS, max 1,000 pages</li>
                <li>• Max file size: 50MB</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
