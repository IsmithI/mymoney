import * as React from "react";
import { useState, ReactNode } from "react";

interface TogglerChild {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  toggle: () => void;
  close: () => void;
  open: () => void;
}

interface TogglerProps {
  initial?: boolean;
  children: (props: TogglerChild) => ReactNode;
}

export const Toggler = ({ initial = false, children }: TogglerProps) => {
  const [isOpen, setIsOpen] = useState(initial);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      {children({
        isOpen,
        setIsOpen,
        toggle,
        close: () => setIsOpen(false),
        open: () => setIsOpen(true)
      })}
    </>
  );
};
