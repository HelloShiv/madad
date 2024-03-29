import React, { useState, useEffect, useRef } from 'react';
import { Editor } from '@monaco-editor/react';
import { Select, ConfigProvider, notification, FloatButton } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { ShareAltOutlined } from '@ant-design/icons';
import '../styles/editor.css';
import fileImage from '../assets/file.svg';
import searchImage from '../assets/search.svg';
import branchImage from '../assets/branch.png';
import extensionImage from '../assets/extension.svg';
import messageImage from '../assets/message.png';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams hook to extract URL parameters

const SharedEditor = () => {
  const editorOptions = {
    fontSize: '18px',
    backgroundColor: '#f0f2f5',
  };

  // Array containing the language options
  const languageOptions = [
    'plaintext',
    'abap',
    'apex',
    'azcli',
    'bat',
    'bicep',
    'cameligo',
    'clojure',
    'coffeescript',
    'c',
    'cpp',
    'csharp',
    'csp',
    'css',
    'cypher',
    'dart',
    'dockerfile',
    'ecl',
    'elixir',
    'flow9',
    'fsharp',
    'freemarker2',
    'freemarker2.tag-angle.interpolation-dollar',
    'freemarker2.tag-bracket.interpolation-dollar',
    'freemarker2.tag-angle.interpolation-bracket',
    'freemarker2.tag-bracket.interpolation-bracket',
    'freemarker2.tag-auto.interpolation-dollar',
    'freemarker2.tag-auto.interpolation-bracket',
    'go',
    'graphql',
    'handlebars',
    'hcl',
    'html',
    'ini',
    'java',
    'javascript',
    'julia',
    'kotlin',
    'less',
    'lexon',
    'lua',
    'liquid',
    'm3',
    'markdown',
    'mdx',
    'mips',
    'msdax',
    'mysql',
    'objective-c',
    'pascal',
    'pascaligo',
    'perl',
    'pgsql',
    'php',
    'pla',
    'postiats',
    'powerquery',
    'powershell',
    'proto',
    'pug',
    'python',
    'qsharp',
    'r',
    'razor',
    'redis',
    'redshift',
    'restructuredtext',
    'ruby',
    'rust',
    'sb',
    'scala',
    'scheme',
    'scss',
    'shell',
    'sol',
    'aes',
    'sparql',
    'sql',
    'st',
    'swift',
    'systemverilog',
    'verilog',
    'tcl',
    'twig',
    'typescript',
    'vb',
    'wgsl',
    'xml',
    'yaml',
    'json',
  ];
  const editorRef = useRef(null);
  // State to store the selected language and code
  const [selectedLanguage, setSelectedLanguage] = useState('plaintext');
  const [editorCode, setEditorCode] = useState('');
  const { shortId } = useParams(); // Extract shortId from URL

  useEffect(() => {
    if (shortId) {
      // If shortId exists in URL, fetch code snippet
      fetchCodeSnippet();
    }
  }, [shortId]); // Run whenever shortId changes

  // Event handler for when the language selection changes
  const handleLanguageChange = value => {
    setSelectedLanguage(value);
  };

  const fetchCodeSnippet = async () => {
    try {
      console.log(shortId, ' : shortID is');
      const response = await axios.get(
        `${process.env.BACKEND_URL}/getcode/${shortId}`
      );
      if (editorRef.current) {
        editorRef.current.executeEdits(
          [],
          [
            {
              // Clear any existing content and set the new code
              range: editorRef.current.getModel().getFullModelRange(),
              text: response.data.code,
            },
          ]
        );
      }
      console.log(response.data.language);
      setEditorCode(response.data.code);
      setSelectedLanguage(response.data.language);
    } catch (error) {
      console.error('Error fetching code snippet:', error.message);
      notification.error({
        message: 'Failed to fetch code',
        description: 'An error occurred while fetching the code snippet.',
      });
    }
  };

  // Function to send the POST request
  const shareCode = async () => {
    try {
      console.log(`${process.env.BACKEND_URL}`);
      const response = await axios.post(process.env.BACKEND_URL + '/share', {
        language: selectedLanguage,
        code: editorCode,
        expirationTime: '1min',
      });

      console.log(response.data);
      const { shortId } = response.data;
      notification.success({
        message: 'Code shared successfully',
        description: `Short ID: ${shortId}`,
      });
    } catch (error) {
      console.error('Error sharing code:', error.message);
      notification.error({
        message: 'Failed to share code',
        description: 'An error occurred while sharing the code.',
      });
    }
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

        <Editor
          ref={editorRef}
          theme="vs-dark"
          language={selectedLanguage}
          options={editorOptions}
          value={editorCode}
        ></Editor>

        <FloatButton
          shape="circle"
          type="primary"
          style={{ right: 24, bottom: 60, width: 60, height: 60 }}
          icon=<ShareAltOutlined />
          tooltip={<div>Share Code</div>}
          onClick={shareCode}
        />
      </div>
    </div>
  );
};

export default SharedEditor;
