import { object, string, TypeOf } from "zod"
import { useEffect, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify"
import { LoadingButton } from "../../components/LoadingButton"
import useStore from "../../store"

const styles = {
  inputField: `form-control block w-full px-4 py-2 text-sm text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`,
}

const validate2faSchema = object({
  token: string().min(1, "Authentication code is required"),
})

export type Validate2faInput = TypeOf<typeof validate2faSchema>

const Validate2faPage = () => {
  const navigate = useNavigate()
  const store = useStore()
  const [loading, setLoading] = useState(false)

  const {
    handleSubmit,
    setFocus,
    register,
    formState: { errors },
  } = useForm<Validate2faInput>({
    resolver: zodResolver(validate2faSchema),
  })

  const validate2fa = async (token: string) => {
    try {
      setLoading(true)
      const {
        data: { otp_valid },
      } = await authApi.post<{ otp_valid: boolean }>("/auth/otp/validate", {
        token,
        user_uuid: store.authUser?.uuid,
      })
      setLoading(false)
      if (otp_valid) {
        navigate("/profile")
      } else {
        navigate("/login")
      }
    } catch (error: any) {
      setLoading(false)
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.response.data.detail ||
        error.message ||
        error.toString()
      toast.error(resMessage, {
        position: "top-right",
      })
    }
  }

  const onSubmitHandler: SubmitHandler<Validate2faInput> = (values) => {
    validate2fa(values.token)
  }

  useEffect(() => {
    setFocus("token")
  }, [setFocus])

  // useEffect(() => {
  //   if (!store.authUser) {
  //     navigate("/login")
  //   }
  // }, [])

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

        <h2 className="text-md text-center mb-4 text-gray-500 ">
          Verify the Authentication Code
        </h2>

        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          className="max-w-md w-full mx-auto overflow-hidden shadow-lg bg-ct-dark-200 rounded-2xl p-8 space-y-5 bg-gray-200 dark:bg-gray-800"
        >
          <h2 className="text-center text-xl font-semibold text-blue-500">
            Two-Factor Authentication
          </h2>
          <p className="text-center text-sm">
            Open the two-step verification app on your mobile device to get your
            verification code.
          </p>
          <input
            {...register("token")}
            className="form-control block w-full px-4 py-2 rounded-md
            text-sm text-gray-700 dark:text-gray-300
            bg-white dark:bg-black
            transition ease-in-out
            "
            placeholder="Authentication Code"
          />
          <p className="mt-2 text-xs text-red-600">
            {errors.token ? errors.token.message : null}
          </p>

          <LoadingButton
            loading={loading}
            btnColor="bg-gradient-to-r from-[#ae519d] via-[#e54389] to-[#f4a14c]"
          >
            Authenticate
          </LoadingButton>
          <span className="block text-center">
            <Link to="/login" className="text-ct-blue-600">
              Back to basic login
            </Link>
          </span>
        </form>
      </div>
    </div>
  )
}

export default Validate2faPage
