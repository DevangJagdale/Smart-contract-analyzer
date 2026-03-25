// import { useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { MessageSquare, Brain, Clock, Send, Lightbulb, FileText, Rocket } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
// import { SOLAR_LLM_EXAMPLES } from "@/lib/constants";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
// import CodeBlock from "./code-block";

// export default function SolarLLMDemo() {
//   const [currentMessage, setCurrentMessage] = useState("");
//   const [showReasoning, setShowReasoning] = useState(true);
//   const [reasoningEffort, setReasoningEffort] = useState("high");
//   const [chatMessages, setChatMessages] = useState([
//     {
//       type: "user" as const,
//       content: "What's the total amount on this invoice?",
//       time: "12:34 PM",
//     },
//     {
//       type: "ai" as const,
//       content:
//         "Based on my analysis of the invoice document, the total amount is **$2,500.00**. This includes:\n\n• Web Development: $2,000.00\n• Hosting Setup: $500.00",
//       thinking:
//         "I need to analyze the invoice document to find the total amount. Let me examine the document structure and locate the total field...",
//       time: "12:34 PM",
//     },
//   ]);
//   const [isLoading, setIsLoading] = useState(false);
//   const { toast } = useToast();

//   const sendMessage = async () => {
//     if (!currentMessage.trim() || isLoading) return;

//     const userMessage = {
//       type: "user" as const,
//       content: currentMessage,
//       time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//     };

//     setChatMessages((prev) => [...prev, userMessage]);
//     setCurrentMessage("");
//     setIsLoading(true);

//     try {
//       const response = await fetch("/api/solar-chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           messages: [
//             {
//               role: "system",
//               content:
//                 "You are an expert document analyst. Provide helpful analysis and answer questions about documents.",
//             },
//             { role: "user", content: currentMessage },
//           ],
//           reasoningEffort,
//           stream: false,
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || "Failed to get response from Gemini");
//       }

//       const result = await response.json();

//       const aiMessage = {
//         type: "ai" as const,
//         content: result.choices[0].message.content,
//         thinking: showReasoning ? "Analyzing your question and providing a comprehensive response..." : undefined,
//         time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//       };

//       setChatMessages((prev) => [...prev, aiMessage]);
//       toast({
//         title: "Response received",
//         description: "Gemini has analyzed your question",
//       });
//     } catch (error) {
//       console.error("Gemini error:", error);

//       const errorMessage = {
//         type: "ai" as const,
//         content: `Sorry, I encountered an error: ${
//           error instanceof Error ? error.message : "Unknown error"
//         }. Please try again.`,
//         time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//       };

//       setChatMessages((prev) => [...prev, errorMessage]);
//       toast({
//         title: "Error",
//         description: "Failed to get response from Gemini",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       sendMessage();
//     }
//   };

//   const capabilities = [
//     {
//       title: "Complex Analysis",
//       description: "Multi-step reasoning through document relationships"
//     },
//     {
//       title: "Context Understanding", 
//       description: "Maintains context across long conversations"
//     },
//     {
//       title: "Chain of Thought",
//       description: "Shows transparent reasoning process"
//     },
//     {
//       title: "Cross-Reference",
//       description: "Connects information across multiple sections"
//     }
//   ];

//   const sampleQuestions = [
//     "What are the payment terms and penalties?",
//     "Compare the costs in this document with industry standards",
//     "What are the key risks mentioned in this contract?",
//     "Summarize the deliverables and timeline"
//   ];
//   const useCases = [
//     { title: "Contract Analysis", description: "Identify risks, obligations, and key terms in legal documents", icon: FileText },
//     { title: "Financial Reports", description: "Analyze financial statements and extract insights", icon: Brain },
//     { title: "Research Papers", description: "Summarize findings and answer research questions", icon: Lightbulb },
//     { title: "Resume Screening", description: "Evaluate candidates and match requirements", icon: MessageSquare },
//   ];

