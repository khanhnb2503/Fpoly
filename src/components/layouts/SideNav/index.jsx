import { useState } from "react";
import { Link } from "react-router-dom";

import { RoutesList } from '../../../routes';

function SideNav() {
  const [active, setActive] = useState(1)
  return (
    <div className="wrapper__sidenav">
      <ul>
        {RoutesList.map((route, index) => (
          <li key={index}>
            <Link
              to={route.path}
              className={active === index ? 'active' : ''}
              onClick={() => setActive(route.id)}
            >
              {route.icon}
              <span>{route.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideNav;