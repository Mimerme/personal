export default function Hero(props){
    return(
        <section id="hero">
            <div class="hero container">
                <div class="top" style={{
                    height: '40%'
                    }}>
                    <h1>Hello, <span></span></h1>
                    <h1>My Name is <span></span></h1>
                    <h1>Andros Yang <span></span></h1>
                </div>
                <div class="space"
                    style={{
                    height: '30%'
                    }}>
                </div>
                <div class="bot"
                    style={{
                        height: '30%',
                        display: 'contents',
                    }}>
                    <a href="#projects" type="button" class="hero-button">Portfolio</a>

                    <a href="#projects" type="button" class="hero-button">Resume</a>
                </div>
            </div>
        </section>
    );
}