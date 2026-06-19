import clsx from "clsx";
import React from "react";
import {twMerge} from "tailwind-merge";

const Button = ({
  children,
  className,
  disabled,
  active,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  active?: boolean;
  onClick?: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        clsx(
          "inline-flex items-center justify-center gap-1.5 rounded-md border-none bg-white dark:text-white dark:bg-gray-500 md:px-4 md:py-2 px-2 py-1 text-black shadow-sm transition-all hover:brightness-90 focus:outline-none active:scale-95 disabled:brightness-75",
          className,
          {
            "scale-110 brightness-90": active,
          },
        ),
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
