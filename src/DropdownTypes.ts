import { JSXElement } from "solid-js";

type RenderFunction = () => JSXElement;

export type DropdownOptionObject =
  | string
  | {
      key: string;
      render: RenderFunction;
    };

export interface DropdownProp {
  button: DropdownOptionObject;
  options: DropdownOptionObject[];
  onMenuClick?: (isMenuOpen: boolean) => void;
  onOptionClick?: (key: string) => void;
}
