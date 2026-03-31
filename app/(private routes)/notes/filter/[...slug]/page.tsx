
"use client";

import { useParams } from "next/navigation";

export default function FilterSlugPage() {
  const { slug } = useParams(); 
  return <p>Filtered by: {slug.join("/")}</p>;
}