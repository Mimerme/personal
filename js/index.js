import("../pkg/index.js").catch(console.error);
import { createRoot } from 'react-dom/client';

function App() {
    return (<h1>Hello World</h1>);
}
const div_root = document.createElement("div");
document.body.appendChild(div_root);
const root = createRoot(div_root);
root.render(<App />);