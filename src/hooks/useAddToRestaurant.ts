import { useEffect, useState } from 'react';
import { useForm, UseFormReturn, FieldValues, DefaultValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

type UseAddEntityFormProps<TFormSchema extends FieldValues> = {
  schema: any; // your Zod schema
  defaultValues: Partial<TFormSchema>;
  state?: string;
  openStateValue: string;
  createMutation: any; // RTK Query mutation hook
  onBuildFormData: (data: TFormSchema, restaurantId?: string) => FormData;
  successMessage: string;
  restaurantId?: string;
  categoryId?: string;
  onSuccess?: () => void;
};

export function useAddEntityForm<TFormSchema extends FieldValues>({
  schema,
  defaultValues,
  state,
  openStateValue,
  createMutation,
  onBuildFormData,
  successMessage,
  restaurantId,
  categoryId,
  onSuccess,
}: UseAddEntityFormProps<TFormSchema>) {
  const [open, setOpen] = useState(false);
  const [createEntity] = createMutation();

  const form = useForm<TFormSchema>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<TFormSchema>,
  });

  useEffect(() => {
    if (state === openStateValue) {
      setOpen(true);
    }
  }, [state, openStateValue]);

  const onSubmit = async (data: TFormSchema) => {
    console.log('RHF data before FormData append:', data);
    try {
      const formData = onBuildFormData(data, restaurantId ?? categoryId);
      await createEntity({
        ...(restaurantId ? { restaurantId } : { categoryId }),
        body: formData,
      }).unwrap();
      form.reset();
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error submitting:', error, form.formState.errors);
      toast.error('Submission failed', { position: 'top-center' });
    }
  };

  return {
    open,
    setOpen,
    ...form,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
