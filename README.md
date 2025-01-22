**Serial X - Application Overview**

---

### **Features:**

1. **List Ports and Manage Them (Open/Close)**
    - **Backend (Rust):**  
      - Use the `serialport` crate to list available ports.  
      - Implement functions to open/close ports and track their state.  
    - **Frontend (React):**  
      - Call Tauri commands to list ports and display their state.  
      - Add buttons to open/close ports with real-time status updates.

2. **Stream Data from Port to File**
    - **Backend (Rust):**  
      - Read serial data asynchronously and write to a protobuf-encoded file.  
      - Use Rust's `tokio` for async processing to avoid UI freezing.  
    - **Protobuf Schema:**  
      - Define message structure to store various data points.  
      - Example schema:

        ```proto
        syntax = "proto3";

        message SensorData {
            string timestamp = 1;
            float temp = 2;
            float dx = 3;
            float dy = 4;
            float sensor_a1 = 5;
        }
        ```

    - **Frontend (React):**  
      - Provide a UI to start/stop data recording.  
      - Show recording status.

3. **Stream Data to D3 Graph (Real-Time Visualization)**
    - **Backend (Rust):**  
      - Read serial data and send it to the frontend via Tauri events.  
    - **Frontend (React + D3.js):**  
      - Process incoming data and dynamically update graphs.  
      - Allow users to configure which values to visualize.  

4. **Open Data Files and View as Graphs**
    - **Backend (Rust):**  
      - Read protobuf files and send parsed data to the frontend.  
    - **Frontend (React + D3.js):**  
      - Display saved data in graphs with filters and zooming features.

5. **Perform Statistical Analysis**
    - **Backend (Rust):**  
      - Calculate averages, standard deviations, min/max values, etc.  
    - **Frontend (React):**  
      - Provide UI to run statistical operations and display results.

---

### **Tech Stack Overview**
- **Frontend:** React (with D3.js for visualization, Tauri for Rust interop).  
- **Backend:** Rust (Tauri, Serialport, Tokio for async tasks, Protobuf for data).  
- **File Format:** Protocol Buffers for efficient storage and retrieval.

---

