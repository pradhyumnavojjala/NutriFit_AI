import { db } from "@/firebase-config";
import { doc, setDoc } from "firebase/firestore";
import { fitnessPlans } from "./fitnessPlans";

export const uploadRandomPlan = async (userId: string) => {
  try {
    // pick a random plan
    const randomIndex = Math.floor(Math.random() * fitnessPlans.length);
    const randomPlan = fitnessPlans[randomIndex];

    // save to Firestore under the user
    const userPlanRef = doc(db, "userPlans", userId);
    await setDoc(userPlanRef, {
      plan: randomPlan,
      assignedAt: new Date().toISOString(),
    });

    console.log("✅ Random plan uploaded to Firebase!");
  } catch (error) {
    console.error("❌ Error uploading plan:", error);
  }
};
