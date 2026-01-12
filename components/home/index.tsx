import Link from "next/link";
import {
  MdOutlineFormatAlignLeft,
  MdOutlineCheckCircle,
  MdCompareArrows,
  MdCleaningServices,
  MdOutlineAnalytics,
  MdOutlineVisibility,
  MdCode,
} from "react-icons/md";
import { AiOutlineSwap } from "react-icons/ai";
import { Card } from "@/components/ui/card";
import { IconType } from "react-icons";

interface Tool {
  title: string;
  description: string;
  icon: IconType;
  href: string;
  color: string;
}

function ToolCard({ tool }: { tool: Tool }) {
  const Icon = tool.icon;

  return (
    <Link href={tool.href}>
      <Card className="hover:bg-accent hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group p-4 rounded-none">
        <div className="flex items-start gap-3">
          <div className={`p-2 bg-muted ${tool.color} shrink-0`}>
            <Icon className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-base group-hover:text-primary transition-colors leading-tight">
              {tool.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-tight">
              {tool.description}
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
}

const tools = [
  {
    title: "JSON Formatter / Beautifier",
    description: "Format and beautify your JSON with proper indentation",
    icon: MdOutlineFormatAlignLeft,
    href: "/formatter",
    color: "text-blue-500",
  },
  {
    title: "JSON Validator",
    description: "Validate your JSON syntax and structure",
    icon: MdOutlineCheckCircle,
    href: "/validator",
    color: "text-green-500",
  },
  {
    title: "JSON Diff Tool",
    description: "Compare two JSON objects and find differences",
    icon: MdCompareArrows,
    href: "/diff",
    color: "text-orange-500",
  },
  {
    title: "JSON Visualizer",
    description: "Visualize JSON data in a tree structure",
    icon: MdOutlineVisibility,
    href: "/visualizer",
    color: "text-indigo-500",
  },
  {
    title: "JSON ↔ JavaScript Object Converter",
    description: "Convert between JSON and JavaScript objects",
    icon: AiOutlineSwap,
    href: "/converter",
    color: "text-purple-500",
  },
  {
    title: "JSON Cleanup Tool",
    description: "Clean and optimize your JSON data",
    icon: MdCleaningServices,
    href: "/cleanup",
    color: "text-cyan-500",
  },
  {
    title: "JSON Size Analyzer",
    description: "Analyze and optimize JSON file size",
    icon: MdOutlineAnalytics,
    href: "/analyzer",
    color: "text-pink-500",
  },
  {
    title: "JSON to XML",
    description: "Convert JSON data to XML format",
    icon: MdCode,
    href: "/json-to-xml",
    color: "text-amber-500",
  },
];

export default function HomePage() {
  return (
    <div className="container mx-auto max-w-6xl p-6">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">JSON Tools</h1>
        <p className="text-lg text-muted-foreground">
          A comprehensive suite of tools for working with JSON data
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tools.map((tool) => (
          <ToolCard key={tool.href} tool={tool} />
        ))}
      </div>
    </div>
  );
}
