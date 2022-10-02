/* @refresh reload */
import { createSignal } from "solid-js";
import { render } from "solid-js/web";

import "virtual:windi-devtools";
import "virtual:windi.css";
import App from "./App";
import { DropdownProp } from "./DropdownTypes";

const ContainerApp = () => {
  const [isMenuOpen, setIsMenuOpen] = createSignal(false);

  const dropdownProps: DropdownProp = {
    button: {
      key: "menu-key",
      render: () => {
        return (
          <div class="flex items-center">
            <span>Menu JSX</span>
            <svg width="20" height="20" class="ml-2 inline-block">
              <circle
                cy="10"
                cx="10"
                r="5"
                class="transition duration-300 "
                classList={{
                  "fill-blue-500": isMenuOpen(),
                  "fill-green-500": !isMenuOpen(),
                }}
              />
            </svg>
          </div>
        );
      },
    },
    options: ["option 1", "option 2", "option 3"],
    onMenuClick: (isMenuOpen) => {
      setIsMenuOpen(isMenuOpen);
    },
    onOptionClick: (optionKey) => {
      console.log("option selected: ", optionKey);
      setIsMenuOpen(false);
    },
  };

  return <App {...dropdownProps} />;
};

render(() => <ContainerApp />, document.getElementById("root") as HTMLElement);
