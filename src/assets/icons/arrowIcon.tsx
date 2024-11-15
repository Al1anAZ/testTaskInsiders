import { IconType } from "../type/iconType";

export default function ArrowIcon({ width, hight, color, rotation }: IconType) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={hight}
      viewBox="0 0 9 6"
      fill="none"
      style={{
        transition: "all 0.2s",
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <path
        d="M4.5 5.55L0 1.05L1.05 0L4.5 3.45L7.95 0L9 1.05L4.5 5.55Z"
        fill={color}
      />
    </svg>
  );
}
