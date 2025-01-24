// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
mod core;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            core::port::get_ports, core::port::open_serial_port, core::port::close_serial_port,
            core::scheme::save_schema, core::scheme::list_schemas, core::scheme::read_schema,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
