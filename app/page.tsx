"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";



export default function PageMain() {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard");
  });

  return (
    <html>
      <head>
        <title>Plant Discovery</title>
      </head>
      <body></body>
    </html>
  );
}
