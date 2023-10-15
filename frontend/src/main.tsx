import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import "slick-carousel/slick/slick.css" // Import slick carousel CSS
import "slick-carousel/slick/slick-theme.css" // Import slick carousel theme CSS
import App from "./App.tsx"
import { AuthProvider } from "./contexts/auth"

import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"
import { MantineProvider } from "@mantine/core"
import { ContextMenuProvider } from "mantine-contextmenu"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 3 * 1000,
    },
  },
})

const bodyClassName = () =>
  "text-sm font-white font-medium block p-3 w-auto flex text-gray-500"

const toastClassName = () =>
  "relative flex p-1 min-h-10 justify-center overflow-hidden cursor-pointer h-16 items-center left-[40%] md:left-0 w-56 md:w-auto bg-slate-100 dark:bg-slate-800 top-8 md:top-0"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <ContextMenuProvider>
          <AuthProvider>
            {/* <ErrorMessage /> */}
            <ToastContainer
              bodyClassName={bodyClassName}
              autoClose={3000}
              toastClassName={toastClassName}
              position="top-right"
            />

            <App />
          </AuthProvider>
        </ContextMenuProvider>
      </MantineProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  </React.StrictMode>
)
