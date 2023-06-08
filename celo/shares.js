function pageCount(n, p) {
  let frontwardCounter = 0,
    backwardCounter = 0,
    pagePosition = n - p;
  for (let i = 1; i <= pagePosition; i++) {
    frontwardCounter++;
  }
  for (let i = n; i > pagePosition; i--) {
    backwardCounter++;
  }
  console.log(
    Math.min(Math.floor(frontwardCounter / 2), Math.floor(backwardCounter / 2))
  );
}

pageCount(6, 2);
