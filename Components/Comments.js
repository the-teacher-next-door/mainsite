import React, { Component } from "react";
import Input from "./Input";
import PBtn from "./PBtn";
import api from "../utils/api";
import CommentCard from "./CommentCard";
import Column from "./FormatComponents/Column";

class Comments extends Component {
  state = {
    comments: [],
    nameError: false,
    textAreaError: false,
    errorMessage: ""
  };

  componentDidMount() {
    this.loadComments();
  }

  loadComments = () => {
    api.loadComments(this.props.blogId).then(data => {
      console.log(data.data);
      this.setState({
        comments: data.data.reverse()
      });
    });
  };

  formSubmit = async e => {
    e.preventDefault();
    const fd = new FormData(e.target);
    let data = {
      name: fd.get("firstname"),
      comment: fd.get("comment"),
      blogId: this.props.blogId,
      reply: false
    };
    //reset the form inputs
    this.setState({
      nameError: false,
      textAreaError: false,
      errorMessage: ""
    });

    let submit = await api.submitComment(data);
    switch (submit.data.message) {
      case "name is required":
        this.setState({
          nameError: true,
          errorMessage: "Name is required."
        });
        break;
      case "comment is required":
        this.setState({
          textAreaError: true,
          errorMessage: "Comment is required."
        });
        break;
      default:
        this.loadComments();
        break;
    }
    console.log(submit);
  };
  render() {
    return (
      <div className="comments">
        <div className="contianer commentSubmitSection">
          <div className="columns is-multiline is-centered">
            <div className="column is-8 ">
              <h2>
                <i className="far fa-comments"></i>
                <span> </span>
                {this.state.comments.length}
                <span> </span>
                Comments
              </h2>
            </div>
            <div className="column is-8 has-text-centered">
              <form onSubmit={this.formSubmit} id="commentSubmit">
                <div className="columns is-multiline">
                  <div className="column is-12 flex">
                    <Input
                      type="text"
                      name="firstname"
                      placeholder="First Name"
                      className={`commentInput ${
                        this.state.nameError ? "inputError" : ""
                      }`}
                    />
                  </div>
                  <div className="column is-12">
                    <textarea
                      name="comment"
                      cols="30"
                      rows="10"
                      placeholder="Add your comment..."
                      className={`comment-textarea ${
                        this.state.textAreaError ? "inputError" : ""
                      }`}
                    ></textarea>
                  </div>
                  <div className="column is-2">
                    <PBtn type="submit">Submit</PBtn>
                    <p className="errorText">{this.state.errorMessage}</p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="columns is-multiline is-centered">
            {this.state.comments.map(comment => {
              if (comment.reply === false) {
                return (
                  <Column className="is-8 card">
                    <CommentCard
                      name={comment.name}
                      date={comment.date}
                      comment={comment.comment}
                      id={comment._id}
                      blogId={this.props.blogId}
                    />
                  </Column>
                );
              } else {
              }
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Comments;
