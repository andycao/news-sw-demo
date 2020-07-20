import React, { useEffect, useState } from "react";

import { useHistory } from "react-router-dom";

function List() {
  const [list, setList] = useState([]);
  const history = useHistory();

  function listAPi() {
    fetch("/api/news")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setList(data);
      });
  }

  useEffect(() => {
    listAPi();
  }, []);

  return (
    <div>
      {list.map((e, index) => {
        return (
          <div
            key={index}
            className="title"
            style={{
              border: "1px solid #eee",
              margin: "10px auto",
              padding: "10px",
            }}
            onClick={() => {
              history.push(`/news/${e.id}`);
            }}
          >
            <h2>{e.title}</h2>
            <p>
              {e.author} - {e.time}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default List;
