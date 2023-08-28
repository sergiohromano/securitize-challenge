export const Layout = ({ children }) => {
  const navbar = (
    <nav>
      <ul>
        <li>Home</li>
        <li>About</li>
      </ul>
    </nav>
  )


  return (
    <div>
      {navbar}
      {children}
    </div>
  )
}
