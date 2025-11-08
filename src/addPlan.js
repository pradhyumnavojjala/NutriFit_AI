"use client";
import { auth, db } from "@/firebase-config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";

export default function GeneratePlanPage() {
  const [loading, setLoading] = useState(false);

  const handleGeneratePlan = async () => {
    setLoading(true);

    const user = auth.currentUser;
    if (!user) {
      alert("You need to be logged in!");
      setLoading(false);
      return;
    }

    const newPlan = {
      userId: user.uid,
      name: "My Custom Fitness Plan",
      workoutPlan: {
        schedule: ["Monday", "Wednesday", "Friday"],
        exercises: [
          {
            day: "Monday",
            routines: [
              { name: "Push-ups", sets: 3, reps: 15 },
              { name: "Squats", sets: 3, reps: 20 },
            ],
          },
        ],
      },
      dietPlan: {
        dailyCalories: 2200,
        meals: [
          { name: "Breakfast", foods: ["Oats", "Banana", "Milk"] },
          { name: "Lunch", foods: ["Rice", "Chicken", "Vegetables"] },
        ],
      },
      isActive: true,
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "plans"), newPlan);
      alert("Plan saved successfully!");
    } catch (error) {
      console.error("Error saving plan:", error);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <button
        onClick={handleGeneratePlan}
        className="bg-primary text-white px-6 py-3 rounded hover:bg-primary/90"
        disabled={loading}
      >
        {loading ? "Saving..." : "Generate & Save Plan"}
      </button>
    </div>
  );
}
