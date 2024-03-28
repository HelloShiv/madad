import React, { useState } from 'react';
import { Button, FloatButton } from 'antd';
import { CaretRightFilled, LoadingOutlined } from '@ant-design/icons';
import { executeCode } from '../api';

const Output = ({ editorRef, language }) => {
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result, stderr } = await executeCode(language, sourceCode);
      setOutput(result.output);
      setError(stderr || null); // Set stderr as error message if it exists
    } catch (error) {
      console.log(error);
      setError('An error occurred. Please check your code.'); // Set default error message
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div
        style={{
          height: '75vh',
          padding: 8,
          borderRadius: 4,
          color: error ? 'red' : 'white', // Set text color to red if there's an error
          overflowY: 'auto',
        }}
      >
        {output ||
          (error ? (
            <span style={{ color: 'red' }}>{error}</span>
          ) : (
            'Click "Run Code" to see the output here'
          ))}
      </div>
      <FloatButton
        shape="circle"
        type="primary"
        style={{ right: 24, bottom: 60, width: 60, height: 60 }}
        icon={isLoading ? <LoadingOutlined spin /> : <CaretRightFilled />}
        tooltip={<div>Run</div>}
        onClick={runCode}
      />
    </div>
  );
};

export default Output;
