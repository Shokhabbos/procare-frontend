import { useState } from 'react';
import {
  SearchableSelect,
  type SelectOption,
  PhoneInput,
  Input,
  Switch,
} from '@shared/ui';
import { MapPin } from 'lucide-react';

/**
 * Delivery Tab Content
 */
export function TabContentDelivery() {
  return (
    <div className="space-y-6">
      {/* Manzil va Kuryer yonma-yon */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <AddressSection />
        <CourierSection />
      </div>

      {/* Telefon ijarasi pastda to'liq kenglikda */}
      <PhoneRentalSection />
    </div>
  );
}

/**
 * Section 1: Address Information
 */
function AddressSection() {
  const [address, setAddress] = useState('');
  const [showSecondaryAddress, setShowSecondaryAddress] = useState(false);
  const [secondaryAddress, setSecondaryAddress] = useState('');
  const [showAddressRecommendations, setShowAddressRecommendations] =
    useState(false);
  const [showSecondaryRecommendations, setShowSecondaryRecommendations] =
    useState(false);

  // Mock recommendations - gerçek implementasyonda API'dan gelecek
  const addressRecommendations = [
    'Toshkent, Chilonzor tumani',
    'Toshkent, Yunusobod tumani',
    'Toshkent, Yakkasaroy tumani',
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Section Header */}
      <div className="border-b border-gray-200 px-4 py-3">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-brand-blue" />
          <h3 className="text-16-medium text-body">
            Mijozning manzil ma'lumotlari
          </h3>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Main Address */}
        <div>
          <label className="block text-14-regular text-body mb-2">
            Mijoz manzili
          </label>
          <div className="relative">
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              onFocus={() => setShowAddressRecommendations(true)}
              onBlur={() => {
                // Delay to allow clicking recommendations
                setTimeout(() => setShowAddressRecommendations(false), 200);
              }}
              placeholder="Manzilni kiriting"
              className="w-full"
            />

            {/* Recommendations Dropdown */}
            {showAddressRecommendations && address.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-48 overflow-auto">
                {addressRecommendations
                  .filter((rec) =>
                    rec.toLowerCase().includes(address.toLowerCase()),
                  )
                  .map((rec, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setAddress(rec);
                        setShowAddressRecommendations(false);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-gray-50 text-14-regular text-body"
                    >
                      {rec}
                    </button>
                  ))}
              </div>
            )}
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
          <div className="text-center text-description">
            <MapPin className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-14-regular">Xarita uchun joy</p>
            <p className="text-12-light">*Yoki xaritadan tanlang</p>
          </div>
        </div>
      </div>

      {/* Secondary Address Toggle - Alohida bo'lim */}
      <div className="border-t border-gray-200 bg-white">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <label
              htmlFor="secondary-address-toggle"
              className="text-14-regular text-body cursor-pointer"
            >
              Boshqa manzilga yetkazib berish
            </label>
            <Switch
              id="secondary-address-toggle"
              checked={showSecondaryAddress}
              onCheckedChange={setShowSecondaryAddress}
            />
          </div>
        </div>

        {/* Secondary Address Section */}
        {showSecondaryAddress && (
          <div className="px-4 pb-4 space-y-4 border-t border-gray-200 pt-4">
            <div>
              <label className="block text-14-regular text-body mb-2">
                Yetkazib berish manzili
              </label>
              <div className="relative">
                <Input
                  value={secondaryAddress}
                  onChange={(e) => setSecondaryAddress(e.target.value)}
                  onFocus={() => setShowSecondaryRecommendations(true)}
                  onBlur={() => {
                    setTimeout(
                      () => setShowSecondaryRecommendations(false),
                      200,
                    );
                  }}
                  placeholder="Manzilni kiriting"
                  className="w-full"
                />

                {showSecondaryRecommendations &&
                  secondaryAddress.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-48 overflow-auto">
                      {addressRecommendations
                        .filter((rec) =>
                          rec
                            .toLowerCase()
                            .includes(secondaryAddress.toLowerCase()),
                        )
                        .map((rec, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              setSecondaryAddress(rec);
                              setShowSecondaryRecommendations(false);
                            }}
                            className="w-full text-left px-3 py-2 hover:bg-gray-50 text-14-regular text-body"
                          >
                            {rec}
                          </button>
                        ))}
                    </div>
                  )}
              </div>
            </div>

            <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
              <div className="text-center text-description">
                <MapPin className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-14-regular">Xarita uchun joy</p>
                <p className="text-12-light">*Yoki xaritadan tanlang</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Section 2: Courier Information
 */
