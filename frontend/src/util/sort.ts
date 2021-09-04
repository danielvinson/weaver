export type SortDirection = "Ascending" | "Descending";

export function sortData<T>(
  data: readonly T[],
  sortBy: keyof T,
  direction: SortDirection
) {
  return [...data].sort((a, b) => {
    const val1 = a[sortBy];
    const val2 = b[sortBy];
    if (typeof val1 === "number" && typeof val2 === "number") {
      return direction === "Descending" ? val1 - val2 : val2 - val1;
    } else {
      if (val1 > val2) {
        return 1;
      }

      if (val2 > val1) {
        return -1;
      }

      return 0;
    }
  });
}
