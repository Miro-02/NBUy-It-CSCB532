import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const categories = [
    "Electronics",
    "Home & Kitchen",
    "Sports & Fitness",
    "Beauty & Personal Care",
    "Clothing",
    "Books",
    "Other"
] as const;

const productSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    category: z.enum(categories, {
        errorMap: () => ({ message: "Please select a category" })
    }),
    price: z.number().min(0.01, {message: "Price must be greater than 0"}),
    quantity: z.number().min(0, {message: "Quantity can't be negative"}).int(),
    images: z.array(z.instanceof(File)).min(1, "At least one image required")
});

type ProductFormData = z.infer<typeof productSchema>;

export function AddProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema)
  });

  const selectedImages = watch("images") || [];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setValue("images", [...selectedImages, ...files]);
  };

  const removeImage = (index: number) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    setValue("images", updatedImages);
  };

  const onSubmit = (data: ProductFormData) => {
    const formData = new FormData();
    
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("price", data.price.toString());
    formData.append("quantity", data.quantity.toString());
  
    data.images.forEach((file, index) => {
      formData.append(`images`, file);
    });
  
    console.log("Form data entries:");
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }
  
    reset();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-4xl font-bold text-[#093f87] mb-8">Add New Product</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-xl shadow-md">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name
              </label>
              <input
                {...register("name")}
                type="text"
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.name ? "border-red-500" : "border-gray-200"
                } focus:ring-[#093f87] focus:border-[#093f87]`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                {...register("description")}
                rows={4}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.description ? "border-red-500" : "border-gray-200"
                } focus:ring-[#093f87] focus:border-[#093f87]`}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                {...register("category")}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.category ? "border-red-500" : "border-gray-200"
                } focus:ring-[#093f87] focus:border-[#093f87]`}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (лв.)
                </label>
                <input
                  {...register("price", { valueAsNumber: true })}
                  type="number"
                  step="0.01"
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.price ? "border-red-500" : "border-gray-200"
                  } focus:ring-[#093f87] focus:border-[#093f87]`}
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <input
                  {...register("quantity", { valueAsNumber: true })}
                  type="number"
                  min={1}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.quantity ? "border-red-500" : "border-gray-200"
                  } focus:ring-[#093f87] focus:border-[#093f87]`}
                />
                {errors.quantity && (
                  <p className="text-red-500 text-sm mt-1">{errors.quantity.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Images
              </label>
              
              <div className="flex flex-col gap-4">
                <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#093f87] transition-colors">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <div className="text-center">
                    <svg
                      className="mx-auto h-8 w-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-sm text-gray-600">
                      Click to upload images
                    </span>
                  </div>
                </label>

                {selectedImages.length > 0 && (
                  <div className="grid grid-cols-3 gap-2">
                    {selectedImages.map((file, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          className="h-24 w-full object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {errors.images && (
                <p className="text-red-500 text-sm mt-1">{errors.images.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#093f87] text-white py-3 rounded-lg hover:bg-[#082f6a] transition-colors"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};