import React, { useState } from 'react';
import ImageGrid from '@/components/imageGrid';
import {AddItemForm} from '@/components/AddItemForm';

const HomePage: React.FC = () => {
  const [images, setImages] = useState<{ filename: string; comments: string[] }[]>([]);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    if (event.target.files) {
      formData.append('file', event.target.files[0]);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setImages([...images, { filename: data.filename, comments: [] }]); // Add new image to state
    }
  };

  return (
    <div>
      <h1>Lost and Found</h1>
      <input type="file" onChange={handleUpload} />
      <ImageGrid images={images} />
    </div>
  );
};

export default HomePage;
