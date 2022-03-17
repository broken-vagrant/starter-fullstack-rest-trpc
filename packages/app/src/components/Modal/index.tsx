// ref: https://www.w3.org/TR/wai-aria-practices-1.1/examples/dialog-modal/js/dialog.js
import {
  HTMLAttributes,
  ReactNode,
  RefObject,
  useEffect,
  useState,
} from "react";
import ReactDOM from "react-dom";
import defaultStyles from "./index.module.css";
import useModal from "../../hooks/useModal";

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  focusFirst?: string | RefObject<HTMLElement> | HTMLElement;
  focusAfterClosed?: string | RefObject<HTMLElement> | HTMLElement;
  autoFocus?: boolean;
  onClose: () => void;
  children: ReactNode;
  maxWidth?: string;
  classes?: {
    root?: string;
    backDrop?: string;
    childrenOuter?: string;
    childrenContainer?: string;
  };
}
const Modal = ({
  focusFirst,
  focusAfterClosed,
  onClose,
  autoFocus,
  children,
  maxWidth,
  classes,
  ...rest
}: ModalProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, [isMounted]);

  const { ref, modalRoot } = useModal<HTMLDivElement>({
    autoFocus,
    focusFirst,
    focusAfterClosed,
    onClose,
    overlayModal: true,
  });

  const modal = (
    <div
      role="presentation"
      className={`${defaultStyles.modal} ${classes ? classes?.root : ""}`}
    >
      <div
        className={`${defaultStyles.backdrop} ${
          isMounted ? defaultStyles.mounted : ""
        } ${classes ? classes?.backDrop : ""}`}
      >
        <div tabIndex={0}></div>
        <div
          role="presentation"
          tabIndex={-1}
          className={`${defaultStyles.children__outer} ${
            classes?.childrenOuter ? classes.childrenOuter : ""
          }`}
        >
          <div
            className={`${defaultStyles.children__container} ${
              classes?.childrenContainer ? classes.childrenContainer : ""
            }`}
            ref={ref}
            role="dialog"
            style={maxWidth ? { maxWidth } : {}}
            {...rest}
          >
            {children}
          </div>
        </div>
        <div tabIndex={0}></div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, modalRoot);
};

export default Modal;
