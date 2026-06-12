import { cn } from "../../lib/cn";

interface Props {
  category: string;
  size?: "sm" | "md" | "lg";
}

const CATEGORY_VISUALS: Record<
  string,
  {
    emoji: string;
    className: string;
  }
> = {
  Daging: {
    emoji: "🍗",
    className: "bg-red-50 text-red-600",
  },
  Seafood: {
    emoji: "🐟",
    className: "bg-cyan-50 text-cyan-600",
  },
  Snack: {
    emoji: "🥟",
    className: "bg-amber-50 text-amber-600",
  },
  Sayuran: {
    emoji: "🥔",
    className: "bg-emerald-50 text-emerald-600",
  },
  Minuman: {
    emoji: "🍦",
    className: "bg-blue-50 text-blue-600",
  },
};

export default function ProductVisual({
  category,
  size = "md",
}: Props) {
  const visual =
    CATEGORY_VISUALS[category] ?? {
      emoji: "❄️",
      className: "bg-blue-50 text-blue-700",
    };

  return (
    <div
      className={cn(
        "rounded-xl flex items-center justify-center leading-none shadow-sm shadow-blue-900/5",
        visual.className,
        size === "sm" && "w-9 h-9 text-lg",
        size === "md" && "w-10 h-10 text-xl",
        size === "lg" && "w-20 h-20 text-5xl"
      )}
      aria-label={`Visual kategori ${category}`}
    >
      <span>{visual.emoji}</span>
    </div>
  );
}
