import PinIcon from "@/assets/icons/pinIcon";
import style from "./style.module.scss";
import { useEffect, useRef, useState } from "react";

type TabProps = {
  text: string;
  handlePinTab: (tab: string) => void;
  isDragging?: boolean;
  index: number;
  onContextMenu: (element: HTMLDivElement) => void;
  setMenueOpened: (value: boolean) => void;
  deleteElement: (index: number) => void;
  isPinned?: boolean;
};

export default function Tab({
  text,
  isDragging,
  deleteElement,
  index,
  handlePinTab,
  setMenueOpened,
  onContextMenu,
  isPinned,
}: TabProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  const handleOpenTabPinMenue = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (menuRef.current) {
      onContextMenu(menuRef.current);
      setMenueOpened(true);
      handlePinTab(text);
    }
    setMenueOpened(true);
  };

  const handleCloseTabPinMenue = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenueOpened(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleCloseTabPinMenue);

    return () => {
      document.removeEventListener("click", handleCloseTabPinMenue);
    };
  }, []);

  return (
    <div
      ref={menuRef}
      className={[
        style.tab,
        isDragging && style.tab__isDragging,
        isPinned && style.tab__pinnedTab,
      ].join(" ")}
      tabIndex={0}
      onContextMenu={handleOpenTabPinMenue}
    >
      <p className={style.tab__text}> {text}</p>
      <button
        className={style.tab__btnDelect}
        onClick={(e) => {
          e.stopPropagation();
          deleteElement(index);
        }}
      ></button>
    </div>
  );
}