//   return (
//     <div id="solar-llm" className="space-y-8">
//       <div className="text-center">
//         <div className="inline-flex items-center justify-center w-16 h-16 service-solar-llm rounded-full text-2xl mb-4">
//           <Brain className="h-8 w-8" />
//         </div>
//         <h2 className="text-3xl font-bold mb-4">Gemini Chat Demo</h2>
//         <p className="text-gray-600 text-lg max-w-2xl mx-auto">
//           Advanced reasoning and contextual understanding for document-based Q&A and complex analysis
//         </p>
//       </div>

//       {/* Features Grid */}
//       <div className="grid md:grid-cols-3 gap-8">
//         <Card className="border-purple-100">
//           <CardContent className="p-6 text-center">
//             <Brain className="h-8 w-8 text-[hsl(262,83%,58%)] mx-auto mb-4" />
//             <h3 className="font-semibold text-lg mb-2">Document Analysis</h3>
//             <p className="text-gray-600 text-sm">Deep understanding of document content, structure, and context.</p>
//           </CardContent>
//         </Card>
//         <Card className="border-purple-100">
//           <CardContent className="p-6 text-center">
//             <Lightbulb className="h-8 w-8 text-[hsl(262,83%,58%)] mx-auto mb-4" />
//             <h3 className="font-semibold text-lg mb-2">Chain of Thought</h3>
//             <p className="text-gray-600 text-sm">Advanced reasoning that breaks down complex problems step by step.</p>
//           </CardContent>
//         </Card>
//         <Card className="border-purple-100">
//           <CardContent className="p-6 text-center">
//             <MessageSquare className="h-8 w-8 text-[hsl(262,83%,58%)] mx-auto mb-4" />
//             <h3 className="font-semibold text-lg mb-2">Contextual Q&A</h3>
//             <p className="text-gray-600 text-sm">Answer questions about documents with relevant context and citations.</p>
//           </CardContent>
//         </Card>
//       </div>
//     <div className="max-w-3xl mx-auto space-y-6 p-4">
//       <Card>
//         <CardHeader className="bg-purple-600 text-white">
//           <CardTitle className="flex items-center gap-2">
//             <Brain className="h-5 w-5" />
//             Document Q&A Chat
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4 max-h-96 overflow-y-auto bg-gray-50 p-4">
//           {chatMessages.map((msg, i) => (
//             <div key={i} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
//               <div
//                 className={`rounded-lg p-3 max-w-xs whitespace-pre-wrap ${
//                   msg.type === "user" ? "bg-purple-600 text-white" : "bg-white border border-gray-300"
//                 }`}
//               >
//                 {showReasoning && msg.thinking && msg.type === "ai" && (
//                   <div className="text-xs text-gray-500 italic mb-1 flex items-center gap-1">
//                     <Clock className="h-3 w-3 animate-spin" />
//                     <span>Thinking: {msg.thinking}</span>
//                   </div>
//                 )}
//                 <div>{msg.content}</div>
//                 <div className="text-xs text-gray-400 mt-1 text-right">{msg.time}</div>
//               </div>
//             </div>
//           ))}

//           {isLoading && (
//             <div className="flex justify-start">
//               <div className="bg-white border border-gray-300 p-3 rounded-lg shadow-sm flex items-center gap-2">
//                 <div className="h-4 w-4 border-b-2 border-purple-600 rounded-full animate-spin"></div>
//                 <span className="text-sm text-gray-600">Gemini is thinking...</span>
//               </div>
//             </div>
//           )}
//         </CardContent>
//         <div className="p-4 border-t border-gray-200 bg-white flex gap-2">
//           <Input
//             placeholder="Ask a question about the document..."
//             value={currentMessage}
//             onChange={(e) => setCurrentMessage(e.target.value)}
//             onKeyPress={handleKeyPress}
//             disabled={isLoading}
//             className="flex-1"
//           />
//           <Button onClick={sendMessage} disabled={isLoading || !currentMessage.trim()}>
//             <Send className="h-4 w-4" />
//           </Button>
//         </div>
//         <div className="flex items-center gap-4 p-2 text-xs text-gray-500">
//           <label className="flex items-center gap-1">
//             <Checkbox checked={showReasoning} onCheckedChange={setShowReasoning} />
//             Show reasoning process
//           </label>
//           <Select value={reasoningEffort} onValueChange={setReasoningEffort} className="w-40">
//             <SelectTrigger>
//               <SelectValue />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="high">High reasoning effort</SelectItem>
//               <SelectItem value="medium">Medium reasoning effort</SelectItem>
//               <SelectItem value="low">Low reasoning effort</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </Card>

      
//     </div>

