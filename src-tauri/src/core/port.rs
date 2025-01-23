use serialport::SerialPort;
use std::sync::{Arc, Mutex};
use std::time::Instant;

#[derive(Debug)]
struct PortInfo {
    name: String,
    baud_rate: u32,
    data_bits: u8,
    stop_bits: u8,
    parity: String,
    open: bool,
    bytes_received: usize,
    bytes_sent: usize,
    start_time: Instant,
}

type SharedPortInfo = Arc<Mutex<Vec<PortInfo>>>;


pub fn list_ports() -> Vec<String> {
    serialport::available_ports()
        .expect("No ports found!")
        .into_iter()
        .map(|port| port.port_name)
        .collect()
}

pub fn open_port(port_name: &str, baud_rate: u32, port_list: SharedPortInfo) -> bool {
    let port = serialport::new(port_name, baud_rate)
        .timeout(std::time::Duration::from_secs(1))
        .open();

    if port.is_ok() {
        let mut ports = port_list.lock().unwrap();
        ports.push(PortInfo {
            name: port_name.to_string(),
            baud_rate,
            data_bits: 8,
            stop_bits: 1,
            parity: "None".to_string(),
            open: true,
            bytes_received: 0,
            bytes_sent: 0,
            start_time: Instant::now(),
        });
        true
    } else {
        false
    }
}

pub fn close_port(port_name: &str, port_list: SharedPortInfo) {
    let mut ports = port_list.lock().unwrap();
    if let Some(pos) = ports.iter().position(|p| p.name == port_name) {
        ports.remove(pos);
    }
}

pub fn track_data_flow(port_name: &str, port_list: SharedPortInfo, bytes_sent: usize, bytes_received: usize) {
    let mut ports = port_list.lock().unwrap();
    if let Some(port) = ports.iter_mut().find(|p| p.name == port_name) {
        port.bytes_sent += bytes_sent;
        port.bytes_received += bytes_received;
    }
}

#[tauri::command]
fn get_ports() -> Vec<String> {
    list_ports()
}

#[tauri::command]
fn open_serial_port(port_name: String, baud_rate: u32, state: tauri::State<SharedPortInfo>) -> bool {
    open_port(&port_name, baud_rate, state.inner().clone())
}

#[tauri::command]
fn close_serial_port(port_name: String, state: tauri::State<SharedPortInfo>) {
    close_port(&port_name, state.inner().clone())
}
