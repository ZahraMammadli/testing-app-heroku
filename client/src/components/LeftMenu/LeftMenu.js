import MenuItem from "./MenuItem";
import HomeIcon from "@material-ui/icons/Home";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import SearchIcon from "@material-ui/icons/Search";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import VisibilityIcon from "@material-ui/icons/Visibility";
import "./LeftMenu.css";

const menuData = [
  {
    id: 1,
    name: "Home",
    icon: HomeIcon,
  },
  {
    id: 2,
    name: "Landing",
    icon: MailOutlineIcon,
  },
  {
    id: 4,
    name: "Login",
    icon: PermIdentityIcon,
  },
  {
    id: 5,
    name: "Search",
    icon: SearchIcon,
  },
];

// make menu responsive:
export default function LeftMenu() {
  return (
    <div>
      {
        <div className="mi">
          {menuData.map((menuItem) => (
            <MenuItem
              key={menuItem.id}
              id={menuItem.id}
              name={menuItem.name}
              Icon={menuItem.icon}
            />
          ))}
        </div>
      }
    </div>
  );
}
