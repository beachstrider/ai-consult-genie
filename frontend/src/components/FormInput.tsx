import React from "react"
import { useFormContext } from "react-hook-form"

type FormInputProps = {
  label: string
  name: string
  type?: string
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = "text",
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  return (
    <div className="flex-1">
      <label
        htmlFor={name}
        className="block text-sm text-gray-500 font-medium mb-1"
      >
        {label}
      </label>
      <input
        type={type}
        placeholder=" "
        className="block w-full rounded-lg appearance-none focus:outline-none py-2 px-4 text-sm bg-white dark:bg-black"
        {...register(name)}
      />
      {errors[name] && (
        <span className="text-red-500 text-xs pt-1 block">
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  )
}

export default FormInput
