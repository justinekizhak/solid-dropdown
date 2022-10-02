/* @refresh reload */
import { render } from "solid-js/web";

import "virtual:windi-devtools";
import "virtual:windi.css";
import App from "./App";
import { DropdownProp } from "./DropdownTypes";

const dropdownProps: DropdownProp = {
  button: {
    key: "menu-key",
    render: () => {
      return (
        <div class="flex items-center">
          <span>Menu JSX</span>
          <svg width="20" height="20" class="ml-2 inline-block">
            <circle cy="10" cx="10" r="5" class="fill-blue-500" />
          </svg>
        </div>
      );
    },
  },
  options: ["option 1", "option 2", "option 3"],
  onMenuClick: (isMenuOpen) => console.log({ isMenuOpen }),
  onOptionClick: (optionKey) => console.log({ optionKey }),
};

render(
  () => <App {...dropdownProps} />,
  document.getElementById("root") as HTMLElement
);
