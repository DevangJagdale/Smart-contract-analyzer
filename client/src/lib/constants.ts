export const DOCUMENT_PARSE_EXAMPLES = {
  python: `import requests
import base64

API_KEY = "GEMINI_API_KEY"

def parse_document(file_path):
    with open(file_path, 'rb') as file:
        files = {"document": file}
        data = {"model": "document-parse"}
        headers = {"Authorization": f"Bearer {API_KEY}"}
        
        response = requests.post(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=GEMINI_API_KEY",
            headers=headers,
            data=data,
            files=files
        )
        
        if response.status_code == 200:
            return response.json()
        else:
            raise Exception(f"Error: {response.status_code}")

# Usage
result = parse_document("document.pdf")
print(result["elements"])`,

  javascript: `const API_KEY = "GEMINI_API_KEY";

async function parseDocument(fileInput) {
    const formData = new FormData();
    formData.append('document', fileInput.files[0]);
    formData.append('model', 'document-parse');
    
    const response = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + API_KEY,
        {
            method: 'POST',
            headers: {
                'Authorization': \`Bearer \${API_KEY}\`
            },
            body: formData
        }
    );
    
    if (response.ok) {
        const result = await response.json();
        return result.elements;
    } else {
        throw new Error(\`Error: \${response.status}\`);
    }
}

// Usage
document.getElementById('fileInput').addEventListener('change', async (e) => {
    try {
        const elements = await parseDocument(e.target);
        console.log(elements);
    } catch (error) {
        console.error('Parse failed:', error);
    }
});`,

  curl: `curl -X POST "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=GEMINI_API_KEY" \\
  -H "Content-Type: application/json" \\
  -F "document=@document.pdf" \\
  -F "model=document-parse"`,

  java: `import java.io.*;
import java.net.http.*;
import java.nio.file.*;

public class DocumentParser {
    private static final String API_KEY = "GEMINI_API_KEY";
    private static final String API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + API_KEY;
    
    public static String parseDocument(String filePath) throws Exception {
        HttpClient client = HttpClient.newHttpClient();
        
        String boundary = "----formdata-boundary-" + System.currentTimeMillis();
        String CRLF = "\\r\\n";
        
        StringBuilder body = new StringBuilder();
        body.append("--").append(boundary).append(CRLF);
        body.append("Content-Disposition: form-data; name=\\"model\\"").append(CRLF);
        body.append(CRLF);
        body.append("document-parse").append(CRLF);
        
        body.append("--").append(boundary).append(CRLF);
        body.append("Content-Disposition: form-data; name=\\"document\\"; filename=\\"document.pdf\\"").append(CRLF);
        body.append("Content-Type: application/pdf").append(CRLF);
        body.append(CRLF);
        
        byte[] fileBytes = Files.readAllBytes(Paths.get(filePath));
        
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(API_URL))
            .header("Authorization", "Bearer " + API_KEY)
            .header("Content-Type", "multipart/form-data; boundary=" + boundary)
            .POST(HttpRequest.BodyPublishers.ofString(body.toString()))
            .build();
            
        HttpResponse<String> response = client.send(request, 
            HttpResponse.BodyHandlers.ofString());
            
        return response.body();
    }
}`
};

export const INFORMATION_EXTRACT_EXAMPLES = {
  python: `import base64
import json
from openai import OpenAI

client = OpenAI(
    api_key="GEMINI_API_KEY"
)

def encode_file_to_base64(file_path):
    with open(file_path, 'rb') as file:
        return base64.b64encode(file.read()).decode('utf-8')

# Define schema
schema = {
    "type": "json_schema",
    "json_schema": {
        "name": "invoice_schema",
        "schema": {
            "type": "object",
            "properties": {
                "invoice_number": {"type": "string"},
                "total_amount": {"type": "number"},
                "vendor_name": {"type": "string"}
            }
        }
    }
}

# Process document
base64_data = encode_file_to_base64("invoice.pdf")

response = client.chat.completions.create(
    model="information-extract",
    messages=[{
        "role": "user",
        "content": [{
            "type": "image_url",
            "image_url": {"url": f"data:application/octet-stream;base64,{base64_data}"}
        }]
    }],
    response_format=schema
)

# Parse result
result = json.loads(response.choices[0].message.content)
print(result)`,

  javascript: `const API_KEY = "GEMINI_API_KEY";

async function extractInformation(file, schema) {
    const base64Data = await fileToBase64(file);
    
    const response = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + API_KEY,
        {
            method: 'POST',
            headers: {
                'Authorization': \`Bearer \${API_KEY}\`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "information-extract",
                messages: [{
                    role: "user",
                    content: [{
                        type: "image_url",
                        image_url: {
                            url: \`data:application/octet-stream;base64,\${base64Data}\`
                        }
                    }]
                }],
                response_format: schema
            })
        }
    );
    
    if (response.ok) {
        const data = await response.json();
        return JSON.parse(data.choices[0].message.content);
    } else {
        throw new Error(\`Error: \${response.status}\`);
    }
}

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = error => reject(error);
    });
}

// Usage example
const schema = {
    type: "json_schema",
    json_schema: {
        name: "invoice_schema",
        schema: {
            type: "object",
            properties: {
                invoice_number: {type: "string"},
                total_amount: {type: "number"}
            }
        }
    }
};`,

  curl: `curl -X POST "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=GEMINI_API_KEY" \\
  -H "Content-Type: application/json" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "information-extract",
    "messages": [{
      "role": "user",
      "content": [{
        "type": "image_url",
        "image_url": {
          "url": "data:application/octet-stream;base64,'"$(base64 -i invoice.pdf)"'"
        }
      }]
    }],
    "response_format": {
      "type": "json_schema",
      "json_schema": {
        "name": "invoice_schema",
        "schema": {
          "type": "object",
          "properties": {
            "invoice_number": {"type": "string"},
            "total_amount": {"type": "number"}
          }
        }
      }
    }
  }'`
};

