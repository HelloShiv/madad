import GridLines from '../components/GridLines';
function NotFound() {
  return (
    <div
      className="bg-custom-dark w-screen h-screen flex justify-center items-center"
      style={{ color: '#d9d9d9' }}
    >
      <div className="flex justify-center items-center h-screen z-10">
        <div className="text-center">
          <h2 className="text-red-500 text-5xl mb-4 z-10 font-extrabold">
            404 - Page Not Found
          </h2>
          <p className="text-3xl z-10 font-bold">
            Sorry, the page you are looking for does not exist.
          </p>
        </div>
      </div>
      <GridLines />
    </div>
  );
}

export default NotFound;
