// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use log::info;
use log4rs;

fn main() {
    if let Err(err) = log4rs::init_file("log4rs.yaml", Default::default()) {
        eprintln!("Failed to initialize logging: {}", err);
    } else {
        info!("Logging initialized successfully");
    }

    info!("Serial-X application started");
    // debug!("Debugging mode enabled");
    // warn!("This is a warning message");
    // error!("An error occurred!");
    serial_x_lib::run()
}
