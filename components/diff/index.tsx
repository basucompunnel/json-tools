"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { JsonEditor } from "@/components/json-editor";
import { StatusAlert } from "@/components/status-alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface DiffItem {
  path: string;
  status: string;
  value1?: any;
  value2?: any;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "added":
      return "text-green-600 dark:text-green-400";
    case "removed":
      return "text-red-600 dark:text-red-400";
    case "changed":
    case "type-changed":
      return "text-orange-600 dark:text-orange-400";
    default:
      return "";
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "added":
      return "Added in JSON 2";
    case "removed":
      return "Removed in JSON 2";
    case "type-changed":
      return "Type Changed";
    case "changed":
      return "Value Changed";
    default:
      return status;
  }
};

function DiffItemDisplay({ diff }: { diff: DiffItem }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <code className="text-sm font-mono bg-muted px-2 py-1">
          {diff.path}
        </code>
        <span
          className={`text-xs font-semibold ${getStatusColor(diff.status)}`}
        >
          {getStatusLabel(diff.status)}
        </span>
      </div>
      {diff.status === "removed" && (
        <div className="text-sm pl-2">
          <span className="text-muted-foreground">Value: </span>
          <code className="bg-muted px-1">{JSON.stringify(diff.value1)}</code>
        </div>
      )}
      {diff.status === "added" && (
        <div className="text-sm pl-2">
          <span className="text-muted-foreground">Value: </span>
          <code className="bg-muted px-1">{JSON.stringify(diff.value2)}</code>
        </div>
      )}
      {(diff.status === "changed" || diff.status === "type-changed") && (
        <div className="text-sm pl-2 space-y-1">
          <div>
            <span className="text-muted-foreground">JSON 1: </span>
            <code className="bg-muted px-1">{JSON.stringify(diff.value1)}</code>
          </div>
          <div>
            <span className="text-muted-foreground">JSON 2: </span>
            <code className="bg-muted px-1">{JSON.stringify(diff.value2)}</code>
          </div>
        </div>
      )}
    </div>
  );
}

function DiffResultCard({ differences }: { differences: DiffItem[] }) {
  return (
    <Card className="rounded-none">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">
          Found {differences.length} difference
          {differences.length !== 1 ? "s" : ""}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {differences.map((diff, index) => (
            <div key={index}>
              <DiffItemDisplay diff={diff} />
              {index < differences.length - 1 && <Separator className="mt-3" />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function DiffPage() {
  const [json1, setJson1] = useState("");
  const [json2, setJson2] = useState("");
  const [differences, setDifferences] = useState<DiffItem[]>([]);
  const [isIdentical, setIsIdentical] = useState(false);
  const [error, setError] = useState("");

  const handleCompare = () => {
    try {
      setError("");
      const obj1 = JSON.parse(json1);
      const obj2 = JSON.parse(json2);

      if (JSON.stringify(obj1) === JSON.stringify(obj2)) {
        setIsIdentical(true);
        setDifferences([]);
      } else {
        setIsIdentical(false);
        const diffs = findDifferences(obj1, obj2);
        setDifferences(diffs);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON");
      setDifferences([]);
      setIsIdentical(false);
    }
  };

  const findDifferences = (obj1: any, obj2: any, path = ""): DiffItem[] => {
    const diffs: DiffItem[] = [];

    const allKeys = new Set([
      ...Object.keys(obj1 || {}),
      ...Object.keys(obj2 || {}),
    ]);

    allKeys.forEach((key) => {
      const currentPath = path ? `${path}.${key}` : key;
      const val1 = obj1?.[key];
      const val2 = obj2?.[key];

      if (!(key in obj1)) {
        diffs.push({
          path: currentPath,
          status: "added",
          value2: val2,
        });
      } else if (!(key in obj2)) {
        diffs.push({
          path: currentPath,
          status: "removed",
          value1: val1,
        });
      } else if (typeof val1 !== typeof val2) {
        diffs.push({
          path: currentPath,
          status: "type-changed",
          value1: val1,
          value2: val2,
        });
      } else if (
        typeof val1 === "object" &&
        val1 !== null &&
        typeof val2 === "object" &&
        val2 !== null
      ) {
        const nestedDiffs = findDifferences(val1, val2, currentPath);
        diffs.push(...nestedDiffs);
      } else if (val1 !== val2) {
        diffs.push({
          path: currentPath,
          status: "changed",
          value1: val1,
          value2: val2,
        });
      }
    });

    return diffs;
  };

  const handleClear = () => {
    setJson1("");
    setJson2("");
    setDifferences([]);
    setIsIdentical(false);
    setError("");
  };

  return (
    <div className="container mx-auto max-w-6xl p-6">
      <div className="mb-6">
        <p className="text-muted-foreground">
          Compare two JSON objects and find differences
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <JsonEditor label="JSON 1" value={json1} onChange={setJson1} />
          <JsonEditor label="JSON 2" value={json2} onChange={setJson2} />
        </div>

        <div className="flex gap-2 items-center">
          <Button onClick={handleCompare} className="rounded-none">
            Compare
          </Button>
          <Button
            onClick={handleClear}
            variant="outline"
            className="rounded-none"
          >
            Clear
          </Button>

          {error && (
            <StatusAlert variant="error" message={error} minWidth="min-w-xs" />
          )}
        </div>

        {isIdentical && (
          <StatusAlert
            variant="success"
            message="Objects are identical"
            minWidth="min-w-xs"
          />
        )}

        {differences.length > 0 && <DiffResultCard differences={differences} />}
      </div>
    </div>
  );
}
