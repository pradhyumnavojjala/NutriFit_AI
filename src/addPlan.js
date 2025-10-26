// addPlan.js
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase-config";

export const addPlan = async () => {
  try {
    const docRef = await addDoc(collection(db, "plans"), {
      name: "My First Plan",
      userId: "test-user-id",
      isActive: true,
      createdAt: new Date(),
      dietPlan: {
        dailyCalories: 2000,
        meals: [
          { name: "Breakfast", foods: ["Eggs", "Oatmeal"] },
        ],
      },
      workoutPlan: {
        schedule: ["Mon", "Wed", "Fri"],
        exercises: [
          {
            day: "Mon",
            routines: [{ name: "Pushups", sets: 3, reps: 12 }],
          },
        ],
      },
    });

    console.log("Plan added with ID:", docRef.id);
  } catch (e) {
    console.error("Error adding plan:", e);
  }
};
