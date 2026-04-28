<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ScannerController;


Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'dashboard'])->name('dashboard');
});

Route::middleware(['auth', 'role:user'])->group(function () {
    Route::get('/dashboard/user', [DashboardController::class, 'user'])->name('dashboard.user');
});

// Route::get('/users', [UserController::class, 'index'])->name('user.index');

Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/dashboard/admin', [DashboardController::class, 'admin'])->name('dashboard.admin');
    Route::get('/users', [UserController::class, 'index'])->name('user.index');

});


Route::GET('/scans', [ScannerController::class, 'scans'])->name('scans');
Route::POST('/scans', [ScannerController::class, 'scans'])->name('scans');
require __DIR__.'/settings.php';
?>
