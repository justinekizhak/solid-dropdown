import { onCleanup, onMount } from "solid-js";

type TargetEl = HTMLElement | undefined;

export const useOutsideClick = (
  target: () => TargetEl,
  handleClick: () => void,
  alsoExclude?: () => TargetEl[]
) => {
  const handleEvent = (event: Event) => {
    const isOutside = getIsClickOutside(event);
    if (isOutside) {
      handleClick();
    }
  };

  const getIsClickOutside = (event: Event): boolean | undefined => {
    const targetEl = target();
    if (!targetEl) {
      return;
    }
    const path = event.composedPath();
    const outsideList: boolean[] = [!path.includes(targetEl)];

    if (alsoExclude && typeof alsoExclude === "function") {
      const alsoExcludeEls = alsoExclude();
      alsoExcludeEls.forEach((el) => {
        if (!el) {
          return;
        }
        const outside = !path.includes(el);
        outsideList.push(outside);
      });
    }

    const isOutside = outsideList.reduce((prevValue, currValue) => {
      return prevValue && currValue;
    }, true);

    return isOutside;
  };

  onMount(() => {
    document.addEventListener("click", handleEvent);
  });

  onCleanup(() => {
    document.removeEventListener("click", handleEvent);
  });
};
