import { FiSearch } from "react-icons/fi"
import CinemagicIcon from "./CinemagicIcon"
import { CiMenuBurger } from "react-icons/ci"

export interface NavbarProps {
  isLoggedIn: boolean
}

export default function Navbar(props: NavbarProps) {
  return (
    <div className="flex items-center justify-between m-7">
      {/* Logo */}
      <CinemagicIcon />

      {/* Desktop nav items */}
      <div className="flex flex-row justify-between gap-4 max-sm:hidden">
        <button className="btn btn-ghost"><FiSearch /></button>
        <button className="btn btn-ghost">Movies</button>
        <button className="btn btn-ghost">TV Shows</button>
        {
          props.isLoggedIn ? (
            <div className="avatar avatar-placeholder">
              <div className="bg-neutral text-neutral-content w-8 rounded-full">
                <span className="text-xs">UI</span>
              </div>
            </div>
          ) : (
            <button className="btn btn-primary">Login / Signup</button>
          )
        }
      </div>

      {/* Sidebar toggle button - visible on small screens only */}
      <div className="sm:hidden">
        <div className="drawer drawer-end sm:hidden">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <label htmlFor="my-drawer-4" className="drawer-button btn btn-ghost">
              <CiMenuBurger size={30} />
            </label>
          </div>
          <div className="drawer-side z-50">
            <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

            {/* Sidebar */}
            <div className="relative w-80 min-h-full bg-base-200 p-4">
              {/* Close Button */}
              <label
                htmlFor="my-drawer-4"
                className="btn btn-sm btn-circle absolute right-4 top-4"
              >
                ✕
              </label>
              <ul className="menu mt-12 text-base-content">
                <li><a>Movies</a></li>
                <li><a>TV Shows</a></li>
                {props.isLoggedIn ? (
                  <li><a>Profile</a></li>
                ) : (
                  <li><a>Login / Signup</a></li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
