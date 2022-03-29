import { Search } from "@material-ui/icons";
import "./SearchBar.css";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { SEARCH_PREDICTIONS } from "../../utils/mutations";
import { useState } from "react";
import Feed from "../../components/PredictionStream/feed";

export default function SearchBar() {
  const [search, { loading, error }] = useMutation(SEARCH_PREDICTIONS);
  const { register, handleSubmit, control } = useForm();
  const [searchText, setSearchText] = useState("");
  const [predictions, setPredictions] = useState([]);
  const onSubmit = async (payload) => {
    console.log(payload);
  };

  if (loading) {
    return <div>loading</div>;
  }

  if (error) {
    console.log(error);
    return <div>rror</div>;
  }

  const searchPredictions = async () => {
    // Get the current search text

    const res = await search({
      variables: {
        searchString: searchText,
      },
    });

    setPredictions(res.data.searchingPredictions);
  };

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <>
      <form className="search-bar" onSubmit={searchPredictions}>
        <div className="search-bar__input">
          <Search className="search-bar__searchIcon" />
          <input
            placeholder="Search"
            type="text"
            {...register("searchTerm", { required: true })}
            value={searchText}
            onChange={handleSearchTextChange}
          />
        </div>
        <button className="button-style">Search</button>
      </form>
      <Feed predictions={predictions} loading={loading} />
    </>
  );
}
