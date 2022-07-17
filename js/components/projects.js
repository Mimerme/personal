export default function Projects(props){
    return(
        <section id="projects">
            <h1>Projects</h1>
            <div class="projects container">
                <ProjectInfo/>
                <ProjectList/>
            </div>
        </section>
    );
}

function ProjectInfo(props){
    return(<section class="proj_info" style={{
        width: '30%',
    }}>



    </section>);
}

function ProjectList(props){
    return(<section class="proj_list"
        style={{
            display: 'flex',
            flexWrap: 'wrap'
        }}
    >
        <div class="project-thumb"></div>
        <div class="project-thumb"></div>
        <div class="project-thumb"></div>
        <div class="project-thumb"></div>
    </section>);
}
