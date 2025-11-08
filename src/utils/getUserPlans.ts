import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase-config";

export async function getUserPlans(userId: string) {
  const q = query(collection(db, "plans"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}
