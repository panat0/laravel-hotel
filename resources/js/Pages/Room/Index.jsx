import React, { useState, useEffect } from 'react';
import { Head, usePage } from "@inertiajs/react";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { router } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import { useRouter } from "@inertiajs/inertia-react";
import { useForm } from '@inertiajs/react';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Index() {
    const {
        rooms = [],
        totalBookings = 0,
        totalRevenue = 0,
        totalCustomers = 0,
        currentPage = 1,
        lastPage = 1,
        bookingData = []
    } = usePage().props;

    console.log({ rooms })


    const [editingRoom, setEditingRoom] = useState(null); // เก็บห้องที่กำลังแก้ไข
    const [editData, setEditData] = useState({}); // เก็บข้อมูลที่ถูกแก้ไข

    // เตรียมข้อมูลสำหรับกราฟแท่ง
    const chartData = {
        labels: (bookingData && Array.isArray(bookingData) && bookingData.length > 0) ? bookingData.map((data) => data.date) : [],
        datasets: [
            {
                label: 'จำนวนการจองห้อง',
                data: (bookingData && Array.isArray(bookingData) && bookingData.length > 0) ? bookingData.map((data) => data.customer_count) : [],
                backgroundColor: 'green',
                borderWidth: 1,
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'จำนวนลูกค้าที่จองห้องตามวันที่'
            }
        },
    };

    const handleCreate = (e) => {
        router.get('/room/bookings');
    };

    const handleEdit = (room) => {
        const editUrl = route('room.edit', { id: room.booking_id }); // หรือใช้ room.id ก็ได้ ถ้าใช้อยู่
        Inertia.get(editUrl); // ส่งคำขอไปยังหน้า EditBooking
    };

    const handleDelete = (bookingId) => {
        if (confirm("คุณแน่ใจหรือไม่ว่าต้องการลบการจองนี้?")) {
            Inertia.delete(`/room/${bookingId}`);
        }
    };

    return (
        <>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">MY HOTEL</span>
                    </a>
                    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <a href="#" className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</a>
                            </li>
                            <li>
                                <button onClick={handleCreate} className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Booking</button>
                            </li>
                            <li>
                                <a href="#" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Pricing</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="min-h-screen bg-gray-50 py-6 px-4">
                <Head title="Room Index" />

                <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 w-11/12">
                    <h1 className="text-2xl font-bold text-gray-700 mb-4 w-full">Graph DATA</h1>

                    {/* แสดงกราฟแท่ง */}
                    <div className="mb-6">
                        <Bar data={chartData} options={options} />
                    </div>
                </div>

                <div className='mx-auto m-7 w-3/4'>
                    {/* ข้อมูลสถิติ */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        <div className="bg-blue-100 p-4 rounded-lg shadow">
                            <p className="text-sm text-gray-600">Total number of stays</p>
                            <p className="text-xl font-bold text-gray-800">{totalBookings || 0}</p>
                        </div>
                        <div className="bg-green-100 p-4 rounded-lg shadow">
                            <p className="text-sm text-gray-600">Total income</p>
                            <p className="text-xl font-bold text-gray-800">{totalRevenue ? totalRevenue.toLocaleString() : "0"} THB</p>
                        </div>
                        <div className="bg-yellow-100 p-4 rounded-lg shadow">
                            <p className="text-sm text-gray-600">All Costommer</p>
                            <p className="text-xl font-bold text-gray-800">{totalCustomers}</p>
                        </div>
                    </div>
                </div>

                {/* รายการห้องพัก */}
                <div className='mx-auto w-11/12 bg-white shadow-lg p-6 text-center'>
                    <h2 className="text-2xl py-2 font-bold">Booking List</h2>
                    {rooms.length === 0 ? (
                        <p className="text-center text-gray-500">ไม่มีข้อมูลการจอง</p>
                    ) : (
                        <table className="min-w-full table-auto">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="px-4 py-2 text-sm font-medium text-gray-700">Customer Name</th>
                                    <th className="px-4 py-2 text-sm font-medium text-gray-700">Room Number</th>
                                    <th className="px-4 py-2 text-sm font-medium text-gray-700">Room Type</th>
                                    <th className="px-4 py-2 text-sm font-medium text-gray-700">Price per Night</th>
                                    <th className="px-4 py-2 text-sm font-medium text-gray-700">Phone</th>
                                    <th className="px-4 py-2 text-sm font-medium text-gray-700">Check-in </th>
                                    <th className="px-4 py-2 text-sm font-medium text-gray-700">Check-out</th>
                                    <th className="px-4 py-2 text-sm font-medium text-gray-700">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rooms.map((room) => (
                                    <tr key={room.room_number} className="bg-gray-100">
                                        <td className="px-4 py-2 text-sm text-gray-700">{room.customerName}</td>
                                        <td className="px-4 py-5 text-sm text-gray-700">{room.room_number}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700">{room.roomTypeName}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700">{room.price_per_night}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700">{room.phone}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700">{room.start_date}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700">{room.end_date}</td>
                                        <td className="px-4 py-2">
                                            <button
                                                onClick={() => handleEdit(room)}
                                                className="px-4 py-2 text-white bg-blue-500 rounded-md"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(room.booking_id)}
                                                className="ml-2 px-4 py-2 text-white bg-red-600 rounded-md"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                    {/* การแบ่งหน้า */}
                    <div className="mt-6 flex justify-end items-center">
                        <p className="text-sm text-gray-600">
                            หน้าปัจจุบัน: {currentPage} จาก {lastPage}
                        </p>
                        <div className="flex space-x-2">
                            {currentPage > 1 && (
                                <a href={`?page=${currentPage - 1}`} className="px-4 py-2 ml-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">
                                    ก่อนหน้า
                                </a>
                            )}
                            {currentPage < lastPage && (
                                <a href={`?page=${currentPage + 1}`} className="px-4 py-2 ml-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">
                                    ถัดไป
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
