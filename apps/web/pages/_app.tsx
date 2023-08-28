import { SessionProvider } from "next-auth/react"
import { QueryClient, QueryClientProvider } from "react-query"
import './../styles/global.css'

const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </QueryClientProvider>
  )
}
