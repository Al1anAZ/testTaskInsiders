"use client";

import { useEffect, useRef, useState } from "react";
import style from "./style.module.scss";
import Tab from "../tab";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import PinIcon from "@/assets/icons/pinIcon";
import ArrowIcon from "@/assets/icons/arrowIcon";
import DeleteIcon from "@/assets/icons/deleteIcon";
import DashboardIcon from "@/assets/icons/dashboardIcon";

export default function TabsBar() {
  const [hiddenTabs, setHiddenTabs] = useState<string[]>([]);
  const hiddenTabsMenueRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [showLeftShadow, setShowLeftShadow] = useState<boolean>(false);
  const [showRightShadow, setShowRightShadow] = useState<boolean>(false);
  const [visibleTabPinMenue, setVisibleTabPinMenue] = useState<boolean>(false);
  const [visibleHiddenTabs, setVisibleHiddenTabs] = useState<boolean>(false);
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
    "Finanzen",
    "Berichte",
    "Planung",
    "Projekte",
    "Marketing",
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

    localStorage.setItem("tabsState", JSON.stringify(reorderedTabs));
    localStorage.setItem("pinnedTabsState", JSON.stringify(pinnedTabs));
  };

  const handlePinnedTabs = (tab: string) => {
    setPinnedTabs((prevPinnedTabs) => {
      const newPinnedTabs = prevPinnedTabs.includes(tab)
        ? prevPinnedTabs.filter((pinnedTab) => pinnedTab !== tab)
        : [tab, ...prevPinnedTabs];

      localStorage.setItem("pinnedTabsState", JSON.stringify(newPinnedTabs));
      return newPinnedTabs;
    });

    setTabs((prevTabs) => {
      const newTabs = prevTabs.filter((t) => t !== tab);
      const updatedTabs = [tab, ...newTabs];

      localStorage.setItem("tabsState", JSON.stringify(updatedTabs));
      return updatedTabs;
    });
  };

  const handleDelete = (tabToDelete: string) => {
    setTabs((prevTabs) => {
      const updatedTabs = prevTabs.filter((tab) => tab !== tabToDelete);
      localStorage.setItem("tabsState", JSON.stringify(updatedTabs));
      return updatedTabs;
    });

    setPinnedTabs((prevPinnedTabs) => {
      const updatedPinnedTabs = prevPinnedTabs.filter(
        (tab) => tab !== tabToDelete
      );
      localStorage.setItem(
        "pinnedTabsState",
        JSON.stringify(updatedPinnedTabs)
      );
      return updatedPinnedTabs;
    });
  };

  const handleContextMenu = (element: HTMLDivElement) => {
    const rect = element.getBoundingClientRect();
    setMenuPosition({ x: rect.left, y: rect.bottom });
    setVisibleTabPinMenue(true);
  };

  const handleScroll = () => {
    if (!containerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;

    setShowLeftShadow(scrollLeft > 0);
    setShowRightShadow(scrollLeft + clientWidth < scrollWidth);
  };

  const updateHiddenTabs = () => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    const scrollLeft = containerRef.current.scrollLeft;
    let totalWidth = 0;
    const newHiddenTabs: string[] = [];

    tabs.forEach((tab, index) => {
      const tabElement = tabsRef.current[index];
      if (tabElement) {
        const tabLeft = tabElement.offsetLeft - scrollLeft;
        const tabRight = tabLeft + tabElement.offsetWidth;

        if (tabRight > containerWidth || tabLeft < 0) {
          newHiddenTabs.push(tab);
        }
      }
    });

    setHiddenTabs(newHiddenTabs);
  };

  const handleCloseHiddenTabsMenue = (event: MouseEvent) => {
    if (
      hiddenTabsMenueRef.current &&
      !hiddenTabsMenueRef.current.contains(event.target as Node)
    ) {
      setVisibleHiddenTabs(false);
    }
  };

  useEffect(() => {
    updateHiddenTabs();
    window.addEventListener("resize", updateHiddenTabs);
    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", updateHiddenTabs);
    }

    return () => {
      window.removeEventListener("resize", updateHiddenTabs);
      if (containerRef.current) {
        containerRef.current.removeEventListener("scroll", updateHiddenTabs);
      }
    };
  }, [tabs]);

  useEffect(() => {
    handleScroll();

    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", handleScroll);
    }

    window.addEventListener("resize", handleScroll);

    return () => {
      if (containerRef.current) {
        containerRef.current.addEventListener("scroll", handleScroll);
      }
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleCloseHiddenTabsMenue);

    return () => {
      document.removeEventListener("click", handleCloseHiddenTabsMenue);
    };
  }, []);

  useEffect(() => {
    const savedTabs = localStorage.getItem("tabsState");
    const savedPinnedTabs = localStorage.getItem("pinnedTabsState");

    if (savedTabs) {
      setTabs(JSON.parse(savedTabs));
    }
    if (savedPinnedTabs) {
      setPinnedTabs(JSON.parse(savedPinnedTabs));
    }
  }, []);

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
            className={[
              style.tabsBar,
              showLeftShadow && style.tabsBar__leftShadow,
              showRightShadow && style.tabsBar__rightShadow,
            ].join(" ")}
            ref={(el) => {
              containerRef.current = el;
              provided.innerRef(el);
            }}
            {...provided.droppableProps}
          >
            {
              <div
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
                <Draggable key={tab} draggableId={tab} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={(el) => {
                        tabsRef.current[index] = el;
                        provided.innerRef(el);
                      }}
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
      <div
        className={style.tabsBar__dropDownListContainer}
        ref={hiddenTabsMenueRef}
      >
        <button
          className={[
            style.tabsBar__dropDownListContainer__btn,
            visibleHiddenTabs &&
              style.tabsBar__dropDownListContainer__btn__active,
          ].join(" ")}
          onClick={() => setVisibleHiddenTabs(!visibleHiddenTabs)}
        >
          <ArrowIcon
            color={visibleHiddenTabs ? "white" : "#343434"}
            width={10}
            hight={9}
            rotation={visibleHiddenTabs ? 180 : 0}
          />
        </button>
        <div
          className={[
            style.tabsBar__dropDownListContainer__content,
            visibleHiddenTabs &&
              style.tabsBar__dropDownListContainer__content__open,
          ].join(" ")}
        >
          {hiddenTabs.map((item, index) => (
            <div
              key={index}
              className={style.tabsBar__dropDownListContainer__item}
              style={{
                borderBottom: `${
                  index !== hiddenTabs.length - 1 && "1px solid #AEB6CE33"
                }`,
              }}
            >
              <span
                className={style.tabsBar__dropDownListContainer__textContainer}
              >
                <DashboardIcon width={16} hight={16} color={"#7F858D"} />
                {item}
              </span>
              <button onClick={() => handleDelete(item)}>
                <DeleteIcon width={14} hight={14} color="#7F858D" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </DragDropContext>
  );
}
