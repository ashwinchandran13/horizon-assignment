function mergeIntervals(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const mergedIntervals = [];
  for (const interval of intervals) {
    if (!mergedIntervals.length || interval[0] > mergedIntervals[mergedIntervals.length - 1][1]) {
      mergedIntervals.push(interval);
    } else {
      mergedIntervals[mergedIntervals.length - 1][1] = Math.max(mergedIntervals[mergedIntervals.length - 1][1], interval[1]);
    }
  }
  return mergedIntervals;
}

function excludedIntervals(includes, excludes) {
  includes = mergeIntervals(includes);
  excludes = mergeIntervals(excludes);
  const result = [];
  if (!excludes.length) return [includes];
  for (const include of includes) {
    for (const exclude of excludes) {
      // case 1
      if (include[1] < exclude[0]) {
          continue;
      }
      // case 2
      if (include[0] > exclude[1]) {
          continue;
      }
      // case 3
      if (include[0] < exclude[0] && include[1] > exclude[1]) {
          result.push([include[0], exclude[0]-1]);
          result.push([exclude[1]+1, include[1]]);
          continue;
      }
      // case 4
      if (exclude[0] < include[0] && exclude[1] < include[1]) {
          result.push([exclude[1]+1, include[1]]);
          continue;
      }
      // case 5
      if (include[0] < exclude[0] && exclude[1] > include[1]) {
          result.push([include[0], exclude[0]-1]);
          continue;
      }
      // case 6
      if (include[0] < exclude[0] && exclude[1] < include[1]) {
          continue;
      }
    }
  }
  return mergeIntervals(result);
}

// Example usage
const includes = [[200, 300], [10, 100],[400,500]];
const excludes = [[410,420],[95,205],[100,150]];

const result = excludedIntervals(includes, excludes);
console.log(result); // [[10, 94], [206, 300], [400, 409], [421, 500]]
