import React from 'react';

const InputComponent = ({
  type,
  placeholder,
  name,
  id,
  value,
  onChange,
  disabled,
  defaultValue,
  icon,
  className,
  containerclass,
  required,
  ...rest
}) => {
  return (
    <div
      className={`${containerclass} border border-gray-300 relative w-[100%] mb-4 flex items-center justify-between gap-4 pl-2`}
    >
      {icon && <span>{icon}</span>}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        defaultValue={defaultValue}
        className={`${className} w-full`}
        required={required}
        {...rest}
      />
    </div>
  );
};

export default InputComponent;
