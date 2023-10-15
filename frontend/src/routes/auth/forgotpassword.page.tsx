import { object, string, TypeOf } from "zod"
import { useEffect, useState } from "react"
import { useForm, FormProvider, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify"

import FormInput from "../../components/FormInput"
import { LoadingButton } from "../../components/LoadingButton"
import { GenericResponse } from "../../schemas/generic.response"

const forgotPasswordchema = object({
  email: string().min(1, "Email is required").email("Invalid email address"),
})

export type ForgotPasswordInput = TypeOf<typeof forgotPasswordchema>

const ForgotPasswordPage = () => {
  const [loading, setLoading] = useState(false)

  const methods = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordchema),
  })

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful])

  const forgotPassword = async (data: ForgotPasswordInput) => {
    try {
      setLoading(true)
      const response = await authApi.post<GenericResponse>(
        `forgot_password`,
        data
      )
      setLoading(false)
      toast.success(response.data.message as string, {
        position: "top-right",
      })
    } catch (error: any) {
      setLoading(false)
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      toast.error(resMessage, {
        position: "top-right",
      })
    }
  }

  const onSubmitHandler: SubmitHandler<ForgotPasswordInput> = (values) => {
    forgotPassword(values)
  }
  return (
    <div
      className="flex w-full h-full items-center justify-center overflow-y-auto
    bg-white text-black dark:bg-black dark:text-white"
    >
      <div className="w-full">
        <div className="flex justify-center items-center mb-2">
          <img
            className="h-8 w-auto mx-2"
            src="/assets/logos/Logo-Vector.svg"
            alt="AdamoAI"
          />
          <h2 className="text-center text-3xl font-medium text-black dark:text-white">
            ADAMO
          </h2>
        </div>

        <h1 className="text-md text-center font-[600] text-gray-500  mb-7">
          Forgot Password?
        </h1>

        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className="max-w-md w-full mx-auto overflow-hidden shadow-lg rounded-2xl p-8 space-y-5 bg-gray-200 dark:bg-gray-800"
          >
            <FormInput label="Email Address" name="email" type="email" />
            <LoadingButton
              loading={loading}
              btnColor="bg-gradient-to-r from-[#ae519d] via-[#e54389] to-[#f4a14c]"
            >
              Send Reset Code
            </LoadingButton>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

export default ForgotPasswordPage
