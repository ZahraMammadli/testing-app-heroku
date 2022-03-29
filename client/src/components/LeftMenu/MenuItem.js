import { Link } from "react-router-dom";

export default function MenuItem({ id, name, Icon }) {
  return (
    <div>
      <Link
        style={{ textDecoration: "none", color: "aliceblue" }}
        to={"/" + name.toLowerCase()}
      >
        <h3>
          <span className="mi-icon">{Icon ? <Icon /> : ""}</span>{" "}
          <span className="mi-name"> {name}</span>
        </h3>
      </Link>
    </div>
  );
}
