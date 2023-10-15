import { object, string, TypeOf } from "zod"
import { useEffect, useState } from "react"
import { useForm, FormProvider, SubmitHandler } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { zodResolver } from "@hookform/resolvers/zod"

import FormInput from "../../components/FormInput"
import { LoadingButton } from "../../components/LoadingButton"
import { GenericResponse } from "../../schemas/generic.response"

const emailVerificationSchema = object({
  verificationCode: string().min(1, "Email verifciation code is required"),
})

export type EmailVerificationInput = TypeOf<typeof emailVerificationSchema>

const EmailVerificationPage = () => {
  const navigate = useNavigate()
  const { verificationCode } = useParams()

  const [loading, setLoading] = useState(false)

  const methods = useForm<EmailVerificationInput>({
    resolver: zodResolver(emailVerificationSchema),
  })

  const {
    reset,
    handleSubmit,
    setValue,
    formState: { isSubmitSuccessful },
  } = methods

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful])

  useEffect(() => {
    if (verificationCode) {
      setValue("verificationCode", verificationCode)
    }
  }, [])

  const verifyEmail = async (data: EmailVerificationInput) => {
    try {
      setLoading(true)
      const response = await authApi.get<GenericResponse>(
        `auth/verify_email/${data.verificationCode}`
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

  const onSubmitHandler: SubmitHandler<EmailVerificationInput> = (values) => {
    verifyEmail(values)
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

        <h1 className="text-md text-center font-[600] text-gray-500 dark:bg-black mb-7">
          Verify Email Address
        </h1>

        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className="max-w-md w-full mx-auto overflow-hidden shadow-lg bg-ct-dark-200 rounded-2xl p-8 space-y-5  bg-gray-200 dark:bg-gray-800"
          >
            <FormInput label="Verification Code" name="verificationCode" />
            <LoadingButton
              loading={loading}
              btnColor="bg-gradient-to-r from-[#ae519d] via-[#e54389] to-[#f4a14c]"
            >
              Verify Email
            </LoadingButton>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

export default EmailVerificationPage
