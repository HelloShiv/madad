import './styles/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Editor from './components/Editor';
import NotFound from './pages/Notfound';
import CodeEditor from './components/CodeEditor';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/temp" element={<Editor />} />
        <Route path="/code" element={<CodeEditor />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
