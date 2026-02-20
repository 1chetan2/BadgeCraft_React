export default function Toolbar({ badgeData, handleChange }) {
  return (
    <div style={{ width: "300px" }}>
      <h2>Customize Badge</h2>

      {/* Title */}
      <label>Title</label>
      <input
        type="text"
        value={badgeData.title}
        onChange={(e) => handleChange("title", e.target.value)}
      />

      {/* Subtitle */}
      <label>Subtitle</label>
      <input
        type="text"
        value={badgeData.subtitle}
        onChange={(e) => handleChange("subtitle", e.target.value)}
      />

      {/* Background Color */}
      <label>Background Color</label>
      <input
        type="color"
        value={badgeData.bgColor}
        onChange={(e) => handleChange("bgColor", e.target.value)}
      />

      {/* Text Color */}
      <label>Text Color</label>
      <input
        type="color"
        value={badgeData.textColor}
        onChange={(e) => handleChange("textColor", e.target.value)}
      />

      {/* Image Upload */}
      <label>Upload Image</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          handleChange("image", URL.createObjectURL(e.target.files[0]))
        }
      />
    </div>
  );
}