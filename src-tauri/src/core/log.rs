#[tauri::command]
pub fn log_message(level: &str, message: &str) {
    match level {
        "info" => log::info!("{}", message),
        "warn" => log::warn!("{}", message),
        "error" => log::error!("{}", message),
        "debug" => log::debug!("{}", message),
        _ => log::info!("{}", message),
    }
}