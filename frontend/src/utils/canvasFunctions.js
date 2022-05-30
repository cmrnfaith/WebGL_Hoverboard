function calcNewCoords(oldCoords, targetCoords, zoomIn, factor = 3) {
  // var fullDistance = cubeRootCoords(oldCoords);
  var newX = oldCoords.x;
  var newY = oldCoords.y;
  var newZ = oldCoords.z;
  if (zoomIn) {
    newX = oldCoords.x - (oldCoords.x - targetCoords[0]) / factor;
    newY = oldCoords.y - (oldCoords.y - targetCoords[1]) / factor;
    newZ = oldCoords.z - (oldCoords.z - targetCoords[2]) / factor;
  } else {
    newX = oldCoords.x + (oldCoords.x - targetCoords[0]) / factor;
    newY = oldCoords.y + (oldCoords.y - targetCoords[1]) / factor;
    newZ = oldCoords.z + (oldCoords.z - targetCoords[2]) / factor;
  }

  var newCoords = { x: newX, y: newY, z: newZ };

  // var distanceToZoom = cubeRootCoords(newCoords);
  // console.log(`Original Distance: ${fullDistance}`);
  // console.log(`New Distance: ${distanceToZoom}`);

  return newCoords;
}

function cubeRootCoords(position, cameraPosition = [0, 0.8, 0]) {
  var total =
    Math.pow(position.x - cameraPosition[0], 2) +
    Math.pow(position.y - cameraPosition[1], 2) + //to center the calculation from the camera target
    Math.pow(position.z - cameraPosition[2], 2);
  return Math.sqrt(total);
}

function calcPlaneDistance(position) {
  var total =
    Math.pow(position.x, 2) + Math.pow(position.y, 2) + Math.pow(position.z, 2);
  return Math.sqrt(total);
}
module.exports = {
  calcPlaneDistance,
  cubeRootCoords,
  calcNewCoords,
};
