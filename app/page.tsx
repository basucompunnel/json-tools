import type { Metadata } from "next";
import HomePage from "@/components/home";

export const metadata: Metadata = {
  title: "JSON Tools - Format, Validate & More",
  description: "A comprehensive suite of tools for working with JSON data. Format, validate, convert, compare, and analyze JSON with ease.",
};

export default function Home() {
  return <HomePage />;
}
