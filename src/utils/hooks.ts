import React, { ChangeEvent, useState } from 'react';
import { checkedRadio } from '../types/types';

export interface IInputValues {
  text?: string;
  numbers?: number | null;
  buttonActive?: boolean;
  check? : checkedRadio;
}

export function useForm(inputValues: IInputValues) {
  const [values, setValues] = useState(inputValues);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        console.log("event.target",  event.target);
        setValues({ ...values, [name]: value });
    };
    return { values, handleChange, setValues };
}

