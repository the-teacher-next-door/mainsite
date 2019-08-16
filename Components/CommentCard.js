import React, { useState, useEffect } from "react";
import PBtn from "./PBtn";
import Input from "./Input";
import api from "../utils/api";

const CommentCard = props => {
  const [replies, setReplies] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  useEffect(() => {
    api.loadReplies(props.id).then(replies => {
      setReplies(replies.data);

      // date sections
      let today = new Date(parseInt(props.date));
      var dd = today.getDate();

      var mm = today.getMonth() + 1;
      var yyyy = today.getFullYear();
      var hours = today.getHours();
      let timeOfDay = hours > 12 ? "pm" : "am";
      hours = hours > 12 ? hours - 12 : hours;
      let min = today.getMinutes();
      min = min < 10 ? "0" + min : min;
      let time = `${hours}:${min}${timeOfDay}`;
      setTime(time);
      if (dd < 10) {
        dd = "0" + dd;
      }
      if (mm < 10) {
        mm = "0" + mm;
      }
      today = mm + "/" + dd + "/" + yyyy;
      setDate(today);
    });
  }, [props.date, props.id]);

  const submitReply = e => {
    e.preventDefault();
    const fd = new FormData(e.target);

    let data = {
      name: fd.get("firstname"),
      comment: fd.get("comment"),
      blogId: props.blogId,
      reply: true,
      respondingTo: props.id
    };

    api.submitComment(data).then(done => {
      api.loadReplies(props.id).then(replies => {
        setReplies(replies.data);
      });
    });
  };

  // show the reply form for whatever comment chain you are in
  const showForm = () => {
    console.log(props.id);
    document.getElementById(props.id).style.display = "block";
  };

  const closeForm = () => {
    document.getElementById(props.id).style.display = "none";
  };
  return (
    <div className="column is-8 card">
      <div className="title">
        <h2>{props.name}</h2>
        <span className="flex-end">
          <span className="lightFont">
            {date} {time}
          </span>
        </span>
      </div>
      <div className="content">
        <div>
          <p>{props.comment}</p>
        </div>
        <PBtn type="submit" onClick={showForm} className="replyButton">
          Reply
        </PBtn>
        <form className="replyForm" id={props.id} onSubmit={submitReply}>
          <PBtn type="button" onClick={closeForm}>
            Close
          </PBtn>
          <Input type="text" name="firstname" />
          <textarea name="comment"></textarea>
          <PBtn type="submit">Reply</PBtn>
        </form>
      </div>
      <div className="replies">
        {replies.map(reply => {
          return (
            <div className="card">
              <div className="title">
                <h2>{reply.name}</h2>
                <span className="flex-end">
                  <span className="lightFont">
                    {date} {time}
                  </span>
                </span>
              </div>
              <div className="content">
                <div>
                  <p>{reply.comment}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommentCard;
