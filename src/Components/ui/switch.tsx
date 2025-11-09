// ./src/Components/ui/switch.tsx

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

// 1. FIX: Changed the interface to a type alias (using 'type' instead of 'interface')
//    and included the className property for explicit clarity.
export type SwitchProps = React.ComponentPropsWithoutRef<
  typeof SwitchPrimitive.Root
> & {
  className?: string; // Add className explicitly since we destructure it
};

// 2. Use the new type alias in the component definition.
export const Switch = ({ className, ...props }: SwitchProps) => (
  <SwitchPrimitive.Root
    className={cn(
      "w-10 h-6 bg-gray-200 rounded-full relative data-[state=checked]:bg-blue-500",
      className
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb className="block w-4 h-4 bg-white rounded-full translate-x-1 transition-transform data-[state=checked]:translate-x-5" />
  </SwitchPrimitive.Root>
);