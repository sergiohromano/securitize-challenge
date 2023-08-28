import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { Dashboard } from "../components/dashboard";
import { LoginButton } from "../components/login-btn";

const Home: NextPage = () => {
  const { data: session } = useSession()
  useEffect(() => {
    if(session){
      localStorage.setItem('accessToken', session.accessToken)
      localStorage.setItem('session', JSON.stringify(session))
    }
  }, [session])
  return (
    <>
      <LoginButton />
      {!!session && (
        <Dashboard />
      )}
    </>
  )
};

export default Home;
