import { Column, ColumnId } from "../types";

export const mockData: Record<ColumnId, Column> = {
  todo: {
    id: "todo",
    title: "Todo",
    cards: [
      { id: "card-1", title: "Design new landing page" },
      { id: "card-2", title: "Update documentation" },
      { id: "card-3", title: "Review pull requests" },
    ],
  },
  inProgress: {
    id: "inProgress",
    title: "In Progress",
    cards: [
      { id: "card-4", title: "Implement authentication" },
      { id: "card-5", title: "Fix responsive issues" },
    ],
  },
  done: {
    id: "done",
    title: "Done",
    cards: [
      { id: "card-6", title: "Setup project repository" },
      { id: "card-7", title: "Initial UI mockups" },
    ],
  },
};
