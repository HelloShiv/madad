import GridLines from '../components/GridLines';

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
        </p>

        <GridLines />
      </div>
    </>
  );
}

export default Homepage;
