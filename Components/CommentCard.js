import React, { useState, useEffect } from "react";
import PBtn from "./PBtn";
import Input from "./Input";
import api from "../utils/api";
import ContainerFluid from "../Components/FormatComponents/ContainerFluid";
import Container from "../Components/FormatComponents/Container";
import Columns from "../Components/FormatComponents/Columns";
import Column from "../Components/FormatComponents/Column";
const CommentCard = props => {
  const [replies, setReplies] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [repliesDate, setRepliesDate] = useState("");
  const [buttonText, setButtonText] = useState("Reply");
  const [nameError, setNameError] = useState(false);
  const [textAreaError, setTextAreaError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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

  const submitReply = async e => {
    e.preventDefault();
    const fd = new FormData(e.target);
    let data = {
      name: fd.get("firstname"),
      comment: fd.get("comment"),
      blogId: props.blogId,
      reply: true,
      respondingTo: props.id
    };

    setNameError(false);
    setTextAreaError(false);
    setErrorMessage("");

    let submit = await api.submitReply(data);
    switch (submit.data.message) {
      case "name is required":
        setNameError(true);
        setErrorMessage("Name is required.");
        break;
      case "comment is required":
        setTextAreaError(true);
        setErrorMessage("Comment is required.");
        break;
      case "Please select captcha.":
        setErrorMessage("Please select captcha.");
        break;
      case "Failed verification":
        setErrorMessage("Captcha failed.");
        break;
      default:
        api.loadReplies(props.id).then(replies => {
          setReplies(replies.data);
        });
        break;
    }
  };

  // show the reply form for whatever comment chain you are in
  const showForm = () => {
    let form = document.getElementById(props.id);
    console.log(props.id);
    if (form.style.display === "none") {
      setButtonText("Close");
      form.style.display = "block";
    } else {
      setNameError(false);
      setTextAreaError(false);
      setErrorMessage("");
   
      setButtonText("Reply");
      form.style.display = "none";
    }
  };
  return (
    <>
      <Columns className="is-multiline is-centered">
        <Column className="is-2">
          {/* title */}
          <h2>{props.name}</h2>
        </Column>
        <Column className="is-8">
          {/*comment  */}
          <p>{props.comment}</p>
        </Column>
        <Column className="is-2 date-column">
          {/*date  */}
          <span className="lightFont">{date}</span>
          <PBtn type="submit" onClick={showForm} className="replyButton">
            {buttonText}
          </PBtn>
        </Column>
      </Columns>
      {/* rely form */}
      <Columns>
        <Column>
          <form className="replyForm" id={props.id} onSubmit={submitReply}>
            <Input
              type="text"
              name="firstname"
              className={`commentInput ${nameError ? "inputError" : ""}`}
              placeholder="Name"
            />
            <textarea
              name="comment"
              className={`comment-textarea ${
                textAreaError ? "inputError" : ""
              }`}
              placeholder="Add your reply..."
            ></textarea>

            <PBtn className="submitReplyBtn" type="submit">
              Submit Reply
            </PBtn>
            <p className="errorText">{errorMessage}</p>
          </form>
        </Column>
      </Columns>

      {/* replies */}
      {replies.map(reply => {
        return (
          <Columns className="is-multiline is-centered replies">
            <Column className="is-2">
              {/* title */}
              <h2>{reply.name}</h2>
            </Column>
            <Column className="is-8">
              {/*comment  */}
              <p>{reply.comment}</p>
            </Column>
            <Column className="is-2 date-column">{/*date  */}</Column>
          </Columns>
        );
      })}
    </>
    // old
    // <div className="column is-8 card">
    //   <div className="title">
    //     <h2>{props.name}</h2>
    //     <span className="flex-end">
    //       <span className="lightFont">
    //         {date} {time}
    //       </span>
    //     </span>
    //   </div>
    //   <div className="content">
    //     <div>
    //       <p>{props.comment}</p>
    //     </div>
    //     <PBtn type="submit" onClick={showForm} className="replyButton">
    //       Reply
    //     </PBtn>
    //     <form className="replyForm" id={props.id} onSubmit={submitReply}>
    //       <PBtn type="button" onClick={closeForm}>
    //         Close
    //       </PBtn>
    //       <Input type="text" name="firstname" />
    //       <textarea name="comment"></textarea>
    //       <PBtn type="submit">Reply</PBtn>
    //     </form>
    //   </div>
    //   <div className="replies">
    //     {replies.map(reply => {
    //       return (
    //         <div className="card">
    //           <div className="title">
    //             <h2>{reply.name}</h2>
    //             <span className="flex-end">
    //               <span className="lightFont">
    //                 {date} {time}
    //               </span>
    //             </span>
    //           </div>
    //           <div className="content">
    //             <div>
    //               <p>{reply.comment}</p>
    //             </div>
    //           </div>
    //         </div>
    //       );
    //     })}
    //   </div>
    // </div>
  );
};

export default CommentCard;
