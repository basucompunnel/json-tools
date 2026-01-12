"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { JsonEditor } from "@/components/json-editor";
import { StatusAlert } from "@/components/status-alert";

export default function FormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleFormat = () => {
    try {
      setError("");
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON");
      setOutput("");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <div className="container mx-auto max-w-6xl p-6">
      <div className="mb-6">
        {/* <h1 className="text-3xl font-bold mb-2">JSON Formatter / Beautifier</h1> */}
        <p className="text-muted-foreground">
          Format and beautify your JSON with proper indentation
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <JsonEditor label="Input JSON" value={input} onChange={setInput} />
          <JsonEditor label="Formatted JSON" value={output} readOnly />
        </div>

        <div className="flex gap-2 items-center">
          <Button onClick={handleFormat} className="rounded-none">
            Format
          </Button>
          <Button
            onClick={handleClear}
            variant="outline"
            className="rounded-none"
          >
            Clear
          </Button>

          {error && <StatusAlert variant="error" message={error} />}
        </div>
      </div>
    </div>
  );
}
