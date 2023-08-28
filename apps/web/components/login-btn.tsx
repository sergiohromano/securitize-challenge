import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "ui"
export function LoginButton() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Hi, {session.user.email}! <br />
        <Button 
          onClick={() => signOut()}>Sign out</Button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <Button 
        onClick={() => signIn()}>Sign in</Button>
    </>
  )
}
