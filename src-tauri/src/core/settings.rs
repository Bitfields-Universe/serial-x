// use serde::{Deserialize, Serialize};
// use std::fs;
// use std::path::PathBuf;
// use tauri::{async_runtime::Mutex, State};
// use tauri::api::path::app_dir;

// #[derive(Serialize, Deserialize, Debug, Default, Clone)]
// struct AppSettings {
//     show_only_open_ports: bool,
//     refresh_rate: u64,
// }

// #[derive(Default)]
// struct AppState {
//     settings: Mutex<AppSettings>, // Use Mutex for safe concurrent access
// }

// fn get_settings_file_path() -> Result<PathBuf, String> {
//     app_dir(&tauri::Config::default())
//         .map(|dir| dir.join("settings.json"))
//         .ok_or_else(|| "Failed to determine app directory".to_string())
// }

// #[tauri::command]
// async fn save_settings(state: State<'_, AppState>, settings: AppSettings) -> Result<(), String> {
//     let path = get_settings_file_path()?;

//     // Serialize the settings to JSON
//     let settings_json = serde_json::to_string_pretty(&settings)
//         .map_err(|e| format!("Failed to serialize settings: {}", e))?;

//     // Save to the file
//     fs::write(&path, settings_json)
//         .map_err(|e| format!("Failed to write settings to file: {}", e))?;

//     // Update the in-memory state
//     let mut locked_settings = state.settings.lock().await;
//     *locked_settings = settings;

//     Ok(())
// }

// #[tauri::command]
// async fn load_settings(state: State<'_, AppState>) -> Result<AppSettings, String> {
//     let path = get_settings_file_path()?;

//     if path.exists() {
//         // Read the JSON file
//         let settings_json = fs::read_to_string(&path)
//             .map_err(|e| format!("Failed to read settings file: {}", e))?;

//         // Deserialize into AppSettings
//         let settings: AppSettings = serde_json::from_str(&settings_json)
//             .map_err(|e| format!("Failed to deserialize settings: {}", e))?;

//         // Update the in-memory state
//         let mut locked_settings = state.settings.lock().await;
//         *locked_settings = settings.clone();

//         Ok(settings)
//     } else {
//         // Return default settings and update state
//         let default_settings = AppSettings::default();
//         let mut locked_settings = state.settings.lock().await;
//         *locked_settings = default_settings.clone();
//         Ok(default_settings)
//     }
// }
