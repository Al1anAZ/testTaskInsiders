"use client";
import { useParams } from "next/navigation";
import styles from "./style.module.scss";

const Tab = () => {
  const params = useParams();
  const tabId = params?.tab;
  return <div className={styles.tab}>{tabId}</div>;
};
export default Tab;
