import { createSignal, For, onMount } from "solid-js";
import { DropdownOptionObject, DropdownProp } from "./DropdownTypes";
import { useOutsideClick } from "./hooks/useOutsideCilck";
import anime from "animejs";

const App = (props: DropdownProp) => {
  let optionsEl: HTMLDivElement | undefined;
  let buttonEl: HTMLButtonElement | undefined;
  let optionsContainerEl: HTMLDivElement | undefined;

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
    menuClose();
    if (props.onOptionClick) {
      props.onOptionClick(selectedOptionKey);
    }
  };

  const handleMenuClick = () => {
    const newValue = !isMenuOpen();
    setIsMenuOpen(newValue);
    if (newValue) {
      menuOpen();
    } else {
      menuClose();
    }
    if (props.onMenuClick) {
      props.onMenuClick(newValue);
    }
  };

  const handleOutsideClick = () => {
    if (isMenuOpen()) {
      setIsMenuOpen(false);
      menuClose();
      if (props.onMenuClick) {
        props.onMenuClick(false);
      }
    }
  };

  useOutsideClick(
    () => optionsEl,
    handleOutsideClick,
    () => [buttonEl]
  );

  const menuOpen = () => {
    anime({
      targets: [optionsContainerEl],
      scaleY: [0, 1],
      scaleX: [0, 1],
      easing: "easeOutSine",
      duration: 300,
    });
  };

  const menuClose = () => {
    anime({
      targets: [optionsContainerEl],
      scaleY: [1, 0],
      scaleX: [1, 0],
      easing: "easeInSine",
      duration: 300,
    });
  };

  const menuInitialState = () => {
    anime.set(optionsContainerEl || null, {
      scaleY: 0,
      scaleX: 0,
    });
  };

  onMount(() => {
    menuInitialState();
  });

  return (
    <div class="">
      <button
        ref={buttonEl}
        type="button"
        onClick={handleMenuClick}
        class="bg-gray-300 px-6 py-2 leading-none hover:bg-warm-gray-300 active:bg-green-100 shadow"
      >
        {getLabel(props.button)()}
      </button>
      <div ref={optionsContainerEl} class="origin-top-left md:w-1/2">
        <div
          class="inline-flex flex-col items-start bg-gray-100 mt-2 shadow absolute"
          ref={optionsEl}
        >
          <For each={props.options}>
            {(option: DropdownOptionObject) => (
              <button
                type="button"
                onClick={() => handleOptionClick(option)}
                class="py-2 px-6 hover:bg-green-100 w-full text-left"
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
    </div>
  );
};

export default App;
