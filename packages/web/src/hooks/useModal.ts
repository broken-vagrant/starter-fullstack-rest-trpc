import { RefObject, useEffect, useRef } from 'react';

const getDOMRef = (
  value: string | RefObject<HTMLElement> | HTMLElement
): HTMLElement | null => {
  if (typeof value == 'string') {
    return document.querySelector(value);
  } else if (typeof value == 'object') {
    if (value instanceof HTMLElement) return value;
    if (value.current) return value.current;
  }
  return null;
};
interface UseModalProps {
  focusFirst?: string | RefObject<HTMLElement> | HTMLElement;
  focusAfterClosed?: string | RefObject<HTMLElement> | HTMLElement;
  autoFocus?: boolean;
  onClose: () => void;
  overlayModal?: boolean;
}

const useModal = <RefType extends HTMLElement>({
  focusFirst,
  onClose,
  focusAfterClosed,
  autoFocus,
  overlayModal = true,
}: UseModalProps) => {
  let modalRoot = document.getElementById('modal-root');
  if (!modalRoot) {
    modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    document.body.appendChild(modalRoot);
  }

  const ref = useRef<RefType | null>(null);

  let _focusFirst = focusFirst ? getDOMRef(focusFirst) : null;
  let _focusAfterClosed = focusAfterClosed ? getDOMRef(focusAfterClosed) : null;

  // attach necessary click and key event handlers
  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (!ref.current) {
        return;
      }
      if (!ref.current.contains(e.target as HTMLElement)) {
        onClose();
        if (_focusAfterClosed) _focusAfterClosed.focus();
      }
    }

    function handleKeyPress(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
        if (_focusAfterClosed) _focusAfterClosed.focus();
      }
    }
    document.body.addEventListener('keyup', handleKeyPress);
    document.body.addEventListener('click', handleOutsideClick, {
      capture: true,
    });

    return () => {
      document.body.removeEventListener('click', handleOutsideClick, {
        capture: true,
      });
      document.body.removeEventListener('keyup', handleKeyPress);
    };
  }, [onClose, _focusAfterClosed]);

  // attach focus event handlers to handle tabbing and what to focus on open/close modal
  useEffect(() => {
    const isFocusable = (element: HTMLElement): element is HTMLElement => {
      return typeof element.focus === 'function';
    };

    // `focus` event can be triggered by keyboard(user input),javascript
    // we want to run some operations only when focus is triggered by keyboard
    let ignoreUntilFocusChanges = false;
    const attempFocus = (element: HTMLElement) => {
      if (!isFocusable(element)) {
        return false;
      }
      ignoreUntilFocusChanges = true;

      try {
        element.focus();
      } catch (e) {
        console.error(e);
      }
      ignoreUntilFocusChanges = false;
      return document.activeElement === element;
    };
    const focusFirstDescendant = (element: HTMLElement) => {
      for (var i = 0; i < element.childNodes.length; i++) {
        var child = element.childNodes[i];

        if (
          attempFocus(child as HTMLElement) ||
          focusFirstDescendant(child as HTMLElement)
        ) {
          return true;
        }
      }
      return false;
    };
    const focusLastDescendant = (element: HTMLElement) => {
      for (var i = element.childNodes.length - 1; i >= 0; i--) {
        var child = element.childNodes[i];
        if (
          attempFocus(child as HTMLElement) ||
          focusLastDescendant(child as HTMLElement)
        ) {
          return true;
        }
      }
      return false;
    };

    if (_focusFirst) _focusFirst.focus();
    else {
      if (autoFocus && ref.current) {
        focusFirstDescendant(ref.current);
      }
    }

    let lastFocus: any;
    const trapFocus = (e: FocusEvent) => {
      if (ignoreUntilFocusChanges) {
        return;
      }

      if (!ref.current) {
        console.error('dialog not found');
        return;
      }
      if (ref.current.contains(e.target as HTMLElement)) {
        lastFocus = e.target;
      } else {
        focusFirstDescendant(ref.current);

        // user clicks Shift + Tab when activeElement is first focusable descendant inside dialog,in this case `focusFirstDescendant` won't change lastFocus
        // then focus last descendant, it goes round and round
        if (lastFocus === document.activeElement) {
          focusLastDescendant(ref.current);
        }

        lastFocus = document.activeElement;
      }
    };

    if (overlayModal) {
      document.body.classList.add('has-dialog');
    }
    document.addEventListener('focus', trapFocus, true);

    return () => {
      if (overlayModal) {
        document.body.classList.remove('has-dialog');
      }
      document.removeEventListener('focus', trapFocus, true);

      if (_focusAfterClosed) {
        _focusAfterClosed.focus();
      }
    };
  }, [_focusFirst, _focusAfterClosed, autoFocus, overlayModal]);

  return { ref, modalRoot };
};

export default useModal;
