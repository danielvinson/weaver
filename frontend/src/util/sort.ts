export type SortDirection = "Ascending" | "Descending";

export function sortData<T>(
  data: readonly T[],
  sortBy: keyof T,
  direction: SortDirection
) {
  return [...data].sort((a, b) => {
    const val1 = a[sortBy];
    const val2 = b[sortBy];
    if (typeof val1 === "string" && typeof val2 === "string") {
      return direction === "Descending"
        ? val2.localeCompare(val1)
        : val1.localeCompare(val2);
    }

    if (typeof val1 === "number" && typeof val2 === "number") {
      return direction === "Descending" ? val2 - val1 : val1 - val2;
    }

    if (val1 > val2) {
      return 1;
    }

    if (val2 > val1) {
      return -1;
    }

    return 0;
  });
}
