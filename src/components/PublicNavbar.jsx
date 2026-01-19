export default function PublicNavbar() {
  return (
    <nav className="navbar bg-base-100 shadow-sm top-0 sticky z-999 justify-between px-8">
      <div className="w-[150px] h-10 scale-130">
        <img
          alt="mharada logo"
          src="/logo.svg"
          className="w-full h-full object-cover"
        />
      </div>

      <a href="/login">
        <button className="btn btn-neutral">Log In</button>
      </a>
    </nav>
  )
}
