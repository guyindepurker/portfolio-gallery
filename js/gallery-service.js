var gProjects = createProjects();
function getProjects() {
    return gProjects;
}

function getProjectById(projectId){
    var project = gProjects.find(function (project){
        return project.id === projectId;
         
    })
    return project;
}

function createProjects(){
    var projects = [];
    projects.push(createProject('minesweeper','Minesweeper','Minesweeper Game - Dont open Mine!','Minesweeper is like the original game,I adding Cool Features '))
    projects.push(createProject('touch-the-nums','Touch The Nums','Touch The Nums','The User need to touch the first num is 1 and after ascending order '))
    projects.push(createProject('in-picture','In Picture','Quiz of Movie stars','Simple Quizz about movie stars'))
    projects.push(createProject('pacman','Pacman','Eat the food and stay alive','Like the real game,adding cool features '))
    projects.push(createProject('ball-board','Ball','Collects the balls','Like the pacman game just somting else,adding cool features'))
    projects.push(createProject('ballon-pop','Pop Ballons','Pop all the ballons','Like the pacman game just somting else,adding cool features'))
    projects.push(createProject('book-shop','Book Shopping','Book Shopping eCommerce','Search for books to read and buy'))
    projects.push(createProject('todo','To Do App','Control your time','Create a list of things you need to do'))
    projects.push(createProject('guessme','GuessMe','Think about someone','Cool game that the computer guess your choice'))
    projects.push(createProject('easy','Easy','Build your site','i create a website using bootstrap for company that building sites'))
    projects.push(createProject('tindog','Tindog','A Website for app tindog','i create a website using bootstrap for app tindog this is like tinder of the pets!'))
    return projects;
}

function createProject(id,name,title,desc){
    return  {
        id,
        name,
        title,
        desc,
        url:`projs/${id}`,
        publishedAt:Date.now(),
        labels:['HTML5','JS','CSS3','BOOTSRAP4',]
    }
}