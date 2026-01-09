import React, { useState } from "react";
import { Trash2, GripVertical } from "lucide-react";
import { Card } from "../types";

interface KanbanCardProps {
  card: Card;
  onDelete: () => void;
  onEdit: (newTitle: string) => void;
  onDragStart: (e: React.DragEvent) => void;
}

const KanbanCard: React.FC<KanbanCardProps> = ({
  card,
  onDelete,
  onEdit,
  onDragStart,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(card.title);
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = () => {
    if (editValue.trim()) {
      onEdit(editValue.trim());
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    } else if (e.key === "Escape") {
      setEditValue(card.title);
      setIsEditing(false);
    }
  };

  return (
    <div
      draggable={!isEditing}
      onDragStart={onDragStart}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
        padding: "16px",
        borderRadius: "12px",
        boxShadow: isHovered
          ? "0 8px 24px rgba(0,0,0,0.12), 0 0 0 1px rgba(99, 102, 241, 0.2)"
          : "0 2px 8px rgba(0,0,0,0.08)",
        border: "1px solid",
        borderColor: isHovered
          ? "rgba(99, 102, 241, 0.3)"
          : "rgba(226, 232, 240, 1)",
        cursor: isEditing ? "default" : "grab",
        marginBottom: "12px",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: isHovered ? "translateY(-2px)" : "translateY(0)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Gradient overlay on hover */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: "linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899)",
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "10px",
          position: "relative",
        }}
      >
        <div
          style={{
            padding: "4px",
            borderRadius: "6px",
            backgroundColor: isHovered
              ? "rgba(99, 102, 241, 0.1)"
              : "transparent",
            transition: "background-color 0.2s ease",
          }}
        >
          <GripVertical
            style={{
              width: "18px",
              height: "18px",
              color: isHovered ? "#6366f1" : "#94a3b8",
              flexShrink: 0,
              transition: "color 0.2s ease",
            }}
          />
        </div>

        {isEditing ? (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleSubmit}
            onKeyDown={handleKeyDown}
            style={{
              flex: 1,
              padding: "8px 12px",
              border: "2px solid #6366f1",
              borderRadius: "8px",
              outline: "none",
              fontSize: "14px",
              fontWeight: "500",
              color: "#1e293b",
              backgroundColor: "#ffffff",
              boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.1)",
              transition: "all 0.2s ease",
            }}
            autoFocus
          />
        ) : (
          <span
            onClick={() => setIsEditing(true)}
            style={{
              flex: 1,
              fontSize: "14px",
              fontWeight: "500",
              color: "#1e293b",
              cursor: "text",
              lineHeight: "1.6",
              paddingTop: "2px",
            }}
          >
            {card.title}
          </span>
        )}

        <button
          onClick={onDelete}
          style={{
            opacity: isHovered ? 1 : 0,
            padding: "6px",
            background: "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: isHovered ? "scale(1)" : "scale(0.8)",
            boxShadow: "0 2px 4px rgba(239, 68, 68, 0.2)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background =
              "linear-gradient(135deg, #fecaca 0%, #fca5a5 100%)";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background =
              "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)";
            e.currentTarget.style.transform = "scale(1)";
          }}
          title="Delete card"
        >
          <Trash2 style={{ width: "16px", height: "16px", color: "#ef4444" }} />
        </button>
      </div>
    </div>
  );
};

export default KanbanCard;
