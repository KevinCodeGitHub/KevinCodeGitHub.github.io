import { useState } from "react";
import { Plus, Trash2, CheckCircle2, Circle, Loader2 } from "lucide-react";
import { useShoppingList, useAddShoppingItem, useToggleShoppingItem, useDeleteShoppingItem, useClearCheckedItems } from "@/hooks/use-shopping-list";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function ShoppingListSidebar() {
  const { data: items, isLoading } = useShoppingList();
  const addItem = useAddShoppingItem();
  const toggleItem = useToggleShoppingItem();
  const deleteItem = useDeleteShoppingItem();
  const clearChecked = useClearCheckedItems();

  const [newItemText, setNewItemText] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemText.trim()) return;
    addItem.mutate({ ingredient: newItemText.trim(), isChecked: false });
    setNewItemText("");
  };

  const sortedItems = items?.slice().sort((a, b) => {
    if (a.isChecked === b.isChecked) return 0;
    return a.isChecked ? 1 : -1;
  });

  return (
    <div className="h-full flex flex-col bg-white border-l border-border/60 shadow-xl shadow-orange-900/5">
      <div className="p-6 border-b border-border/40 bg-gradient-to-b from-orange-50/50 to-transparent">
        <h2 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
          <span className="text-2xl">🛒</span> Shopping List
        </h2>
        
        <form onSubmit={handleAdd} className="relative">
          <input
            type="text"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            placeholder="Add item..."
            className="w-full pl-4 pr-10 py-2.5 rounded-xl bg-background border border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/10 outline-none transition-all"
          />
          <button 
            type="submit"
            disabled={!newItemText.trim() || addItem.isPending}
            className="absolute right-1.5 top-1.5 p-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:bg-muted disabled:text-muted-foreground transition-all"
          >
            {addItem.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
          </button>
        </form>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {isLoading ? (
          <div className="flex justify-center p-8 text-muted-foreground">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : !items?.length ? (
          <div className="flex flex-col items-center justify-center h-48 text-muted-foreground text-center px-4">
            <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center mb-3">
              <CheckCircle2 className="w-6 h-6 text-orange-200" />
            </div>
            <p className="text-sm font-medium">Your list is empty</p>
            <p className="text-xs text-muted-foreground/60 mt-1">Add items from recipes or type them above</p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {sortedItems?.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={cn(
                  "group flex items-center gap-3 p-3 rounded-xl border transition-all duration-200",
                  item.isChecked 
                    ? "bg-muted/30 border-transparent opacity-60" 
                    : "bg-white border-border hover:border-primary/30 hover:shadow-sm"
                )}
              >
                <button
                  onClick={() => toggleItem.mutate({ id: item.id, isChecked: !item.isChecked })}
                  className={cn(
                    "flex-shrink-0 transition-colors",
                    item.isChecked ? "text-primary" : "text-muted-foreground hover:text-primary"
                  )}
                >
                  {item.isChecked ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                </button>
                
                <span className={cn(
                  "flex-1 text-sm font-medium transition-all",
                  item.isChecked && "line-through text-muted-foreground"
                )}>
                  {item.ingredient}
                </span>

                <button
                  onClick={() => deleteItem.mutate(item.id)}
                  className="opacity-0 group-hover:opacity-100 p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {items && items.length > 0 && items.some(i => i.isChecked) && (
        <div className="p-4 border-t border-border bg-background">
          <button
            onClick={() => clearChecked.mutate()}
            disabled={clearChecked.isPending}
            className="w-full py-2.5 text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-all flex items-center justify-center gap-2"
          >
            {clearChecked.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
            Clear Checked Items
          </button>
        </div>
      )}
    </div>
  );
}
