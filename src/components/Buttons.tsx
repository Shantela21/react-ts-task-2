import React from "react";

type Props = {
  onClick?: () => void;
  label?: string;
};

export default function Buttons({ onClick, label = "Button" }: Props) {
  return (
    <button className="app-button" onClick={onClick}>
      {label}
    </button>
  );
}
