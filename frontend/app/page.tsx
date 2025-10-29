'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface BackendResponse {
  markdown: string;
  status: string;
  output:string
}

export default function Home() {
  const [userInput, setUserInput] = useState('');
  const [backendMarkdown, setBackendMarkdown] = useState('');
  const [geminiOutput, setGeminiOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Step 1: Send data to backend
  const handleBackendSubmit = async () => {
    if (!userInput.trim()) {
      setError('Please enter some data');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/generate-md`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ company: userInput }),
      });

      if (!response.ok) {
        throw new Error('Backend request failed');
      }

      const result: BackendResponse = await response.json();
      setBackendMarkdown(result.markdown);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect to backend');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Send markdown to Gemini API
  const handleGeminiSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ markdown: backendMarkdown }),
      });

      if (!response.ok) {
        throw new Error('Gemini API request failed');
      }

      const result : BackendResponse = await response.json();
      setGeminiOutput(result.output);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect to Gemini API');
    } finally {
      setLoading(false);
    }
  };

  const resetFlow = () => {
    setUserInput('');
    setBackendMarkdown('');
    setGeminiOutput('');
    setError('');
  };

  return (
    
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      <div className="w-full max-w-5xl mx-auto bg-white rounded-lg shadow-xl border border-gray-200">

        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-semibold text-gray-800">
            Data Processing Pipeline — Internal Business Tool
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Use this tool to generate and analyze backend reports in a sequential flow.
          </p>
        </div>

        {/* Step 1: User Input */}
        <div className="p-6 space-y-4">
          <div>
            <label htmlFor="userInput" className="block text-sm font-semibold text-gray-700">Input Data</label>
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder='e.g. "Google, Microsoft, Amazon..."'
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 text-black transition-shadow shadow-sm mt-4"
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-800 px-4 py-3 rounded text-sm">
              {error}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-4 px-4 py-4">
            <button
              onClick={handleBackendSubmit}
              disabled={loading}
              className="px-6 py-2.5 bg-[#1a73e8] cursor-pointer text-white text-sm font-medium rounded hover:bg-[#1557b0] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={16} />
                  Processing...
                </>
              ) : (
                'Proceed'
              )}
            </button>

            <button
              onClick={resetFlow}
              className="px-6 py-2 cursor-pointer bg-gray-100 text-black  font-medium rounded border border-gray-300 hover:bg-gray-200 transition-colors"
            >
              Reset
            </button>
          </div>

          {/* Query Preview Section */}
          {userInput && (
            <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-base font-medium text-[#5f6368] mb-3">Query Preview</h3>
              <div className="bg-[#f8f9fa] rounded p-3">
                <pre className="text-xs text-gray-700 font-mono whitespace-pre-wrap">
                  {JSON.stringify({ data: userInput }, null, 2)}
                </pre>
              </div>
            </div>
          )}

          {/* Step 2: Backend Response */}
          {backendMarkdown && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Backend Processed Output</h2>
                <div className="bg-[#f8f9fa] border border-gray-200 rounded p-4 max-h-96 overflow-y-auto">
                  <p className="text-sm text-gray-800 whitespace-pre-wrap font-mono">
                    {backendMarkdown}
                  </p>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
                  {error}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={handleGeminiSubmit}
                  disabled={loading}
                  className="px-6 py-2.5 bg-[#1a73e8] cursor-pointer text-white text-sm font-medium rounded hover:bg-[#1557b0] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={16} />
                      Sending to AI...
                    </>
                  ) : (
                    'Proceed For Markdown Analysis'
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Gemini Response */}
          {geminiOutput && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-normal text-[#5f6368] mb-4">Analyzing with Gemini...</h2>
                <div className="bg-[#f8f9fa] border border-gray-200 rounded p-4 max-h-96 overflow-y-auto">
                  <p className="text-sm text-gray-800 whitespace-pre-wrap">
                    {geminiOutput}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={resetFlow}
                  className="px-6 py-2.5 bg-[#1a73e8] cursor-pointer text-white text-sm font-medium rounded hover:bg-[#1557b0] transition-colors"
                >
                  Start New Process
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}