'use client'
import React, { useState } from 'react'

interface InputProps extends React.ComponentProps<"input"> {
  name: string;
  type?: string;
  id?: string;
  value?: string;
  placeholder?: string;
  icon: string;
  disable?: boolean;
}
export default function InputBox(props: Partial<InputProps>) {
  const {
    name,
    type,
    id,
    value,
    placeholder,
    icon,
    disable = false,
    ...nativeProps
  } = props;
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <div className="relative w-[100%] mb-4">
      <input
        name={name}
        type={
          type == "password" ? (passwordVisible ? "text" : "password") : type
        }
        placeholder={placeholder}
        defaultValue={value}
        id={id}
        disabled={disable}
        className="input-box"
        {...nativeProps}
      />

      <i className={"fi " + icon + " input-icon"}></i>

      {type == "password" ? (
        <i
          className={
            "fi fi-rr-eye" +
            (!passwordVisible ? "-crossed" : "") +
            " input-icon left-[auto] right-4 cursor-pointer"
          }
          onClick={() => setPasswordVisible((currentVal) => !currentVal)}
        ></i>
      ) : (
        ""
      )}
    </div>
  );
}
