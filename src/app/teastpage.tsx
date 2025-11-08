"use client";
import React, { useEffect } from "react";

const TestPage = () => {
  useEffect(() => {
    addPlan();
  }, []);

  return <h1>Adding plan to Firebase...</h1>;
};

export default TestPage;
function addPlan() {
  throw new Error("Function not implemented.");
}