//     <div className="space-y-6">
//           {/* Reasoning Capabilities */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center text-[hsl(262,83%,58%)]">
//                 <Lightbulb className="mr-2 h-5 w-5" />
//                 Reasoning Capabilities
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-3">
//                 {capabilities.map((capability, index) => (
//                   <div key={index} className="flex items-start gap-3">
//                     <div className="w-2 h-2 bg-[hsl(262,83%,58%)] rounded-full mt-2 flex-shrink-0"></div>
//                     <div>
//                       <div className="font-medium text-sm">{capability.title}</div>
//                       <div className="text-xs text-gray-600">{capability.description}</div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>

//           {/* Sample Questions */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center text-[hsl(262,83%,58%)]">
//                 <MessageSquare className="mr-2 h-5 w-5" />
//                 Try These Questions
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-2">
//                 {sampleQuestions.map((question, index) => (
//                   <Button 
//                     key={index}
//                     variant="ghost" 
//                     className="w-full text-left justify-start p-3 bg-gray-50 hover:bg-[hsl(262,83%,58%)] hover:text-white text-sm"
//                     onClick={() => setCurrentMessage(question)}
//                   >
//                     "{question}"
//                   </Button>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>

//           {/* Use Cases */}
//       <div>
//         <h3 className="text-2xl font-bold mb-8 text-center">Popular Use Cases</h3>
//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {useCases.map((useCase, index) => (
//             <Card key={index} className="border-purple-100 hover:shadow-lg transition-shadow">
//               <CardContent className="p-6 text-center">
//                 <useCase.icon className="h-8 w-8 text-[hsl(262,83%,58%)] mx-auto mb-3" />
//                 <h4 className="font-semibold mb-2">{useCase.title}</h4>
//                 <p className="text-sm text-gray-600">{useCase.description}</p>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>

//       {/* Implementation Examples */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center text-[hsl(262,83%,58%)]">
//             <Brain className="mr-2 h-5 w-5" />
//             Implementation Examples
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Tabs defaultValue="python">
//             <TabsList className="grid w-full grid-cols-3">
//               <TabsTrigger value="python">Python</TabsTrigger>
//               <TabsTrigger value="javascript">JavaScript</TabsTrigger>
//               <TabsTrigger value="langchain">LangChain</TabsTrigger>
//             </TabsList>
            
//             {Object.entries(SOLAR_LLM_EXAMPLES).map(([lang, code]) => (
//               <TabsContent key={lang} value={lang}>
//                 <CodeBlock 
//                   code={code}
//                   language={lang === 'langchain' ? 'python' : lang}
//                   title={`${lang.charAt(0).toUpperCase() + lang.slice(1)} Example`}
//                   showCopy
//                 />
//               </TabsContent>
//             ))}
//           </Tabs>
//         </CardContent>
//       </Card>

