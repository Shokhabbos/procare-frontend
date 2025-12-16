import { useForm } from 'react-hook-form';
import {
  Button,
  Input,
  Label,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@shared/ui';
import { useCreateCustomer } from '../model/use-create-customer';
import type { CreateCustomerDto } from '@entities/customer';

/**
 * Customer yaratish formasi
 */
export function CreateCustomerForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateCustomerDto>();
  const createCustomer = useCreateCustomer();

  const onSubmit = async (data: CreateCustomerDto) => {
    try {
      await createCustomer.mutateAsync(data);
      reset();
      alert('Customer muvaffaqiyatli yaratildi!');
    } catch (error) {
      console.error('Xatolik:', error);
      alert('Xatolik yuz berdi!');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Yangi Customer</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Ism</Label>
            <Input
              id="name"
              {...register('name', { required: 'Ism majburiy' })}
              placeholder="Customer ismi"
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register('email', {
                required: 'Email majburiy',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Noto'g'ri email format",
                },
              })}
              placeholder="email@example.com"
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefon</Label>
            <Input
              id="phone"
              {...register('phone', { required: 'Telefon majburiy' })}
              placeholder="+998 90 123 45 67"
            />
            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Manzil (ixtiyoriy)</Label>
            <Input
              id="address"
              {...register('address')}
              placeholder="Toshkent, Chilonzor"
            />
          </div>

          <Button
            type="submit"
            disabled={createCustomer.isPending}
            className="w-full"
          >
            {createCustomer.isPending ? 'Saqlanmoqda...' : 'Saqlash'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
