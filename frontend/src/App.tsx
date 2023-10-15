import "./axios"
import { useState, useEffect } from "react"

import { BrowserRouter, Route, Routes } from "react-router-dom"

// import WithPrivateRoute from "./utils/WithPrivateRoute"
import MainFrame from "./mainframe/MainFrame"

import Home from "./routes/home"
import Login from "./routes/auth/login"
import Register from "./routes/auth/register"
import EmailVerificationPage from "./routes/auth/emailverification.page"
import ForgotPasswordPage from "./routes/auth/forgotpassword.page"
import ResetPasswordPage from "./routes/auth/resetpassword.page"
import Validate2faPage from "./routes/auth/validate2fa.page"

import Assistants from "./routes/assistants"
import Translator from "./routes/live_translator"
import ImageCreator from "./routes/image_creator"
import SocialConnection from "./routes/social_connection"

import Help from "./routes/help"

import Profile from "./routes/account/profile"
import Subscription from "./routes/account/subscription"
import Settings from "./routes/account/settings"

import { AssistantSchema } from "./schemas/assistant.schema"
import previewService from "./api.services/preview.service"

export default function App() {
  const [assistantsAll, setAssistantsAll] = useState<AssistantSchema[]>([])
  // setAssistantsAll
  useEffect(() => {
    const fetchData = async () => {
      const assistantsAll = await previewService.getAllAssistants()
      setAssistantsAll(assistantsAll || [])
    }

    void fetchData()
  }, [])

  return (
    <BrowserRouter>
      <MainFrame>
        <Routes>
          <Route path="/">
            {/* Home */}
            <Route index element={<Home assistantsAll={assistantsAll} />} />

            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="verify_email">
              <Route index element={<EmailVerificationPage />} />
              <Route
                path=":verificationCode"
                element={<EmailVerificationPage />}
              />
            </Route>
            <Route path="forgot_password" element={<ForgotPasswordPage />} />
            <Route
              path="resetpassword/:resetCode"
              element={<ResetPasswordPage />}
            />
            <Route path="validate_otp" element={<Validate2faPage />} />

            {/* Assistants */}
            <Route path="assistants">
              <Route
                index
                element={<Assistants assistantsAll={assistantsAll} />}
              />
              <Route
                path=":assistant_persona"
                element={<Assistants assistantsAll={assistantsAll} />}
              />
            </Route>

            {/* Live Translator */}
            <Route path="live_translator">
              <Route index element={<Translator />} />
              <Route path=":translation_id" element={<Translator />} />
            </Route>

            {/* Image Creator */}
            <Route path="image_creator">
              <Route index element={<ImageCreator />} />
            </Route>

            {/* Social Connection */}
            <Route path="social_connection" element={<SocialConnection />} />

            {/* Help */}
            <Route path="help" element={<Help />} />

            {/* Account Settings */}
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
            <Route path="subscription" element={<Subscription />} />
          </Route>
        </Routes>
      </MainFrame>
    </BrowserRouter>
  )
}
