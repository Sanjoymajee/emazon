"use client";

interface InputFieldProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  className: string;
  required: boolean;
  textarea?: boolean;
}

export default function InputField({
  label,
  name,
  type,
  placeholder,
  className,
  required,
  textarea = false,
}: InputFieldProps) {
  return (
    <>
      <label className="text-gray-200 " htmlFor="name">
        {label}
      </label>
      {textarea ? (
        <textarea
          required={required}
          id={name}
          name={name}
          placeholder={placeholder}
          className={className}
        />
      ) : (
        <input
          required
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          className={className}
        />
      )}
    </>
  );
}
