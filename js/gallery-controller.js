console.log('work');

function initPage() {
    renderPtotfolio ()
}


function renderPtotfolio (){
    var projects = getProjects();
    var htmlStr = projects.map(function(project){
        return `        <div class="col-md-4 col-sm-6 portfolio-item">
        <a class="portfolio-link" data-toggle="modal" href="#portfolioModal1" onclick="onOpenModal('${project.id}')">
          <div class="portfolio-hover">
            <div class="portfolio-hover-content">
              <i class="fa fa-plus fa-3x"></i>
            </div>
          </div>
          <img class="img-fluid img-proto" src="img/proj-imgs/${project.id}.png" alt="">
        </a>
        <div class="portfolio-caption">
          <h4>${project.name}</h4>
          <p class="text-muted">${project.title}</p>
        </div>
      </div>`
    });
    document.querySelector('.projects-proto').innerHTML = htmlStr.join('');
}
function onOpenModal(projId){
    var project = getProjectById(projId);
    renderModal(project)
}

function renderModal(project){
    var time = new Date(project.publishedAt).toLocaleDateString('he');
    var htmlStr = `
    <h2>${project.name}</h2>
    <p class="item-intro text-muted">${project.title}.</p>
    <img class="img-fluid d-block mx-auto" src="img/proj-imgs/${project.id}.png" alt="">
    <p>${project.desc}</p>
    <ul class="list-inline">
      <li>Date: ${time}</li>
      <li>Url: ${project.url}</li>
      <li class="catProj">Category: <span>${project.labels.toString()} </span></li>
    </ul>
    <button class="btn btn-outline-warning" onclick="window.location.href='/${project.url}'">See The Project</button>
    <button class="btn btn-primary" data-dismiss="modal" type="button">
      <i class="fa fa-times"></i>
      Close Project</button>
    `
    $('.modal-body').html(htmlStr);
}