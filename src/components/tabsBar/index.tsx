"use client";

import { useState } from "react";
import style from "./style.module.scss";
import Tab from "../tab";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DroppableProvided,
  DraggableProvided,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";

export default function TabsBar() {
  const [tabs, setTabs] = useState<string[]>([
    "Dashboard",
    "Banking",
    "Telefonie",
    "Accounting",
    "Verkauf",
    "Statistik",
    "Post Office",
    "Administration",
    "Help",
    "Warenbestand",
    "Auswahllisten",
    "Einkauf",
    "Rechn",
    "Lagerverwaltung1",
    "Lagerverwaltung2",
    "Lagerverwaltung3",
  ]);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // Если элемент не был перемещен в другое место
    if (!destination) return;

    const reorderedTabs = Array.from(tabs);
    const [movedTab] = reorderedTabs.splice(source.index, 1);
    reorderedTabs.splice(destination.index, 0, movedTab);

    setTabs(reorderedTabs);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable
        droppableId="tabs"
        direction="horizontal"
        isDropDisabled={false}
        isCombineEnabled={false}
        ignoreContainerClipping={false}
      >
        {(provided: DroppableProvided) => (
          <nav
            className={style.tabsBar}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tabs.map((tab, index) => (
              <Draggable key={tab} draggableId={tab} index={index}>
                {(
                  provided: DraggableProvided,
                  snapshot: DraggableStateSnapshot
                ) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Tab
                      text={tab}
                      isDragging={snapshot.isDragging} // Pass down dragging state if needed
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </nav>
        )}
      </Droppable>
    </DragDropContext>
  );
}
