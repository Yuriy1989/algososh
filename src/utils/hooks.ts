import React, { ChangeEvent, useState } from 'react';

export interface IInputValues {
  text?: string;
  buttonActive?: boolean;
}

export function useForm(inputValues: IInputValues) {
  const [values, setValues] = useState(inputValues);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setValues({ ...values, [name]: value });
    };
    return { values, handleChange, setValues };
}

