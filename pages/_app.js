import Header from "./../components/Header"
import "../styles/globals.css"
import "bootstrap/dist/css/bootstrap.min.css"

import { Provider } from "next-auth/client"

const MyApp = ({ Component, pageProps }) => {
  const { session } = pageProps
  return (
    <Provider options={{ site: process.env.SITE }} session={session}>
      <Header />
      <Component {...pageProps} />
    </Provider>
  )
}
export default MyApp
