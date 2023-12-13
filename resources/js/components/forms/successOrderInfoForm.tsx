import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export const SuccessOrderInfoForm = () => {
  const [value, setValue] = useState('');  

  const modules = {
    toolbar: [
      [{ 'header': [] }],
      [{ 'align': [] }],
      [{ 'color': [] }],
      ['bold', 'italic', 'underline'],
      ['link'],
      ['clean'],
    ],
  };

  useEffect(()=>{console.log(value)},[value])

  return (
    <ReactQuill modules={modules} theme="snow" value={value} onChange={setValue} />
  );
}