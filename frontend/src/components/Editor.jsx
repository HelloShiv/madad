import React, { useEffect, useRef } from 'react';
import { Editor } from '@monaco-editor/react';
import '../styles/editor.css';
import fileImage from '../assets/file.svg';
import searchImage from '../assets/search.svg';
import branchImage from '../assets/branch.png';
import extensionImage from '../assets/extension.svg';
import messageImage from '../assets/message.png';

const CodeEditor = () => {
  const editorOptions = {
    fontSize: '18px',
  };

  return (
    <div className="complete-editor-div">
      <div className="ribbon">
        <div className="ribbonCircle circleOne"></div>
        <div className="ribbonCircle circleTwo"></div>
        <div className="ribbonCircle circleThree"></div>
      </div>
      <div className="window">
        <div className="sidebar">
          <img src={fileImage} alt="" />
          <img src={searchImage} alt="" />
          <img src={branchImage} alt="" />
          <img src={extensionImage} alt="" />
          <img src={messageImage} alt="" />
        </div>
        <div className="two">
          <div className="activeTab Tab" contentEditable={true}>
            Code
          </div>
        </div>

        <Editor theme="vs-dark" language="c" options={editorOptions}></Editor>
      </div>
    </div>
  );
};

export default CodeEditor;
