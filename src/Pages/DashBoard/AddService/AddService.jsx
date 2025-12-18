import React from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../Hooks/useAxiosSecure/useAxiosSecure';
import Swal from 'sweetalert2';

const AddService = () => {
    const axiosInstanceSecure = useAxiosSecure();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    const handleFormSubmission = (data) => {
        const newService = {
            packageName: data.serviceName,
            slug: data.serviceName.toLowerCase().replace(/\s+/g, "-"),
            eventType: data.serviceCategory,
            price: Number(data.cost),
            discountPrice: data.discountPrice ? Number(data.discountPrice) : null,
            duration: data.duration || "2 hours",
            theme: data.theme || "General",
            shortDescription: data.shortDescription,
            description: data.description,
            images: data.images,
            includes: data.includes || ["Basic setup"],
            rating: data.rating ? Number(data.rating) : 0,
            isPopular: data.isPopular || false,
            isActive: data.isActive || true,
            createdByEmail: data.createdByEmail,
            unit: data.unit,
            createdAt: new Date()
        };
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to add this service?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, add it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosInstanceSecure.post(`/services`, newService)
                    .then((res) => {
                        console.log(res);
                        if (res.data.insertedId) {
                            reset();
                            Swal.fire({
                                title: 'Success!',
                                text: 'Service added successfully.',
                                icon: 'success',
                                confirmButtonColor: '#3085d6'
                            });
                        }
                    })
                    .catch((error) => {
                        // Step 3: Show error Swal
                        Swal.fire({
                            title: `${error.message}!`,
                            text: 'Failed to add service. Please try again.',
                            icon: 'error',
                            confirmButtonColor: '#d33'
                        });
                    });
            }
        });

    };


    return (
        <div className="max-w-5xl mx-auto p-6">
            {/* Page Title */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800 mb-2">
                    Add New Service
                </h1>
                <p className="text-slate-600">
                    Fill out the form below to add a new service to your platform.
                </p>
            </div>

            {/* Form */}
            <form
                onSubmit={handleSubmit(handleFormSubmission)}
                className="bg-white shadow-md rounded-2xl p-6 space-y-6"
            >
                {/* Service Name */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        Service Name
                    </label>
                    <input
                        {...register('serviceName', { required: 'Service Name is required' })}
                        type="text"
                        placeholder="Enter service name"
                        className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${errors.serviceName ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-slate-400'
                            }`}
                    />
                    {errors.serviceName && (
                        <p className="text-red-500 text-sm mt-1">{errors.serviceName.message}</p>
                    )}
                </div>

                {/* Cost and Unit */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Cost
                        </label>
                        <input
                            {...register('cost', { required: 'Cost is required', min: { value: 0, message: 'Cost cannot be negative' } })}
                            type="number"
                            placeholder="Enter cost"
                            className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${errors.cost ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-slate-400'
                                }`}
                        />
                        {errors.cost && (
                            <p className="text-red-500 text-sm mt-1">{errors.cost.message}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Unit
                        </label>
                        <input
                            {...register('unit', { required: 'Unit is required' })}
                            type="text"
                            placeholder="e.g., per hour, per person"
                            className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${errors.unit ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-slate-400'
                                }`}
                        />
                        {errors.unit && (
                            <p className="text-red-500 text-sm mt-1">{errors.unit.message}</p>
                        )}
                    </div>
                </div>

                {/* Service Category and Created By */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Service Category
                        </label>
                        <input
                            {...register('serviceCategory', { required: 'Category is required' })}
                            type="text"
                            placeholder="Enter service category"
                            className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${errors.serviceCategory ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-slate-400'
                                }`}
                        />
                        {errors.serviceCategory && (
                            <p className="text-red-500 text-sm mt-1">{errors.serviceCategory.message}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Created By Email
                        </label>
                        <input
                            {...register('createdByEmail', {
                                required: 'Email is required',
                                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                            })}
                            type="email"
                            placeholder="Enter your email"
                            className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${errors.createdByEmail ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-slate-400'
                                }`}
                        />
                        {errors.createdByEmail && (
                            <p className="text-red-500 text-sm mt-1">{errors.createdByEmail.message}</p>
                        )}
                    </div>
                </div>

                {/* Short Description */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        Short Description
                    </label>
                    <input
                        {...register('shortDescription', { required: 'Short description is required' })}
                        type="text"
                        placeholder="Brief description"
                        className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${errors.shortDescription ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-slate-400'
                            }`}
                    />
                    {errors.shortDescription && (
                        <p className="text-red-500 text-sm mt-1">{errors.shortDescription.message}</p>
                    )}
                </div>

                {/* Full Description */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        Full Description
                    </label>
                    <textarea
                        {...register('description', { required: 'Full description is required' })}
                        placeholder="Detailed description of the service"
                        rows={4}
                        className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${errors.description ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-slate-400'
                            }`}
                    />
                    {errors.description && (
                        <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                    )}
                </div>

                {/* Image URL */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        Image URL
                    </label>
                    <input
                        {...register('images', { required: 'Image URL is required' })}
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${errors.images ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-slate-400'
                            }`}
                    />
                    {errors.images && (
                        <p className="text-red-500 text-sm mt-1">{errors.images.message}</p>
                    )}
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="w-full bg-slate-800 hover:bg-slate-900 text-white py-3 rounded-xl text-lg font-semibold transition"
                    >
                        Add Service
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddService;
