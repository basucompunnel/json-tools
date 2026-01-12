"use client";

import Editor from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { Label } from "@/components/ui/label";

interface JsonEditorProps {
  label?: string;
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  height?: string;
}

export function JsonEditor({
  label,
  value,
  onChange,
  readOnly = false,
  height = "350px",
}: JsonEditorProps) {
  const { theme } = useTheme();

  return (
    <div>
      {label && <Label className="mb-2">{label}</Label>}
      <div className="border rounded-none overflow-hidden">
        <Editor
          height={height}
          defaultLanguage="json"
          value={value}
          onChange={(value) => onChange?.(value || "")}
          theme={theme === "dark" ? "vs-dark" : "light"}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            wordWrap: "on",
            readOnly,
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
}
