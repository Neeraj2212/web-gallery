import Header from "./../components/Header"
import "../styles/globals.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "react-toastify/dist/ReactToastify.min.css"

import { getSession, Provider } from "next-auth/client"

const MyApp = ({ Component, pageProps }) => {
  const { session } = pageProps
  return (
    <Provider options={{ site: process.env.NEXTAUTH_URL }} session={session}>
      <Header {...pageProps} />
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
