import { IoTicketOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { Button } from './Button';
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
            <>
              <span className="welcome">
                Welcome, <b>{user.name}</b>!
              </span>
              <Button size="small" onClick={onLogout} label="Log out" />
            </>
          ) : (
            <>
              <Button size="small" onClick={onLogin} label="Log in" />
              <Button primary size="small" onClick={onCreateAccount} label="Sign up" />
            </>
          )}
        </div>
      </div>
    </div>
  </header>
);
