import { Link } from "wouter";
import { Clock, Users } from "lucide-react";
import { Recipe } from "@shared/schema";
import { motion } from "framer-motion";

interface RecipeCardProps {
  recipe: Recipe;
  index: number;
}

export function RecipeCard({ recipe, index }: RecipeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link href={`/recipe/${recipe.id}`} className="group block h-full">
        <article className="h-full bg-white rounded-2xl overflow-hidden border border-border/50 shadow-sm hover:shadow-xl hover:shadow-orange-900/5 hover:-translate-y-1 transition-all duration-300 flex flex-col">
          {/* Image Area */}
          <div className="aspect-[4/3] bg-muted relative overflow-hidden">
            {recipe.imageUrl ? (
              <img 
                src={recipe.imageUrl} 
                alt={recipe.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-orange-50 text-orange-200">
                <span className="text-4xl">🍳</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Content Area */}
          <div className="p-5 flex flex-col flex-grow">
            <h3 className="font-display text-lg font-bold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
              {recipe.title}
            </h3>
            
            <div className="mt-auto flex items-center gap-4 text-sm text-muted-foreground">
              {recipe.prepTime && (
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-orange-400" />
                  <span>{recipe.prepTime}</span>
                </div>
              )}
              {recipe.servings && (
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-orange-400" />
                  <span>{recipe.servings}</span>
                </div>
              )}
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
