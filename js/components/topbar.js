export default function TopBar(props) {
    return (
        <nav id="navbar" class="nav">
            <ul class="nav-list container">
                <li onHover>
                    <a href="#welcome-section" style={{
                        textDecoration: 'none',
                        color: 'navy'
                    }}>About</a>
                </li>
                <li>
                    <a href="#projects" style={{
                        textDecoration: 'none',
                        color: 'navy'
                    }}>Work</a>
                </li>
                <li>
                    <a href="#contact" style={{
                        textDecoration: 'none',
                        color: 'navy'
                    }}>Contact</a>
                </li>
            </ul>
        </nav>
    );
}