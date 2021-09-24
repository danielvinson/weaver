/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Spacer } from "./Spacer";
import { colors, makeAlpha } from "../util/colorPalette";
import { common } from "../util/styles";
import { sortData } from "../util/sort";
import { useState } from "react";
import _ from "lodash";
import type { CSSProperties, ReactNode } from "react";
import type { SettingsGroupName } from "./MatchTable/MatchTableSettings";
import type { SortDirection } from "../util/sort";

const styles: Record<string, CSSProperties> = {
  table: {
    border: "1px solid rgba(255,255,255,0.1)",
    display: "grid",
  },
  tableHeader: {
    backgroundColor: colors.background,
    color: colors.white,
    cursor: "pointer",
    fontWeight: "bold",
    paddingBottom: "5px",
    paddingTop: "5px",
  },
  tableItem: {
    alignItems: "center",
    color: colors.white,

    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    padding: "2px",
  },
  tableRow: {
    ...common.row,
    alignItems: "center",
    justifyContent: "center",
  },
  tooltip: {
    background: colors.background,
    border: `1px solid ${makeAlpha(colors.gold, 0.2)}`,
    borderRadius: "4px",
    bottom: "2.5em",

    boxShadow: "2px 2px 1px rgba(0,0,0,0.4)",
    color: colors.white,
    fontFamily: "LatoBlack",
    fontSize: "0.7em",
    maxWidth: "400px",
    padding: "10px",
    position: "absolute",
    right: "-70px",
  },
};

interface Sorting<DataType> {
  readonly direction: SortDirection;
  readonly key: keyof DataType;
}

export interface TableHeader {
  readonly key: string;
  readonly name: string;
  readonly display: boolean;
  readonly width: string;
  readonly tooltip?: string;
  readonly order: number;
  readonly group?: SettingsGroupName;
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
  readonly renderCell: (
    key: keyof DataType,
    index: number,
    val: DataType[keyof DataType],
    item: DataType
  ) => ReactNode;
}) {
  const [activeTooltip, setActiveTooltip] = useState<string>();
  const [sortBy, setSortBy] = useState<Sorting<DataType>>(defaultSort);
  const sortedData = sortData<DataType>(data, sortBy.key, sortBy.direction);
  const filteredHeaders: TableHeader[] = headers.filter((h) => h.display);
  const sortedHeaders: TableHeader[] = _.sortBy<TableHeader>(filteredHeaders, [
    "order" as keyof typeof headers[number],
  ]);
  const headerWidths = sortedHeaders.flatMap((h) => h.width).join(" ");

  const handleTooltip = (activeKey: string | undefined) => {
    setActiveTooltip(activeKey);
  };

  // Filter
  const cells = sortedData.map((item) => {
    // Iterate through header so we have the correct key order
    return sortedHeaders.map<ReactNode>((h, index) => {
      const key = h.key as keyof DataType;
      const value = item[key];
      return renderCell(key, index, value, item);
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

  const shouldShowTooltip = (key: string) => {
    return (
      headers.find((h) => h.key === key)?.tooltip !== undefined &&
      activeTooltip === key
    );
  };

  return (
    <div
      style={{
        ...styles.table,
        gridTemplateColumns: headerWidths,
      }}
    >
      {/* Headers */}
      {sortedHeaders.map((header) => (
        <div
          key={header.key}
          style={{
            ...styles.tableItem,
            ...styles.tableHeader,
            position: "relative",
          }}
          onClick={() => {
            handleClickHeader(header.key);
          }}
          onMouseEnter={() => {
            handleTooltip(header.key);
          }}
          onMouseLeave={() => {
            handleTooltip(undefined);
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
          {shouldShowTooltip(header.key) && (
            <div style={styles.tooltip}>{header.tooltip}</div>
          )}
        </div>
      ))}

      {/* Data */}
      <div style={{ display: "contents" }}>{cells}</div>
    </div>
  );
}
