import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5002"

export default  NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Email", type: "email", placeholder: "email@mail.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const res = await fetch(`${API_URL}/auth/login`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        })
        const user = await res.json()

        // If no error and we have user data, return it
        if (res.ok && user) {
          return user
        }
        // Return null if user data could not be retrieved
        return null
      },
    })
  ],
  callbacks: {
    async jwt(token, user, account, profile, isNewUser) {
      // Initial sign in
      if (user) {
        token.accessToken = user.access_token
      } else {
      }
      return token
    },
    async session({ session, token }) {
      const accessToken = token.token.user?.access_token || token.user?.access_token;
      session.accessToken = accessToken;
      const res = await fetch(`${API_URL}/auth/profile`, {
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${accessToken}` }
      })
      const profile = await res.json()
      session.user = profile
      return session
    }
  }
})

