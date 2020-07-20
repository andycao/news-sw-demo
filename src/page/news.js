import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function News() {
  const { id } = useParams();

  const [detail, setDetail] = useState({});
  const [comments, setComments] = useState([]);

  function detailApi(id) {
    fetch(`/api/news/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setDetail(data);
      });
  }
  function commentsApi(id) {
    fetch(`/api/comments?newsId=${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setComments(data);
      });
  }

  useEffect(() => {
    detailApi(id);
    commentsApi(id);
  }, [id]);

  return (
    <div>
      <h2>{detail.title}</h2>
      <p>author: {detail.author}</p>
      <p>time: {detail.time}</p>
      <p>conent: </p>
      <p>{detail.content}</p>
      <hr></hr>
      <h4>comments:</h4>
      {comments.map((e, i) => {
        return <p key={i}>{e.body}</p>;
      })}
    </div>
  );
}

export default News;
