import React, { useState, useEffect } from 'react';
import { Head, usePage } from "@inertiajs/react";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function RoomIndex() {
    const { rooms, totalBookings, totalRevenue, totalCustomers, currentPage, lastPage, bookingData } = usePage().props;

    // เตรียมข้อมูลสำหรับกราฟแท่ง
    const chartData = {
        labels: bookingData.map((data) => data.date),
        datasets: [
            {
                label: 'จำนวนลูกค้าที่จองห้อง',
                data: bookingData.map((data) => data.customer_count),
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
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
                                <a href="#" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Booking</a>
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

                <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
                    <h1 className="text-2xl font-bold text-gray-700 mb-4">ข้อมูลห้องพัก</h1>

                    {/* แสดงกราฟแท่ง */}
                    <div className="mb-6">
                        <Bar data={chartData} options={options} />
                    </div>

                    {/* ข้อมูลสถิติ */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        <div className="bg-blue-100 p-4 rounded-lg shadow">
                            <p className="text-sm text-gray-600">จำนวนการเข้าพักทั้งหมด</p>
                            <p className="text-xl font-bold text-gray-800">{totalBookings || 0}</p>
                        </div>
                        <div className="bg-green-100 p-4 rounded-lg shadow">
                            <p className="text-sm text-gray-600">รายได้ทั้งหมด</p>
                            <p className="text-xl font-bold text-gray-800">{totalRevenue ? totalRevenue.toLocaleString() : "0"} บาท</p>
                        </div>
                        <div className="bg-yellow-100 p-4 rounded-lg shadow">
                            <p className="text-sm text-gray-600">จำนวนลูกค้าทั้งหมด</p>
                            <p className="text-xl font-bold text-gray-800">{totalCustomers}</p>
                        </div>
                    </div>

                    {/* รายการห้องพัก */}
                    {rooms.length === 0 ? (
                        <p className="text-center text-gray-500">ไม่มีข้อมูลห้องพัก</p>
                    ) : (
                        <ul className="space-y-4">
                            {rooms.map((room) => (
                                <li key={room.id} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm">
                                    <div>
                                        <p className="text-lg font-medium text-gray-800">ห้อง {room.room_number}</p>
                                        <p className="text-sm text-gray-600">ประเภท: {room.roomTypeName}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {/* การแบ่งหน้า */}
            <div className="mt-6 flex justify-between items-center">
                <p className="text-sm text-gray-600">
                    หน้าปัจจุบัน: {currentPage} จาก {lastPage}
                </p>
                <div className="flex space-x-2">
                    {currentPage > 1 && (
                        <a href={`?page=${currentPage - 1}`} className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">
                            ก่อนหน้า
                        </a>
                    )}
                    {currentPage < lastPage && (
                        <a href={`?page=${currentPage + 1}`} className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">
                            ถัดไป
                        </a>
                    )}
                </div>
            </div>
        </>
    );
}
