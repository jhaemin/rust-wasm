mod utils;

use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
    // Original implementation
    // using string concatenation

    // let mut hello = "Hello, ".to_owned();
    // hello.push_str(name);

    // alert(hello.as_str());

    // Simplified version
    // using the `format` macro
    alert(&format!("Hello, {}!", name));
}
