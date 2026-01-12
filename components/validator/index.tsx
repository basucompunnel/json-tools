"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { JsonEditor } from "@/components/json-editor";
import { StatusAlert } from "@/components/status-alert";

export default function ValidatorPage() {
  const [input, setInput] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [error, setError] = useState("");

  const handleValidate = () => {
    try {
      JSON.parse(input);
      setIsValid(true);
      setError("");
    } catch (err) {
      setIsValid(false);
      setError(err instanceof Error ? err.message : "Invalid JSON");
    }
  };

  const handleClear = () => {
    setInput("");
    setIsValid(null);
    setError("");
  };

  return (
    <div className="container mx-auto max-w-6xl p-6">
      <div className="mb-6">
        <p className="text-muted-foreground">
          Validate your JSON syntax and structure
        </p>
      </div>

      <div className="space-y-4">
        <JsonEditor label="JSON to Validate" value={input} onChange={setInput}  />

        <div className="flex gap-2 items-center flex-wrap">
          <Button onClick={handleValidate} className="rounded-none">
            Validate
          </Button>
          <Button onClick={handleClear} variant="outline" className="rounded-none">
            Clear
          </Button>

          {isValid === true && <StatusAlert variant="success" message="Valid JSON!" minWidth="min-w-xs" />}

          {isValid === false && <StatusAlert variant="error" message={error} minWidth="min-w-xs" />}
        </div>
      </div>
    </div>
  );
}
