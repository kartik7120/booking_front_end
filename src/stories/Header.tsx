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
      {/* <Link to="/"> */}
      <div className="flex items-center btn btn-ghost">
        <IoTicketOutline size={30} color="#FEE505" />
        <h1 className='antialiased'>GoWatch</h1>
      </div>
      {/* </Link> */}
      <div>
        <div className="flex flex-row items-center">
          <button className="btn btn-circle">
            <button className="btn" onClick={() => {
              const dialog = document.getElementById("my_modal_2") as HTMLDialogElement;
              if (dialog) {
                dialog.showModal();
              }
            }}>
              <FaSearch />
            </button>
            <dialog id="my_modal_2" className="modal">
              <div className="modal-box w-fit">
                <div className="flex flex-col items-center gap-y-3">
                  <h2 className="text-3xl">Search your movie or event</h2>
                  <label className="input">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
                    <input type="search" className="grow" placeholder="Search" />
                  </label>
                </div>
              </div>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
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
