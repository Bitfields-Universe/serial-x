use log::error;
mod core;

pub type SharedPortList = core::port::SharedPortList; // Reuse the type from core::port

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .manage(SharedPortList::default()) // ✅ Use the shared port list from core::port
        .invoke_handler(tauri::generate_handler![
            core::port::list_ports,
            core::port::open_serial_port,
            core::port::get_serial_port_info,
            core::port::close_serial_port,
            core::scheme::save_schema,
            core::scheme::list_schemas,
            core::scheme::read_schema,
            core::scheme::delete_schema,
            core::log::log_message,
        ])
        .run(tauri::generate_context!())
        .unwrap_or_else(|e| {
            error!("Error while running Tauri application: {}", e);
            panic!("error while running tauri application: {}", e);
        });
}
