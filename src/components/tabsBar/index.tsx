"use client";

import { useRef, useState } from "react";
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
import PinIcon from "@/assets/icons/pinIcon";

export default function TabsBar() {
  const [visibleTabPinMenue, setVisibleTabPinMenue] = useState<boolean>(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [activeToPinTab, setActiveToPinTab] = useState<string>("");
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

  const [pinnedTabs, setPinnedTabs] = useState<string[]>([]);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (destination.index < pinnedTabs.length) return;

    const reorderedTabs = Array.from(tabs);
    const [movedTab] = reorderedTabs.splice(source.index, 1);
    reorderedTabs.splice(destination.index, 0, movedTab);

    setTabs(reorderedTabs);
  };

  const handlePinnedTabs = (tab: string) => {
    setPinnedTabs((prevPinnedTabs) => {
      if (prevPinnedTabs.includes(tab)) {
        return prevPinnedTabs.filter((pinnedTab) => pinnedTab !== tab);
      }

      return [tab, ...prevPinnedTabs];
    });

    setTabs((prevTabs) => {
      const newTabs = prevTabs.filter((t) => t !== tab);
      return [tab, ...newTabs];
    });
  };
  const handleDelete = (indexToDelete: number) => {
    setTabs((prevTabs) =>
      prevTabs.filter((_, index) => index !== indexToDelete)
    );
    setPinnedTabs((prevTabs) =>
      prevTabs.filter((_, index) => index !== indexToDelete)
    );
  };

  const handleContextMenu = (element: HTMLDivElement) => {
    const rect = element.getBoundingClientRect();
    setMenuPosition({ x: rect.left, y: rect.bottom });
    setVisibleTabPinMenue(true);
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
        {(provided) => (
          <nav
            className={style.tabsBar}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {
              <div
                className={style.pinnedTabs}
                style={{
                  position: "sticky",
                  left: 0,
                  zIndex: 10,
                  display: "flex",
                }}
              >
                {pinnedTabs.map((tab, index) => (
                  <Tab
                    key={index}
                    setMenueOpened={setVisibleTabPinMenue}
                    handlePinTab={setActiveToPinTab}
                    isPinned
                    deleteElement={handleDelete}
                    text={tab}
                    index={index}
                    onContextMenu={handleContextMenu}
                  />
                ))}
              </div>
            }
            {tabs.map((tab, index) =>
              pinnedTabs.includes(tab) ? null : (
                // Незакрепленные вкладки, перетаскиваемые
                <Draggable key={tab} draggableId={tab} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Tab
                        setMenueOpened={setVisibleTabPinMenue}
                        handlePinTab={setActiveToPinTab}
                        deleteElement={handleDelete}
                        text={tab}
                        index={index}
                        isDragging={snapshot.isDragging}
                        onContextMenu={handleContextMenu}
                      />
                    </div>
                  )}
                </Draggable>
              )
            )}
            {provided.placeholder}
          </nav>
        )}
      </Droppable>

      {/* Контекстное меню для закрепления вкладки */}
      {visibleTabPinMenue && (
        <div
          className={[
            style.tabsBar__pinTabMenue,
            visibleTabPinMenue && style.tabsBar__pinTabMenue__open,
          ].join(" ")}
          style={{ top: menuPosition.y - 5, left: menuPosition.x + 50 }}
          onClick={() => {
            if (activeToPinTab) handlePinnedTabs(activeToPinTab);
          }}
        >
          <PinIcon width={16} hight={16} color="#7F858D" />
          Tab anpinnen
        </div>
      )}
    </DragDropContext>
  );
}
