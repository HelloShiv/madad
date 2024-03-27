import React, { useState } from 'react';
import { Editor } from '@monaco-editor/react';
import { Select, ConfigProvider } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import '../styles/editor.css';
import fileImage from '../assets/file.svg';
import searchImage from '../assets/search.svg';
import branchImage from '../assets/branch.png';
import extensionImage from '../assets/extension.svg';
import messageImage from '../assets/message.png';

const CodeEditor = () => {
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

  // State to store the selected language
  const [selectedLanguage, setSelectedLanguage] = useState('plaintext');

  // Event handler for when the language selection changes
  const handleLanguageChange = value => {
    setSelectedLanguage(value);
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
          theme="vs-dark"
          language={selectedLanguage} // Set the language based on selectedLanguage
          options={editorOptions}
        ></Editor>
      </div>
    </div>
  );
};

export default CodeEditor;
