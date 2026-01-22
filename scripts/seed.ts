
import { storage } from "../server/storage";
import { db } from "../server/db";

async function seed() {
  console.log("Seeding database...");

  // Check if recipes exist
  const existingRecipes = await storage.getRecipes();
  if (existingRecipes.length === 0) {
    console.log("Creating sample recipes...");
    
    await storage.createRecipe({
      url: "https://example.com/creamy-garlic-chicken",
      title: "Creamy Garlic Chicken",
      imageUrl: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=2613&auto=format&fit=crop",
      servings: "4 servings",
      prepTime: "30 mins",
      description: "Tender chicken breasts in a rich garlic cream sauce.",
      ingredients: [
        "4 boneless chicken breasts",
        "1 cup heavy cream",
        "1/2 cup chicken broth",
        "4 garlic cloves, minced",
        "1 tbsp olive oil",
        "Salt and pepper to taste"
      ],
      steps: [
        "Season chicken with salt and pepper.",
        "Cook chicken in a skillet with olive oil until golden brown.",
        "Remove chicken and sauté garlic in the same pan.",
        "Add broth and cream, simmer until thickened.",
        "Return chicken to pan and coat with sauce."
      ]
    });

    await storage.createRecipe({
      url: "https://example.com/spaghetti-carbonara",
      title: "Spaghetti Carbonara",
      imageUrl: "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=2671&auto=format&fit=crop",
      servings: "2 servings",
      prepTime: "20 mins",
      description: "Classic Italian pasta with eggs, cheese, and bacon.",
      ingredients: [
        "200g spaghetti",
        "100g pancetta or bacon",
        "2 large eggs",
        "50g Pecorino Romano cheese",
        "Black pepper"
      ],
      steps: [
        "Boil pasta in salted water.",
        "Fry pancetta until crisp.",
        "Whisk eggs and cheese in a bowl with pepper.",
        "Drain pasta and toss with pancetta fat.",
        "Mix in egg mixture quickly off heat to create creamy sauce."
      ]
    });
  }

  // Check if shopping list exists
  const existingItems = await storage.getShoppingList();
  if (existingItems.length === 0) {
    console.log("Creating sample shopping items...");
    await storage.createShoppingItem({ ingredient: "Milk", isChecked: false });
    await storage.createShoppingItem({ ingredient: "Eggs (1 dozen)", isChecked: true });
    await storage.createShoppingItem({ ingredient: "Bread", isChecked: false });
  }

  console.log("Seeding complete!");
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
