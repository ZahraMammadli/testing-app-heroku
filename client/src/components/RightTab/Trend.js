import "./Trend.css";
export default function ({ trend }) {
  return (
    <div className="t-box">
      <div className="t-body">
        <h3>{trend}</h3>
      </div>
    </div>
  );
}
