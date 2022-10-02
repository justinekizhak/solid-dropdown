/* @refresh reload */
import { render } from "solid-js/web";

import "virtual:windi-devtools";
import "virtual:windi.css";
import App from "./App";
import { DropdownProp } from "./DropdownTypes";

const dropdownProps: DropdownProp = {
  button: "Menu",
  options: ["option 1", "option 2", "option 3"],
  onMenuClick: (isMenuOpen) => console.log({ isMenuOpen }),
  onOptionClick: (optionKey) => console.log({ optionKey }),
};

render(
  () => <App {...dropdownProps} />,
  document.getElementById("root") as HTMLElement
);