//       {/* Advanced Features */}
//       <Card className="bg-gradient-to-r from-[hsl(262,83%,58%)] to-purple-600 text-white">
//         <CardContent className="p-6">
//           <h4 className="text-lg font-semibold mb-4 flex items-center">
//             <Rocket className="mr-2 h-5 w-5" />
//             Advanced Features
//           </h4>
//           <div className="grid md:grid-cols-3 gap-4 text-sm">
//             <div>
//               <div className="font-medium mb-2">🧠 Reasoning Levels:</div>
//               <ul className="space-y-1 text-purple-100">
//                 <li>• High: Deep analysis & planning</li>
//                 <li>• Medium: Balanced performance</li>
//                 <li>• Low: Quick responses</li>
//               </ul>
//             </div>
//             <div>
//               <div className="font-medium mb-2">💬 Chat Features:</div>
//               <ul className="space-y-1 text-purple-100">
//                 <li>• Context awareness</li>
//                 <li>• Multi-turn conversations</li>
//                 <li>• Document grounding</li>
//               </ul>
//             </div>
//             <div>
//               <div className="font-medium mb-2">⚡ Performance:</div>
//               <ul className="space-y-1 text-purple-100">
//                 <li>• 100 RPM / 100K TPM</li>
//                 <li>• Streaming support</li>
//                 <li>• Function calling</li>
//               </ul>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//         </div>


//     </div>
//   );
// }
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Brain, Clock, Send, Lightbulb, FileText, Rocket } from "lucide-react";

// API integration through backend proxy
const callSolarLLMAPI = async (messages, reasoningEffort) => {
  try {
    const response = await fetch("/api/solar-chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: messages,
        reasoning_effort: reasoningEffort || "high",
        stream: false
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || errorData.details || `API request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

export default function SolarLLMDemo() {
  const [currentMessage, setCurrentMessage] = useState("");
  const [showReasoning, setShowReasoning] = useState(true);
  const [reasoningEffort, setReasoningEffort] = useState("high");
  const [chatMessages, setChatMessages] = useState([
    {
      type: "user" as const,
      content: "What's the total amount on this invoice?",
      time: "12:34 PM",
    },
    {
      type: "ai" as const,
      content:
        "Based on my analysis of the invoice document, the total amount is **$2,500.00**. This includes:\n\n• Web Development: $2,000.00\n• Hosting Setup: $500.00",
      thinking:
        "I need to analyze the invoice document to find the total amount. Let me examine the document structure and locate the total field...",
      time: "12:34 PM",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!currentMessage.trim() || isLoading) return;

    const userMessage = {
      type: "user" as const,
      content: currentMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    const messageToSend = currentMessage;
    setCurrentMessage("");
    setIsLoading(true);

    try {
      // Direct API call to Gemini
      const result = await callSolarLLMAPI([
        {
          role: "system",
          content: "You are an expert document analyst. Provide helpful analysis and answer questions about documents.",
        },
        { role: "user", content: messageToSend },
      ], reasoningEffort);

      const aiMessage = {
        type: "ai" as const,
        content: result.choices[0].message.content,
        thinking: showReasoning ? "Analyzing your question and providing a comprehensive response..." : undefined,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setChatMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Gemini error:", error);

      const errorMessage = {
        type: "ai" as const,
        content: `Sorry, I encountered an error: ${
          error instanceof Error ? error.message : "Unknown error"
        }. Please try again.`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setChatMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const capabilities = [
    {
      title: "Complex Analysis",
      description: "Multi-step reasoning through document relationships"
    },
    {
      title: "Context Understanding", 
      description: "Maintains context across long conversations"
    },
    {
      title: "Chain of Thought",
      description: "Shows transparent reasoning process"
    },
    {
      title: "Cross-Reference",
      description: "Connects information across multiple sections"
    }
  ];

  const sampleQuestions = [
    "What are the payment terms and penalties?",
    "Compare the costs in this document with industry standards",
    "What are the key risks mentioned in this contract?",
    "Summarize the deliverables and timeline"
  ];

  const useCases = [
    { title: "Contract Analysis", description: "Identify risks, obligations, and key terms in legal documents", icon: FileText },
    { title: "Financial Reports", description: "Analyze financial statements and extract insights", icon: Brain },
    { title: "Research Papers", description: "Summarize findings and answer research questions", icon: Lightbulb },
    { title: "Resume Screening", description: "Evaluate candidates and match requirements", icon: MessageSquare },
  ];

  const codeExamples = {
    python: `import requests

# Gemini API Integration
def query_gemini(messages):
  url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=YOUR_API_KEY"
    headers = {
        "Content-Type": "application/json"
    }
    
    payload = {
    "contents": [{"role": "user", "parts": [{"text": messages[-1]["content"]}]}]
    }
    
    response = requests.post(url, json=payload, headers=headers)
    return response.json()

# Example usage
messages = [
    {"role": "system", "content": "You are a document analyst."},
    {"role": "user", "content": "Analyze this contract for key risks."}
]

result = query_gemini(messages)
print(result['choices'][0]['message']['content'])`,
    
  javascript: `// Gemini API Integration
async function queryGemini(messages) {
  const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=YOUR_API_KEY", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: messages[messages.length - 1].content }] }]
        })
    });
    
    return await response.json();
}

