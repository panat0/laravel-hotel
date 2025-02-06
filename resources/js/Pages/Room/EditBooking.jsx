import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '/resources/js/Components/ui/Card';
import { Label } from '/resources/js/Components/ui/Label';
import { Button } from '/resources/js/Components/ui/ฺButton';

const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return !isNaN(d) ? d.toISOString().split('T')[0] : '';
};

const EditBooking = ({ booking, roomTypes, roomNumber }) => {
    const { data, setData, patch, errors } = useForm({
        room_number: booking?.room_number || '',
        start_date: formatDate(booking?.start_date),
        end_date: formatDate(booking?.end_date),
    });

    const handleSubmit = (e) => {
        e.preventDefault();


        patch(route('room.update', booking.booking_id), {
            room_number: data.room_number,
            start_date: data.start_date,
            end_date: data.end_date,
        });
    };



    return (
        <div className="container mx-auto p-6 max-w-2xl ">
            <Card className="w-full shadow-lg rounded-lg grid items-center">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-800 ">Edit Booking</CardTitle>
                    <CardDescription className="text-gray-500">Update booking details.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6 p-4">
                        <div className="space-y-2">
                            <Label className="text-gray-700">Room Number</Label>
                            <input
                                type="text"
                                value={data.room_number}
                                onChange={(e) => setData('room_number', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-gray-700">Checked-in Date</Label>
                            <input
                                type="date"
                                value={data.start_date}
                                onChange={(e) => setData('start_date', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-gray-700">Checked-out Date</Label>
                            <input
                                type="date"
                                value={data.end_date}
                                onChange={(e) => setData('end_date', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex justify-end space-x-4">
                            <Button variant="outline" type="button" className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md">Cancel</Button>
                            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">Submit</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default EditBooking;
