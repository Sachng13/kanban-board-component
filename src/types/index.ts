export interface Card {
  id: string;
  title: string;
}

export interface Column {
  id: string;
  title: string;
  cards: Card[];
}

export type ColumnId = "todo" | "inProgress" | "done";
