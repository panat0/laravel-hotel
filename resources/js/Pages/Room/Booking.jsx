import { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import { usePage, useForm } from "@inertiajs/react";
import { useNavigate } from 'react-router-dom';

const Booking = () => {
    const { rooms } = usePage().props; // รับข้อมูลห้องจาก Laravel

    const {data, setData, post, processing, errors } = useForm({
        customer_name: "",
        email: "",
        phone: "",
        room_number: "", // เปลี่ยนจาก room_id เป็น room_number
        start_date: "",
        end_date: "",
    });

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/room')
    };


    const handleHome = (e) => {
        Inertia.visit('/room');
    };

    return (
        <>
            {/*Nav */}
            <nav className="bg-white border-gray-200 dark:bg-gray-900 ">
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
                                <button onClick={handleHome} className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Home</button>
                            </li>
                            <li>
                                <a href="#" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</a>
                            </li>
                            <li>
                                <button className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" >Booking</button>
                            </li>
                            <li>
                                <a href="#" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Pricing</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg ">
                <h2 className="text-2xl font-semibold mb-6 text-center text-bold ">BookingFrom</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium">Name</label>
                        <input
                            type="text"
                            name="customer_name"
                            value={data.customer_name}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={data.phone}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Room Number</label>
                        <select
                            type="text"
                            name="room_number"
                            value={data.room_number}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300"
                            required
                        >
                            <option value="">เลือกหมายเลขห้อง</option>
                            {rooms.map((room) => (
                                <option key={room.id} value={room.room_number}>
                                    {room.room_number}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Room Type</label>
                        <select
                            name="room_type_id"
                            //value={data.room_type_id}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300"
                            required
                        >
                            <option value="">เลือกประเภทห้อง</option>
                            <option value="1">Single</option>
                            <option value="2">Double</option>
                            <option value="3">Suite</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Check-in date</label>
                        <input
                            type="date"
                            name="start_date"
                            value={data.start_date}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Check-out date</label>
                        <input
                            type="date"
                            name="end_date"
                            value={data.end_date}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
                        จอง
                    </button>
                </form>
            </div>
        </>
    );
};

export default Booking;
