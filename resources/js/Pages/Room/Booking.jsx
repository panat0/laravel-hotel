import React, { useState } from 'react';
import { usePage, Inertia } from '@inertiajs/react';

export default function BookingForm() {
    const { rooms, customers } = usePage().props;

    const [formData, setFormData] = useState({
        customer_id: '',
        room_id: '',
        start_date: '',
        end_date: '',
    });

    const [errors, setErrors] = useState({});

    // การจัดการการเปลี่ยนแปลงข้อมูลในฟอร์ม
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // การส่งข้อมูลฟอร์ม
    const handleSubmit = (e) => {
        e.preventDefault();

        // ตรวจสอบข้อมูลเบื้องต้น
        Inertia.post('/bookings', formData, {
            onError: (err) => {
                setErrors(err);
            },
        });
    };

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
            <h1 className="text-2xl font-bold text-gray-700 mb-4">Booking Form</h1>
            <form onSubmit={handleSubmit}>
                {/* Customer */}
                <div className="mb-4">
                    <label htmlFor="customer_id" className="block text-sm font-medium text-gray-700">Customer</label>
                    <select
                        id="customer_id"
                        name="customer_id"
                        value={formData.customer_id}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-4 py-2 bg-gray-100 rounded-lg border border-gray-300"
                    >
                        <option value="">Select Customer</option>
                        {customers.map((customer) => (
                            <option key={customer.id} value={customer.id}>
                                {customer.name} ({customer.email})
                            </option>
                        ))}
                    </select>
                    {errors.customer_id && <p className="text-red-500 text-sm">{errors.customer_id}</p>}
                </div>

                {/* Room */}
                <div className="mb-4">
                    <label htmlFor="room_id" className="block text-sm font-medium text-gray-700">Room</label>
                    <select
                        id="room_id"
                        name="room_id"
                        value={formData.room_id}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-4 py-2 bg-gray-100 rounded-lg border border-gray-300"
                    >
                        <option value="">Select Room</option>
                        {rooms.map((room) => (
                            <option key={room.id} value={room.id}>
                                {room.room_number} - {room.roomTypeName}
                            </option>
                        ))}
                    </select>
                    {errors.room_id && <p className="text-red-500 text-sm">{errors.room_id}</p>}
                </div>

                {/* Start Date */}
                <div className="mb-4">
                    <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">Start Date</label>
                    <input
                        type="date"
                        id="start_date"
                        name="start_date"
                        value={formData.start_date}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-4 py-2 bg-gray-100 rounded-lg border border-gray-300"
                    />
                    {errors.start_date && <p className="text-red-500 text-sm">{errors.start_date}</p>}
                </div>

                {/* End Date */}
                <div className="mb-4">
                    <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">End Date</label>
                    <input
                        type="date"
                        id="end_date"
                        name="end_date"
                        value={formData.end_date}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-4 py-2 bg-gray-100 rounded-lg border border-gray-300"
                    />
                    {errors.end_date && <p className="text-red-500 text-sm">{errors.end_date}</p>}
                </div>

                {/* Submit Button */}
                <div className="mb-4">
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Submit Booking
                    </button>
                </div>
            </form>
        </div>
    );
}
