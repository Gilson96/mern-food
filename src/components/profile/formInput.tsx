import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UseFormRegister, Controller, Control } from 'react-hook-form';

type FormInputProps = {
  name: string;
  label: string;
  type?: string;
  error?: any;
  placeholder?: string;
  control?: Control<any>;
  register?: UseFormRegister<any>;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const FormInput = ({
  label,
  register,
  control,
  name,
  type = 'text',
  error,
  placeholder,
  ...rest
}: FormInputProps) => {
  return (
    <div>
      <Label htmlFor={name} className="pb-[3%]">
        {label}
      </Label>

      {/* File input with Controller */}
      {type === 'file' && control ? (
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Input
              {...rest}
              type="file"
              autoComplete="off"
              onChange={(e) => field.onChange(e.target.files?.[0])}
              placeholder={placeholder}
              className="max-md:w-[80%]"
            />
          )}
        />
      ) : (
        <Input
          {...(register && register(name, type === 'number' ? { valueAsNumber: true } : {}))}
          {...rest}
          type={type}
          autoComplete="off"
          placeholder={placeholder}
          className="max-md:w-[80%]"
        />
      )}

      {error && <p className="text-red-500">{error.message}</p>}
    </div>
  );
};
