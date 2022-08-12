export function moveTo(from, to, duration) {
    /**
     * @param {array} from Array<number> coordinates [x, y, z]
     * @param {array} to Array<number> coordinates [x, y, z]
     * @param {number} duration seconds
     */
  
    const result = [];
  
    const [startX, startY, startZ] = from;
    const [finishX, finishY, finishZ] = to;
  
    let x = startX;
    let y = startY;
    let z = startZ;
  
    const distancePerSec = (finish, start, duration) => {
      return (finish - start) / duration;
    };
  
    const distanceX = distancePerSec(finishX, startX, duration);
    const distanceY = distancePerSec(finishY, startY, duration);
    const distanceZ = distancePerSec(finishZ, startZ, duration);
  
    while (duration >= 1) {
      result.push({ x, y, z });
      x = Math.round(x + distanceX);
      y = Math.round(y + distanceY);
      z = Math.round(z + distanceZ);
      duration--;
    }
    result.push({ x: finishX, y: finishY, z: finishZ });
  
    return result;
  }

  console.log(moveTo([10, 20, 20], [-10, 10, 25], 10));