import GridLines from '../components/GridLines';
import {ArrowRightOutlined} from  '@ant-design/icons'; 
import { Link } from 'react-router-dom';

function Homepage() {
  return (
    <>
      <div
        className="bg-custom-dark w-screen h-screen flex justify-center items-center"
        style={{ color: '#d9d9d9' }}
      >
        <p
          className="z-10 relative text-center"
          style={{ marginTop: '-4vw', color: '#d9d9d9' }}
        >
          <p
            className="font-dogica -tracking-tighter font-extrabold"
            style={{ fontSize: '80pt', color: '#1ba94c' }}
          >
            MADAD
          </p>
          <p
            className="text-white text-5xl font-medium"
            style={{ fontSize: '50pt', color: '#d9d9d9' }}
          >
            The Collaborative IDE
          </p>
          <div className="buttons-coll flex gap-4 pt-3">
            <Link to="/temp">
              <button className="p-[3px] relative ">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
                  TempShare <ArrowRightOutlined />
                </div>
              </button>
            </Link>

            <Link to="/code">
              <button className="p-[3px] relative ">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
                  Code Editor + Online Compiler <ArrowRightOutlined />
                </div>
              </button>
            </Link>

            <Link to="/collab">
              <button className="p-[3px] relative ">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
                  Collaborative IDE <ArrowRightOutlined />
                </div>
              </button>
            </Link>
          </div>
        </p>

        <GridLines />
      </div>
    </>
  );
}

export default Homepage;
