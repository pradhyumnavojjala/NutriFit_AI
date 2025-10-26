import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

export const Switch = ({ className, ...props }: any) => (
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
