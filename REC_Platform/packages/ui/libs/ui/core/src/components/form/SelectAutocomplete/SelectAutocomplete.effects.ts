import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { GenericFormField } from '../../../containers';
import { FormSelectOption } from '../FormSelect';

export const useSelectAutocompleteEffects = <FormValuesType>(
  onChange: (newValue: FormSelectOption[]) => void,
  dependentValue: FormSelectOption[],
  field: GenericFormField<FormValuesType>
) => {
  const isMountedRef = useRef(false);
  const [textValue, setTextValue] = useState<string>('');

  const changeHandler = (
    event: SyntheticEvent,
    value: (string | FormSelectOption)[]
  ) => {
    const maxValues = field.multiple ? field.maxValues : 1;
    const slicedValues = value
      ? (value as FormSelectOption[]).slice(0, maxValues ?? value.length)
      : (value as FormSelectOption[]);

    onChange(slicedValues);

    setTextValue('');
  };

  useEffect(() => {
    if (dependentValue?.length === 0 && isMountedRef.current === true) {
      setTextValue('');
      onChange([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dependentValue]);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const options =
    !!field.dependentOn && field.dependentOptionsCallback
      ? field.dependentOptionsCallback(dependentValue) || []
      : field.options;

  return {
    options,
    textValue,
    setTextValue,
    changeHandler,
  };
};
