import { Check, ImagePlus, X } from 'lucide-react';
import React, { useRef, useState } from 'react';
import axios from 'axios';
import { Button } from '../ui/button';
import { usePutUpdateFoodMutation, usePutUpdateRestaurantMutation } from '@/features/auth/authApi';

type UploadImageProps = {
  restaurantId: string;
  foodId?: string;
  imageUploadEntity: string;
};

const UploadImageToImageKit = ({ restaurantId, foodId, imageUploadEntity }: UploadImageProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [tempImageUrl, setTempImageUrl] = useState(''); // image preview but not saved yet
  const [savedImageUrl, setSavedImageUrl] = useState(''); // current saved image in backend
  const [updateRestaurant] = usePutUpdateRestaurantMutation();
  const [updateFood] = usePutUpdateFoodMutation();

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    setTempImageUrl(''); // clear temporary image
  };

  const handleConfirm = async () => {
    if (!tempImageUrl) return;

    try {
      if (imageUploadEntity === 'restaurant') {
        await updateRestaurant({
          restaurantId,
          body: { poster_image: tempImageUrl },
        }).unwrap();
      } else {
        if (!foodId) {
          console.error('Food ID is required to update food image');
          return;
        }
        await updateFood({
          restaurantId,
          foodId,
          body: { poster_image: tempImageUrl },
        }).unwrap();
      }
      setSavedImageUrl(tempImageUrl);
      setTempImageUrl('');
    } catch (error) {
      console.error('Failed to update restaurant image:', error);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      // Get ImageKit auth from backend
      const { data: auth } = await axios.get(
        'https://react-food-api-03d094431a6b.herokuapp.com/imagekit-auth',
      );

      // Prepare upload to ImageKit
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', file.name);
      formData.append('publicKey', import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY);
      formData.append('signature', auth.signature);
      formData.append('expire', auth.expire);
      formData.append('token', auth.token);

      // Upload to ImageKit
      const uploadRes = await axios.post(
        'https://upload.imagekit.io/api/v1/files/upload',
        formData,
      );

      // Set preview image (not yet saved to backend)
      setTempImageUrl(uploadRes.data.url);
    } catch (error) {
      console.error('Upload to ImageKit failed:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      {/* If no image is uploaded yet */}
      {!tempImageUrl && !savedImageUrl && (
        <button
          type="button"
          onClick={handleIconClick}
          className="flex flex-col items-center justify-center rounded-md border bg-white p-4 hover:bg-gray-100"
        >
          {uploading ? (
            <span>Uploading...</span>
          ) : (
            <>
              <ImagePlus size={24} />
              <span>Upload Image</span>
            </>
          )}
        </button>
      )}

      {/* Preview new image (before save) */}
      {tempImageUrl && (
        <div className="mt-4 flex gap-2">
          <img
            src={tempImageUrl}
            alt="Preview"
            className="h-32 w-32 rounded-md border object-cover"
          />
          <div className="flex flex-col items-center gap-2">
            <Button
              type="button"
              variant="secondary"
              size="icon"
              className="size-8 rounded-full"
              onClick={handleConfirm}
            >
              <Check color="oklch(72.3% 0.219 149.579)" />
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="icon"
              className="size-8 rounded-full"
              onClick={handleRemove}
            >
              <X color="oklch(63.7% 0.237 25.331)" />
            </Button>
          </div>
        </div>
      )}

      {/* Show saved image */}
      {!tempImageUrl && savedImageUrl && (
        <div className="mt-4 flex gap-2">
          <img
            src={savedImageUrl}
            alt="Saved"
            className="h-32 w-32 rounded-md border object-cover"
          />
          <Button
            type="button"
            variant="secondary"
            size="icon"
            className="size-8 rounded-full"
            onClick={handleIconClick}
          >
            <ImagePlus size={16} />
          </Button>
        </div>
      )}

      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default UploadImageToImageKit;
