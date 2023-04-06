import {
  FaSignInAlt,
  FaUserCircle,
  FaSignOutAlt,
  FaChevronDown,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import withReactContent from "sweetalert2-react-content";
import { Menu, Transition } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import { FC, Fragment, useContext } from "react";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";

import { RootState } from "../utils/types/redux";
import { ThemeContext } from "../utils/context";
import Swal from "../utils/swal";

const Navbar: FC = () => {
  const { uname, isLoggedIn } = useSelector((state: RootState) => state.data);
  const { theme, setTheme } = useContext(ThemeContext);
  // [get, set, delete] = useCookies()
  const [, , removeCookie] = useCookies();
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  function handleTheme(mode: string) {
    setTheme(mode);
  }

  function handleLogout() {
    MySwal.fire({
      title: "Logout",
      text: "Are you sure?",
    }).then((result) => {
      if (result.isConfirmed) {
        removeCookie("tkn");
        removeCookie("uname");
      }
    });
  }

  return (
    <nav className="bg-neutral-200 dark:bg-gray-700 w-full h-14 flex items-center p-3 justify-between">
      <Link className="font-bold" to="/" id="nav-homepage">
        Homepage
      </Link>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button
            className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            id="trigger-menu"
          >
            <FaChevronDown className="h-5 text-violet-200 hover:text-violet-100" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1">
              {isLoggedIn && (
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-violet-500 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      onClick={() => navigate(`/profile/${uname}`)}
                      id="nav-profile"
                    >
                      <FaUserCircle className="h-5 mr-2 w-5" />
                      Profile
                    </button>
                  )}
                </Menu.Item>
              )}
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm capitalize`}
                    onClick={() =>
                      handleTheme(theme === "dark" ? "light" : "dark")
                    }
                    id="nav-profile"
                  >
                    {theme === "dark" ? (
                      <FaSun className="h-5 mr-2 w-5" />
                    ) : (
                      <FaMoon className="h-5 mr-2 w-5" />
                    )}
                    {theme} Mode
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() =>
                      isLoggedIn ? handleLogout() : navigate("/login")
                    }
                    id="nav-login"
                  >
                    {isLoggedIn ? (
                      <>
                        <FaSignOutAlt className="h-5 mr-2 w-5" />
                        Logout
                      </>
                    ) : (
                      <>
                        <FaSignInAlt className="h-5 mr-2 w-5" />
                        Login
                      </>
                    )}
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </nav>
  );
};

export default Navbar;
