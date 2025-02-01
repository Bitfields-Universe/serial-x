#![allow(dead_code)]
use std::sync::{Arc, Mutex};
use std::time::Duration;
use rs_uuid::uuid32;
use serde::{Serialize, Deserialize};
use serde_json::json;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct PortInfo {
    id: String,
    name: String,
    baud_rate: u32,
    data_bits: u8,
    stop_bits: u8,
    parity: String,
    open: bool,
    bytes_received: usize,
    bytes_sent: usize,
}

pub type SharedPortList = Arc<Mutex<Vec<PortInfo>>>;

/// Lists available serial ports on the system and returns JSON
#[tauri::command]
pub fn list_ports(port_list: SharedPortList) -> serde_json::Value {
    let ports = port_list.lock().unwrap();
    
    let port_data: Vec<_> = ports.iter()
        .map(|p| json!({
            "id": p.id,
            "name": p.name,
            "status": p.open,
            "upload": p.bytes_sent,
            "download": p.bytes_received
        }))
        .collect();

    json!(port_data)
}

/// Opens a serial port, adds it to the port list, and assigns a unique ID
#[tauri::command]
pub fn open_serial_port(port_name: String, baud_rate: u32, state: tauri::State<SharedPortList>) -> bool {
    let port = serialport::new(&port_name, baud_rate)
        .timeout(Duration::from_secs(1))
        .open();

    if port.is_ok() {
        let mut ports = state.inner().lock().unwrap();
        ports.push(PortInfo {
            id: uuid32(), // Unique ID for tracking
            name: port_name.clone(),
            baud_rate,
            data_bits: 8,
            stop_bits: 1,
            parity: "None".to_string(),
            open: true,
            bytes_received: 0,
            bytes_sent: 0,
        });
        true
    } else {
        false
    }
}

/// Closes a serial port and removes it from the list
#[tauri::command]
pub fn close_serial_port(port_name: String, state: tauri::State<SharedPortList>) {
    let mut ports = state.inner().lock().unwrap();
    if let Some(pos) = ports.iter().position(|p| p.name == port_name) {
        ports.remove(pos);
    }
}

/// Retrieves full info about a specific open port by ID
#[tauri::command]
pub fn get_serial_port_info(port_id: String, state: tauri::State<SharedPortList>) -> Result<serde_json::Value, String> {
    let ports = state.inner().lock().unwrap();
    match ports.iter().find(|p| p.id == port_id) {
        Some(port) => Ok(serde_json::to_value(port).unwrap()),
        None => Err("Port not found".to_string()),
    }
}
