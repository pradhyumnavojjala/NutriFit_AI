"use client";
import { useEffect } from "react";
import { addPlan } from "../../addPlan"; // adjust the path if needed

export default function TestPage() {
  useEffect(() => {
    addPlan(); // this will run once when the page loads
  }, []);

  return <div>Adding plan to Firestore...</div>;
}
