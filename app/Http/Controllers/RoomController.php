<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Room;
use Inertia\Inertia;
use App\Models\Booking;
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
            ->leftJoin('room_types', 'rooms.room_type_id', '=', 'room_types.id')
            ->select('rooms.*', 'room_types.name as roomTypeName', 'room_types.price_per_night')
            ->paginate(20);

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

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

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
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
