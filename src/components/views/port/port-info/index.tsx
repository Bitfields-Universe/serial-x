import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { invoke } from "@tauri-apps/api/core";
import { SerialPort } from "../../../../interface";

export const PortInfo = () => {
  let { name } = useParams(); // Extracts the id from the URL
  if (name) {
    name = atob(name);
  }
  console.log("name: ", name);
  const [portData, setPortData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPortOpen, setIsPortOpen] = useState(false); // State to track port status

  useEffect(() => {
    if (!name) return;

    const fetchPortInfo = async () => {
      try {
        const data: SerialPort = await invoke("get_port_info", { name });
        console.log("data: ", data);

        setPortData(data as SerialPort);
        // Assuming portData includes a field indicating whether the port is open
        setIsPortOpen(data.status || false); // Adjust based on actual data structure
      } catch (err) {
        setError("Failed to fetch port info");
      } finally {
        setLoading(false);
      }
    };

    fetchPortInfo();
  }, [name]);

  const togglePortState = async () => {
    try {
      if (isPortOpen) {
        // Close port
        await invoke("close_port", { name });
      } else {
        // Open port
        await invoke("open_port", { name });
      }
      setIsPortOpen((prevState) => !prevState); // Toggle port state
    } catch (err) {
      setError("Failed to toggle port state");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="port-info p-4 border rounded-lg bg-gray-100">
      <h1 className="text-xl font-bold">Port Info</h1>
      <p className="font-mono">Port name: {name}</p>
      {portData ? (
        <pre className="bg-gray-200 p-2 rounded">{JSON.stringify(portData, null, 2)}</pre>
      ) : (
        <p>No data available</p>
      )}
      <button
        onClick={togglePortState}
        className={`mt-4 px-4 py-2 rounded ${isPortOpen ? "bg-red-500" : "bg-green-500"} text-white`}
      >
        {isPortOpen ? "Close Port" : "Open Port"}
      </button>
    </div>
  );
};
