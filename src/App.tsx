import { createSignal, For, Show } from "solid-js";
import { DropdownOptionObject, DropdownProp } from "./DropdownTypes";
import { useOutsideClick } from "./hooks/useOutsideCilck";

const App = (props: DropdownProp) => {
  let optionsEl: HTMLDivElement | undefined;
  let buttonEl: HTMLButtonElement | undefined;

  const [isMenuOpen, setIsMenuOpen] = createSignal(false);
  const [selectedOption, setSelectedOption] = createSignal("");

  const getLabel = (propObject: DropdownOptionObject) => () => {
    if (typeof propObject === "string") {
      return propObject;
    }
    if (typeof propObject === "object") {
      return propObject.render();
    }
  };

  const getKey = (option: DropdownOptionObject) => {
    if (typeof option === "string") {
      return option;
    }
    if (typeof option === "object") {
      return option.key;
    }
    return "";
  };

  const handleOptionClick = (option: DropdownOptionObject) => {
    const selectedOptionKey = getKey(option);
    setSelectedOption(selectedOptionKey);
    setIsMenuOpen(false);
    if (props.onOptionClick) {
      props.onOptionClick(selectedOptionKey);
    }
  };

  const handleMenuClick = () => {
    const newValue = !isMenuOpen();
    setIsMenuOpen(newValue);
    if (props.onMenuClick) {
      props.onMenuClick(newValue);
    }
  };

  const handleOutsideClick = () => {
    if (isMenuOpen()) {
      console.log("handleOutsideClick");
      setIsMenuOpen(false);
    }
  };

  useOutsideClick(
    () => optionsEl,
    handleOutsideClick,
    () => [buttonEl]
  );

  return (
    <div class="m-4">
      <button
        ref={buttonEl}
        type="button"
        onClick={handleMenuClick}
        class="bg-gray-300 px-6 py-2 leading-none"
      >
        {getLabel(props.button)()}
      </button>
      <Show when={isMenuOpen()}>
        <div>
          <div
            class="inline-flex flex-col items-start bg-gray-100 mt-2 shadow"
            ref={optionsEl}
          >
            <For each={props.options}>
              {(option: DropdownOptionObject) => (
                <button
                  type="button"
                  onClick={() => handleOptionClick(option)}
                  class="py-2 px-6 hover:bg-green-100"
                  classList={{
                    "bg-green-300": getKey(option) === selectedOption(),
                  }}
                >
                  {getLabel(option)}
                </button>
              )}
            </For>
          </div>
        </div>
      </Show>
    </div>
  );
};

export default App;
