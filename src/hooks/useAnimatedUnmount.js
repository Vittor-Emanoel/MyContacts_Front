import { useEffect, useRef, useState } from 'react';

export default function useAnimatedUnmount(visible) {
  const [shouldRender, setShouldRender] = useState(visible);

  const elementRef = useRef(null);

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
    }

    function handleAnimationEnd() {
      setShouldRender(false);
    }

    const elementRefElement = elementRef.current;
    if (!visible && elementRefElement) {
      elementRefElement.addEventListener('animationend', () => {
        handleAnimationEnd();
      });
    }

    return () => {
      if (elementRefElement) {
        elementRefElement.removeEventListener(
          'animationend',
          handleAnimationEnd,
        );
      }
    };
  }, [visible]);

  return {
    shouldRender,
    elementRef,
  };
}
