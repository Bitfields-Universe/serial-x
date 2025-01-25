#![allow(dead_code)]
use chrono::Local;

pub fn get_timestamp_24h() -> String {
    let now = Local::now();
    now.format("%Y-%m-%d %H:%M:%S").to_string()
}

pub fn get_timestamp_12h() -> String {
    let now = Local::now();
    now.format("%Y-%m-%d %I:%M:%S %p").to_string()
}