// Example usage
const messages = [
    { role: "system", content: "You are a document analyst." },
    { role: "user", content: "What are the key terms in this agreement?" }
];

queryGemini(messages)
    .then(result => console.log(result.choices[0].message.content));`,
    
  langchain: `from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage, SystemMessage

# Initialize Gemini model
llm = ChatGoogleGenerativeAI(
  google_api_key="YOUR_API_KEY",
  model="gemini-2.5-flash"
)

# Create message chain
messages = [
    SystemMessage(content="You are an expert document analyst."),
    HumanMessage(content="Analyze this financial report for key insights.")
]

# Get response
response = llm.invoke(messages)
print(response.content)

# For document Q&A with retrieval
from langchain_community.vectorstores import FAISS
from langchain_google_genai import GoogleGenerativeAIEmbeddings

# Create vector store for documents
embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
vectorstore = FAISS.from_documents(documents, embeddings)

# Create retrieval chain
from langchain.chains import RetrievalQA
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=vectorstore.as_retriever()
)

result = qa_chain.invoke({"query": "What are the main conclusions?"})
print(result['result'])`
  };

  const [activeTab, setActiveTab] = useState('python');

  return (
    <div id="solar-llm" className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full text-2xl mb-4">
          <Brain className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold mb-4">Gemini Chat Demo</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Advanced reasoning and contextual understanding for document-based Q&A and complex analysis
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        <Card className="border-purple-100">
          <CardContent className="p-6 text-center">
            <Brain className="h-8 w-8 text-purple-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Document Analysis</h3>
            <p className="text-gray-600 text-sm">Deep understanding of document content, structure, and context.</p>
          </CardContent>
        </Card>
        <Card className="border-purple-100">
          <CardContent className="p-6 text-center">
            <Lightbulb className="h-8 w-8 text-purple-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Chain of Thought</h3>
            <p className="text-gray-600 text-sm">Advanced reasoning that breaks down complex problems step by step.</p>
          </CardContent>
        </Card>
        <Card className="border-purple-100">
          <CardContent className="p-6 text-center">
            <MessageSquare className="h-8 w-8 text-purple-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Contextual Q&A</h3>
            <p className="text-gray-600 text-sm">Answer questions about documents with relevant context and citations.</p>
          </CardContent>
        </Card>
      </div>

      <div className="max-w-3xl mx-auto space-y-6 p-4">
        <Card>
          <CardHeader className="bg-purple-600 text-white">
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Document Q&A Chat
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 max-h-96 overflow-y-auto bg-gray-50 p-4">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`rounded-lg p-3 max-w-xs whitespace-pre-wrap ${
                    msg.type === "user" ? "bg-purple-600 text-white" : "bg-white border border-gray-300"
                  }`}
                >
                  {showReasoning && msg.thinking && msg.type === "ai" && (
                    <div className="text-xs text-gray-500 italic mb-1 flex items-center gap-1">
                      <Clock className="h-3 w-3 animate-spin" />
                      <span>Thinking: {msg.thinking}</span>
                    </div>
                  )}
                  <div>{msg.content}</div>
                  <div className="text-xs text-gray-400 mt-1 text-right">{msg.time}</div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-300 p-3 rounded-lg shadow-sm flex items-center gap-2">
                  <div className="h-4 w-4 border-b-2 border-purple-600 rounded-full animate-spin"></div>
                  <span className="text-sm text-gray-600">Gemini is thinking...</span>
                </div>
              </div>
            )}
          </CardContent>
          <div className="p-4 border-t border-gray-200 bg-white flex gap-2">
            <Input
              placeholder="Ask a question about the document..."
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              className="flex-1"
            />
            <Button onClick={sendMessage} disabled={isLoading || !currentMessage.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-4 p-2 text-xs text-gray-500">
            <label className="flex items-center gap-1">
              <Checkbox checked={showReasoning} onCheckedChange={setShowReasoning} />
              Show reasoning process
            </label>
            <Select value={reasoningEffort} onValueChange={setReasoningEffort}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High reasoning effort</SelectItem>
                <SelectItem value="medium">Medium reasoning effort</SelectItem>
                <SelectItem value="low">Low reasoning effort</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>
      </div>

      <div className="space-y-6">
        {/* Reasoning Capabilities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-purple-600">
              <Lightbulb className="mr-2 h-5 w-5" />
              Reasoning Capabilities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {capabilities.map((capability, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-medium text-sm">{capability.title}</div>
                    <div className="text-xs text-gray-600">{capability.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sample Questions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-purple-600">
              <MessageSquare className="mr-2 h-5 w-5" />
              Try These Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {sampleQuestions.map((question, index) => (
                <Button 
                  key={index}
                  variant="ghost" 
                  className="w-full text-left justify-start p-3 bg-gray-50 hover:bg-purple-600 hover:text-white text-sm"
                  onClick={() => setCurrentMessage(question)}
                >
                  "{question}"
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Use Cases */}
        <div>
          <h3 className="text-2xl font-bold mb-8 text-center">Popular Use Cases</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => (
              <Card key={index} className="border-purple-100 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <useCase.icon className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">{useCase.title}</h4>
                  <p className="text-sm text-gray-600">{useCase.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Implementation Examples */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-purple-600">
              <Brain className="mr-2 h-5 w-5" />
              Implementation Examples
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-2 border-b">
                {Object.keys(codeExamples).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setActiveTab(lang)}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === lang 
                        ? 'text-purple-600 border-purple-600' 
                        : 'text-gray-600 border-transparent hover:text-purple-600 hover:border-purple-600'
                    }`}
                  >
                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </button>
                ))}
              </div>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm">
                  <code>{codeExamples[activeTab]}</code>
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Advanced Features */}
        <Card className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold mb-4 flex items-center">
              <Rocket className="mr-2 h-5 w-5" />
              Advanced Features
            </h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="font-medium mb-2">🧠 Reasoning Levels:</div>
                <ul className="space-y-1 text-purple-100">
                  <li>• High: Deep analysis & planning</li>
                  <li>• Medium: Balanced performance</li>
                  <li>• Low: Quick responses</li>
                </ul>
              </div>
              <div>
                <div className="font-medium mb-2">💬 Chat Features:</div>
                <ul className="space-y-1 text-purple-100">
                  <li>• Context awareness</li>
                  <li>• Multi-turn conversations</li>
                  <li>• Document grounding</li>
                </ul>
              </div>
              <div>
                <div className="font-medium mb-2">⚡ Performance:</div>
                <ul className="space-y-1 text-purple-100">
                  <li>• 100 RPM / 100K TPM</li>
                  <li>• Streaming support</li>
                  <li>• Function calling</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
