<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\RoomController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::prefix('room')->group(function () {
    Route::get('/', [RoomController::class, 'index'])
        ->name('room.index');
    Route::get('/bookings', [RoomController::class, 'booking']);
    Route::post('/', [RoomController::class, 'store']);
    Route::get('/{id}/edit', [RoomController::class, 'edit'])
        ->name('room.edit');
    Route::patch('/{id}', [RoomController::class, 'update'])
        ->name('room.update');
    Route::delete('/{id}', [RoomController::class, 'destroy']);
});



require __DIR__ . '/auth.php';
