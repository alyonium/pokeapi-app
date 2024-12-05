import { useState, useEffect } from 'react';
import styles from './DebounceInput.module.scss';

type DebounceInputProps = {
  getDebouncedValue: (searchValue: string) => void;
};

const DebounceInput = ({ getDebouncedValue }: DebounceInputProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isValueChanged, setIsValueChanges] = useState<boolean>(false);

  const handleInputChange = (event) => {
    setIsValueChanges(true);
    setInputValue(event.target.value);
  };

  useEffect(() => {
    if (!isValueChanged) {
      return;
    }
    const timeoutId = setTimeout(() => {
      getDebouncedValue(inputValue);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [inputValue]);

  return (
    <input
      type="text"
      maxLength="100"
      size="30"
      placeholder="search"
      value={inputValue}
      className={styles.searchIcon}
      onChange={handleInputChange}
    />
  );
};

export default DebounceInput;
