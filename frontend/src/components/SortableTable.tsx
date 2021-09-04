/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { AgentIcon } from "./AgentIcon";
import { MatchTableCell } from "./MatchTableCell";
import { PlayerName } from "./PlayerName";
import { RankIcon } from "./RankIcon";
import { Spacer } from "./Spacer";
import { colors } from "../util/colorPalette";
import { sortData } from "../util/sort";
import { useState } from "react";
import type { AgentId } from "./AgentIcon";
import type { CSSProperties , ReactNode} from "react";
import type { RankNumber } from "./RankIcon";
import type { SortDirection } from "../util/sort";

const styles: Record<string, CSSProperties> = {
  table: {
    border: "1px solid #222",
    borderTop: "3px solid #222",
    display: "grid",
  },
  tableHeader: {
    backgroundColor: colors.shadow,
    boxShadow: "0px 1px 1px rgba(255,255,255,0.2)",
    color: colors.white,
    cursor: "pointer",
    fontWeight: "bold",
  },
  tableItem: {
    alignItems: "center",
    borderLeft: "1px solid rgba(0,0,0,.1)",
    color: colors.white,

    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    padding: "4px",
  },
};

interface Sorting<DataType> {
  readonly direction: SortDirection;
  readonly key: keyof DataType;
}

interface TableHeader {
  readonly key: string;
  readonly name: string;
  readonly display: boolean;
  readonly width: string;
}

export function SortableTable<DataType>({
  data,
  defaultSort,
  headers,
  renderCell,
}: {
  readonly headers: TableHeader[];
  readonly data: readonly DataType[];
  readonly defaultSort: Sorting<DataType>;
  readonly renderCell: (key: keyof DataType, val: DataType[keyof DataType], item: DataType) => ReactNode;
}) {
  const [sortBy, setSortBy] = useState<Sorting<DataType>>(defaultSort);
  const sortedData = sortData<DataType>(data, sortBy.key, sortBy.direction);
  const filteredHeaders = headers.filter((h) => h.display);
  const headerWidths = filteredHeaders.flatMap((h) => h.width).join(" ");

  // Filter
  const cells = sortedData.map((item) => {
    // Iterate through header so we have the correct key order
    return filteredHeaders.map<ReactNode>((h) => {
      const key = h.key as keyof DataType;
      const value = item[key];
      return renderCell(key, value, item);
    });
  });

  const handleClickHeader = (key: string) => {
    setSortBy((prev) => {
      if (key === prev.key) {
        return {
          direction:
            prev.direction === "Ascending" ? "Descending" : "Ascending",
          key: key as keyof DataType,
        };
      }
      return { direction: "Ascending", key: key as keyof DataType };
    });
  };

  return (
    <div
      style={{
        ...styles.table,
        gridTemplateColumns: headerWidths,
      }}
    >
      {/* Headers */}
      {filteredHeaders.map((header) => (
        <div
          key={header.key}
          style={{
            ...styles.tableItem,
            ...styles.tableHeader,
          }}
          onClick={() => {
            handleClickHeader(header.key);
          }}
        >
          <div
            style={{
              alignItems: "center",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            <Spacer width="12px" />
            {header.name}
            {sortBy.key === header.key ? (
              sortBy.direction === "Ascending" ? (
                <div style={{ width: "12px" }}>&#9650;</div>
              ) : (
                <div style={{ width: "12px" }}>&#9660;</div>
              )
            ) : (
              <Spacer width="12px" />
            )}
          </div>
        </div>
      ))}

      {/* Data */}
      <div style={{ display: "contents" }}>{cells}</div>
    </div>
  );
}
