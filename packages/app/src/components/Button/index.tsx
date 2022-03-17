import { ComponentPropsWithoutRef } from "react";
import classes from "./index.module.css";

const Button = ({
  className,
  ...other
}: ComponentPropsWithoutRef<"button">) => {
  return (
    <button
      {...other}
      className={`${classes.button} ${className ? className : ""}`}
    />
  );
};

export default Button;
