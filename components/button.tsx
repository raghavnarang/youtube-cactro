import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";

export default function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { className, ...restProps } = props;
  return (
    <button
      className={clsx(
        "px-5 py-1 border border-gray-300 bg-none rounded-lg cursor-pointer hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 disabled:cursor-default disabled:hover:bg-transparent",
        className
      )}
      {...restProps}
    />
  );
}
