import React from "react";
import { Editor } from "react-draft-wysiwyg";
const EditorNew = props => {
  return (
    <Editor
      editorState={props.editorState}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName={props.editorClassName}
      onEditorStateChange={props.onEditorStateChange}
      toolbar={props.toolbar}
    />
  );
};

export default EditorNew;
