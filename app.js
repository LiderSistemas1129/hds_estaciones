// Buscador: filtra la lista de documentos sin recargar la página.
(function () {
  var input = document.getElementById('q');
  if (!input) return;
  var items = Array.prototype.slice.call(document.querySelectorAll('.docs li'));
  var groups = document.querySelectorAll('.group');
  var sections = document.querySelectorAll('.sec');
  var empty = document.getElementById('empty');

  function norm(s) {
    return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  }

  input.addEventListener('input', function () {
    var words = norm(input.value).split(/\s+/).filter(Boolean);
    var total = 0;
    items.forEach(function (li) {
      var k = li.getAttribute('data-k');
      var ok = words.every(function (w) { return k.indexOf(w) !== -1; });
      li.hidden = !ok;
      if (ok) total++;
    });
    groups.forEach(function (g) { g.hidden = !g.querySelector('li:not([hidden])'); });
    sections.forEach(function (s) { s.hidden = !s.querySelector('li:not([hidden])'); });
    empty.hidden = total > 0;
  });
})();
