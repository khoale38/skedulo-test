let unavailableItems = [
  { startPx: 10, endPx: 30 },
  { startPx: 55, endPx: 65 },
  { startPx: 35, endPx: 50 },
  { startPx: 20, endPx: 40 },
  { startPx: 60, endPx: 70 },
];

const sortedEndItems = unavailableItems.sort((a, b) => a.endPx - b.endPx);

let res = [sortedEndItems[0]];

sortedEndItems.slice(1).forEach((e) => {
  if (e.startPx < res[res.length - 1].endPx) {
    res[res.length - 1] = {
      startPx: res[res.length - 1].startPx,
      endPx: e.endPx,
    };
  }
  else
  res.push(e)
});


console.log(res)