import styles from './Button.module.scss';
import { BUTTON_MODE } from '../../utils/consts.ts';

type ButtonProps = {
  state?: BUTTON_MODE;
  text: string;
  onClick: () => void;
};

const Button = ({
  text,
  onClick,
  state = BUTTON_MODE.DEFAULT,
}: ButtonProps) => {
  const returnClassNamesByState = () => {
    switch (state) {
      case BUTTON_MODE.DISABLED:
        return styles.disabled;
      case BUTTON_MODE.SAVE:
        return styles.save;
      case BUTTON_MODE.CANCEL:
        return styles.cancel;
      default:
        return '';
    }
  };

  const returnOnClickByState = () => {
    if (state !== BUTTON_MODE.DISABLED) {
      return onClick();
    }
  };

  return (
    <div
      className={`${styles.button} ${returnClassNamesByState()}`}
      onClick={returnOnClickByState}
    >
      <span>{text}</span>
    </div>
  );
};

export default Button;
