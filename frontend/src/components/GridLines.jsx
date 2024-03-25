function GridLines() {
  // Determine the number of lines based on the screen width and height
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const numberOfVerticalLines = Math.floor(screenWidth / 45); // Adjust 50 as needed for spacing between lines
  const numberOfHorizontalLines = Math.floor(screenHeight / 45); // Adjust 50 as needed for spacing between lines

  // Generate vertical lines and intersection points
  const verticalLines = [];
  const verticalPoints = [];
  for (let i = 0; i < numberOfVerticalLines; i++) {
    const leftPosition = (i + 1) * (100 / (numberOfVerticalLines + 1));
    verticalLines.push(
      <div
        key={`vertical-${i}`}
        className="h-full absolute top-0 bottom-0 border border-custom-white"
        style={{ left: `${leftPosition}%` }}
      ></div>
    );
    for (let j = 0; j < numberOfHorizontalLines; j++) {
      const topPosition = (j + 1) * (100 / (numberOfHorizontalLines + 1));
      verticalPoints.push(
        <div
          key={`point-${i}-${j}`}
          className="absolute w-1 h-1 bg-slate-300 rounded-full"
          style={{
            top: `${topPosition}%`,
            left: `${leftPosition}%`,
            transform: 'translate(-50%, -50%)',
          }}
        ></div>
      );
    }
  }

  // Generate horizontal lines
  const horizontalLines = [];
  for (let i = 0; i < numberOfHorizontalLines; i++) {
    horizontalLines.push(
      <div
        key={`horizontal-${i}`}
        className="w-full absolute left-0 right-0 border border-custom-white"
        style={{ top: `${(i + 1) * (100 / (numberOfHorizontalLines + 1))}%` }}
      ></div>
    );
  }

  return (
    <>
      {verticalLines}
      {horizontalLines}
      {verticalPoints}
    </>
  );
}

export default GridLines;
