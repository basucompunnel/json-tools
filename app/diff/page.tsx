import type { Metadata } from "next";
import DiffPage from "@/components/diff";

export const metadata: Metadata = {
  title: "JSON Diff Tool - JSON Tools",
  description:
    "Compare two JSON objects and find differences. Identify added, removed, and changed values instantly.",
};

export default DiffPage;
