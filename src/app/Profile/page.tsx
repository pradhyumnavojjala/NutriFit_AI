"use client";

import { useUser } from "@clerk/nextjs";
import { useState, useEffect, useMemo } from "react";
import { PieChart, Pie, Cell } from "recharts"; // Pie chart
import { Dumbbell, Utensils, Edit } from "lucide-react"; // Icons
import { ClipLoader } from "react-spinners"; // Loading spinner
import ProfileHeader from "@/Components/ProfileHeader";
import CornerElements from "@/Components/CornerElements";
import NoFitnessPlan from "@/Components/NoFitnessPlan";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/Components/ui/accordion";

// Types
interface Exercise {
  name: string;
  sets: number;
  reps: number;
  progress: number;
}

interface Meal {
  meal: string;
  foods: string[];
}

interface Day {
  day: string;
  exercises: Exercise[];
  diet: Meal[];
}

interface FitnessPlan {
  name: string;
  days: Day[];
}

interface UserDetails {
  dob: string;
  email: string;
  height: string;
  weight: string;
  nickname: string;
  exerciseLevel: string;
}

// Custom hook: fetch or generate fitness plan
const useFitnessPlan = () => {
  const [currentPlan, setCurrentPlan] = useState<FitnessPlan | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const plans: FitnessPlan[] = [
        {
          name: "Full Body Beginner",
          days: [
            {
              day: "Day 1",
              exercises: [
                { name: "Pushups", sets: 3, reps: 12, progress: 0 },
                { name: "Squats", sets: 3, reps: 15, progress: 0 },
                { name: "Plank", sets: 3, reps: 60, progress: 0 },
              ],
              diet: [
                { meal: "Breakfast", foods: ["Oatmeal", "Banana"] },
                { meal: "Lunch", foods: ["Grilled Chicken", "Rice", "Broccoli"] },
                { meal: "Dinner", foods: ["Salad", "Salmon"] },
              ],
            },
            {
              day: "Day 2",
              exercises: [
                { name: "Lunges", sets: 3, reps: 12, progress: 0 },
                { name: "Pullups", sets: 3, reps: 8, progress: 0 },
                { name: "Burpees", sets: 3, reps: 10, progress: 0 },
              ],
              diet: [
                { meal: "Breakfast", foods: ["Smoothie", "Toast"] },
                { meal: "Lunch", foods: ["Quinoa", "Veggies"] },
                { meal: "Dinner", foods: ["Soup", "Salad"] },
              ],
            },
            {
              day: "Day 3",
              exercises: [
                { name: "Dumbbell Rows", sets: 3, reps: 12, progress: 0 },
                { name: "Deadlifts", sets: 3, reps: 10, progress: 0 },
                { name: "Mountain Climbers", sets: 3, reps: 20, progress: 0 },
              ],
              diet: [
                { meal: "Breakfast", foods: ["Eggs", "Avocado Toast"] },
                { meal: "Lunch", foods: ["Chicken Salad"] },
                { meal: "Dinner", foods: ["Grilled Fish", "Veggies"] },
              ],
            },
            {
              day: "Day 4",
              exercises: [
                { name: "Shoulder Press", sets: 3, reps: 12, progress: 0 },
                { name: "Bicep Curls", sets: 3, reps: 12, progress: 0 },
                { name: "Tricep Dips", sets: 3, reps: 10, progress: 0 },
              ],
              diet: [
                { meal: "Breakfast", foods: ["Yogurt", "Granola"] },
                { meal: "Lunch", foods: ["Turkey Sandwich", "Salad"] },
                { meal: "Dinner", foods: ["Steamed Veggies", "Chicken"] },
              ],
            },
            {
              day: "Day 5",
              exercises: [
                { name: "Leg Press", sets: 3, reps: 15, progress: 0 },
                { name: "Calf Raises", sets: 3, reps: 20, progress: 0 },
                { name: "Jump Squats", sets: 3, reps: 12, progress: 0 },
              ],
              diet: [
                { meal: "Breakfast", foods: ["Pancakes", "Fruits"] },
                { meal: "Lunch", foods: ["Salmon", "Brown Rice"] },
                { meal: "Dinner", foods: ["Vegetable Soup", "Bread"] },
              ],
            },
            {
              day: "Day 6",
              exercises: [
                { name: "Crunches", sets: 3, reps: 20, progress: 0 },
                { name: "Leg Raises", sets: 3, reps: 15, progress: 0 },
                { name: "Russian Twists", sets: 3, reps: 20, progress: 0 },
              ],
              diet: [
                { meal: "Breakfast", foods: ["Smoothie Bowl"] },
                { meal: "Lunch", foods: ["Chicken Wrap"] },
                { meal: "Dinner", foods: ["Grilled Veggies", "Tofu"] },
              ],
            },
            {
              day: "Day 7",
              exercises: [
                { name: "Yoga / Stretching", sets: 1, reps: 30, progress: 0 },
                { name: "Walking / Cardio", sets: 1, reps: 30, progress: 0 },
              ],
              diet: [
                { meal: "Breakfast", foods: ["Fruit Salad"] },
                { meal: "Lunch", foods: ["Vegetable Stir Fry"] },
                { meal: "Dinner", foods: ["Light Soup"] },
              ],
            },
          ],
        },
        {
          name: "Strength Builder",
          days: [
            {
              day: "Day 1",
              exercises: [
                { name: "Bench Press", sets: 4, reps: 10, progress: 0 },
                { name: "Incline Dumbbell Press", sets: 3, reps: 12, progress: 0 },
              ],
              diet: [
                { meal: "Breakfast", foods: ["Oats", "Protein Shake"] },
                { meal: "Lunch", foods: ["Grilled Chicken", "Sweet Potato"] },
                { meal: "Dinner", foods: ["Salad", "Steak"] },
              ],
            },
            // Repeat same structure for Days 2–7 with different exercises/meals...
          ],
        },
        // Add 8 more plans similarly with 7 days each
      ];

      const randomIndex = Math.floor(Math.random() * plans.length);
      setCurrentPlan(plans[randomIndex]);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return { currentPlan, isLoading };
};

