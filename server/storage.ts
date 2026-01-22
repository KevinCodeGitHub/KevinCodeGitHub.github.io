
import { db } from "./db";
import {
  recipes, shoppingItems,
  type Recipe, type InsertRecipe,
  type ShoppingItem, type InsertShoppingItem
} from "@shared/schema";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // Recipes
  getRecipes(): Promise<Recipe[]>;
  getRecipe(id: number): Promise<Recipe | undefined>;
  createRecipe(recipe: InsertRecipe): Promise<Recipe>;

  // Shopping List
  getShoppingList(): Promise<ShoppingItem[]>;
  createShoppingItem(item: InsertShoppingItem): Promise<ShoppingItem>;
  updateShoppingItem(id: number, isChecked: boolean): Promise<ShoppingItem | undefined>;
  deleteShoppingItem(id: number): Promise<void>;
  clearCheckedItems(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getRecipes(): Promise<Recipe[]> {
    return await db.select().from(recipes).orderBy(desc(recipes.createdAt));
  }

  async getRecipe(id: number): Promise<Recipe | undefined> {
    const [recipe] = await db.select().from(recipes).where(eq(recipes.id, id));
    return recipe;
  }

  async createRecipe(recipe: InsertRecipe): Promise<Recipe> {
    const [newRecipe] = await db.insert(recipes).values(recipe).returning();
    return newRecipe;
  }

  async getShoppingList(): Promise<ShoppingItem[]> {
    return await db.select().from(shoppingItems).orderBy(shoppingItems.id);
  }

  async createShoppingItem(item: InsertShoppingItem): Promise<ShoppingItem> {
    const [newItem] = await db.insert(shoppingItems).values(item).returning();
    return newItem;
  }

  async updateShoppingItem(id: number, isChecked: boolean): Promise<ShoppingItem | undefined> {
    const [updated] = await db.update(shoppingItems)
      .set({ isChecked })
      .where(eq(shoppingItems.id, id))
      .returning();
    return updated;
  }

  async deleteShoppingItem(id: number): Promise<void> {
    await db.delete(shoppingItems).where(eq(shoppingItems.id, id));
  }

  async clearCheckedItems(): Promise<void> {
    await db.delete(shoppingItems).where(eq(shoppingItems.isChecked, true));
  }
}

export const storage = new DatabaseStorage();
