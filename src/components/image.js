import React, { useRef } from 'react';
import axios from 'axios';

export default function ImageUploader({type, src, image}) {
    const imagePreview = useRef();
  
    const handleUpload = event => {
      const file = event.target.files[0];
      imagePreview.current.src = URL.createObjectURL(file)
      image(file)

      // const formData = new FormData();
      // formData.append('file', file);
  
      // axios.post('/api/v1/upload', formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   }
      // })
      // .then(response => {
      //   console.log(response.data.filename);
      // })
      // .catch(error => {
      //   console.error(error);
      // });
    };
  
    return (
      <div>
        
        <label class="block text-gray-700 text-sm mb-2">
        {type === 'user' && 'Profile Photo'}
        {type === 'company' && 'Company Logo'}
        </label>
        
        <div>
            <div class="mt-5 ml-5">
                <img ref={imagePreview} src={'/api/v1/images/'+src} class="object-cover w-40 h-40 rounded-full shadow"/>
            </div>
            <input type="file" accept="image/*" onChange={handleUpload} id={`${type}-upload`} className="hidden"/>
            {window.location.pathname !== '/view' &&
            <button type="button" onClick={() => {document.getElementById(`${type}-upload`).click();}} class="inline-flex items-center mb-5 px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-400 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150 mt-2 ml-3">
                Select New Photo
            </button>
            }
        </div>
      </div>
    );
  }