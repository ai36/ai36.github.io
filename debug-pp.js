document.querySelectorAll("*").forEach((el) => {
  const { width, height } = el.getBoundingClientRect();
  if ((width % 1 !== 0 || height % 1 !== 0) && el.childElementCount === 0 && !el.closest("svg")) {
    console.log(el, { width, height });
  }
});

