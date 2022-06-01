const {
  calcPlaneDistance,
  cubeRootCoords,
  calcNewCoords,
} = require("../utils/canvasFunctions");

test("Coordinate calculations base case is correct.", () => {
  var position = { x: 3, y: 4, z: 0 };
  var cameraTarget = [0, 0, 0];
  expect(cubeRootCoords(position, cameraTarget)).toBe(5);
});

test("Coordinate calculations 3 coords correct distance with camera target.", () => {
  var position = { x: 7, y: 4, z: 3 };
  var cameraTarget = [17, 6, 2];
  expect(cubeRootCoords(position, cameraTarget)).toBeCloseTo(12.569, 2);
});

test("Coordinate calculations edge case of zero distance.", () => {
  var position = { x: 0, y: 0, z: 0 };
  var cameraTarget = [0, 0, 0];
  expect(cubeRootCoords(position, cameraTarget)).toBe(0);
});

test("Calculate plane distance base case.", () => {
  var position = { x: 3, y: 4, z: 0 };
  expect(calcPlaneDistance(position)).toBe(5);
});
test("Calculate plane distance 0 edge case.", () => {
  var position = { x: 0, y: 0, z: 0 };
  expect(calcPlaneDistance(position)).toBe(0);
});
test("Calculate plane distance float case.", () => {
  var position = { x: 7, y: 4, z: 3 };
  expect(calcPlaneDistance(position)).toBeCloseTo(8.602325, 2);
});

test("Calculate new coordinates base case zooming in.", () => {
  var position = { x: 3, y: 4, z: 0 };
  var new_position = [0, 4, 0];
  expect(JSON.stringify(calcNewCoords(position, new_position, true))).toBe(
    JSON.stringify({
      x: 2,
      y: 4,
      z: 0,
    })
  );
});
test("Calculate new coordinates base case zooming in.", () => {
  var position = { x: 3, y: 4, z: 0 };
  var new_position = [0, 4, 0];
  expect(JSON.stringify(calcNewCoords(position, new_position, false))).toBe(
    JSON.stringify({
      x: 4,
      y: 4,
      z: 0,
    })
  );
});
test("Calculate new coordinates all 0 edge case (same coordinates).", () => {
  var position = { x: 0, y: 0, z: 0 };
  var new_position = [0, 0, 0];
  expect(JSON.stringify(calcNewCoords(position, new_position, true))).toBe(
    JSON.stringify({
      x: 0,
      y: 0,
      z: 0,
    })
  );
});
test("Calculate new coordinates all different.", () => {
  var position = { x: 4, y: 5, z: 6 };
  var new_position = [1, 2, 3];
  expect(JSON.stringify(calcNewCoords(position, new_position, true))).toBe(
    JSON.stringify({
      x: 3,
      y: 4,
      z: 5,
    })
  );
});
