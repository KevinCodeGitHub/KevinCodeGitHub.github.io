import { ShoppingListSidebar } from "@/components/ShoppingListSidebar";
import { Navigation } from "@/components/Navigation";

export default function ShoppingList() {
  return (
    <div className="min-h-screen bg-background font-sans flex flex-col">
      <div className="flex-1 flex flex-col md:max-w-2xl md:mx-auto md:w-full md:pt-12 md:pb-24">
        <div className="flex-1 border-x border-border/50 bg-white shadow-2xl shadow-orange-900/5 md:rounded-3xl overflow-hidden">
          <ShoppingListSidebar />
        </div>
      </div>
      <Navigation />
    </div>
  );
}
