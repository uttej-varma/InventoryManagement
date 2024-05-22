import { useSelector, useDispatch } from "react-redux";
import { selectUserInfo, updateUserAsync } from "./userSlice";
import { useForm } from "react-hook-form";
import { useState,useEffect } from "react";
import { BallTriangle } from "react-loader-spinner";
const Profile = () => {
  const userInfo = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  const [user, setUser] = useState(userInfo);
 
   useEffect(()=>{
    setUser({
      name:userInfo.name?userInfo.name:'userName',
      role:userInfo.role?userInfo.role:"user",
      email:userInfo.email,
      imageUrl:userInfo.imageUrl?userInfo.imageUrl:'https://res.cloudinary.com/db8cyhega/image/upload/v1713265570/multiiiiiii/noavatar_lgwany.png'
    })
   },[userInfo])
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('upload_preset', 'rcje2bp8');
    const uploadImageToCloudinary = async (file) => {
      
      const cloudName = "db8cyhega"; // Replace 'your_cloud_name' with your Cloudinary cloud name
      const apiKey = "751274839422221"; // Replace 'your_api_key' with your Cloudinary API key
      const timestamp = Date.now() / 1000; // Get current timestamp
      const uploadPreset = "rcje2bp8"; // Replace 'your_upload_preset' with your Cloudinary upload preset
      const apiSecret = "VuEFKPkji6P_qzrXA4v9nQy68RA"; // Replace 'your_api_secret' with your Cloudinary API secret

      // Generate signature
      const signaturePayload = `timestamp=${timestamp}&upload_preset=${uploadPreset}${apiSecret}`;
      const signature = await crypto.subtle.digest(
        "SHA-1",
        new TextEncoder().encode(signaturePayload)
      );
      const hexSignature = Array.from(new Uint8Array(signature))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

      // Create FormData object
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);
      formData.append("api_key", apiKey);
      formData.append("timestamp", timestamp);
      formData.append("signature", hexSignature);
     
      // Perform the fetch POST request to Cloudinary
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      // Parse and return the response JSON
      return await response.json();
    };

      const data = await uploadImageToCloudinary(selectedFile);
      dispatch(updateUserAsync({ ...userInfo,imageUrl: data.secure_url }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <div className="flex flex-col items-center">
        <img
          src={user.imageUrl}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover"
        />
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Update Profile Picture
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
          />
          <button
            onClick={handleUpload}
            className="mt-2 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600"
          >
            Upload
          </button>
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
        <p className="text-gray-600">{user.role}</p>
        <p className="text-gray-600">{user.email}</p>
      </div>
    </div>
  );
};

export default Profile;

