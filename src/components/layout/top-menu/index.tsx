import { NavLink } from "react-router";


export const TopMenu = () => {
  return (
    <div className="top-menu">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? " menu-item active-menu-item" : "menu-item"
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/settings"
        className={({ isActive }) =>
          isActive ? " menu-item active-menu-item" : "menu-item"
        }
      >
        Settings
      </NavLink>
    </div>
  );
};
