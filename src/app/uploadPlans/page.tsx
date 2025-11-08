"use client";
import { db } from "@/firebase-config";
import { collection, addDoc } from "firebase/firestore";

export default function UploadPlansPage() {
  const uploadPlans = async () => {
    const plans = [
      {
        name: "Full Body Beginner",
        days: [
          {
            day: "Day 1: Chest & Triceps",
            exercises: [
              { name: "Pushups", sets: 3, reps: 12, progress: 0 },
              { name: "Squats", sets: 3, reps: 15, progress: 0 },
              { name: "Plank", sets: 3, reps: 60, progress: 0 },
            ],
            diet: [
              { meal: "Breakfast", foods: ["Oatmeal with Banana", "Greek Yogurt"] },
              { meal: "Lunch", foods: ["Grilled Chicken Salad", "Brown Rice", "Broccoli"] },
              { meal: "Dinner", foods: ["Baked Salmon", "Quinoa", "Mixed Greens"] },
              { meal: "Snack", foods: ["Apple", "Almonds"] },
            ],
          },
        ],
      },
    ];

    for (const plan of plans) {
      await addDoc(collection(db, "fitnessPlans"), plan);
    }

    alert("✅ Plans uploaded successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-2xl font-bold mb-6">📦 Upload Predefined Plans</h1>
      <button
        onClick={uploadPlans}
        className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold"
      >
        Upload Plans to Firebase
      </button>
    </div>
  );
}
