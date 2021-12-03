let movesTrack: Array<Array<number>> = [];

let currentCoordinates = { x: 0, y: 0 };

let directionState = "N";
let commands = "RFLFFLRF";
let roomSize;

const allDirections = ["N", "E", "S", "W"];

const changeDirection = (direction: number, directionFromCommand: string) => {
  const currentDirectionindex = allDirections.indexOf(directionFromCommand);
  const newDirectionIndex = currentDirectionindex + direction;
  const newDirectionRight =
    allDirections[newDirectionIndex > 3 ? 0 : newDirectionIndex];
  const newDirectionLeft =
    allDirections[newDirectionIndex < 0 ? 3 : newDirectionIndex];
  return direction == 1 ? newDirectionRight : newDirectionLeft;
};

const renderingRobot = () => {
  let movesTrackForRending = [...movesTrack];

  const element = (index: number) => {
    let rowCellnumber = roomSize - movesTrackForRending[index][1] - 2;

    let rowTarget = document.getElementsByClassName("row")[rowCellnumber];
    let column: any = rowTarget.children[movesTrackForRending[index][0] + 1];
    return column;
  };
  for (let i = 0; i < commands.length; i++) {
    let column = element(i);
    ((index) => {
      setTimeout(() => {
        const img = document.createElement("img");
        img.src = "src/robot.png";
        try {
          element(index - 1).children[0].remove();
        } catch (error) {}
        try {
          column.append(img);
          column.style.backgroundColor = "yellow";
        } catch (error) {}
      }, i * 500);
    })(i);
  }
  movesTrack = [];
};

const northMove = [0, 1];
const eastMove = [1, 0];
const southMove = [0, -1];
const westMove = [-1, 0];

const movingForward = () => {
  const collectionImg = document.querySelectorAll("img");
  for (const elem of collectionImg) {
    elem.remove();
  }
  const collectionStyle = document.querySelectorAll("span");
  for (const elem of collectionStyle) {
    elem.style = null;
  }

  let latestMove = [...movesTrack].reverse()[0];
  let currentDirection = directionState;
  let MoveX_Axis: number, MoveY_Axis: number;

  const oneCommand = commands.split("");
  oneCommand.forEach((command) => {
    if (command == "R" || command == "L") {
      currentDirection =
        command == "R"
          ? changeDirection(1, currentDirection)
          : changeDirection(-1, currentDirection);
    }
    if (command == "F") {
      if (currentDirection == "N") {
        MoveX_Axis = latestMove[0] + northMove[0];
        MoveY_Axis = latestMove[1] + northMove[1];
      } else if (currentDirection == "E") {
        MoveX_Axis = latestMove[0] + eastMove[0];
        MoveY_Axis = latestMove[1] + eastMove[1];
      } else if (currentDirection == "S") {
        MoveX_Axis = latestMove[0] + southMove[0];
        MoveY_Axis = latestMove[1] + southMove[1];
      } else {
        MoveX_Axis = latestMove[0] + westMove[0];
        MoveY_Axis = latestMove[1] + westMove[1];
      }

      const newXCoordinate =
        MoveX_Axis > roomSize || MoveX_Axis < 0 ? latestMove[0] : MoveX_Axis;
      const newYCoordinate =
        MoveY_Axis > roomSize || MoveY_Axis < 0 ? latestMove[1] : MoveY_Axis;
      latestMove = [newXCoordinate, <number>newYCoordinate];
      movesTrack.push([newXCoordinate, <number>newYCoordinate]);

      currentCoordinates.x = newXCoordinate;
      currentCoordinates.y = newYCoordinate;
    }
  });

  const h3 = document.getElementsByTagName("h3");
  h3[0].innerText = `Current coordinates:${JSON.stringify(currentCoordinates)}`;
  h3[1].innerText = `Current direction:${currentDirection}`;

  renderingRobot();
};

document
  .getElementsByTagName("form")[1]
  .addEventListener("click", (event: any) => {
    event.preventDefault();

    if (event.target.nodeName == "BUTTON") {
      commands = document.getElementsByTagName("form").commands[0].value;
      directionState = document.getElementsByTagName("form").commands[2].value;
      let coordinates = document
        .getElementsByTagName("form")
        .commands[1].value.split("");
      currentCoordinates.x = parseInt(coordinates[0]);
      currentCoordinates.y = parseInt(coordinates[2]);
      movesTrack.push([currentCoordinates.x, currentCoordinates.y]);
      movingForward();
    }
  });

document
  .getElementsByTagName("form")[0]
  .addEventListener("click", (event: any) => {
    event.preventDefault();
    roomSize = event.target.value;
    const container = document.getElementsByClassName("container")[0];
    container.innerHTML = "";
    let spanElement = [];
    let spanElementNumbered = [];
    for (let i = 0; i < roomSize; i++) {
      const span = "<span class='item'></span>";
      const spanNumbred = `<span class='item'>${i == 0 ? "" : i - 1}</span>`;
      spanElement.push(span);
      spanElementNumbered.push(spanNumbred);
    }

    for (let i = 0; i < roomSize; i++) {
      const div = document.createElement("div");
      div.className = "row";
      div.innerHTML =
        roomSize == i + 1 ? spanElementNumbered.join("") : spanElement.join("");
      div.children[0].innerText =
        roomSize - 2 - i !== -1 ? roomSize - 2 - i : "";
      container.append(div);
    }
    const row = document.getElementsByClassName("row");
    const cell = row[row.length - 2].children[1];
    const img = document.createElement("img");
    img.src = "src/robot.png";

    cell.append(img);
  });

window.addEventListener("DOMContentLoaded", () => {
  const h3 = document.getElementsByTagName("h3");
  h3[0].innerText = `End position coordinates:${JSON.stringify(
    currentCoordinates
  )}`;
  h3[1].innerText = `End position direction:${directionState}`;
});
