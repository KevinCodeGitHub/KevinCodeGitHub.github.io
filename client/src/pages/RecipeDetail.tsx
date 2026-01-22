import { useRoute } from "wouter";
import { useRecipe } from "@/hooks/use-recipes";
import { useAddShoppingItem } from "@/hooks/use-shopping-list";
import { Navigation } from "@/components/Navigation";
import { Loader2, ArrowLeft, Clock, Users, Plus, ListChecks } from "lucide-react";
import { Link } from "wouter";
import { ShoppingListSidebar } from "@/components/ShoppingListSidebar";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function RecipeDetail() {
  const [, params] = useRoute("/recipe/:id");
  const id = parseInt(params?.id || "0");
  const { data: recipe, isLoading, error } = useRecipe(id);
  const addItem = useAddShoppingItem();
  const { toast } = useToast();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
        <h1 className="text-2xl font-bold">Recipe not found</h1>
        <Link href="/" className="text-primary hover:underline">Go Home</Link>
      </div>
    );
  }

  const handleAddIngredient = (ingredient: string) => {
    addItem.mutate(
      { ingredient, isChecked: false },
      {
        onSuccess: () => {
          toast({
            title: "Added to list",
            description: ingredient,
            duration: 2000,
          });
        }
      }
    );
  };

  return (
    <div className="min-h-screen bg-background font-sans pb-20 md:pb-0">
      <div className="flex h-screen overflow-hidden">
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto scroll-smooth">
          
          {/* Header Image & Back Button */}
          <div className="relative h-[40vh] md:h-[50vh] w-full">
            <Link href="/" className="absolute top-6 left-6 z-20">
              <div className="p-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg hover:scale-110 transition-transform cursor-pointer group">
                <ArrowLeft className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
              </div>
            </Link>
            
            {recipe.imageUrl ? (
              <>
                <img 
                  src={recipe.imageUrl} 
                  alt={recipe.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/30" />
              </>
            ) : (
              <div className="w-full h-full bg-orange-100 flex items-center justify-center">
                <span className="text-6xl">🍳</span>
              </div>
            )}
            
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
              <div className="max-w-4xl mx-auto">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6 drop-shadow-sm"
                >
                  {recipe.title}
                </motion.h1>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex flex-wrap gap-4"
                >
                  {recipe.prepTime && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur rounded-full shadow-sm text-sm font-semibold">
                      <Clock className="w-4 h-4 text-orange-500" />
                      {recipe.prepTime}
                    </div>
                  )}
                  {recipe.servings && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur rounded-full shadow-sm text-sm font-semibold">
                      <Users className="w-4 h-4 text-orange-500" />
                      {recipe.servings}
                    </div>
                  )}
                  <a 
                    href={recipe.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-black/80 backdrop-blur rounded-full shadow-sm text-sm font-semibold text-white hover:bg-black transition-colors"
                  >
                    Original Source
                  </a>
                </motion.div>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-6 py-12 grid md:grid-cols-[1fr_1.5fr] gap-12">
            
            {/* Ingredients Column */}
            <div className="space-y-6">
              <div className="flex items-center justify-between sticky top-0 bg-background/95 backdrop-blur py-4 z-10 border-b border-border">
                <h2 className="text-2xl font-display font-bold">Ingredients</h2>
                <ListChecks className="w-5 h-5 text-muted-foreground" />
              </div>
              
              <ul className="space-y-3">
                {recipe.ingredients.map((ingredient, i) => (
                  <motion.li 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={i} 
                    className="group flex items-start gap-3 p-3 rounded-xl hover:bg-white hover:shadow-sm border border-transparent hover:border-border transition-all"
                  >
                    <button
                      onClick={() => handleAddIngredient(ingredient)}
                      className="mt-0.5 p-1 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                      title="Add to shopping list"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <span className="text-foreground/80 font-medium leading-relaxed">{ingredient}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Instructions Column */}
            <div className="space-y-6">
              <div className="sticky top-0 bg-background/95 backdrop-blur py-4 z-10 border-b border-border">
                <h2 className="text-2xl font-display font-bold">Instructions</h2>
              </div>
              
              <div className="space-y-8">
                {recipe.steps.map((step, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + (i * 0.05) }}
                    key={i} 
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 text-orange-600 font-bold flex items-center justify-center text-sm shadow-sm">
                      {i + 1}
                    </div>
                    <p className="text-lg text-foreground/80 leading-relaxed pt-0.5">
                      {step}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>

          <Navigation />
        </main>

        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-96 z-40 relative border-l border-border/50">
          <ShoppingListSidebar />
        </aside>
      </div>
    </div>
  );
}
