import { Link } from "jsxte-web-frames";
import { MainUrl } from "../../../routes/view-routes/main-urls";

export const Navbar = (): JSX.Element => {
  return (
    <nav class="navbar_box">
      <Link frameName="root" href={MainUrl.Home}>
        Home
      </Link>
      <Link frameName="root" href={MainUrl.Career}>
        My Career
      </Link>
      <Link frameName="root" href={MainUrl.HobbyProjects}>
        My Hobby Projects
      </Link>
    </nav>
  );
};
