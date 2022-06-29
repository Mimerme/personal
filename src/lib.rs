use wasm_bindgen::prelude::*;
use web_sys::console;
use tracing_wasm;


// When the `wee_alloc` feature is enabled, this uses `wee_alloc` as the global
// allocator.
//
// If you don't want to use `wee_alloc`, you can safely delete this.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;


// This is like the `main` function, except for JavaScript.
#[cfg(target_arch = "wasm32")]
#[wasm_bindgen(start)]
pub fn main_js() -> Result<(), JsValue> {
    // This provides better error messages in debug mode.
    // It's disabled in release mode so it doesn't bloat up the file size.
    #[cfg(debug_assertions)]
    console_error_panic_hook::set_once();

    // Redirect tracing to console.log and friends:
    tracing_wasm::set_as_global_default();


    // Your code goes here!
    console::log_1(&JsValue::from_str("Trash!"));

    Ok(())
}

//#[cfg(target_arch = "wasm32")]
//use wasm_bindgen::{self, prelude::*};

// This is the entry-point for all the web-assembly.
// This is called once from the HTML.
// It loads the app, installs some callbacks, then returns.
// You can add more callbacks like this if you want to call in to your code.
//#[cfg(target_arch = "wasm32")]
//#[wasm_bindgen]
//pub fn start(canvas_id: &str) -> Result<(), eframe::wasm_bindgen::JsValue> {
//    eframe::start_web(canvas_id, Box::new(|cc| Box::new(TemplateApp::new(cc))))
//}


//#[cfg(target_arch = "wasm32")]
//#[wasm_bindgen]
//pub fn test_ping(canvas_id: &str) -> Result<eframe::wasm_bindgen::JsValue, eframe::wasm_bindgen::JsValue> {
//    return Ok(JsValue::from_str("pong"));
//}