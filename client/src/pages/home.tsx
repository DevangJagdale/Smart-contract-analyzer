import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DocumentParseDemo from "@/components/document-parse-demo";
import InformationExtractDemo from "@/components/information-extract-demo";
import SolarLLMDemo from "@/components/solar-llm-demo";
import CodeBlock from "@/components/code-block";
import { FileText, Search, Brain, Rocket, BookOpen, ExternalLink } from "lucide-react";

export default function Home() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-hero text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Smart Contract Analyzer
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto">
              Interactive demos showcasing real API integrations for Document Parsing, Information Extraction, 
              and Advanced Reasoning. Test with actual files, explore comprehensive code examples, and 
              understand production implementation patterns.
            </p>
          </div>
          
          {/* Quick Stats */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center bg-white bg-opacity-10 rounded-lg p-6">
              <div className="text-3xl font-bold mb-2">10+ Formats</div>
              <div className="text-blue-100">PDF, DOCX, Images & More</div>
            </div>
            <div className="text-center bg-white bg-opacity-10 rounded-lg p-6">
              <div className="text-3xl font-bold mb-2">Live APIs</div>
              <div className="text-blue-100">Real-time Processing</div>
            </div>
            <div className="text-center bg-white bg-opacity-10 rounded-lg p-6">
              <div className="text-3xl font-bold mb-2">4 Languages</div>
              <div className="text-blue-100">Code Examples</div>
            </div>
          </div>

          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => scrollToSection('demos')}
                className="bg-white text-primary hover:bg-gray-100"
              >
                <Rocket className="mr-2 h-5 w-5" />
                Start Testing APIs
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => scrollToSection('implementation-details')}
                className="bg-white text-primary hover:bg-gray-100"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Implementation Guide
              </Button>
            </div>
            <p className="mt-4 text-blue-200 text-sm">
              All demos use live Gemini APIs • Upload your own files • Copy production-ready code
            </p>
          </div>
        </div>
      </section>

      {/* Technical Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Three Production-Ready AI APIs</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Each service is designed for enterprise-scale document processing with comprehensive features, 
              extensive format support, and battle-tested reliability across millions of documents
            </p>
          </div>
          
          <div className="space-y-16">
            {/* Document Parse */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center service-doc-parse rounded-full px-4 py-2 mb-6">
                  <FileText className="h-6 w-6 mr-2" />
                  <span className="font-semibold">Document Parse API</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Advanced Document Digitization</h3>
                <p className="text-gray-600 mb-6">
                  Transform any document into structured, searchable content while preserving layout semantics. 
                  Handles complex formatting, mathematical equations, charts, and multi-column layouts with 
                  enterprise-grade accuracy.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="font-semibold text-green-800">Supported Formats</div>
                    <div className="text-sm text-green-600">PDF, DOCX, PPTX, XLSX, PNG, JPG, HEIC, HWP, HWPX</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="font-semibold text-green-800">Processing Speed</div>
                    <div className="text-sm text-green-600">10 RPS Sync / 30 RPS Async</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="font-semibold text-green-800">Max File Size</div>
                    <div className="text-sm text-green-600">50MB per document</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="font-semibold text-green-800">Page Limits</div>
                    <div className="text-sm text-green-600">100 pages sync / 1,000 async</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <div className="font-medium">Layout Detection</div>
                      <div className="text-sm text-gray-600">Identifies headers, paragraphs, tables, figures, equations, and footnotes</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <div className="font-medium">Chart Recognition</div>
                      <div className="text-sm text-gray-600">Converts bar, line, and pie charts to structured table data</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <div className="font-medium">Equation Processing</div>
                      <div className="text-sm text-gray-600">LaTeX format output for mathematical formulas and equations</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold mb-4">Real Implementation Example</h4>
                <CodeBlock 
                  code={`// Document Parse API Integration
const response = await fetch('/api/document-parse', {
  method: 'POST',
  body: formData
});

const result = await response.json();
const elements = result.elements;

// Process structured output
elements.forEach(element => {
  switch(element.category) {
    case 'table':
      // Extract table data
      break;
    case 'chart':
      // Process chart data
      break;
    case 'equation':
      // Render LaTeX equations
      break;
  }
});`}
                  language="javascript"
                  showCopy={false}
                  className="text-xs"
                />
              </div>
            </div>

            {/* Information Extract */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="bg-gray-50 p-6 rounded-lg order-2 lg:order-1">
                <h4 className="font-semibold mb-4">Schema-Based Extraction</h4>
                <CodeBlock 
                  code={`// Custom Schema Definition
const invoiceSchema = {
  "type": "object",
  "properties": {
    "invoice_number": {
      "type": "string",
      "description": "Unique invoice identifier"
    },
    "line_items": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "description": {"type": "string"},
          "amount": {"type": "number"}
        }
      }
    },
    "total_amount": {
      "type": "number",
      "description": "Calculated total"
    }
  }
};

// Extract structured data
const extraction = await api.extractInformation({
  document: file,
  schema: invoiceSchema
});`}
                  language="javascript"
                  showCopy={false}
                  className="text-xs"
                />
              </div>
              
              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center service-info-extract rounded-full px-4 py-2 mb-6">
                  <Search className="h-6 w-6 mr-2" />
                  <span className="font-semibold">Information Extract API</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Schema-Driven Data Extraction</h3>
                <p className="text-gray-600 mb-6">
                  Extract precise, structured data from any document type using custom JSON schemas. 
                  No training required - define your schema and get production-ready extraction instantly.
                  Understands implicit relationships and calculates derived values.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <div className="font-semibold text-yellow-800">Schema Flexibility</div>
                    <div className="text-sm text-yellow-600">Custom JSON schemas up to 50 properties</div>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <div className="font-semibold text-yellow-800">Processing Rate</div>
                    <div className="text-sm text-yellow-600">1 RPS with high accuracy</div>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <div className="font-semibold text-yellow-800">Auto-Generation</div>
                    <div className="text-sm text-yellow-600">AI-powered schema creation</div>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <div className="font-semibold text-yellow-800">Page Limits</div>
                    <div className="text-sm text-yellow-600">Up to 100 pages per document</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                    <div>
                      <div className="font-medium">Zero Training Required</div>
                      <div className="text-sm text-gray-600">Works with any document type out of the box</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                    <div>
                      <div className="font-medium">Implicit Data Understanding</div>
                      <div className="text-sm text-gray-600">Calculates totals, identifies relationships, infers missing data</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                    <div>
                      <div className="font-medium">Production-Ready Output</div>
                      <div className="text-sm text-gray-600">Structured JSON conforming exactly to your schema</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Gemini Chat */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center service-solar-llm rounded-full px-4 py-2 mb-6">
                  <Brain className="h-6 w-6 mr-2" />
                  <span className="font-semibold">Gemini Chat API</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Advanced Reasoning & Analysis</h3>
                <p className="text-gray-600 mb-6">
                  State-of-the-art reasoning capabilities for complex document analysis. Features transparent 
                  chain-of-thought processing, document grounding, and multi-step analytical reasoning. 
                  Perfect for contract analysis, research summarization, and decision support systems.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="font-semibold text-purple-800">Reasoning Levels</div>
                    <div className="text-sm text-purple-600">Low, Medium, High effort modes</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="font-semibold text-purple-800">Rate Limits</div>
                    <div className="text-sm text-purple-600">100 RPM / 100K TPM</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="font-semibold text-purple-800">Streaming</div>
                    <div className="text-sm text-purple-600">Real-time response streaming</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="font-semibold text-purple-800">Function Calling</div>
                    <div className="text-sm text-purple-600">Tool integration support</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <div>
                      <div className="font-medium">Chain of Thought Reasoning</div>
                      <div className="text-sm text-gray-600">Visible step-by-step problem solving and analysis</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <div>
                      <div className="font-medium">Document Grounding</div>
                      <div className="text-sm text-gray-600">Responses anchored to specific document content</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <div>
                      <div className="font-medium">Multi-Modal Support</div>
                      <div className="text-sm text-gray-600">Process text, images, and structured data together</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold mb-4">Reasoning Example</h4>
                <CodeBlock 
                  code={`// Advanced Document Analysis
const response = await client.chat.completions.create({
  model: "solar-pro2-preview",
  messages: [
    {
      role: "system",
      content: "Analyze the contract for risks and opportunities"
    },
    {
      role: "user", 
      content: "What are the key financial terms and risks?"
    }
  ],
  reasoning_effort: "high"
});

// Response includes thinking process
const thinking = response.choices[0].message.thinking;
const analysis = response.choices[0].message.content;

console.log("AI Reasoning:", thinking);
console.log("Final Analysis:", analysis);`}
                  language="javascript"
                  showCopy={false}
                  className="text-xs"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Details */}
      <section id="implementation-details" className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Production Implementation Guide</h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Comprehensive technical documentation, best practices, and real-world implementation patterns 
              for integrating Gemini APIs into production systems
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-green-400">Document Parse Integration</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <div className="font-medium text-gray-200">Optimal File Handling</div>
                  <div className="text-gray-400">Implement client-side validation, progress tracking, and retry logic for robust file processing</div>
                </div>
                <div>
                  <div className="font-medium text-gray-200">Output Processing</div>
                  <div className="text-gray-400">Parse structured elements, handle coordinates, and implement rendering pipelines</div>
                </div>
                <div>
                  <div className="font-medium text-gray-200">Performance Optimization</div>
                  <div className="text-gray-400">Use async APIs for large files, implement caching, and batch processing strategies</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-yellow-400">Information Extract Patterns</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <div className="font-medium text-gray-200">Schema Design</div>
                  <div className="text-gray-400">Create reusable, validated schemas with proper descriptions and data types</div>
                </div>
                <div>
                  <div className="font-medium text-gray-200">Validation & Error Handling</div>
                  <div className="text-gray-400">Implement schema validation, data cleaning, and fallback strategies</div>
                </div>
                <div>
                  <div className="font-medium text-gray-200">Workflow Integration</div>
                  <div className="text-gray-400">Build ETL pipelines, database integrations, and automated processing workflows</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-purple-400">Gemini Applications</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <div className="font-medium text-gray-200">Context Management</div>
                  <div className="text-gray-400">Implement conversation state, document context, and memory management</div>
                </div>
                <div>
                  <div className="font-medium text-gray-200">Reasoning Control</div>
                  <div className="text-gray-400">Balance reasoning effort with response time based on use case requirements</div>
                </div>
                <div>
                  <div className="font-medium text-gray-200">Output Processing</div>
                  <div className="text-gray-400">Parse reasoning chains, extract insights, and implement decision support systems</div>
                </div>
              </div>
            </div>
          </div>

          {/* Architecture Patterns */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center">Enterprise Architecture Patterns</h3>
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h4 className="text-xl font-bold mb-4 text-blue-400">Microservices Integration</h4>
                <CodeBlock 
                  code={`// Service-oriented architecture
class DocumentProcessingService {
  constructor() {
    this.geminiClient = new GeminiClient(process.env.GEMINI_API_KEY);
    this.redis = new Redis(process.env.REDIS_URL);
    this.queue = new BullQueue('document-processing');
  }

  async processDocument(file, workflow) {
    // Add to processing queue
    const job = await this.queue.add('process', {
      fileId: file.id,
      workflow: workflow,
      priority: file.priority
    });

    // Cache processing status
    await this.redis.setex(
      \`processing:\${file.id}\`, 
      3600, 
      JSON.stringify({ status: 'queued', jobId: job.id })
    );

    return { jobId: job.id, status: 'queued' };
  }

  async handleProcessingJob(job) {
    const { fileId, workflow } = job.data;
    
    try {
      switch(workflow) {
        case 'parse':
          return await this.parseDocument(fileId);
        case 'extract':
          return await this.extractInformation(fileId);
        case 'analyze':
          return await this.analyzeWithGemini(fileId);
      }
    } catch (error) {
      await this.handleProcessingError(fileId, error);
    }
  }
}`}
                  language="javascript"
                  showCopy={false}
                  className="text-xs"
                />
              </div>

              <div>
                <h4 className="text-xl font-bold mb-4 text-green-400">Error Handling & Resilience</h4>
                <CodeBlock 
                  code={`// Robust error handling and retry logic
class ResilientGeminiClient {
  constructor(apiKey, options = {}) {
    this.client = new GeminiClient(apiKey);
    this.retryConfig = {
      maxRetries: options.maxRetries || 3,
      baseDelay: options.baseDelay || 1000,
      maxDelay: options.maxDelay || 10000,
      backoffFactor: options.backoffFactor || 2
    };
  }

  async withRetry(operation, context = {}) {
    let lastError;
    
    for (let attempt = 0; attempt <= this.retryConfig.maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error;
        
        if (!this.isRetryableError(error) || 
            attempt === this.retryConfig.maxRetries) {
          throw error;
        }

        const delay = Math.min(
          this.retryConfig.baseDelay * 
          Math.pow(this.retryConfig.backoffFactor, attempt),
          this.retryConfig.maxDelay
        );

        await this.sleep(delay);
        console.log(\`Retry attempt \${attempt + 1} after \${delay}ms\`);
      }
    }
    
    throw lastError;
  }

  isRetryableError(error) {
    return error.status >= 500 || 
           error.status === 429 || 
           error.code === 'NETWORK_ERROR';
  }
}`}
                  language="javascript"
                  showCopy={false}
                  className="text-xs"
                />
              </div>
            </div>
          </div>

          {/* Performance & Scalability */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center">Performance & Scalability</h3>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h4 className="text-lg font-bold mb-4 text-cyan-400">Caching Strategies</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-medium text-gray-200">Result Caching</div>
                      <div className="text-gray-400">Cache parsed documents and extracted data with TTL-based invalidation</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-medium text-gray-200">Schema Caching</div>
                      <div className="text-gray-400">Store and version extraction schemas for consistent processing</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-medium text-gray-200">Response Caching</div>
                      <div className="text-gray-400">Cache LLM responses for identical queries and contexts</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg">
                <h4 className="text-lg font-bold mb-4 text-orange-400">Rate Limiting</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-medium text-gray-200">Client-Side Limiting</div>
                      <div className="text-gray-400">Implement token bucket algorithm for request throttling</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-medium text-gray-200">Queue Management</div>
                      <div className="text-gray-400">Use Redis-backed queues for handling request bursts</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-medium text-gray-200">Priority Handling</div>
                      <div className="text-gray-400">Implement request prioritization and SLA-based processing</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg">
                <h4 className="text-lg font-bold mb-4 text-pink-400">Monitoring & Analytics</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-medium text-gray-200">Usage Tracking</div>
                      <div className="text-gray-400">Monitor API usage, costs, and performance metrics</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-medium text-gray-200">Error Monitoring</div>
                      <div className="text-gray-400">Track error rates, response times, and failure patterns</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-medium text-gray-200">Quality Metrics</div>
                      <div className="text-gray-400">Measure extraction accuracy and user satisfaction</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Security & Compliance */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-center">Security & Compliance</h3>
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h4 className="text-lg font-bold mb-4 text-red-400">Data Protection</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Encrypt files in transit and at rest using AES-256</li>
                  <li>• Implement secure file upload with virus scanning</li>
                  <li>• Use temporary storage with automatic cleanup</li>
                  <li>• Audit all document access and processing activities</li>
                  <li>• Implement data retention and deletion policies</li>
                  <li>• Use secure API key management and rotation</li>
                </ul>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-lg">
                <h4 className="text-lg font-bold mb-4 text-blue-400">Compliance Features</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• GDPR-compliant data processing and storage</li>
                  <li>• SOC 2 Type II certified infrastructure</li>
                  <li>• HIPAA-ready with proper configuration</li>
                  <li>• Detailed audit logs and processing records</li>
                  <li>• Data anonymization and PII detection</li>
                  <li>• Regional data residency options</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Sections */}
      <section id="demos" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Interactive Live Demos</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Test each API with real files and see live results. All demos connect to actual Gemini APIs 
              for authentic testing experience. Upload your own documents or use our curated samples.
            </p>
          </div>
          <div className="space-y-24">
            <DocumentParseDemo />
            <InformationExtractDemo />
            <SolarLLMDemo />
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section id="getting-started" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Start building with Smart Contract Analyzer in minutes. Get free-tier access on signup and access to all three capabilities.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4 font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Sign Up</h3>
              <p className="text-gray-600">Create your account and get $10 in free credits</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4 font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Get API Key</h3>
              <p className="text-gray-600">Generate your API key instantly from the console</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4 font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Start Building</h3>
              <p className="text-gray-600">Use our examples and documentation to integrate quickly</p>
            </div>
          </div>

          <Card className="gradient-hero text-white border-0">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Start Your AI Journey Today</h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Join thousands of developers building intelligent applications with Smart Contract Analyzer. 
                Our comprehensive APIs make document processing and AI integration simple and powerful.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-primary hover:bg-gray-100"
                  onClick={() => window.open('https://aistudio.google.com/app/apikey', '_blank')}
                >
                  <Rocket className="mr-2 h-5 w-5" />
                  Get Started Free
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white text-primary hover:bg-gray-100"
                  onClick={() => window.open('https://ai.google.dev/gemini-api/docs', '_blank')}
                >
                  <ExternalLink className="mr-2 h-5 w-5" />
                  View Documentation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold text-primary mb-4 flex items-center">
                <Rocket className="mr-2 h-6 w-6" />
                Smart Contract Analyzer
              </div>
              <p className="text-gray-400 text-sm">
                Transforming documents with AI. Three powerful capabilities in one comprehensive platform.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button onClick={() => scrollToSection('document-parse')} className="hover:text-green-400 transition-colors">Document Parse</button></li>
                <li><button onClick={() => scrollToSection('info-extract')} className="hover:text-yellow-400 transition-colors">Information Extract</button></li>
                <li><button onClick={() => scrollToSection('solar-llm')} className="hover:text-purple-400 transition-colors">Gemini Chat</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="https://ai.google.dev/gemini-api/docs" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="https://ai.google.dev/gemini-api/docs/api-overview" className="hover:text-white transition-colors">API Reference</a></li>
                <li><a href="https://aistudio.google.com/" className="hover:text-white transition-colors">Playground</a></li>
                <li><a href="https://ai.google.dev/gemini-api/docs/quickstart" className="hover:text-white transition-colors">Tutorials</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="https://github.com/google-gemini" className="hover:text-white transition-colors">GitHub</a></li>
                <li><a href="https://discuss.ai.google.dev/" className="hover:text-white transition-colors">Community Forum</a></li>
                <li><a href="https://stackoverflow.com/questions/tagged/google-gemini" className="hover:text-white transition-colors">Stack Overflow</a></li>
                <li><a href="https://ai.google.dev/gemini-api/docs/troubleshooting" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 Smart Contract Analyzer. Built for developers who demand excellence.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
