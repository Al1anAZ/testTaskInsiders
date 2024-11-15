import style from "./style.module.scss";

type TabProps = {
  text: string;
  isPinned?: boolean;
  isDragging?: boolean;
};

export default function Tab({ text, isDragging }: TabProps) {
  return (
    <div
      className={[style.tab, isDragging && style.tab__isDragging].join(" ")}
      tabIndex={0}
    >
      <p className={style.tab__text}> {text}</p>
      <button className={style.tab__btnDelect}></button>
    </div>
  );
}
