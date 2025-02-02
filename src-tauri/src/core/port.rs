use std::sync::{Arc, Mutex};
use rs_uuid::uuid8;
use tauri::State;
use serialport::available_ports;
use serde_json::json;
use serde::{Serialize, Deserialize};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct PortInfo {
    pub id: String,
    pub name: String,
    pub baud_rate: u32,
    pub data_bits: u8,
    pub stop_bits: u8,
    pub parity: String,
    pub open: bool,
    pub bytes_received: usize,
    pub bytes_sent: usize,
}

pub type SharedPortList = Arc<Mutex<Vec<PortInfo>>>;

/// Lists available serial ports on the system and returns JSON
#[tauri::command]
pub fn list_ports(state: State<SharedPortList>) -> serde_json::Value {
    let available = available_ports().unwrap_or_else(|_| vec![]); // Get system ports
    let ports = state.inner().lock().unwrap();

    let port_data: Vec<_> = available.iter().map(|sys_port| {
        let name = sys_port.port_name.clone();
        let existing = ports.iter().find(|p| p.name == name);

        json!({
            "id": uuid8(), // ID if tracked
            "name": name,
            "status": existing.map(|p| p.open).unwrap_or(false), // Open if tracked
            "upload": existing.map(|p| p.bytes_sent).unwrap_or(0),
            "download": existing.map(|p| p.bytes_received).unwrap_or(0),
        })
    }).collect();

    json!(port_data)
}

/// Opens a serial port, adds it to the port list, and assigns a unique ID
#[tauri::command]
pub fn open_serial_port(port_name: String, baud_rate: u32, state: tauri::State<SharedPortList>) -> bool {
    let port = serialport::new(&port_name, baud_rate)
        .timeout(std::time::Duration::from_secs(1))
        .open();

    if port.is_ok() {
        let mut ports = state.inner().lock().unwrap();
        ports.push(PortInfo {
            id: uuid8(),
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
pub fn get_serial_port_info(name: String, state: tauri::State<SharedPortList>) -> Result<serde_json::Value, String> {
    let ports = state.inner().lock().unwrap();
    match ports.iter().find(|p| p.name == name) {
        Some(port) => Ok(serde_json::to_value(port).unwrap()),
        None => Err("Port not found".to_string()),
    }
}
