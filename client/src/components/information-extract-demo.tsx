import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FileUpload from "./file-upload";
import CodeBlock from "./code-block";
import { Search, Upload, Code2, Lightbulb, Settings, Wand2, FileText } from "lucide-react";
import { INFORMATION_EXTRACT_EXAMPLES } from "../lib/constants";
import { useToast } from "@/hooks/use-toast";

export default function InformationExtractDemo() {
  const [selectedDocType, setSelectedDocType] = useState("invoice");
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractResult, setExtractResult] = useState<any>(null);
  const { toast } = useToast();

  const documentTypes = [
    { id: "invoice", label: "Invoice", icon: "📄" },
    { id: "resume", label: "Resume", icon: "📋" },
    { id: "bank", label: "Bank Statement", icon: "🏦" },
    { id: "receipt", label: "Receipt", icon: "🧾" },
  ];

  const schemas = {
    invoice: {
      type: "object",
      properties: {
        invoice_number: { type: "string", description: "Invoice number" },
        date: { type: "string", description: "Invoice date" },
        vendor_name: { type: "string", description: "Vendor company name" },
        total_amount: { type: "number", description: "Total amount" },
        line_items: {
          type: "array",
          items: {
            type: "object",
            properties: {
              description: { type: "string" },
              quantity: { type: "number" },
              unit_price: { type: "number" },
            },
          },
        },
      },
    },
    resume: {
      type: "object",
      properties: {
        name: { type: "string", description: "Full name" },
        email: { type: "string", description: "Email address" },
        phone: { type: "string", description: "Phone number" },
        experience: {
          type: "array",
          items: {
            type: "object",
            properties: {
              company: { type: "string" },
              position: { type: "string" },
              duration: { type: "string" },
            },
          },
        },
        skills: { type: "array", items: { type: "string" } },
      },
    },
    bank: {
      type: "object",
      properties: {
        bank_name: { type: "string", description: "The name of bank in bank statement" },
      },
    },
    receipt: {
      type: "object",
      properties: {
        merchant_name: { type: "string", description: "Merchant name" },
        date: { type: "string", description: "Purchase date" },
        total_amount: { type: "number", description: "Total amount" },
        items: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: { type: "string" },
              price: { type: "number" },
            },
          },
        },
      },
    },
  };

  const handleFileUpload = async (file: File) => {
    setIsProcessing(true);
    setExtractResult(null);

    try {
      const formData = new FormData();
      formData.append("document", file);
      formData.append("schema", JSON.stringify(schemas[selectedDocType as keyof typeof schemas]));

      const response = await fetch("/api/information-extract", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.details || "Failed to extract information");
      }

      const result = await response.json();
      const content = result.choices?.[0]?.message?.content;
      setExtractResult(typeof content === "string" ? JSON.parse(content) : content);

      toast({
        title: "Information extracted successfully!",
        description: "Data has been structured according to your schema",
      });
    } catch (error) {
      console.error("Information extract error:", error);
      toast({
        title: "Extraction failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const extractedData = {
    invoice: {
      invoice_number: "INV-2024-001",
      date: "2024-01-15",
      vendor_name: "TechCorp Solutions",
      total_amount: 2500.00,
      line_items: [
        {
          description: "Web Development",
          quantity: 1,
          unit_price: 2000.00
        },
        {
          description: "Hosting Setup",
          quantity: 1,
          unit_price: 500.00
        }
      ]
    },
    resume: {
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "+1-555-0123",
      experience: [
        {
          company: "Tech Solutions Inc",
          position: "Senior Developer",
          duration: "2020-2024"
        },
        {
          company: "StartupCo",
          position: "Full Stack Developer",
          duration: "2018-2020"
        }
      ],
      skills: [
        "JavaScript",
        "Python",
        "React",
        "Node.js",
        "SQL"
      ]
    }
  };

  const getDisplayData = () => {
    if (extractResult) {
      return JSON.stringify(extractResult, null, 2);
    }
    return JSON.stringify(extractedData[selectedDocType as keyof typeof extractedData] || extractedData.invoice, null, 2);
  };

  return (
    <div id="info-extract" className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 service-info-extract rounded-full text-2xl mb-4">
          <Search className="h-8 w-8" />
        </div>
        <h2 className="text-3xl font-bold mb-4">Information Extract Demo</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Extract structured data from any document using custom schemas without training
        </p>
      </div>

      {/* Document Type Selection */}
      <div className="flex flex-wrap justify-center gap-2">
        {documentTypes.map((type) => (
          <Button
            key={type.id}
            variant={selectedDocType === type.id ? "default" : "outline"}
            onClick={() => setSelectedDocType(type.id)}
            className={selectedDocType === type.id ? "service-info-extract" : ""}
          >
            <span className="mr-2">{type.icon}</span>
            {type.label}
          </Button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Schema Builder */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-[hsl(43,96%,56%)]">
              <Settings className="mr-2 h-5 w-5" />
              Schema Builder
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full service-info-extract mb-4">
              <Wand2 className="mr-2 h-4 w-4" />
              Auto-Generate Schema
            </Button>
            <div className="text-xs text-gray-500 text-center mb-4">Or customize manually below</div>

            <CodeBlock
              code={JSON.stringify(schemas[selectedDocType as keyof typeof schemas] || schemas.invoice, null, 2)}
              language="json"
              title="Schema Definition"
              className="text-xs"
            />

            <Button variant="outline" className="w-full mt-4 border-[hsl(43,96%,56%)] text-[hsl(43,96%,56%)] hover:bg-yellow-50">
              <Code2 className="mr-2 h-4 w-4" />
              Edit Schema
            </Button>
          </CardContent>
        </Card>

        {/* Document Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-[hsl(43,96%,56%)]">
              <Upload className="mr-2 h-5 w-5" />
              Document Input
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border border-gray-200 rounded-lg p-4 mb-4">
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <span className="text-sm text-gray-600">Sample {selectedDocType} Document</span>
                </div>
              </div>
            </div>

            <FileUpload
              accept=".pdf,.docx,.png,.jpg,.jpeg"
              maxSize={50}
              onFileSelect={handleFileUpload}
              placeholder={isProcessing ? "Processing document..." : "Drop your document here or click to upload"}
              description="Supports PDF, DOCX, Images (up to 50MB)"
            />

            {isProcessing && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  <span className="text-sm text-blue-700">Extracting information with Gemini API...</span>
                </div>
              </div>
            )}

            {extractResult && (
              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <div className="text-sm text-green-700">
                  <strong>✓ Success!</strong> Information extracted successfully
                </div>
              </div>
            )}

            <Button className="w-full mt-4 bg-gray-50 hover:service-info-extract hover:text-white text-left justify-start">
              <Upload className="mr-2 h-4 w-4" />
              Use Sample Document
            </Button>
          </CardContent>
        </Card>

        {/* Extracted Data */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-[hsl(43,96%,56%)]">
              <Search className="mr-2 h-5 w-5" />
              Extracted Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CodeBlock
              code={getDisplayData()}
              language="json"
              title="JSON Output"
            />

            <div className="flex gap-2 mt-4">
              <Button variant="outline" className="flex-1 border-[hsl(43,96%,56%)] text-[hsl(43,96%,56%)] hover:bg-yellow-50">
                Copy
              </Button>
              <Button variant="outline" className="flex-1 border-[hsl(43,96%,56%)] text-[hsl(43,96%,56%)] hover:bg-yellow-50">
                Export
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>


      {/* Implementation Examples */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-[hsl(43,96%,56%)]">
            <Code2 className="mr-2 h-5 w-5" />
            Implementation Examples
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="python">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="python">Python</TabsTrigger>
              <TabsTrigger value="javascript">JavaScript</TabsTrigger>
              <TabsTrigger value="curl">cURL</TabsTrigger>
            </TabsList>

            {Object.entries(INFORMATION_EXTRACT_EXAMPLES).map(([lang, code]) => (
              <TabsContent key={lang} value={lang}>
                <CodeBlock
                  code={code}
                  language={lang === 'curl' ? 'bash' : lang}
                  title={`${lang.charAt(0).toUpperCase() + lang.slice(1)} Example`}
                  showCopy
                />
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Best Practices */}
      <Card className="bg-gradient-to-r from-[hsl(43,96%,56%)] to-yellow-600 text-white">
        <CardContent className="p-6">
          <h4 className="text-lg font-semibold mb-4 flex items-center">
            <Lightbulb className="mr-2 h-5 w-5" />
            Schema Design Best Practices
          </h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-medium mb-2">📝 Clear Descriptions:</div>
              <ul className="space-y-1 text-yellow-100">
                <li>• Use descriptive property names and descriptions</li>
                <li>• Avoid generic terms like "field1", "data", "value"</li>
                <li>• Include expected format in descriptions</li>
              </ul>
            </div>
            <div>
              <div className="font-medium mb-2">🏗️ Schema Structure:</div>
              <ul className="space-y-1 text-yellow-100">
                <li>• Use arrays for repeating data (line items, experiences)</li>
                <li>• Limit to 50 properties per schema</li>
                <li>• Keep total schema length under 10,000 characters</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
