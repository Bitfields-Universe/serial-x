import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { invoke } from "@tauri-apps/api/core";

export const PortInfo = () => {
  const { id } = useParams(); // Extracts the id from the URL
  const [portData, setPortData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchPortInfo = async () => {
      try {
        const data = await invoke("get_port_info", { id });
        setPortData(data);
      } catch (err) {
        setError("Failed to fetch port info");
      } finally {
        setLoading(false);
      }
    };

    fetchPortInfo();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="port-info p-4 border rounded-lg bg-gray-100">
      <h1 className="text-xl font-bold">Port Info</h1>
      <p className="font-mono">Port ID: {id}</p>
      {portData ? (
        <pre className="bg-gray-200 p-2 rounded">{JSON.stringify(portData, null, 2)}</pre>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};