function CourierSection() {
  const [selectedCourier, setSelectedCourier] = useState<SelectOption | null>(
    null,
  );
  const [courierPhone, setCourierPhone] = useState('+998 ');
  const [showSecondaryCourier, setShowSecondaryCourier] = useState(false);
  const [secondaryCourier, setSecondaryCourier] = useState<SelectOption | null>(
    null,
  );
  const [secondaryCourierPhone, setSecondaryCourierPhone] = useState('+998 ');

  const courierOptions: SelectOption[] = [
    { value: 'courier-1', label: 'Ahmadjon Toshmatov' },
    { value: 'courier-2', label: 'Bobur Karimov' },
    { value: 'courier-3', label: 'Davron Yusupov' },
    { value: 'courier-4', label: 'Eldor Rahimov' },
  ];

  const validatePhone = (phone: string): boolean => {
    const digits = phone.replace(/\D/g, '');
    return digits.length === 12; // +998XXXXXXXXX
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Section Header */}
      <div className="border-b border-gray-200 px-4 py-3">
        <h3 className="text-16-medium text-body">Kuryer ma'lumotlari</h3>
      </div>

      <div className="p-4 space-y-4">
        {/* Main Courier */}
        <div>
          <label className="block text-14-regular text-body mb-2">
            Kuryerni tanlang <span className="text-brand-red">*</span>
          </label>
          <SearchableSelect
            value={selectedCourier}
            options={courierOptions}
            placeholder="Kuryerni tanlang"
            searchPlaceholder="Kuryer qidirish..."
            onChange={(option) => {
              if (Array.isArray(option)) return;
              setSelectedCourier(option);
            }}
          />
        </div>

        <div>
          <label className="block text-14-regular text-body mb-2">
            Kuryer telefon raqami <span className="text-brand-red">*</span>
          </label>
          <PhoneInput
            value={courierPhone}
            onChange={setCourierPhone}
            error={
              courierPhone.length > 5 && !validatePhone(courierPhone)
                ? "To'liq telefon raqamini kiriting"
                : undefined
            }
          />
        </div>
      </div>

      {/* Secondary Courier Toggle - Alohida bo'lim */}
      <div className="border-t border-gray-200 bg-white">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <label
              htmlFor="secondary-courier-toggle"
              className="text-14-regular text-body cursor-pointer"
            >
              Boshqa kuryer yetkazib beradi
            </label>
            <Switch
              id="secondary-courier-toggle"
              checked={showSecondaryCourier}
              onCheckedChange={setShowSecondaryCourier}
            />
          </div>
        </div>

        {/* Secondary Courier Section */}
        {showSecondaryCourier && (
          <div className="px-4 pb-4 space-y-4 border-t border-gray-200 pt-4">
            <div>
              <label className="block text-14-regular text-body mb-2">
                Kuryerni tanlang <span className="text-brand-red">*</span>
              </label>
              <SearchableSelect
                value={secondaryCourier}
                options={courierOptions}
                placeholder="Kuryerni tanlang"
                searchPlaceholder="Kuryer qidirish..."
                onChange={(option) => {
                  if (Array.isArray(option)) return;
                  setSecondaryCourier(option);
                }}
              />
            </div>

            <div>
              <label className="block text-14-regular text-body mb-2">
                Kuryer telefon raqami <span className="text-brand-red">*</span>
              </label>
              <PhoneInput
                value={secondaryCourierPhone}
                onChange={setSecondaryCourierPhone}
                error={
                  secondaryCourierPhone.length > 5 &&
                  !validatePhone(secondaryCourierPhone)
                    ? "To'liq telefon raqamini kiriting"
                    : undefined
                }
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Section 3: Phone Rental Information
 */
function PhoneRentalSection() {
  const [isRentalEnabled, setIsRentalEnabled] = useState(false);
  const [selectedModel, setSelectedModel] = useState<SelectOption | null>(null);
  const [imei, setImei] = useState('');
  const [rentalDateFrom, setRentalDateFrom] = useState('');
  const [rentalDateTo, setRentalDateTo] = useState('');

  const phoneModels: SelectOption[] = [
    { value: 'iphone-14', label: 'iPhone 14 Pro', meta: { price: 15000 } },
    { value: 'iphone-13', label: 'iPhone 13', meta: { price: 12000 } },
    { value: 'samsung-s23', label: 'Samsung S23', meta: { price: 13000 } },
    { value: 'samsung-s22', label: 'Samsung S22', meta: { price: 10000 } },
  ];

  const validateImei = (value: string): boolean => {
    return /^\d{15}$/.test(value);
  };

  const calculatePrice = (): number => {
    if (!selectedModel || !rentalDateFrom || !rentalDateTo) return 0;

    const from = new Date(rentalDateFrom);
    const to = new Date(rentalDateTo);
    const days = Math.ceil(
      (to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (days <= 0) return 0;

    const pricePerDay = (selectedModel.meta as { price: number })?.price || 0;
    return days * pricePerDay;
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('uz-UZ').format(price) + " so'm";
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Section Header with Toggle */}
      <div className="border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <h3 className="text-16-medium text-body">Telefon ijarasi</h3>
          <Switch
            checked={isRentalEnabled}
            onCheckedChange={setIsRentalEnabled}
          />
        </div>
      </div>

      {/* Expanded Section Content */}
      {isRentalEnabled && (
        <div className="p-4 space-y-4">
          {/* Model Selection */}
          <div>
            <label className="block text-14-regular text-body mb-2">
              Model nomi <span className="text-brand-red">*</span>
            </label>
            <SearchableSelect
              value={selectedModel}
              options={phoneModels}
              placeholder="Model tanlang"
              searchPlaceholder="Model qidirish..."
              onChange={(option) => {
                if (Array.isArray(option)) return;
                setSelectedModel(option);
              }}
            />
          </div>

          {/* IMEI Number */}
          <div>
            <label className="block text-14-regular text-body mb-2">
              IMEI raqami <span className="text-brand-red">*</span>
            </label>
            <Input
              value={imei}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 15);
                setImei(value);
              }}
              placeholder="15 raqamli IMEI"
              maxLength={15}
              className="w-full"
            />
            {imei.length > 0 && !validateImei(imei) && (
              <p className="mt-1 text-12-regular text-brand-red">
                IMEI 15 ta raqamdan iborat bo'lishi kerak
              </p>
            )}
          </div>

          {/* Rental Period */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-14-regular text-body mb-2">
                Ijara vaqti (dan) <span className="text-brand-red">*</span>
              </label>
              <Input
                type="date"
                value={rentalDateFrom}
                onChange={(e) => setRentalDateFrom(e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-14-regular text-body mb-2">
                Ijara vaqti (gacha) <span className="text-brand-red">*</span>
              </label>
              <Input
                type="date"
                value={rentalDateTo}
                onChange={(e) => setRentalDateTo(e.target.value)}
                min={rentalDateFrom}
                className="w-full"
              />
            </div>
          </div>

          {/* Calculated Price Display */}
          {selectedModel && rentalDateFrom && rentalDateTo && (
            <div className="mt-4 p-4 bg-brand-blue/10 rounded-lg border border-brand-blue/20">
              <div className="flex items-center justify-between">
                <span className="text-14-regular text-body">
                  Ijara uchun hisoblanɡan to'lov
                </span>
                <span className="text-20-medium text-brand-blue">
                  {formatPrice(calculatePrice())}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
