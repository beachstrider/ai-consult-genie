import {
  createContext,
  FC,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react"
import userService from "../api.services/user.service"
import authService from "../api.services/auth.service"
import {
  UserSchema,
  UserLoginSchema,
  UserRegisterSchema,
} from "../schemas/user.schema"

type AuthContextType = {
  currentUser: UserSchema | undefined
  setCurrentUser: (user: UserSchema | undefined) => void
  error: any
  setError: any
  register: (data: UserRegisterSchema) => any
  login: (data: UserLoginSchema) => void
  logout: () => void
  // updateUserProfile: any;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

interface AuthContextProviderProps {
  children: ReactNode
}

const AuthProvider: FC<AuthContextProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserSchema>()
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState("")

  // Check if there is a currently active session
  // when the provider is mounted for the first time.
  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const user = await userService.getProfile()
        setCurrentUser(user)
      } catch (error) {
        setCurrentUser(undefined)
      }
    }
    void fetchUserProfile()
  }, [])

  function register(data: UserRegisterSchema) {
    return authService.register(data)
  }

  const login = async (data: UserLoginSchema) => {
    console.log("auth login ...")
    await authService.login(data)
    console.log("auth logged in !")

    const user = await userService.getProfile()
    setCurrentUser(user)
  }

  const logout = () => {
    console.log("auth logout ...")
    void authService.logout()
    setCurrentUser(undefined)
    console.log("auth logged out !")
  }

  // function updateUserProfile(user, profile) {
  //   return updateProfile(user, profile);
  // }

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     setCurrentUser(user);
  //     setLoading(false);
  //   });

  //   return unsubscribe;
  // }, []);

  const value = {
    currentUser,
    setCurrentUser,
    error,
    setError,
    login,
    register,
    logout,
    // updateUserProfile,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
      {/* {!loading && children}{" "} */}
    </AuthContext.Provider>
  )
}

const useAuth = (): AuthContextType => {
  return useContext(AuthContext)
}

export { AuthProvider, useAuth }