const ProfilePage = () => {
  const { user } = useUser();
  const { currentPlan, isLoading } = useFitnessPlan();
  const [isEditing, setIsEditing] = useState(false);
  const [editableDetails, setEditableDetails] = useState<UserDetails>({
    dob: "2006-12-30",
    email: user?.emailAddresses?.[0]?.emailAddress || "N/A",
    height: "170 cm",
    weight: "60 kg",
    nickname: user?.firstName || "User",
    exerciseLevel: "Beginner",
  });

  const age = useMemo(() => {
    const birthDate = new Date(editableDetails.dob);
    const ageDifMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }, [editableDetails.dob]);

  const overallProgress = useMemo(() => {
    if (!currentPlan) return 0;
    const totalExercises = currentPlan.days.flatMap(day => day.exercises).length;
    const totalProgress = currentPlan.days.flatMap(day => day.exercises).reduce((sum, ex) => sum + ex.progress, 0);
    return totalExercises > 0 ? Math.round(totalProgress / totalExercises) : 0;
  }, [currentPlan]);

  const pieData = [
    { name: "Completed", value: overallProgress, color: "#3b82f6" },
    { name: "Remaining", value: 100 - overallProgress, color: "#e5e7eb" },
  ];

  const handleSaveDetails = () => setIsEditing(false);

  return (
    <section className="relative z-10 pt-12 pb-32 flex-grow container mx-auto px-4">
      <ProfileHeader user={user} />

      {/* User Details */}
      <div className="relative backdrop-blur-sm border border-border rounded-lg p-6 mt-6 transition-all duration-300 hover:shadow-lg">
        <CornerElements />
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">User Details</h3>
          <button onClick={() => setIsEditing(!isEditing)} className="text-blue-500 hover:text-blue-700 transition-colors">
            <Edit size={20} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div><strong>Full Name:</strong> {user ? `${user.firstName} ${user.lastName || ""}`.trim() : "Guest"}</div>
          <div>
            <strong>Nickname:</strong>{" "}
            {isEditing ? <input value={editableDetails.nickname} onChange={e => setEditableDetails({ ...editableDetails, nickname: e.target.value })} className="border rounded px-2 py-1 w-full"/> : editableDetails.nickname}
          </div>
          <div><strong>Email:</strong> {editableDetails.email}</div>
          <div>
            <strong>Date of Birth:</strong>{" "}
            {isEditing ? <input type="date" value={editableDetails.dob} onChange={e => setEditableDetails({ ...editableDetails, dob: e.target.value })} className="border rounded px-2 py-1 w-full"/> : editableDetails.dob}
          </div>
          <div><strong>Age:</strong> {age}</div>
          <div>
            <strong>Height:</strong>{" "}
            {isEditing ? <input value={editableDetails.height} onChange={e => setEditableDetails({ ...editableDetails, height: e.target.value })} className="border rounded px-2 py-1 w-full"/> : editableDetails.height}
          </div>
          <div>
            <strong>Weight:</strong>{" "}
            {isEditing ? <input value={editableDetails.weight} onChange={e => setEditableDetails({ ...editableDetails, weight: e.target.value })} className="border rounded px-2 py-1 w-full"/> : editableDetails.weight}
          </div>
          <div>
            <strong>Exercise Level:</strong>{" "}
            {isEditing ? (
              <select value={editableDetails.exerciseLevel} onChange={e => setEditableDetails({ ...editableDetails, exerciseLevel: e.target.value })} className="border rounded px-2 py-1 w-full">
                <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
              </select>
            ) : editableDetails.exerciseLevel}
          </div>
        </div>
        {isEditing && <button onClick={handleSaveDetails} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">Save Changes</button>}
      </div>

      {/* Fitness Plan */}
      {isLoading ? (
        <div className="flex justify-center mt-8"><ClipLoader size={50} color="#3b82f6" /></div>
      ) : currentPlan ? (
        <div className="relative backdrop-blur-sm border border-border rounded-lg p-6 mt-8 transition-all duration-300 hover:shadow-lg">
          <CornerElements />
          <h3 className="text-lg font-bold mb-4">{currentPlan.name}</h3>
          <div className="flex justify-center mb-6">
            <PieChart width={128} height={208}>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} dataKey="value">
                {pieData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
              </Pie>
            </PieChart>
            <div className="absolute text-sm font-semibold">{overallProgress}%</div>
          </div>
          <Accordion type="single" collapsible className="space-y-2">
            {currentPlan.days.map((day, i) => (
              <AccordionItem key={i} value={`day-${i}`}>
                <AccordionTrigger className="flex items-center gap-2"><Dumbbell size={16} /> {day.day}</AccordionTrigger>
                <AccordionContent>
                  <Accordion type="single" collapsible className="space-y-2 mt-2">
                    {day.exercises.map((ex, ei) => (
                      <AccordionItem key={ei} value={`ex-${ei}`}>
                        <AccordionTrigger>{ex.name} - {ex.sets}x{ex.reps}</AccordionTrigger>
                        <AccordionContent>
                          <div className="mb-2">
                            <div className="flex justify-between text-sm mb-1"><span>Progress</span><span>{ex.progress}%</span></div>
                            <div className="w-full h-2 bg-gray-200 rounded-full">
                              <div className="h-2 bg-blue-500 rounded-full transition-all duration-300" style={{ width: `${ex.progress}%` }} />
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                  <Accordion type="single" collapsible className="space-y-2 mt-3">
                    {day.diet.map((d, di) => (
                      <AccordionItem key={di} value={`diet-${di}`}>
                        <AccordionTrigger className="flex items-center gap-2"><Utensils size={16} /> {d.meal}</AccordionTrigger>
                        <AccordionContent>
                          <div className="text-sm">{d.foods.join(", ")}</div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ) : <NoFitnessPlan />}
    </section>
  );
};

export default ProfilePage;
