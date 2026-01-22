import { useState } from "react";
import { ArrowRight, Link2, Loader2 } from "lucide-react";
import { useSaveRecipeFromUrl } from "@/hooks/use-recipes";
import { cn } from "@/lib/utils";

export function UrlInput() {
  const [url, setUrl] = useState("");
  const { mutate, isPending } = useSaveRecipeFromUrl();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    mutate(url);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
      
      <div className="relative flex items-center bg-white p-2 rounded-2xl shadow-xl shadow-orange-900/5 border border-white/50 ring-4 ring-transparent focus-within:ring-primary/10 transition-all duration-300">
        <div className="pl-4 text-muted-foreground">
          <Link2 className="w-5 h-5" />
        </div>
        
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste a recipe URL..."
          className="flex-1 px-4 py-3 bg-transparent border-none focus:outline-none text-foreground placeholder:text-muted-foreground font-medium"
          disabled={isPending}
        />

        <button
          type="submit"
          disabled={!url || isPending}
          className={cn(
            "px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300",
            !url || isPending
              ? "bg-muted text-muted-foreground cursor-not-allowed"
              : "bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 active:scale-95"
          )}
        >
          {isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="hidden sm:inline">Extracting...</span>
            </>
          ) : (
            <>
              <span className="hidden sm:inline">Save Recipe</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
      
      {/* Helper text */}
      <p className="text-center mt-4 text-sm text-muted-foreground/80 font-medium">
        Supports mostly any recipe site. Just paste & go.
      </p>
    </form>
  );
}
