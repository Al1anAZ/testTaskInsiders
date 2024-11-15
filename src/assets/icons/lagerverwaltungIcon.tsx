import { IconType } from "../type/iconType";

export default function LagerverwaltungIcon({ width, hight, color }: IconType) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={hight}
      viewBox="0 0 16 16"
      fill="none"
    >
      <g clipPath="url(#clip0_1_308)">
        <path
          d="M14 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2L0 16H16V2C16 1.46957 15.7893 0.960859 15.4142 0.585786C15.0391 0.210714 14.5304 0 14 0V0ZM14.6667 2V3.33333H10V1.33333H14C14.1768 1.33333 14.3464 1.40357 14.4714 1.5286C14.5964 1.65362 14.6667 1.82319 14.6667 2ZM7.33333 1.33333H8.66667V5.33333H7.33333V1.33333ZM2 1.33333H6V3.33333H1.33333V2C1.33333 1.82319 1.40357 1.65362 1.5286 1.5286C1.65362 1.40357 1.82319 1.33333 2 1.33333ZM1.33333 14.6667V4.66667H6V6.66667H10V4.66667H14.6667V14.6667H1.33333ZM10 12H13.3333V13.3333H10V12Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_1_308">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
