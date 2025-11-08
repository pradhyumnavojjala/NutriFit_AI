import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase-config"; // make sure path is correct!

interface Plan {
  name: string;
  isActive: boolean;
  userId: string;
  workoutPlan: {
    schedule: string[];
    exercises: {
      day: string;
      routines: { name: string; sets: number; reps: number; description?: string }[];
    }[];
  };
  dietPlan: {
    dailyCalories: number;
    meals: { name: string; foods: string[] }[];
  };
}

export async function savePlanToFirestore(plan: Plan) {
  try {
    const planRef = doc(db, "plans", plan.userId + "_" + plan.name);
    await setDoc(planRef, plan);
    console.log("✅ Plan saved to Firestore successfully!");
  } catch (error) {
    console.error("❌ Error saving plan:", error);
  }
}
