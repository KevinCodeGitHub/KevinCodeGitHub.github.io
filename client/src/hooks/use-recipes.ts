import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

export function useRecipes() {
  return useQuery({
    queryKey: [api.recipes.list.path],
    queryFn: async () => {
      const res = await fetch(api.recipes.list.path);
      if (!res.ok) throw new Error("Failed to fetch recipes");
      return api.recipes.list.responses[200].parse(await res.json());
    },
  });
}

export function useRecipe(id: number) {
  return useQuery({
    queryKey: [api.recipes.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.recipes.get.path, { id });
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch recipe");
      return api.recipes.get.responses[200].parse(await res.json());
    },
    enabled: !isNaN(id),
  });
}

export function useSaveRecipeFromUrl() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  return useMutation({
    mutationFn: async (url: string) => {
      // 1. Parse the URL
      const parseRes = await fetch(api.recipes.parse.path, {
        method: api.recipes.parse.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!parseRes.ok) {
        const error = await parseRes.json();
        throw new Error(error.message || "Failed to parse recipe");
      }
      
      const parsedData = api.recipes.parse.responses[200].parse(await parseRes.json());

      // 2. Create the recipe
      const createRes = await fetch(api.recipes.create.path, {
        method: api.recipes.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedData),
      });

      if (!createRes.ok) {
        throw new Error("Failed to save extracted recipe");
      }

      return api.recipes.create.responses[201].parse(await createRes.json());
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [api.recipes.list.path] });
      toast({
        title: "Recipe Saved!",
        description: `Successfully saved "${data.title}"`,
      });
      setLocation(`/recipe/${data.id}`);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    },
  });
}
