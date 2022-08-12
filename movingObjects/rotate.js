import { moveTo } from "./moveTo.js";

function rotate(from, rotateAt, to, duration) {
  /**
   * @param {array} from Array<number> coordinates [x, y, z]
   * @param {array} rotateAt Array<number> coordinates [x, y, z]
   * @param {array} to Array<number> coordinates [x, y, z]
   * @param {number} duration seconds
   */

  const distance = (start, finish) => {
    const [startX, startY, startZ] = start;
    const [finishX, finishY, finishZ] = finish;
    return Math.sqrt(
      Math.pow(finishX - startX, 2) +
        Math.pow(finishY - startY, 2) +
        Math.pow(finishZ - startZ, 2)
    );
  };

  const distanceBeforeRotate = distance(from, rotateAt);
  const distanceAfterRotate = distance(rotateAt, to);
  const wholeDistance = distanceBeforeRotate + distanceAfterRotate;

  const durationBeforeRotate = Math.round(
    (distanceBeforeRotate * duration) / wholeDistance
  );

  const durationAfterRotate = duration - durationBeforeRotate;

  const coordinatesBeforeRotate = moveTo(from, rotateAt, durationBeforeRotate);
  coordinatesBeforeRotate.pop();
  const coordinatesAfterRotate = moveTo(rotateAt, to, durationAfterRotate);

  return [...coordinatesBeforeRotate, ...coordinatesAfterRotate];
}

console.log(rotate([10, 20, 20], [-10, 10, 25], [10, 20, -30], 10));
