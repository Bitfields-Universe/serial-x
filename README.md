# Project Plan: Serial X (Serial Port Graphing App)

## Project Overview

This app is a serial port communication tool built with **Tauri (Rust)** and **React (TypeScript)**. It uses **D3.js** for interactive data visualization and supports saving and replaying serial port data in **RON (Rust Object Notation)** format.

---

## Goals

1. **Graph Serial Port Data:** Real-time plotting of serial data using D3.js.
2. **Data Saving:** Store serial port data in `.ron` files for later analysis.
3. **Data Replay:** Replay saved `.ron` files as interactive graphs.
4. **Cross-Platform Support:** Ensure compatibility with Windows, macOS, and Linux.

---

## Features

### Core Features

- **Serial Port Communication:**
  - List available serial ports.
  - Connect to a selected serial port.
  - Read and process incoming data in the format `[value, dt]`.

- **Graphing with D3.js:**
  - Real-time graph plotting of `[value, dt]` data.
  - Interactive graphs with zoom and pan functionality.

- **Data Saving and Replay:**
  - Save serial data into `.ron` files.
  - Load and replay `.ron` files as graphs.

### Additional Features (Stretch Goals)

- Export graphs as PNG or PDF.
- Support for multiple serial ports simultaneously.
- User-defined filters for incoming data (e.g., noise filtering).

---

## Technical Stack

- **Frontend:** React (TypeScript)
- **Backend:** Tauri (Rust)
- **Visualization:** D3.js
- **File Format:** RON (Rust Object Notation)

---

## Development Milestones

### Phase 1: Setup & Core Functionality

1. **Project Initialization:**
   - Set up Tauri with React and TypeScript.
   - Configure communication between Rust and React.

2. **Serial Port Communication:**
   - Use Rust libraries (e.g., `serialport`) to list and read serial ports.
   - Create a TypeScript API for frontend communication.

3. **Basic Graphing:**
   - Integrate D3.js for plotting dummy data.
   - Display real-time serial data on a graph.

---

### Phase 2: Data Saving & Replay

4. **RON File Integration:**
   - Use Rust libraries for reading/writing `.ron` files.
   - Add a feature to save incoming data as `.ron`.

5. **Replay Functionality:**
   - Load `.ron` files and send the data to the frontend.
   - Plot replayed data on D3.js graphs.

---

### Phase 3: UI/UX & Advanced Features

6. **UI Enhancements:**
   - Design a user-friendly interface in React.
   - Add settings for graph customization (e.g., colors, line thickness).

7. **Graph Interaction:**
   - Implement zooming, panning, and tooltips in D3.js.

8. **Data Export:**
   - Add the option to export graphs as PNG or PDF (stretch goal).

---

### Phase 4: Testing & Deployment

9. **Testing:**
   - Unit test Rust backend components.
   - Test React frontend and graph interactions.

10. **Cross-Platform Deployment:**
    - Build and test Tauri app for Windows, macOS, and Linux.

---

## Timeline

| Phase                | Tasks                                      | Duration |
| -------------------- | ------------------------------------------ | -------- |
| Phase 1: Setup       | Project setup, serial port, basic graphing | 2 weeks  |
| Phase 2: Save/Replay | RON integration, replay graphs             | 3 weeks  |
| Phase 3: UI/UX       | UI design, graph interaction               | 3 weeks  |
| Phase 4: Testing     | Testing and deployment                     | 2 weeks  |

---

## Dependencies

- **Rust Libraries:**
  - `serialport` for serial communication.
  - `ron` for file handling.
  
- **React Libraries:**
  - `react-d3-library` or similar for graph integration.
  - UI components like `Material-UI` or `Chakra-UI`.

---

## Deliverables

1. Functional Tauri-based desktop app.
2. Real-time serial data plotting using D3.js.
3. Data saving and replay using `.ron` files.
4. Cross-platform builds (Windows, macOS, Linux).

---

## Notes

- Ensure modular code for easy future enhancements.
- Use TypeScript for type safety across the app.
- Prioritize performance for handling large datasets.
- Store data stream in protobuff format.
- Use sqlite database to store protobuff data.