export const SOLAR_LLM_EXAMPLES = {
  python: `from openai import OpenAI

client = OpenAI(
    api_key="GEMINI_API_KEY"
)

def chat_with_reasoning(question, document_context=""):
    messages = [
        {
            "role": "system",
            "content": f"You are an expert document analyst. Use the following document context to answer questions: {document_context}"
        },
        {
            "role": "user",
            "content": question
        }
    ]
    
    response = client.chat.completions.create(
        model="solar-pro2-preview",
        messages=messages,
        reasoning_effort="high",  # Enable chain of thought
        stream=True
    )
    
    # Stream the response
    for chunk in response:
        if chunk.choices[0].delta.content:
            print(chunk.choices[0].delta.content, end="")

# Example usage
document_text = """
CONTRACT AGREEMENT
Total Amount: $2,500.00
Payment Terms: Net 30 days
Duration: 12 months
Deliverables: Web development and hosting setup
"""

chat_with_reasoning(
    "What are the key financial terms in this contract?",
    document_text
)`,

  javascript: `const API_KEY = "GEMINI_API_KEY";

async function chatWithGemini(question, documentContext = "") {
  const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + API_KEY, {
        method: 'POST',
        headers: {
            'Authorization': \`Bearer \${API_KEY}\`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: "gemini-2.5-flash",
            messages: [
                {
                    role: "system",
                    content: \`You are an expert document analyst. Context: \${documentContext}\`
                },
                {
                    role: "user",
                    content: question
                }
            ],
            reasoning_effort: "high",
            stream: true
        })
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        const lines = chunk.split('\\n');
        
        for (const line of lines) {
            if (line.startsWith('data: ')) {
                const data = JSON.parse(line.slice(6));
                if (data.choices[0].delta.content) {
                    console.log(data.choices[0].delta.content);
                }
            }
        }
    }
}

// Usage
const documentContext = "CONTRACT: Total $2,500.00, Net 30 payment terms...";
chatWithGemini("Analyze the payment terms", documentContext);`,

  langchain: `from langchain_openai import ChatOpenAI
from langchain.schema import HumanMessage, SystemMessage
from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter

# Initialize Gemini through LangChain
llm = ChatOpenAI(
    model="gemini-2.5-flash",
    openai_api_key="GEMINI_API_KEY",
    model_kwargs={"reasoning_effort": "high"}
)

# Load and process document
loader = PyPDFLoader("contract.pdf")
documents = loader.load()

# Split document into chunks
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200
)
chunks = text_splitter.split_documents(documents)

# Create context from chunks
context = "\\n".join([chunk.page_content for chunk in chunks[:3]])

# Chat with reasoning
messages = [
    SystemMessage(content=f"Document context: {context}"),
    HumanMessage(content="What are the main contract terms?")
]

response = llm(messages)
print(response.content)

# For streaming responses
for chunk in llm.stream(messages):
    print(chunk.content, end="")`
};

export const SAMPLE_SCHEMAS = {
  invoice: {
    type: "object",
    properties: {
      invoice_number: {
        type: "string",
        description: "Unique invoice identifier"
      },
      date: {
        type: "string",
        description: "Invoice date"
      },
      vendor_name: {
        type: "string",
        description: "Vendor company name"
      },
      total_amount: {
        type: "number",
        description: "Total amount"
      },
      line_items: {
        type: "array",
        items: {
          type: "object",
          properties: {
            description: { type: "string" },
            quantity: { type: "number" },
            unit_price: { type: "number" }
          }
        }
      }
    }
  },
  resume: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "Full name"
      },
      email: {
        type: "string",
        description: "Email address"
      },
      phone: {
        type: "string",
        description: "Phone number"
      },
      experience: {
        type: "array",
        items: {
          type: "object",
          properties: {
            company: { type: "string" },
            position: { type: "string" },
            duration: { type: "string" }
          }
        }
      },
      skills: {
        type: "array",
        items: { type: "string" }
      }
    }
  }
};
