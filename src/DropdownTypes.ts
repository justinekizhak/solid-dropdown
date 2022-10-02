import { JSXElement } from "solid-js";

type RenderFunction = () => JSXElement;

export type DropdownOptionObject =
  | string
  | {
      key: string;
      render: RenderFunction;
    };

type DropdownButton = DropdownOptionObject;

export interface DropdownProp {
  button: DropdownButton;
  options: DropdownOptionObject[];
  onMenuClick?: (isMenuOpen: boolean) => void;
  onOptionClick?: (key: string) => void;
}
