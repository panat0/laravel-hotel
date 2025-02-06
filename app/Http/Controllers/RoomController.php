<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Room;
use App\Models\Customer;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

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
                'bookings.id as booking_id',
                'bookings.start_date',
                'bookings.end_date'
            )
            ->orderBy('bookings.id','desc')
            ->paginate(10);

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
        // แสดงข้อมูลที่รับมาจาก frontend
        Log::info($request->all());

        // ตรวจสอบข้อมูลที่รับมา
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'phone' => 'required|string|max:255',
            'room_number' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
        ]);

        // ค้นหา room_id จาก room_number
        $room = DB::table('rooms')->where('room_number', $request->room_number)->first();

        // แสดงข้อมูลห้องที่ค้นหามาเพื่อดีบัก
        Log::info(json_encode($room));

        // ตรวจสอบว่า room_number ที่ส่งมาจากฟอร์มตรงกับฐานข้อมูลหรือไม่
        if (!$room) {
            return back()->with('error', 'Room not found.');
        }

        // สร้างลูกค้าใหม่
        $customer = Customer::create([
            'name' => $request->customer_name,
            'email' => $request->email,
            'phone' => $request->phone,
        ]);

        // สร้างการจอง
        $booking = Booking::create([
            'customer_id' => $customer->id,
            'room_id' => $room->id, // ใช้ room_id ที่ค้นพบจากฐานข้อมูล
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
        ]);

        // สั่งให้ redirect ไปยังหน้า room.index พร้อมกับข้อความ success
        return redirect()->route('room.index')->with('success', 'Booking created successfully.');
    }

    public function update(Request $request, $id)
    {
        Log::info('Incoming request data:', $request->all());

        $request->validate([
            'room_number' => 'required|string|exists:rooms,room_number',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
        ]);

        $booking = Booking::findOrFail($id);

        $roomId = Room::where('room_number', $request->room_number)->value('id');

        $booking->update([
            'room_id' => $roomId,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
        ]);

        return redirect()->route('room.index')->with('success', 'Booking edited successfully.');
    }


    public function edit($id)
    {
        $booking = DB::table('bookings')
            ->join('rooms', 'bookings.room_id', '=', 'rooms.id')
            ->join('room_types', 'rooms.room_type_id', '=', 'room_types.id')
            ->join('customers', 'bookings.customer_id', '=', 'customers.id')
            ->where('bookings.id', $id)
            ->select(
                'bookings.id as booking_id',
                'rooms.room_number',
                'room_types.name as roomTypeName',
                'room_types.price_per_night',
                'customers.name as customerName',
                'customers.email',
                'customers.phone',
                'bookings.start_date',
                'bookings.end_date'
            )
            ->first();

        if (!$booking) {
            return redirect()->route('room.index')->with('error', 'Booking not found');
        }


        return Inertia::render('Room/EditBooking', ['booking' => $booking]);
    }

    public function destroy(string $id)
    {
        $booking = Booking::find($id);
        $booking->delete();
    }
}
