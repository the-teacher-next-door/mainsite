import React from "react";
import { Editor } from "react-draft-wysiwyg";
const EditorNew = props => {
  return (
    <Editor
      editorState={props.editorState}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="editorClassName"
      onEditorStateChange={props.onEditorStateChange}
    />
  );
};

export default EditorNew;
