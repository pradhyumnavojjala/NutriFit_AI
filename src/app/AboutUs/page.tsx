// src/app/DietInfo/page.tsx

"use client";

import { useUser } from "@clerk/nextjs";
import ProfileHeader from "@/Components/ProfileHeader";
import CornerElements from "@/Components/CornerElements";
import { Zap, AppleIcon, DumbbellIcon, Calculator, BookOpen, ChevronUp, Printer, Lightbulb, HelpCircle, ArrowUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { Button } from "@/Components/ui/button";
import { useState, useEffect } from "react";

// Expanded constants for demo (replace with real data from @/constants/StatcInfo)
const NutritionGuide = [
  // ... (your existing data, plus additions)
  {
    category: "Macronutrients",
    icon: AppleIcon,
    description: "Breakdown of carbs, proteins, and fats for balanced energy.",
    examples: ["Carbs: 45-65% of daily calories", "Proteins: 10-35%", "Fats: 20-35%"],
    key_tip: "Balance macros based on your goals—e.g., more protein for muscle building.",
  },
  // Add more as needed
];

const CalorieBasics = [
  // ... (your existing data, plus additions)
  {
    term: "Basal Metabolic Rate (BMR)",
    definition: "The calories your body needs at rest. Calculate using formulas like Harris-Benedict.",
  },
  // Add more
];

const EquipmentGuide = [
  // ... (your existing data, plus additions)
  {
    item: "Resistance Bands",
    purpose: "For strength training without weights.",
    notes: "Portable and versatile; start with light resistance.",
  },
  // Add more
];

const StaticInfoPage = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState("nutrition");
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Show scroll-to-top button
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <section className="relative z-10 pt-12 pb-32 flex-grow container mx-auto px-4 bg-gradient-to-br from-background via-muted/10 to-primary/5 min-h-screen">
      <ProfileHeader user={user} />
      
      <div className="relative backdrop-blur-sm border border-border rounded-xl p-8 space-y-10 shadow-2xl bg-card/95 animate-fadeIn">
        <CornerElements />

        {/* --- PAGE HEADER --- */}
        <div className="flex items-center justify-between border-b border-border/50 pb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full shadow-lg">
              <Zap className="size-8 text-primary animate-pulse" />
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Fitness Reference Library
              </h2>
              <p className="text-muted-foreground mt-1">Comprehensive guides, tips, and tools for your fitness journey</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => window.print()} className="flex items-center gap-2 hover:bg-primary/10 transition-colors">
            <Printer className="size-4" /> Print Guide
          </Button>
        </div>

        {/* --- QUICK SIDEBAR --- */}
        <div className="fixed right-4 top-1/2 transform -translate-y-1/2 bg-card/90 border border-border rounded-lg p-4 shadow-lg hidden lg:block animate-fadeIn delay-200">
          <h4 className="text-sm font-semibold mb-3 text-primary">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#nutrition" className="hover:text-primary transition-colors">Nutrition</a></li>
            <li><a href="#calories" className="hover:text-primary transition-colors">Calories</a></li>
            <li><a href="#equipment" className="hover:text-primary transition-colors">Equipment</a></li>
          </ul>
        </div>

        {/* --- TABS --- */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="flex w-fit mx-auto border border-border/50 rounded-lg p-1 bg-muted/50 shadow-sm">
            <TabsTrigger value="nutrition" className="flex items-center gap-2 px-6 py-3 transition-all hover:bg-primary/10 hover:scale-105">
              <AppleIcon className="size-4" /> Nutrition Guide
            </TabsTrigger>
            <TabsTrigger value="calories" className="flex items-center gap-2 px-6 py-3 transition-all hover:bg-primary/10 hover:scale-105">
              <Calculator className="size-4" /> Calorie Basics
            </TabsTrigger>
            <TabsTrigger value="equipment" className="flex items-center gap-2 px-6 py-3 transition-all hover:bg-primary/10 hover:scale-105">
              <DumbbellIcon className="size-4" /> Equipment Guide
            </TabsTrigger>
          </TabsList>

          {/* =======================
             NUTRITION TAB CONTENT 
             ======================= */}
          <TabsContent value="nutrition" className="space-y-8 pt-6 animate-fadeIn" id="nutrition">
            <div className="flex items-center gap-3">
              <BookOpen className="size-6 text-primary" />
              <h3 className="text-2xl font-bold text-primary border-b border-primary/30 pb-1">
                Core Nutritional Pillars
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {NutritionGuide.map((item, index) => (
                <div
                  key={index}
                  className="border border-border p-6 rounded-xl bg-background/50 shadow-md hover:shadow-xl hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:glow-primary"
                  title={`Learn more about ${item.category}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-green-500/10 rounded-full">
                      <item.icon className="size-5 text-green-500" />
                    </div>
                    <h4 className="text-lg font-mono font-semibold text-foreground">{item.category}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{item.description}</p>
                  <p className="text-xs font-mono text-primary/70 mb-2">Examples:</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground ml-4 mb-4 space-y-1">
                    {item.examples.map((ex, exIndex) => (
                      <li key={exIndex}>{ex}</li>
                    ))}
                  </ul>
                  <div className="text-xs font-bold text-yellow-500 border-t border-border/50 pt-3 flex items-center gap-2">
                    <Lightbulb className="size-3" /> Tip: {item.key_tip}
                  </div>
                </div>
              ))}
            </div>
            {/* Additional Section: Meal Planning */}
            <div className="mt-8 p-6 bg-primary/5 rounded-xl border border-primary/20">
              <h4 className="text-xl font-semibold mb-4 text-primary">Meal Planning Tips</h4>
              <p className="text-sm text-muted-foreground mb-4">Plan balanced meals to fuel your workouts. Aim for variety and portion control.</p>
              <details className="mb-4">
                <summary className="cursor-pointer text-sm font-medium hover:text-primary">Sample Meal Plan</summary>
                <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                  <li>Breakfast: Oatmeal with fruits and nuts</li>
                  <li>Lunch: Grilled chicken salad</li>
                  <li>Dinner: Quinoa with veggies</li>
                </ul>
              </details>
              <p className="text-xs text-primary/70">Did You Know? Tracking macros can improve energy levels by 20%!</p>
            </div>
          </TabsContent>

          {/* =======================
             CALORIE BASICS TAB CONTENT 
             ======================= */}
          <TabsContent value="calories" className="space-y-8 pt-6 animate-fadeIn" id="calories">
            <div className="flex items-center gap-3">
              <Calculator className="size-6 text-primary" />
              <h3 className="text-2xl font-bold text-primary border-b border-primary/30 pb-1">
                Calorie & Energy Fundamentals
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CalorieBasics.map((item, index) => (
                <div
                  key={index}
                  className="border border-border p-6 rounded-xl bg-background/50 shadow-md hover:shadow-xl hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:glow-primary"
                  title={`Definition of ${item.term}`}
                >
                  <h4 className="text-lg font-mono font-semibold mb-3 text-foreground">{item.term}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.definition}
                  </p>
                </div>
              ))}
            </div>
            {/* Additional Section: Calorie Calculator */}
            <div className="mt-8 p-6 bg-primary/5 rounded-xl border border-primary/20">
              <h4 className="text-xl font-semibold mb-4 text-primary">Quick Calorie Calculator</h4>
              <p className="text-sm text-muted-foreground mb-4">Estimate your daily needs. (Note: Consult a professional for accuracy.)</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input type="number" placeholder="Age" className="p-2 border rounded" />
                <input type="number" placeholder="Weight (kg)" className="p-2 border rounded" />
                <input type="number" placeholder="Height (cm)" className="p-2 border rounded" />
              </div>
              <Button className="mt-4 bg-primary hover:bg-primary/90">Calculate BMR</Button>
              <p className="text-xs text-primary/70 mt-2">Example: A 30-year-old, 70kg person needs ~1,800 calories at rest.</p>
            </div>
            {/* FAQs */}
            <details className="mt-6">
              <summary className="cursor-pointer text-lg font-medium hover:text-primary flex items-center gap-2">
                <HelpCircle className="size-4" /> FAQs
              </summary>
              <ul className="mt-4 space-y-2 text-sm">
                <li><strong>What is TDEE?</strong> Total Daily Energy Expenditure—calories burned in a day.</li>
                <li><strong>How to track calories?</strong> Use apps like MyFitnessPal.</li>
              </ul>
            </details>
          </TabsContent>

          {/* =======================
             EQUIPMENT TAB CONTENT 
             ======================= */}
          <TabsContent value="equipment" className="space-y-8 pt-6 animate-fadeIn" id="equipment">
            <div className="flex items-center gap-3">
              <DumbbellIcon className="size-6 text-primary" />
              <h3 className="text-2xl font-bold text-primary border-b border-primary/30 pb-1">
                Essential Home Workout Gear
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {EquipmentGuide.map((item, index) => (
                <div
                  key={index}
                  className="border border-border p-6 rounded-xl bg-background/50 shadow-md hover:shadow-xl hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:glow-primary"
                  title={`Details on ${item.item}`}
                >
                  <h4 className="text-lg font-mono font-semibold mb-3 text-foreground">{item.item}</h4>
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                    <strong>Purpose:</strong> {item.purpose}
                  </p>
                  <p className="text-xs font-mono text-primary/70 leading-relaxed">
                    <strong>Notes:</strong> {item.notes}
                  </p>
                </div>
              ))}
            </div>
            {/* Additional Section: Safety & Alternatives */}
            <div className="mt-8 p-6 bg-primary/5 rounded-xl border border-primary/20">
              <h4 className="text-xl font-semibold mb-4 text-primary">Safety Tips & Alternatives</h4>
              <p className="text-sm text-muted-foreground mb-4">Always warm up and use proper form to avoid injury.</p>
              <details className="mb-4">
                <summary className="cursor-pointer text-sm font-medium hover:text-primary">Bodyweight Alternatives</summary>
                <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                  <li>Push-ups instead of dumbbells</li>
                  <li>Squats for leg days</li>
                </ul>
              </details>
              <p className="text-xs text-primary/70">Did You Know? Home workouts can be as effective as gym sessions with consistency!</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Scroll-to-Top Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-primary hover:bg-primary/90 rounded-full p-3 shadow-lg animate-bounce"
          aria-label="Scroll to top"
        >
          <ArrowUp className="size-4" />
        </Button>
      )}

      {/* Footer */}
      <footer className="mt-12 text-center text-sm text-muted-foreground space-y-2">
        <p>Powered by CodeFlex AI | © 2023 All Rights Reserved</p>
        <div className="flex justify-center gap-4">
          <a href="#" className="hover:text-primary transition-colors">Privacy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms</a>
          <a href="#" className="hover:text-primary transition-colors">Contact</a>
        </div>
      </footer>
    </section>
  );
};

export default StaticInfoPage;