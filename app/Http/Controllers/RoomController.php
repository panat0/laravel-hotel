<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Room;
use App\Models\customer;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class RoomController extends Controller
{

    public function index()
    {
        // จำนวนการเข้าพักทั้งหมด
        $totalBookings = DB::table('bookings')->count();

        // รายได้ทั้งหมด
        $totalRevenue = DB::table('bookings')
            ->join('rooms', 'bookings.room_id', '=', 'rooms.id')
            ->join('room_types', 'rooms.room_type_id', '=', 'room_types.id')
            ->select(DB::raw('SUM(room_types.price_per_night) as totalRevenue'))
            ->value('totalRevenue');

        // จำนวนลูกค้าทั้งหมด
        $totalCustomers = DB::table('customers')->count();

        // ข้อมูลการจองตามวันที่
        $bookingData = DB::table('bookings')
            ->select(DB::raw('DATE(start_date) as date'), DB::raw('count(*) as customer_count'))
            ->groupBy(DB::raw('DATE(start_date)'))
            ->get();

        // ดึงข้อมูลห้องพัก
        $rooms = DB::table('rooms')
            ->join('room_types', 'rooms.room_type_id', '=', 'room_types.id') // เปลี่ยนเป็น join (inner join)
            ->join('bookings', 'rooms.id', '=', 'bookings.room_id') // เปลี่ยนเป็น join (inner join)
            ->join('customers', 'bookings.customer_id', '=', 'customers.id') // เปลี่ยนเป็น join (inner join)
            ->select(
                'rooms.room_number',
                'room_types.name as roomTypeName',
                'room_types.price_per_night',
                'customers.name as customerName',
                'customers.email',
                'customers.phone',
                'bookings.start_date',
                'bookings.end_date'
            )
            ->paginate(7);



        return Inertia::render('Room/Index', [
            'rooms' => $rooms->items(),
            'totalBookings' => $totalBookings,
            'totalRevenue' => $totalRevenue ?? 0,
            'totalCustomers' => $totalCustomers,
            'currentPage' => $rooms->currentPage(),
            'lastPage' => $rooms->lastPage(),
            'bookingData' => $bookingData
        ]);
    }

    public function booking()
    {
        $rooms = DB::table('rooms')->select('id', 'room_number')->get();

        return Inertia::render('Room/Booking', [
            'rooms' => $rooms
        ]);
    }


    public function store(Request $request)
    {
        try {
            // ตรวจสอบข้อมูลที่รับมา
            $validated = $request->validate([
                'customer_name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255',
                'phone' => 'required|string|max:255',
                'room_number' => 'required|string|max:255',
                'start_date' => 'required|date',
                'end_date' => 'required|date|after:start_date',
            ]);

            DB::transaction(function () use ($validated) {
                // ค้นหา room_id จาก room_number
                $room = DB::table('rooms')->where('room_number', $validated['room_number'])->first();

                if (!$room) {
                    throw new \Exception('Room not found');
                }

                // สร้างลูกค้าใหม่และรับ ID ของลูกค้า
                $customer_id = DB::table('customers')->insertGetId([
                    'name' => $validated['customer_name'],
                    'email' => $validated['email'],
                    'phone' => $validated['phone'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                // บันทึกการจองห้อง
                DB::table('bookings')->insert([
                    'customer_id' => $customer_id,
                    'room_id' => $room->id, // ใช้ room_id ที่ค้นหาได้
                    'start_date' => $validated['start_date'],
                    'end_date' => $validated['end_date'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            });

            return redirect()->route('room.index')->with('success', 'Booking created successfully');
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to create booking. Please try again.');
        }
    }

    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */


    /**
     * Remove the specified resource from storage.
     */
}
