import { object, string, TypeOf } from "zod"
import { useEffect, useState } from "react"
import { useForm, FormProvider, SubmitHandler } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify"

import FormInput from "../../components/FormInput"
import { LoadingButton } from "../../components/LoadingButton"
import { GenericResponse } from "../../schemas/generic.response"

const resetPasswordSchema = object({
  password: string().min(1, "Current password is required"),
  passwordConfirm: string().min(1, "Please confirm your password"),
})

export type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>

const ResetPasswordPage = () => {
  const navigate = useNavigate()
  const { resetCode } = useParams()
  const [loading, setLoading] = useState(false)

  const methods = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
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

  const resetPassword = async (data: ResetPasswordInput) => {
    try {
      setLoading(true)
      const response = await authApi.patch<GenericResponse>(
        `auth/resetpassword/${resetCode}`,
        data
      )
      setLoading(false)
      toast.success(response.data.message as string, {
        position: "top-right",
      })
      navigate("/login")
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

  const onSubmitHandler: SubmitHandler<ResetPasswordInput> = (values) => {
    if (resetCode) {
      resetPassword(values)
    } else {
      toast.error("Please provide the password reset code", {
        position: "top-right",
      })
    }
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
          Reset Password
        </h1>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className="max-w-md w-full mx-auto overflow-hidden shadow-lg bg-ct-dark-200 rounded-2xl p-8 space-y-5  bg-gray-200 dark:bg-gray-800"
          >
            <FormInput label="New Password" name="password" type="password" />
            <FormInput
              label="Confirm Password"
              name="passwordConfirm"
              type="password"
            />
            <LoadingButton
              loading={loading}
              btnColor="bg-gradient-to-r from-[#ae519d] via-[#e54389] to-[#f4a14c]"
            >
              Reset Password
            </LoadingButton>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

export default ResetPasswordPage
