import { useEffect, useState } from "react";
import { getInfo, getTableInfo } from "../services/dataApi";
import Header from "./Header";
import Pitch from "./Pitch";

function Home() {
    const [query, setQuery] = useState("");
  const [info, setInfo] = useState({});
  const [tableInfo, setTableInfo] = useState({});

  useEffect(
    function () {
      if (!query) return;
      getInfo({ query }).then((info) => {
        if(!info) setInfo({});
        else setInfo(info)
      });

      getTableInfo({ query }).then((tableInfo) => {
        if(!tableInfo) setTableInfo({});
        else setTableInfo(tableInfo)
      });
    },
    [query]
  );

  function handleSubmit() {
    setQuery(query);
  }

  return (
    <>
      <Header handleSubmit={handleSubmit} query={query} setQuery={setQuery} />

      {/* {Object.keys(info)?.length>0 && <Pitch info={info} tableInfo={tableInfo} query={query} />} */}
      {info && info.companyName && (
        <Pitch info={info} tableInfo={tableInfo} query={query} />
      )}
    </>
  );
}

export default Home
