import {
  Navbar as HeroNav,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/react";
import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userToken, setUserToken, userData, setUserData } =
    useContext(AuthContext);
  const navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("token");
    setUserToken(null);
    setUserData(null);
    setIsMenuOpen(false);
    navigate("/");
  }

  return (
    <HeroNav
      onMenuOpenChange={setIsMenuOpen}
      isMenuOpen={isMenuOpen}
      position="sticky"
      className="bg-blue-500 text-white"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link to={"home"} className="text-white">
            <h1 className="font-bold text-inherit text-2xl">Social App</h1>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {userToken && (
          <>
            <NavbarItem>
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  isActive ? "font-bold underline" : ""
                }
              >
                Home
              </NavLink>
            </NavbarItem>
            <NavbarItem>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive ? "font-bold underline" : ""
                }
              >
                Profile
              </NavLink>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      <NavbarContent justify="end">
        {userToken != null ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name={userData?.name}
                size="sm"
                src={userData?.photo}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem as={NavLink} to={"/changePassword"} key="change">
                Change Password
              </DropdownItem>
              <DropdownItem onClick={logOut} key="logout" color="danger">
                Log Out, {userData?.name}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <div className="flex gap-4">
            <NavbarItem>
              <Link to={"/"} className="text-white">
                Login
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link to={"/register"} className="text-white font-bold">
                Register
              </Link>
            </NavbarItem>
          </div>
        )}
      </NavbarContent>

      <NavbarMenu className="bg-blue-500/95 max-w-xs !h-fit !bottom-auto pb-10 shadow-2xl">
        {userToken ? (
          <>
            <NavbarMenuItem>
              <Link
                className="w-fit text-white text-xl py-2"
                to="/home"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link
                className="w-fit text-white text-xl py-2"
                to="/profile"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link
                className="w-fit text-white text-xl py-2"
                to="/changePassword"
                onClick={() => setIsMenuOpen(false)}
              >
                Change Password
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <button
                className="w-fit text-left text-red-600 hover:text-red-800 text-xl py-2 cursor-pointer"
                onClick={logOut}
              >
                Logout
              </button>
            </NavbarMenuItem>
          </>
        ) : (
          <>
            <NavbarMenuItem>
              <Link
                className="w-fit text-white text-xl py-2"
                to="/"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link
                className="w-fit text-white text-xl py-2"
                to="/register"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </NavbarMenuItem>
          </>
        )}
      </NavbarMenu>
    </HeroNav>
  );
}
