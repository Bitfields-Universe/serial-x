import { NavLink } from "react-router";


export const TopMenu = () => {
  return (
    <div className="top-menu">
      <NavLink
        to="/settings"
        className={({ isActive }) =>
          isActive ? " menu-item active-menu-item" : "menu-item"
        }
      >
        SETTINGS
      </NavLink>

      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? " menu-item active-menu-item" : "menu-item"
        }
      >
        <div className="logo">
          <p>SERIAL <span className="letter-x">X</span></p>
        </div>
      </NavLink>
    </div>
  );
};
