import SearchBar from "../SearchBar/SearchBar";
import "./RightTab.css";
import Trend from "./Trend";

const trends = [
  { id: 1, name: "#Trend1" },
  { id: 2, name: "#Trend2" },
  { id: 3, name: "#Trend3" },
  { id: 4, name: "#Trend4" },
];

export default function RightTab() {
  return (
    <div className="right-tab">
      <SearchBar />
      <div className="">
        {trends.map((t) => (
          <Trend key={t.id} trend={t.name} />
        ))}
      </div>
    </div>
  );
}
