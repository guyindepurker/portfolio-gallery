console.log('work');

function initPage() {
    renderPtotfolio ()
}


function renderPtotfolio (){
    var projects = getProjects();
    var htmlStr = projects.map(function(project){
        return `        <div class="col-md-4 col-sm-6 portfolio-item">
        <a class="portfolio-link" data-toggle="modal" href="${project.url}">
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