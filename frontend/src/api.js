import axios from 'axios';

const API = axios.create({
  baseURL: 'https://emkc.org/api/v2/piston',
});

export const executeCode = async (language, sourceCode) => {
  try {
    // Fetch language versions
    const response = await API.get('/runtimes');
    const languageVersions = {};
    response.data.forEach(({ language, version }) => {
      languageVersions[language] = version;
    });

    // Check if the requested language is available
    if (!(language in languageVersions)) {
      throw new Error(`Language ${language} is not available.`);
    }

    // Execute code using the fetched version
    const executeResponse = await API.post('/execute', {
      language: language,
      version: languageVersions[language],
      files: [{ content: sourceCode }],
    });

    return executeResponse.data;
  } catch (error) {
    console.error('Error executing code:', error);
    throw error;
  }
};
