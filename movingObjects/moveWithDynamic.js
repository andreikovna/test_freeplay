function moveWithDynamic(from, to, speed, acceleration, deceleration) {
  /**
   * @param {array} from Array<number> coordinates [x, y, z]
   * @param {array} to Array<number> coordinates [x, y, z]
   * @param {number} speed distance per a second
   * @param {number} acceleration seconds to accelerate
   * @param {number} deceleration seconds to decelerate
   */

  const [startX, startY] = from;
  const [finishX, finishY] = to;

  let x = startX;
  let y = startY;

  const result = [{ x: startX, y: startY }];

  const dx = finishX - startX;
  const dy = finishY - startY;
  const angle = Math.atan2(dy, dx);

  const distance = (start, finish) => {
    const [startX, startY] = start;
    const [finishX, finishY] = finish;
    return Math.sqrt(
      Math.pow(finishX - startX, 2) + Math.pow(finishY - startY, 2)
    );
  };

  const getDisXY = (speed) => {
    const disX = speed * Math.cos(angle);
    const disY = speed * Math.sin(angle);

    return { disX, disY };
  };

  const getDynamicSpeed = (speed, time, dynamic) => {
    const result = [];
    let currentSpeed = speed;
    let distance = 0;
    while (time > 0) {
      currentSpeed = currentSpeed / 2;
      dynamic ? result.unshift(currentSpeed) : result.push(currentSpeed);
      time--;
      distance = distance + currentSpeed;
    }
    return { result, distance };
  };

  const getCoordinates = (arraySpeed) => {
    arraySpeed.map((speed, index) => {
      const { disX, disY } = getDisXY(speed);
      x = x + disX;
      y = y + disY;
      index === arraySpeed.length - 1
        ? result.push({ x: finishX, y: finishY })
        : result.push({ x, y });
    });
  };

  const wholeDistance = distance(from, to);

  const { result: arrAccelerateSpeed, distance: accelerateDistance } =
    getDynamicSpeed(speed, acceleration, true);
  const { result: arrDecelerateSpeed, distance: decelerateDistance } =
    getDynamicSpeed(speed, deceleration, false);
  const distanceWithPermanentSpeed =
    wholeDistance - accelerateDistance - decelerateDistance;

  const timeWithPermanentSpeed = Math.round(distanceWithPermanentSpeed / speed);
  const arrPermanentSpeed = Array(timeWithPermanentSpeed).fill(speed);

  getCoordinates([
    ...arrAccelerateSpeed,
    ...arrPermanentSpeed,
    ...arrDecelerateSpeed,
  ]);

  return result;
}

// console.log(moveWithDynamic([10, 25], [-20, 10], 5, 3, 4));
