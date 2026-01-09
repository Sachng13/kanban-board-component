import React from "react";
import { Plus } from "lucide-react";
import { Column } from "../types";
import KanbanCard from "./KanbanCard";

interface KanbanColumnProps {
  column: Column;
  onAddCard: () => void;
  onDeleteCard: (cardId: string) => void;
  onEditCard: (cardId: string, newTitle: string) => void;
  onDragStart: (cardId: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: () => void;
  isDraggingOver: boolean;
}

const columnColors: Record<
  string,
  { bg: string; badge: string; gradient: string }
> = {
  todo: {
    bg: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
    badge: "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)",
    gradient: "linear-gradient(90deg, #0ea5e9, #06b6d4)",
  },
  inProgress: {
    bg: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
    badge: "linear-gradient(135deg, #f59e0b 0%, #eab308 100%)",
    gradient: "linear-gradient(90deg, #f59e0b, #eab308)",
  },
  done: {
    bg: "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)",
    badge: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    gradient: "linear-gradient(90deg, #10b981, #059669)",
  },
};

const KanbanColumn: React.FC<KanbanColumnProps> = ({
  column,
  onAddCard,
  onDeleteCard,
  onEditCard,
  onDragStart,
  onDragOver,
  onDrop,
  isDraggingOver,
}) => {
  const colors = columnColors[column.id] || columnColors.todo;

  return (
    <div
      style={{
        background: colors.bg,
        borderRadius: "16px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
        border: "1px solid rgba(255,255,255,0.8)",
        backdropFilter: "blur(10px)",
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top gradient accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: colors.gradient,
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
          paddingTop: "4px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <h2
            style={{
              fontSize: "18px",
              fontWeight: "700",
              color: "#1e293b",
              letterSpacing: "-0.02em",
            }}
          >
            {column.title}
          </h2>
          <span
            style={{
              background: colors.badge,
              color: "white",
              padding: "4px 12px",
              borderRadius: "12px",
              fontSize: "13px",
              fontWeight: "600",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            }}
          >
            {column.cards.length}
          </span>
        </div>

        <button
          onClick={onAddCard}
          style={{
            padding: "8px",
            background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
            border: "2px solid rgba(0,0,0,0.05)",
            borderRadius: "10px",
            cursor: "pointer",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.1) rotate(90deg)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1) rotate(0deg)";
            e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
          }}
          title="Add card"
        >
          <Plus style={{ width: "20px", height: "20px", color: "#475569" }} />
        </button>
      </div>

      <div
        onDragOver={onDragOver}
        onDrop={onDrop}
        style={{
          flex: 1,
          minHeight: "300px",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          backgroundColor: isDraggingOver
            ? "rgba(255,255,255,0.5)"
            : "transparent",
          border: isDraggingOver
            ? "2px dashed rgba(99, 102, 241, 0.5)"
            : "2px dashed transparent",
          borderRadius: "12px",
          padding: isDraggingOver ? "12px" : "4px",
          position: "relative",
        }}
      >
        {isDraggingOver && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "14px",
              fontWeight: "600",
              color: "#6366f1",
              textAlign: "center",
              pointerEvents: "none",
            }}
          >
            Drop here
          </div>
        )}

        {column.cards.length === 0 && !isDraggingOver && (
          <div
            style={{
              textAlign: "center",
              padding: "40px 20px",
              color: "#94a3b8",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            No tasks yet
          </div>
        )}

        {column.cards.map((card) => (
          <KanbanCard
            key={card.id}
            card={card}
            onDelete={() => onDeleteCard(card.id)}
            onEdit={(newTitle) => onEditCard(card.id, newTitle)}
            onDragStart={(e) => {
              e.dataTransfer.effectAllowed = "move";
              onDragStart(card.id);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;
