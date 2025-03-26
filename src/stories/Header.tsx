import { IoTicketOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import './header.css';

type User = {
  name: string;
};

export interface HeaderProps {
  user?: User;
  onLogin?: () => void;
  onLogout?: () => void;
  onCreateAccount?: () => void;
}

export const Header = ({ user, onLogin, onLogout, onCreateAccount }: HeaderProps) => (
  <header>
    <div className="storybook-header">
      {/* <div className="flex flex-row justify-between w-max"> */}
      <div className="flex items-center">
        <IoTicketOutline size={30} color="#FEE505" />
        <h1 className='antialiased'>GoWatch</h1>
      </div>
      {/* </div> */}
      <div>
        <div className="flex flex-row items-center">
          <button className="btn btn-circle">
            <FaSearch />
          </button>
          <button className="btn">
            <p className="text-lg">
              Home
            </p>
          </button>
          <button className="btn">
            <p className="text-lg">
              Movies
            </p>
          </button>
          <button className="btn">
            <p className="text-lg">
              Events
            </p>
          </button>
          {user ? (
            <div className="dropdown dropdown-center">
              <div tabIndex={0} role="button" className="btn btn-btn-circle m-1">
                <FaUser onClick={onLogout} />
              </div>
              <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                <li><a>Item 1</a></li>
                <li><a>Item 2</a></li>
              </ul>
            </div>
          ) : (
            <>
              <button className="btn-outline btn" onClick={onLogin}>Log in</button>
              <button className="btn-outline btn" onClick={onCreateAccount}>Sign up</button>
            </>
          )}
        </div>
      </div>
    </div>
  </header>
);
