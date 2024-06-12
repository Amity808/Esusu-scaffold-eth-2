import type { InputHTMLAttributes } from "react";

const CustomInput = ({
  id,
  name,
  value,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className="form-group mb-8">
      <input
        id={id}
        name={name}
        className={` py-3 rounded-md flex items-center px-3 bg-[#EAF0F7] text-black  ${className}`}
        {...props}
      />
    </div>
  );
};

export default CustomInput;