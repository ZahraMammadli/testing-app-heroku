import LeftMenu from "../../components/LeftMenu/LeftMenu";
import PredictionsForm from "../../components/PredictionsForm/PredictionsForm";
import Feed from "../../components/PredictionStream/feed";
import "./HomePage.css";
import Nebula from "../../assets/videos/Nebula.mp4";
import { QUERY_PREDICTIONS } from "../../utils/queries";
import { useQuery } from "@apollo/client";

export default function () {
  const { loading, data } = useQuery(QUERY_PREDICTIONS);
  const predictions = data?.predictions || [];

  return (
    <div className="feature">
      <video
        autoPlay
        loop
        muted
        style={{
          position: "fixed",
          margin: "0",
          height: "100vh",
          width: "100vw",
          left: "50%",
          top: "50%",
          objectFit: "cover",
          transform: "translate(-50%,-50%)",
          zIndex: "-1",
        }}
      >
        <source src={Nebula} type="video/mp4" />
      </video>
      <div className="w-80">
        <div className="d-flex">
          <div className="left-menu">
            <LeftMenu />
          </div>
          <div className="center-col">
            {/* <WordCloud /> */}
            <PredictionsForm />
            <Feed predictions={predictions} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
}
