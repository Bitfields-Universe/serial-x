use tauri::command;
use std::fs;
use std::path::PathBuf;

#[command]
pub fn save_schema(file_name: String, schema_data: String) -> Result<(), String> {
    let mut path = PathBuf::from("./schemas");
    if !path.exists() {
        fs::create_dir_all(&path).map_err(|e| e.to_string())?;
    }
    path.push(format!("{}.scheme", file_name));

    fs::write(&path, schema_data).map_err(|e| e.to_string())?;
    Ok(())
}

#[command]
pub fn list_schemas() -> Result<Vec<String>, String> {
    let path = PathBuf::from("./schemas");
    if !path.exists() {
        return Ok(vec![]);
    }
    let files = fs::read_dir(&path)
        .map_err(|e| e.to_string())?
        .filter_map(|entry| {
            entry.ok().and_then(|e| {
                let file_name = e.file_name().into_string().ok()?;
                if file_name.ends_with(".scheme") {
                    Some(file_name)
                } else {
                    None
                }
            })
        })
        .collect();
    Ok(files)
}

#[command]
pub fn read_schema(file_name: String) -> Result<String, String> {
    let path = PathBuf::from(format!("./schemas/{}", file_name));
    fs::read_to_string(path).map_err(|e| e.to_string())
}

#[command]
pub fn delete_schema(file_name: String) -> Result<(), String> {
    let path = PathBuf::from(format!("./schemas/{}", file_name));
    
    if path.exists() {
        fs::remove_file(&path).map_err(|e| e.to_string())?;
        Ok(())
    } else {
        Err("Schema file not found".to_string())
    }
}

