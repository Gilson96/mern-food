import { z } from 'zod';

const ukPostcodeRegex = /^[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}$/i;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const categoryOptions = ['pizza', 'burger', 'healhy', 'asian', 'pasta'] as const;

export const foodFormSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters.'),
  price: z.number().min(1, 'Fee must be over £1'),
  description: z.string().min(10),
  poster_image: z
    .union([
      z.instanceof(File),
      z.undefined(), // allow `undefined` during field array setup
    ])
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
      message: 'Image must be smaller than 5MB',
    })
    .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: 'Invalid image type',
    }),
});

export const reviewFormSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters.'),
  description: z.string().min(5),
  rating: z.number().max(5).min(0),

});

export const restaurantFormSchema = z.object({
  name: z.string().min(5, 'Name must be at least 5 characters.'),
  address: z
    .string()
    .min(10, 'Address must be at least 10 characters')
    .refine(
      (val) => {
        const postcode = val.trim().split(',').pop()?.trim(); // get the last part
        return postcode ? ukPostcodeRegex.test(postcode) : false;
      },
      {
        message: 'Address must end with a valid UK postcode',
      },
    ),
  admin: z.string().min(5, 'Name must be at least 5 characters.'),
  deliveryFee: z.number().min(1.0, 'Fee must be over £1'),
  arrival: z.number().int().max(50, 'Arrival must be 50 or less'),
  categories: z.enum(categoryOptions, 'Please select one of the options'),
  // foods: z.array(foodFormSchema),
});

export type RestaurantFormType = z.infer<typeof restaurantFormSchema>;
export type FoodFormType = z.infer<typeof foodFormSchema>;
export type ReviewFormType = z.infer<typeof reviewFormSchema>;
