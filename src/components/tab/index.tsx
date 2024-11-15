"use client";

import style from "./style.module.scss";
import { useEffect, useRef, useState } from "react";
import DeleteIcon from "@/assets/icons/deleteIcon";
import DashboardIcon from "@/assets/icons/dashboardIcon";
import Link from "next/link";
import { usePathname } from "next/navigation";

type TabProps = {
  text: string;
  handlePinTab: (tab: string) => void;
  isDragging?: boolean;
  index: number;
  onContextMenu: (element: HTMLAnchorElement) => void;
  setMenueOpened: (value: boolean) => void;
  deleteElement: (tabName: string) => void;
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
  const pathname = usePathname();
  const menuRef = useRef<HTMLAnchorElement>(null);
  const isActive = decodeURIComponent(pathname) === `/${text}`;
  const handleOpenTabPinMenue = (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
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
    <Link
      ref={menuRef}
      className={[
        style.tab,
        isDragging && style.tab__isDragging,
        isPinned && style.tab__pinnedTab,
        isActive && style.tab__acitve,
      ].join(" ")}
      tabIndex={0}
      onContextMenu={handleOpenTabPinMenue}
      href={`/${text}`}
    >
      <DashboardIcon
        width={16}
        hight={16}
        color={isDragging ? "white" : "#7F858D"}
      />
      <p className={style.tab__text}>{text}</p>
      <button
        className={style.tab__btnDelete}
        onClick={(e) => {
          e.stopPropagation();
          deleteElement(text);
        }}
      >
        <DeleteIcon width={13} hight={13} color="#EE3F3E" />
      </button>
    </Link>
  );
}
