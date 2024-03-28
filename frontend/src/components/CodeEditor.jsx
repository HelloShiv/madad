import React, { useState, useRef } from 'react';
import { Editor } from '@monaco-editor/react';
import { Select, ConfigProvider } from 'antd';
import { DownOutlined, CaretRightFilled } from '@ant-design/icons';
import { FloatButton } from 'antd';
import {
  ResizableHandle,
  ResizablePanelGroup,
  ResizablePanel,
} from './ui/resizable';
import '../styles/codeeditor.css';
import fileImage from '../assets/file.svg';
import searchImage from '../assets/search.svg';
import branchImage from '../assets/branch.png';
import extensionImage from '../assets/extension.svg';
import messageImage from '../assets/message.png';
import Output from './Output';
import { CODE_SNIPPETS } from '../constants';

const CodeEditor = () => {
  const editorRef = useRef();
  const [isRunning, setIsRunning] = useState(false); // State to track whether code is running

  const onMount = editor => {
    editorRef.current = editor;
    editor.focus();
  };

  const editorOptions = {
    fontSize: '18px',
  };

  const languageOptions = [
    'javascript',
    'typescript',
    'python',
    'java',
    'csharp',
    'php',
    'matl',
    'bash',
    'befunge93',
    'bqn',
    'brachylog',
    'cjam',
    'clojure',
    'cobol',
    'coffeescript',
    'cow',
    'crystal',
    'dart',
    'dash',
    'fsharp',
    'dragon',
    'elixir',
    'emacs',
    'emojicode',
    'erlang',
    'file',
    'forte',
    'forth',
    'freebasic',
    'awk',
    'c',
    'c++',
    'd',
    'fortran',
    'go',
    'golfscript',
    'groovy',
    'haskell',
    'iverilog',
    'japt',
    'jelly',
    'julia',
    'kotlin',
    'lisp',
    'llvm_ir',
    'lolcode',
    'lua',
    'nim',
    'ocaml',
    'octave',
    'osabie',
    'paradoc',
    'pascal',
    'perl',
    'ponylang',
    'prolog',
    'pure',
    'powershell',
    'pyth',
    'python2',
    'racket',
    'raku',
    'retina',
    'rockstar',
    'rscript',
    'ruby',
    'rust',
    'samarium',
    'scala',
    'smalltalk',
    'sqlite3',
    'swift',
    'vlang',
    'vyxal',
    'yeethon',
    'zig',
  ];

  const [selectedLanguage, setSelectedLanguage] = useState('plaintext');
  console.log('selected language ', selectedLanguage);
  console.log(CODE_SNIPPETS[selectedLanguage]);
  // Event handler for when the language selection changes
  const handleLanguageChange = value => {
    setSelectedLanguage(value);
    // console.log(value, 'selected');
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
        <div className="two pl-1">
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#1E1E1E',
                colorBgContainer: '#1E1E1E',
                colorTextPlaceholder: 'white',
                colorBorder: '#1E1E1E',
                colorPrimaryHover: '#1E1E1E',
                controlOutline: 'none',
                colorText: 'white',

                colorBgElevated: '#313030',
              },
            }}
          >
            <Select
              suffixIcon={<DownOutlined style={{ color: 'white' }} />}
              showSearch
              style={{
                width: 150,
              }}
              placeholder="Select language"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? '').includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '')
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? '').toLowerCase())
              }
              options={languageOptions.map(language => ({
                value: language,
                label: language,
              }))}
              onChange={handleLanguageChange} // Update the selected language
            />
          </ConfigProvider>
        </div>

        <ResizablePanelGroup direction="vertical">
          <ResizablePanel>
            <Editor
              theme="vs-dark"
              language={selectedLanguage === 'c++' ? 'cpp' : selectedLanguage}
              value={CODE_SNIPPETS[selectedLanguage]}
              options={editorOptions}
              onMount={onMount}
            ></Editor>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={13} minSize={4}>
            <div>
              <div className="text-slate-50 p-2 w-screen flex flex-col bg-custom-terminal">
                OUTPUT
              </div>
              <div className="pl-2 text-slate-300 text-l">~/madad/ {'>'}</div>
              <Output editorRef={editorRef} language={selectedLanguage} />{' '}
              {/* Pass selected language to Output */}
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default CodeEditor;
