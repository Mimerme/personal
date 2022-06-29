function Particle(props){
    let cssTransform = [];

    // <svg viewBox="0 0 50.5 0.5" className="gameobject particle" style={cssTransform}>
    //     <path d="M 0 0 L 50 0" stroke="#FFFFFF" strokeWidth="0.5"/>
    // </svg>
    return(
        <div className="particle"></div>
    );
}

function HalfLifeAnimation(props){
    // Randomly start the partical loops
    let random = Math.random();

    // Based on the performance of the machine adjust the number of rendered particles
    let particleCount = props.count;
    let x = props.startX;
    let y = props.startY;
    let z = props.startZ;

    let init = Array(particleCount)
    // ffill() needs to be called because Javascript map() skips undefined elements
    .fill(0)
    .map((elem, idx) => {return (<Particle x={0} y={0} z={0} class="particle" key={idx}/>)});
    let [particles, setParticles] = useState(init);
    console.log(init);

    return (<>
        {particles}
    </>);
}