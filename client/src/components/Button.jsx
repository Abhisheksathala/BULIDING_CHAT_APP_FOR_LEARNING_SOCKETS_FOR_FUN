import React from 'react';

const Button = ({ onclick, title, customclass, type }) => {
  return (
    <button
      type={type}
      className={`${
        customclass ? customclass : null
      } bg-black w-full h-full rounded-lg  py-2 flex items-center justify-center cursor-pointer hover:bg-black/80 px-4 transition-colors ease-in-out duration-300 capitalize active:bg-gray-600`}
      onclick={onclick ? onclick : null}
    >
      {title}
    </button>
  );
};

export default Button;
