import { Check, ImagePlus, X } from 'lucide-react';
import { Button } from '../ui/button';
import { useImageUploader } from '@/hooks/useImageUploader';

type UploadImageProps = {
  restaurantId: string;
  foodId?: string;
  imageUploadEntity: 'restaurant' | 'food';
};

const UploadImageToImageKit = ({ restaurantId, foodId, imageUploadEntity }: UploadImageProps) => {
  const {
    fileInputRef,
    uploading,
    tempImageUrl,
    savedImageUrl,
    handleFileChange,
    handleConfirm,
    handleRemove,
    handleIconClick,
  } = useImageUploader({ restaurantId, foodId, imageUploadEntity });

  return (
    <div>
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
