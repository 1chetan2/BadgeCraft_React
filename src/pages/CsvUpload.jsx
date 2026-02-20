import { useState } from "react";
import api from "../api";

export default function CsvUpload() {
  const [file, setFile] = useState(null);
  const [previewData, setPreviewData] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Select CSV file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api.post("/Csv/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setPreviewData(response.data);
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }
  };

  return (
    <div>
      <h2>Upload CSV</h2>

      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {previewData.length > 0 && (
        <table border="1">
          <thead>
            <tr>
              {Object.keys(previewData[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {previewData.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, i) => (
                  <td key={i}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}