import React, { useState } from "react";
import { Column, ColumnId } from "../types";
import { mockData } from "../utils/mockData";
import KanbanColumn from "./KanbanColumn";

const KanbanBoard: React.FC = () => {
  const [columns, setColumns] = useState<Record<ColumnId, Column>>(mockData);
  const [draggedCard, setDraggedCard] = useState<{
    cardId: string;
    sourceColumnId: ColumnId;
  } | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<ColumnId | null>(null);

  const addCard = (columnId: ColumnId) => {
    const newCard = {
      id: `card-${Date.now()}`,
      title: "New task",
    };

    setColumns((prev) => ({
      ...prev,
      [columnId]: {
        ...prev[columnId],
        cards: [...prev[columnId].cards, newCard],
      },
    }));
  };

  const deleteCard = (columnId: ColumnId, cardId: string) => {
    setColumns((prev) => ({
      ...prev,
      [columnId]: {
        ...prev[columnId],
        cards: prev[columnId].cards.filter((card) => card.id !== cardId),
      },
    }));
  };

  const editCard = (columnId: ColumnId, cardId: string, newTitle: string) => {
    setColumns((prev) => ({
      ...prev,
      [columnId]: {
        ...prev[columnId],
        cards: prev[columnId].cards.map((card) =>
          card.id === cardId ? { ...card, title: newTitle } : card
        ),
      },
    }));
  };

  const handleDragStart = (columnId: ColumnId, cardId: string) => {
    setDraggedCard({ cardId, sourceColumnId: columnId });
  };

  const handleDragOver = (e: React.DragEvent, columnId: ColumnId) => {
    e.preventDefault();
    setDragOverColumn(columnId);
  };

  const handleDrop = (targetColumnId: ColumnId) => {
    if (!draggedCard) return;

    const { cardId, sourceColumnId } = draggedCard;

    if (sourceColumnId === targetColumnId) {
      setDraggedCard(null);
      setDragOverColumn(null);
      return;
    }

    const sourceColumn = columns[sourceColumnId];
    const cardToMove = sourceColumn.cards.find((card) => card.id === cardId);

    if (!cardToMove) return;

    setColumns((prev) => ({
      ...prev,
      [sourceColumnId]: {
        ...prev[sourceColumnId],
        cards: prev[sourceColumnId].cards.filter((card) => card.id !== cardId),
      },
      [targetColumnId]: {
        ...prev[targetColumnId],
        cards: [...prev[targetColumnId].cards, cardToMove],
      },
    }));

    setDraggedCard(null);
    setDragOverColumn(null);
  };

  const handleDragEnd = () => {
    setDraggedCard(null);
    setDragOverColumn(null);
  };

  return (
    <div
      style={{
        background: "linear-gradient(to bottom right, #dbeafe, #e0e7ff)",
        padding: "24px",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <header style={{ marginBottom: "32px" }}>
          <h1
            style={{
              fontSize: "30px",
              fontWeight: "bold",
              color: "#111827",
              marginBottom: "8px",
            }}
          >
            Kanban Board
          </h1>
          <p style={{ color: "#4b5563" }}>Organize your tasks efficiently</p>
        </header>

        <div
          onDragEnd={handleDragEnd}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
          }}
        >
          {(Object.keys(columns) as ColumnId[]).map((columnId) => (
            <KanbanColumn
              key={columnId}
              column={columns[columnId]}
              onAddCard={() => addCard(columnId)}
              onDeleteCard={(cardId) => deleteCard(columnId, cardId)}
              onEditCard={(cardId, newTitle) =>
                editCard(columnId, cardId, newTitle)
              }
              onDragStart={(cardId) => handleDragStart(columnId, cardId)}
              onDragOver={(e) => handleDragOver(e, columnId)}
              onDrop={() => handleDrop(columnId)}
              isDraggingOver={dragOverColumn === columnId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;
