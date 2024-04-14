import React, { useState, useRef } from 'react';
import { Editor } from '@monaco-editor/react';
import { Select, ConfigProvider } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Modal, Input, Button, Checkbox } from 'antd';
import {
  ResizableHandle,
  ResizablePanelGroup,
  ResizablePanel,
} from './ui/resizable';
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import { MonacoBinding } from 'y-monaco';
import '../styles/codeeditor.css';
import fileImage from '../assets/file.svg';
import searchImage from '../assets/search.svg';
import branchImage from '../assets/branch.png';
import extensionImage from '../assets/extension.svg';
import messageImage from '../assets/message.png';
import Output from './Output';

const { TextArea } = Input;

const Collab = () => {
  const editorRef = useRef(null);
    const [isRunning, setIsRunning] = useState(false); // State to track whether code is running
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [roomId, setRoomId] = useState('');
    const [userName, setUserName] = useState('ayam');
    const [password, setPassword] = useState('');
    const [isPasswordProtected, setIsPasswordProtected] = useState(false);

    const handleJoinRoom = () => {
      // Hide modal and initialize editor
      setIsModalOpen(false);
      initializeEditor();
    };

    const initializeEditor = () => {
      const doc = new Y.Doc();
      const provider = new WebrtcProvider(roomId, doc, {
        signaling: [import.meta.env.VITE_WS],
        password: isPasswordProtected ? password : undefined, // Set password if it's enabled
      });
      const type = doc.getText('monaco');
      const binding = new MonacoBinding(
        type,
        editorRef.current.getModel(),
        new Set([editorRef.current]),
        provider.awareness
      );
      const awareness = provider.awareness;

      awareness.on('change', changes => {
        const userNames = [];
        Array.from(awareness.getStates().values()).forEach(state => {
          if (state.user && state.user.name) {
            userNames.push(state.user.name);
          }
        });
        console.log(userNames);
      });

      awareness.setLocalStateField('user', {
        name: userName,
        color: '#ffb61e',
      });

      console.log(provider.awareness);
    };

    const handleCancel = () => {
      setIsModalOpen(false);
    };

    const handlePasswordToggle = checked => {
      setIsPasswordProtected(checked);
    };
    
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
            <div>
              <Modal
                title="Join Room"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={[
                  <Button key="cancel" onClick={handleCancel}>
                    Cancel
                  </Button>,
                  <Button key="join" type="primary" onClick={handleJoinRoom}>
                    Join
                  </Button>,
                ]}
              >
                <Input
                  placeholder="Enter Room ID"
                  value={roomId}
                  onChange={e => setRoomId(e.target.value)}
                />
                <br />
                <br />
                <TextArea
                  placeholder="Enter Your Name"
                  value={userName}
                  onChange={e => setUserName(e.target.value)}
                  autoSize={{ minRows: 1, maxRows: 2 }}
                />
                <br />
                <br />
                <Input.Password
                  placeholder="Enter Password (optional)"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  disabled={!isPasswordProtected}
                />
                <br />
                <br />
                <Checkbox
                  onChange={e => handlePasswordToggle(e.target.checked)}
                >
                  Password Protected
                </Checkbox>
              </Modal>
              <Editor
                height="100vh"
                width="100vw"
                theme="vs-dark"
                language={selectedLanguage === 'c++' ? 'cpp' : selectedLanguage}
                options={editorOptions}
                onMount={(editor, monaco) => {
                  editorRef.current = editor;
                }}
              />
            </div>
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

export default Collab;
