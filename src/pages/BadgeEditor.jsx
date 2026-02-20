// import { useState } from "react";
// import BadgePreview from "../components/BadgePreview";
// import Toolbar from "../components/Toolbar";
// import html2canvas from "html2canvas";

// const downloadBadge = () => {
//   const element = document.getElementById("badge-preview");
//   html2canvas(element).then((canvas) => {
//     const link = document.createElement("a");
//     link.download = "badge.png";
//     link.href = canvas.toDataURL();
//     link.click();
//   });
// };

// export default function BadgeEditor() {
//   const [badgeData, setBadgeData] = useState({
//     title: "Employee Name",
//     subtitle: "Software Developer",
//     bgColor: "#ffffff",
//     textColor: "#000000",
//     image: null
//   });            

//   const handleChange = (field, value) => {
//     setBadgeData({ ...badgeData, [field]: value });
//   };

//   return (
//     <div style={{ display: "flex", gap: "30px", padding: "20px" }}>
      
//       {/* LEFT SIDE TOOLBAR */}                                             
//       <Toolbar badgeData={badgeData} handleChange={handleChange} />             

//       {/* RIGHT SIDE LIVE PREVIEW */}           
//       <BadgePreview badgeData={badgeData} />

//     </div>
//   );
// }

// import { useState } from "react";
// import { useParams } from "react-router-dom";
// import api from "../api";
// import html2canvas from "html2canvas";

// export default function BadgeEditor() {
//   const { orgId } = useParams();

//   const [badge, setBadge] = useState({
//     title: "",
//     subtitle: "",
//     bgColor: "#ffffff",
//     textColor: "#000000",
//     imageUrl: ""
//   });

//   const handleChange = (field, value) => {
//     setBadge({ ...badge, [field]: value });
//   };

//   const handleSave = async () => {
//     try {
//       await api.post("/badges", {
//         ...badge,
//         organizationId: parseInt(orgId)
//       });
//       alert("Badge Saved Successfully!");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const downloadBadge = () => {
//     const element = document.getElementById("badge-preview");
//     html2canvas(element).then((canvas) => {
//       const link = document.createElement("a");
//       link.download = "badge.png";
//       link.href = canvas.toDataURL();
//       link.click();
//     });
//   };

//   return (
//     <div style={{ display: "flex", gap: "40px", padding: "20px" }}>
      
//       {/* Toolbar */}
//       <div style={{ width: "300px" }}>
//         <h2>Create Badge</h2>

//         <input
//           type="text"
//           placeholder="Title"
//           onChange={(e) => handleChange("title", e.target.value)}
//         />

//         <input
//           type="text"
//           placeholder="Subtitle"
//           onChange={(e) => handleChange("subtitle", e.target.value)}
//         />

//         <label>Background</label>
//         <input
//           type="color"
//           value={badge.bgColor}
//           onChange={(e) => handleChange("bgColor", e.target.value)}
//         />

//         <label>Text Color</label>
//         <input
//           type="color"
//           value={badge.textColor}
//           onChange={(e) => handleChange("textColor", e.target.value)}
//         />

//         <input
//           type="text"
//           placeholder="Image URL"
//           onChange={(e) => handleChange("imageUrl", e.target.value)}
//         />

//         <button onClick={handleSave}>Save Badge</button>
//         <button onClick={downloadBadge}>Download</button>
//       </div>

//       {/* Preview */}
//       <div
//         id="badge-preview"
//         style={{
//           width: "300px",
//           height: "400px",
//           backgroundColor: badge.bgColor,
//           color: badge.textColor,
//           borderRadius: "10px",
//           padding: "20px",
//           textAlign: "center"
//         }}
//       >
//         {badge.imageUrl && (
//           <img
//             src={badge.imageUrl}
//             alt="preview"
//             style={{ width: "100px", height: "100px", borderRadius: "50%" }}
//           />
//         )}

//         <h2>{badge.title}</h2>
//         <p>{badge.subtitle}</p>
//       </div>

//     </div>
//   );
// }

import { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

export default function BadgeEditor() {
  const { orgId } = useParams();

  const [badgeData, setBadgeData] = useState({
    title: "",
    subtitle: "",
    bgColor: "#ffffff",
    textColor: "#000000",
    image: null,
  });

  const downloadBadge = () => {
    const element = document.getElementById("badge-preview");
    html2canvas(element).then((canvas) => {
      const link = document.createElement("a");
      link.download = "badge.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  
  const handleSave = async () => {
  try {
    const formData = new FormData();

    formData.append("Title", badgeData.title);
    formData.append("Subtitle", badgeData.subtitle);
    formData.append("BgColor", badgeData.bgColor);
    formData.append("TextColor", badgeData.textColor);
    formData.append("OrganizationId", orgId);

    if (badgeData.image) {
      formData.append("Logo", badgeData.image); // 👈 IMPORTANT
    }

    await api.post("/badges", formData);

    alert("Badge Saved Successfully");
  } catch (err) {
    console.log(err.response?.data || err.message);
    alert("Error saving badge");
  }
};


  return (
    <div style={{ display: "flex", gap: "40px", padding: "20px" }}>
      
      {/* LEFT SIDE */}
      <div style={{ width: "300px" }}>
        <input
          type="text"
          placeholder="Title"
          onChange={(e) =>
            setBadgeData({ ...badgeData, title: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Subtitle"
          onChange={(e) =>
            setBadgeData({ ...badgeData, subtitle: e.target.value })
          }
        />

        <input
          type="color"
          onChange={(e) =>
            setBadgeData({ ...badgeData, bgColor: e.target.value })
          }
        />

        <input
          type="color"
          onChange={(e) =>
            setBadgeData({ ...badgeData, textColor: e.target.value })
          }
        />

        <input
          type="file"
          onChange={(e) =>
            setBadgeData({ ...badgeData, image: e.target.files[0] })
          }
        />

        <button onClick={handleSave}>Save Badge</button><br/>  <br/>
        <button onClick={downloadBadge}>Download</button>
      </div>

      {/* PREVIEW */}
      <div
        style={{
          width: "300px",
          height: "400px",
          backgroundColor: badgeData.bgColor,
          color: badgeData.textColor,
          padding: "20px",
          borderRadius: "15px",
          textAlign: "center",
        }}
      >
        {badgeData.image && (
          <img
            src={URL.createObjectURL(badgeData.image)}
            alt="logo"
            style={{ width: "100px", marginBottom: "10px" }}
          />
        )}

        <h2>{badgeData.title}</h2>
        <p>{badgeData.subtitle}</p>
      </div>
    </div>
  );
}