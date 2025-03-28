// src/hooks/usePieces.ts
import { useQuery } from "@tanstack/react-query";
import { db } from "~/lib/db";
import { pieces } from "~/lib/db/schema";

export function usePieces() {
  return useQuery({
    queryKey: ["pieces"],
    queryFn: async () => {
      const result = await db.select().from(pieces);
      return result;
    },
  });
}
