export default function Projects(props){
    return(
        <section id="projects">
            <div class="projects container">
                <ProjectInfo/>
                <ProjectList/>

                <h1>Test</h1>
                <h1>Tes2</h1>
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
    ></section>);
}
