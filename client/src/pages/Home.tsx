import { useRecipes } from "@/hooks/use-recipes";
import { Navigation } from "@/components/Navigation";
import { UrlInput } from "@/components/UrlInput";
import { RecipeCard } from "@/components/RecipeCard";
import { ShoppingListSidebar } from "@/components/ShoppingListSidebar";
import { Loader2, ChefHat } from "lucide-react";

export default function Home() {
  const { data: recipes, isLoading } = useRecipes();

  return (
    <div className="min-h-screen bg-background font-sans pb-20 md:pb-0">
      <div className="flex h-screen overflow-hidden">
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto relative scroll-smooth">
          
          {/* Hero Section */}
          <div className="relative pt-24 pb-32 px-6">
            <div className="absolute inset-0 z-0 opacity-50 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-100 via-background to-background" />
            
            <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-orange-100 text-orange-600 font-semibold text-sm animate-fade-in-up">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                AI-Powered Recipe Extraction
              </div>
              
              <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight text-foreground">
                Save recipes, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                  ditch the clutter.
                </span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Paste any recipe URL below. We'll extract the ingredients and steps, remove the ads and life stories, and save it for you.
              </p>

              <div className="pt-4">
                <UrlInput />
              </div>
            </div>
          </div>

          {/* Recipe Grid */}
          <div className="max-w-7xl mx-auto px-6 pb-20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-display font-bold flex items-center gap-2">
                <ChefHat className="w-6 h-6 text-orange-500" />
                My Collection
              </h2>
              <div className="text-sm text-muted-foreground font-medium">
                {recipes?.length || 0} recipes saved
              </div>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
              </div>
            ) : !recipes?.length ? (
              <div className="text-center py-20 border-2 border-dashed border-border rounded-3xl bg-white/50">
                <div className="text-4xl mb-4">📖</div>
                <h3 className="text-xl font-bold mb-2">No recipes yet</h3>
                <p className="text-muted-foreground max-w-sm mx-auto">
                  Paste a URL above to get started building your personal cookbook.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {recipes.map((recipe, i) => (
                  <RecipeCard key={recipe.id} recipe={recipe} index={i} />
                ))}
              </div>
            )}
          </div>
          
          <Navigation />
        </main>

        {/* Desktop Sidebar (Shopping List) */}
        <aside className="hidden lg:block w-96 z-40 relative">
          <ShoppingListSidebar />
        </aside>

      </div>
    </div>
  );
}
