import React from "react";

interface IHeader1Props extends React.HTMLAttributes<HTMLHeadingElement> {
  title: string;
}

export function Heading1({ title, className, ...props }: IHeader1Props) {
  return (
    <h1
      {...props}
      className={`font-bold text-2xl md:text-[30px] text-[#0D224A] ${
        className ?? ""
      }`}
    >
      {title}
    </h1>
  );
}
