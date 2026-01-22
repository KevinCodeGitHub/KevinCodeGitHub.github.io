import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, type InsertShoppingItem } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useShoppingList() {
  return useQuery({
    queryKey: [api.shoppingList.list.path],
    queryFn: async () => {
      const res = await fetch(api.shoppingList.list.path);
      if (!res.ok) throw new Error("Failed to fetch shopping list");
      return api.shoppingList.list.responses[200].parse(await res.json());
    },
  });
}

export function useAddShoppingItem() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (item: InsertShoppingItem) => {
      const res = await fetch(api.shoppingList.create.path, {
        method: api.shoppingList.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      if (!res.ok) throw new Error("Failed to add item");
      return api.shoppingList.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.shoppingList.list.path] });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to add item to shopping list", variant: "destructive" });
    },
  });
}

export function useToggleShoppingItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, isChecked }: { id: number; isChecked: boolean }) => {
      const url = buildUrl(api.shoppingList.update.path, { id });
      const res = await fetch(url, {
        method: api.shoppingList.update.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isChecked }),
      });
      if (!res.ok) throw new Error("Failed to update item");
      return api.shoppingList.update.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      // Optimistic update could be added here, but simple invalidation is safer for MVP
      queryClient.invalidateQueries({ queryKey: [api.shoppingList.list.path] });
    },
  });
}

export function useDeleteShoppingItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const url = buildUrl(api.shoppingList.delete.path, { id });
      const res = await fetch(url, { method: api.shoppingList.delete.method });
      if (!res.ok) throw new Error("Failed to delete item");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.shoppingList.list.path] });
    },
  });
}

export function useClearCheckedItems() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async () => {
      const res = await fetch(api.shoppingList.clearChecked.path, {
        method: api.shoppingList.clearChecked.method,
      });
      if (!res.ok) throw new Error("Failed to clear items");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.shoppingList.list.path] });
      toast({ title: "List Cleared", description: "Removed all checked items." });
    },
  });
}
