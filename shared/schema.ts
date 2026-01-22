
import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const recipes = pgTable("recipes", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  title: text("title").notNull(),
  imageUrl: text("image_url"),
  servings: text("servings"),
  prepTime: text("prep_time"),
  description: text("description"),
  ingredients: jsonb("ingredients").$type<string[]>().notNull(),
  steps: jsonb("steps").$type<string[]>().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const shoppingItems = pgTable("shopping_items", {
  id: serial("id").primaryKey(),
  ingredient: text("ingredient").notNull(),
  isChecked: boolean("is_checked").default(false).notNull(),
});

export const insertRecipeSchema = createInsertSchema(recipes).omit({ id: true, createdAt: true });
export const insertShoppingItemSchema = createInsertSchema(shoppingItems).omit({ id: true });

export type Recipe = typeof recipes.$inferSelect;
export type InsertRecipe = z.infer<typeof insertRecipeSchema>;

export type ShoppingItem = typeof shoppingItems.$inferSelect;
export type InsertShoppingItem = z.infer<typeof insertShoppingItemSchema>;
