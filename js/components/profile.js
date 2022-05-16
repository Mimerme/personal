const splashes = ["Do-oer of things"];

export default function Profile(props){
    console.log(props);
    let type1 = Math.floor(props.random.randomWithSeed(props.seed) * 3);
    let type2 = Math.floor(props.random.randomWithSeed(props.seed) * splashes.length);

    return (
    <div style={{
        position: 'absolute',
        left: '50%',
        top: '50%'
    }}>
        <h1>Andros Yang</h1>
        <SplashMsg gen1={type1} gen2={type2}/>
    </div>
    );
}

function SplashMsg(props){
    // Returns either 0, 1, or 2
    let gen1 = props.gen1;
    let gen2 = props.gen2;


    switch(gen1){
        // Interface with GitHub
        case 0:
            // Check cookies for cache
            return (<h2>
                GitHub
            </h2>);
        // Latest tweet
        case 1:
            // Check cookies for cache
            return (<h2>
                Tweet
            </h2>);
        // Random text msg
        case 2:
            let r = Math.floor(Math.random() * splashes.length);
            return (<h2>
                {splashes[r]}
            </h2>);
    }
}
