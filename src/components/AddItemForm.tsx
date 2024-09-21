import { useState } from 'react'
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'


interface Item {
  id: string;
  image: string; // image filename or URL
  description: string;
  name: string;
  contact: string;
}

interface AddItemFormProps {
  onCancel: () => void;
  onSubmit?: (item: Omit<Item, 'id'>) => void; // Optional, in case you need to pass the data back to the parent
}

export function AddItemForm({ onCancel, onSubmit }: AddItemFormProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [comment, setComment] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const uploadImage = async () => {
    if (!imageFile) {
      console.error('No image file selected');
      return null;
    }
    const formData = new FormData();
    formData.append('file', imageFile);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      setImageFile(null); // Reset file input
      return result.filename; 
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const submitComment = async (imageId: string) => {
    if (!comment) return;
    try {
      const response = await fetch('/api/addComment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageId, comment }),
      });
      const result = await response.json();
      console.log('Comment added:', result);
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const uploadedImageId = await uploadImage();

    if (uploadedImageId) {
      await submitComment(uploadedImageId);
      if (onSubmit) {
        onSubmit({
          image: uploadedImageId,
          description,
          name,
          contact,
        });
      }
      // Reset form fields
      setDescription('');
      setName('');
      setContact('');
      setComment('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div>
        <Label htmlFor="image">Upload Image</Label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="name">Your Name</Label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="contact">Contact Information</Label>
        <Input
          id="contact"
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="comment">Add Comment</Label>
        <Textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <div className="flex justify-between">
        <Button type="submit">Add Item & Comment</Button>
        <Button type="button" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
}
