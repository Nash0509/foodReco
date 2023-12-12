import React, { useState } from 'react';
import { FaBox } from 'react-icons/fa';
import { FaArrowsAlt } from 'react-icons/fa';


const ImageDragAndDrop = ({doit}) => {
  const [dragging, setDragging] = useState(false);

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', ''); // required for Firefox to enable dragging
    setDragging(true);
  };

  const handleDragEnd = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const files = e.dataTransfer.files;

    // Check if there are files and if the first file is an image
    if (files.length > 0 && files[0].type.startsWith('image/')) {
      const imageURL = URL.createObjectURL(files[0]);
      doit(imageURL);

      // Now imageURL contains the URL of the dropped image, and you can use it as needed
      console.log('Dropped image URL:', imageURL);
    } else {
      console.log('Please drop a valid image file.');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      style={{ border: '2px dashed black' , padding: '17px', textAlign: 'center', marginTop:'1rem' , boxShadow:'1px 2px 10px yellow', fontFamily:'sans-serif', borderRadius:'5px'}}
      draggable
    >
      <h3>Drag and drop <FaArrowsAlt /> an image anywhere in this box <FaBox />!</h3>
    </div>
  );
};

export default ImageDragAndDrop;
