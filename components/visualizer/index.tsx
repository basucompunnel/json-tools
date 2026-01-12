"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { JsonEditor } from "@/components/json-editor";
import { StatusAlert } from "@/components/status-alert";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronRight } from "lucide-react";

interface TreeNodeProps {
  name: string;
  value: any;
  level?: number;
}

function TreeNode({ name, value, level = 0 }: TreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(level < 2);
  const isObject = typeof value === "object" && value !== null;
  const isArray = Array.isArray(value);
  const indent = level * 24;

  const getValueType = (val: any): string => {
    if (val === null) return "null";
    if (Array.isArray(val)) return "array";
    return typeof val;
  };

  const getTypeColor = (type: string): string => {
    switch (type) {
      case "string":
        return "text-green-600 dark:text-green-400";
      case "number":
        return "text-blue-600 dark:text-blue-400";
      case "boolean":
        return "text-purple-600 dark:text-purple-400";
      case "null":
        return "text-gray-600 dark:text-gray-400";
      case "array":
        return "text-orange-600 dark:text-orange-400";
      case "object":
        return "text-cyan-600 dark:text-cyan-400";
      default:
        return "";
    }
  };

  const renderValue = (val: any): string => {
    if (val === null) return "null";
    if (typeof val === "string") return `"${val}"`;
    if (typeof val === "boolean") return val.toString();
    if (typeof val === "number") return val.toString();
    return "";
  };

  const getCollectionInfo = (val: any): string => {
    if (Array.isArray(val)) {
      return `[${val.length}]`;
    }
    if (typeof val === "object" && val !== null) {
      return `{${Object.keys(val).length}}`;
    }
    return "";
  };

  if (isObject) {
    const entries = isArray
      ? value.map((item: any, index: number) => [index.toString(), item])
      : Object.entries(value);

    return (
      <div>
        <div
          className="flex items-center gap-2 py-1 hover:bg-accent/50 cursor-pointer rounded px-2"
          style={{ paddingLeft: `${indent}px` }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <ChevronDown className="h-4 w-4 shrink-0" />
          ) : (
            <ChevronRight className="h-4 w-4 shrink-0" />
          )}
          <span className="font-mono font-semibold text-sm">{name}</span>
          <span className={`text-xs ${getTypeColor(getValueType(value))}`}>
            {getValueType(value)}
          </span>
          <span className="text-xs text-muted-foreground">
            {getCollectionInfo(value)}
          </span>
        </div>
        {isExpanded && (
          <div>
            {entries.map(([key, val]) => (
              <TreeNode key={key} name={key} value={val} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className="flex items-center gap-2 py-1 px-2 hover:bg-accent/50 rounded"
      style={{ paddingLeft: `${indent + 24}px` }}
    >
      <span className="font-mono font-semibold text-sm">{name}:</span>
      <span className={`text-sm ${getTypeColor(getValueType(value))}`}>
        {renderValue(value)}
      </span>
      <span className="text-xs text-muted-foreground">
        ({getValueType(value)})
      </span>
    </div>
  );
}

export default function VisualizerPage() {
  const [input, setInput] = useState("");
  const [parsedData, setParsedData] = useState<any>(null);
  const [error, setError] = useState("");

  const handleVisualize = () => {
    try {
      setError("");
      const parsed = JSON.parse(input);
      setParsedData(parsed);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON");
      setParsedData(null);
    }
  };

  const handleClear = () => {
    setInput("");
    setParsedData(null);
    setError("");
  };

  return (
    <div className="container mx-auto max-w-6xl p-6">
      <div className="mb-6">
        <p className="text-muted-foreground">
          Visualize JSON data in a tree structure
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <JsonEditor
            label="JSON Input"
            value={input}
            onChange={setInput}
            height="350px"
          />

          <div className="-mt-1">
            <div className="mb-2 text-sm font-medium">Tree Visualization</div>
            <Card className="rounded-none h-[350px] overflow-auto">
              <CardContent className="p-4">
                {parsedData ? (
                  <TreeNode name="root" value={parsedData} />
                ) : (
                  <div className="text-sm text-muted-foreground text-center py-8">
                    Paste JSON and click &quot;Visualize&quot; to see the tree
                    structure
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <Button onClick={handleVisualize} className="rounded-none">
            Visualize
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
