import { FC, InputHTMLAttributes, TextareaHTMLAttributes } from "react";

export const Input: FC<InputHTMLAttributes<HTMLInputElement>> = (props) => {
  const { placeholder, id } = props;

  return (
    <div>
      <label className="text-black dark:text-white tracking-wider" htmlFor={id}>
        {placeholder}
      </label>
      <input
        className="border rounded-lg bg-slate-200 border-slate-400 text-black p-2 focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 w-full"
        {...props}
      />
    </div>
  );
};

export const TextArea: FC<TextareaHTMLAttributes<HTMLTextAreaElement>> = (
  props
) => {
  return (
    <textarea
      className="border rounded-lg bg-slate-200 text-black p-2 focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 w-full"
      {...props}
    />
  );
};
