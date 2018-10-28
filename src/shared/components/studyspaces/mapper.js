export function getNoiseLevel(quiet) {
  const map = {
    0: 'Talkative',
    1: 'Quiet',
    2: 'Silent',
  };

  return map[quiet];
}

export function getOutletsLevel(outlets) {
  const map = {
    0: 'No outlets',
    1: 'Few outlets',
    2: 'Many outlets',
  };

  return map[outlets];
}

function getMinutes(time) {
  // If there is a decimal
  let minutes = '';
  if (time % 1 !== 0) {
    minutes = `${Math.round((time % 1) * 60)}`;
  }

  return minutes;
}

export function getTime(time) {
  // Edge case
  if (time < 0) return '';

  const mins = getMinutes(time);
  let hours = Math.floor(time);
  let prefix;
  if (hours < 12) {
    hours = hours || 12; // Change 0 to 12
    prefix = 'am';
  } else {
    hours -= 12;
    prefix = 'pm';
  }

  let timeStr = `${hours}`;
  if (mins) {
    timeStr += `:${mins}`;
  }
  timeStr += prefix;

  return timeStr;
}

export function getHours({ start, end }, day) {
  const startTime = start[day];
  const endTime = end[day];

  if (startTime < 0 || endTime < 0) return '';

  return `
    ${getTime(startTime)}
    –
    ${getTime(endTime)}
  `;
}

// TODO unit tests!

export function isOpen({ start, end }, time, day) {
  const startTime = start[day];
  const endTime = end[day];

  // If either time is less than 0 then the space is closed
  if (startTime < 0 || endTime < 0) {
    return false;
  }

  // If the end time wraps to the next day
  // For example, Huntsman closes at 2am
  if (endTime <= startTime) {
    if (time >= startTime) {
      // This must be before midnight
      return time < endTime + 24;
    }

    // If the time is after midnight
    return time < endTime;
  }

  // If the building closes before midnight
  return (time >= startTime && time < endTime);
}
