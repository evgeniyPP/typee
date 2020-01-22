async function getText() {
  const id = window.location.pathname.replace('/x/', '');
  const res = await fetch(`https://typee.herokuapp.com/api/${id}`);
  const data = await res.json();
  return data.text;
}

document.addEventListener('DOMContentLoaded', async function() {
  const data = await getText();
  typeWriter(data, 0);
});

function typeWriter(text, i) {
  // check if text is not finished yet
  if (i < text.length) {
    // add next character to h1
    document.querySelector('h1').innerHTML =
      text.substring(0, i + 1) + '<span aria-hidden="true"></span>';

    // wait for a while and call this function again for next character
    setTimeout(function() {
      typeWriter(text, i + 1);
    }, 100);
  }
}
