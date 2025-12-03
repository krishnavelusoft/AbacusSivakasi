const contentEl = document.getElementById('content');

function setActive(page){
  document.querySelectorAll('.menu a').forEach(a => {
    a.classList.toggle('active', a.dataset.page === page);
  });
}

function showError(err){
  contentEl.innerHTML = `<h2>Error</h2><pre>${String(err)}</pre>`;
}

function loadPage(page){
  fetch(`/${page}.html`).then(res => {
    if(!res.ok) throw new Error('Not found');
    return res.text();
  }).then(html => {
    contentEl.innerHTML = html;
    setActive(page);
  }).catch(showError);
}

document.addEventListener('DOMContentLoaded', ()=>{
  document.querySelectorAll('.menu a').forEach(a=>{
    a.addEventListener('click', e=>{
      e.preventDefault();
      loadPage(a.dataset.page);
    });
  });
  loadPage('home');
});
