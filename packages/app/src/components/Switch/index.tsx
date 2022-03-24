import { ComponentPropsWithoutRef, useEffect } from 'react';
import { generateLabelId } from '../utils';
import classes from './index.module.css';

interface SwitchProps extends ComponentPropsWithoutRef<'input'> {
  name: string;
  label?: string;
  options: string[];
  currentOption: string;
}
const Switch = ({
  name,
  label,
  options,
  currentOption,
  ...other
}: SwitchProps) => {
  useEffect(() => {
    if (!options.includes(currentOption)) {
      console.error(
        `current switch value: ${currentOption} not included in options`
      );
      return;
    }
  }, [currentOption]);

  const nameId = generateLabelId(name);

  return (
    <fieldset aria-label={name} role="radiogroup">
      {label && <legend>{label}</legend>}
      <div className={classes['c-switch']}>
        <label htmlFor={`${nameId}__option1`}>{options[0]}</label>
        <span className={classes['c-switch__wrapper']}>
          <input
            type="radio"
            name={name || 'PleaseChooseName'}
            id={`${nameId}__option1`}
            checked={currentOption === options[0]}
            {...other}
          />
          <input
            type="radio"
            name={name || 'PleaseChooseName'}
            id={`${nameId}__option2`}
            checked={currentOption === options[1]}
            {...other}
          />
          <span
            aria-hidden="true"
            className={classes['c-switch__background']}
          ></span>
          <span
            aria-hidden="true"
            className={classes['c-switch__toggler']}
          ></span>
        </span>
        <label htmlFor={`${nameId}__option2`}>{options[1]}</label>
      </div>
    </fieldset>
  );
};

export default Switch;
