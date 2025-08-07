import { useRef, useState } from 'react';
import axios from 'axios';
import { usePutUpdateFoodMutation, usePutUpdateRestaurantMutation } from '@/features/auth/authApi';

type UseImageUploaderProps = {
  restaurantId: string;
  foodId?: string;
  imageUploadEntity: 'restaurant' | 'food';
};

export const useImageUploader = ({ restaurantId, foodId, imageUploadEntity }: UseImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [tempImageUrl, setTempImageUrl] = useState('');
  const [savedImageUrl, setSavedImageUrl] = useState('');
  const [updateRestaurant] = usePutUpdateRestaurantMutation();
  const [updateFood] = usePutUpdateFoodMutation();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const { data: auth } = await axios.get(
        'https://react-food-api-03d094431a6b.herokuapp.com/imagekit-auth'
      );

      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', file.name);
      formData.append('publicKey', import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY);
      formData.append('signature', auth.signature);
      formData.append('expire', auth.expire);
      formData.append('token', auth.token);

      const uploadRes = await axios.post('https://upload.imagekit.io/api/v1/files/upload', formData);
      setTempImageUrl(uploadRes.data.url);
    } catch (error) {
      console.error('Upload to ImageKit failed:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleConfirm = async () => {
    if (!tempImageUrl) return;

    try {
      if (imageUploadEntity === 'restaurant') {
        await updateRestaurant({
          restaurantId,
          body: { poster_image: tempImageUrl },
        }).unwrap();
      } else if (foodId) {
        await updateFood({
          restaurantId,
          foodId,
          body: { poster_image: tempImageUrl },
        }).unwrap();
      }

      setSavedImageUrl(tempImageUrl);
      setTempImageUrl('');
    } catch (error) {
      console.error('Failed to update image:', error);
    }
  };

  const handleRemove = () => setTempImageUrl('');
  const handleIconClick = () => fileInputRef.current?.click();

  return {
    fileInputRef,
    uploading,
    tempImageUrl,
    savedImageUrl,
    handleFileChange,
    handleConfirm,
    handleRemove,
    handleIconClick,
  };
};
