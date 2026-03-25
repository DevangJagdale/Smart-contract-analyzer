import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";

export default function DemoNotice() {
  const [apiStatus, setApiStatus] = useState<'checking' | 'connected' | 'error'>('checking');

  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        await apiClient.healthCheck();
        setApiStatus('connected');
      } catch (error) {
        setApiStatus('error');
      }
    };

    checkApiStatus();
  }, []);

  if (apiStatus === 'checking') {
    return (
      <Alert className="mb-6 border-blue-200 bg-blue-50">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
        <AlertDescription className="text-blue-800">
          Checking API connection...
        </AlertDescription>
      </Alert>
    );
  }

  if (apiStatus === 'error') {
    return (
      <Alert className="mb-6 border-red-200 bg-red-50">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-800">
          <strong>API Connection Issue:</strong> Unable to connect to Gemini APIs. 
          Please check your API key configuration or try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert className="mb-6 border-green-200 bg-green-50">
      <CheckCircle className="h-4 w-4 text-green-600" />
      <AlertDescription className="text-green-800">
        <strong>Live Demo Mode:</strong> All APIs are connected and functional! 
        Upload your own documents to test Document Parse, Information Extract, and Gemini Chat capabilities.
        The demos use real Gemini services for authentic results.
      </AlertDescription>
    </Alert>
  );
}