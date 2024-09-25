<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Models\Aplikasi;
use App\Models\Device;
use App\Models\Chartvalue;
use App\Models\Nilai;
use App\Http\Controllers\UserController;
use App\Models\Parendevice;
use Inertia\Inertia;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Welcome');
// });

Route::get('/create-user', [UserController::class, 'create'])->name('create.user');
Route::post('/create-user',[UserController::class, 'store']);

Route::get('/dashboard', function () {
    $user = auth()->user();
    $role = $user->roles;

    $app = Aplikasi::where('user_id', $user->id)->pluck('id');
    $hitung = Aplikasi::where('user_id', $user->id)->count();
    $hitungdevice = Device::whereIn('aplikasi_id', $app)->count();

    $hitungsemua = Aplikasi::count();
    $hitungdevicesemua = Device::count();

    switch ($role) {
        case 'admin':
            return Inertia::render('Administrador', [
                'hitung' => $hitungsemua,
                'hitungdevice' => $hitungdevicesemua,
            ]);
        case 'sistemas':
            return Inertia::render('Sistemas', [
                'hitung' => $hitung,
                'hitungdevice' => $hitungdevice, 
            ]);
        case 'operario':
            return Inertia::render('Operario');
        default:
            return Inertia::render('Administrador');
    }
})->name('dashboard');

Route::get('/application', function (){
    $user = auth()->user();
    $app = Aplikasi::where('user_id', $user->id)->get();
    $hitung = $app->count();
    return Inertia::render('Application', [
        'hitung' => $hitung,
        'apps' => $app,
    ]);
})->name('application');

Route::get('/apikey/{kode}', function ($kode) {
    $user = auth()->user(); 
    
    $app = Aplikasi::where('kode_aplikasi', $kode)->where('user_id', $user->id)->get();
    $pardevice = Parendevice::whereIn('aplikasi_id', $app->pluck('id')->toArray())->get();
    $device = Device::whereIn('aplikasi_id', $app->pluck('id')->toArray())->whereIn('parentdevice_id', $pardevice->pluck('id')->toArray())->get();
    
    return Inertia::render('ApiKey', [
        'kode' => $kode,
        'pardevice' => $pardevice,
        'device' => $device,
        'apps' => $app, 
    ]);
})->name('apikey');


Route::get('/', function (){
    $auth = auth()->user();
    return Inertia::render('Landing', [
        'auth' => $auth,
    ]);
})->name('landing');

use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

Route::get('/widget', function (Request $req) {
    $user = auth()->user(); 
    $aplikasi = Aplikasi::where('user_id', $user->id)->get();

    $device = Parendevice::whereIn('aplikasi_id', $aplikasi->pluck('id')->toArray())->get();
    $value = Device::whereIn('parentdevice_id', $device->pluck('id')->toArray())->get();
    $nilaiQuery = Nilai::whereIn('sub_nama_device_id', $value->pluck('id')->toArray());

    // Validasi start_date dan end_date
    $validator = Validator::make($req->all(), [
        'start_date' => 'nullable|date',
        'end_date' => 'nullable|date|after_or_equal:start_date',
    ]);

    if ($validator->fails()) {
        return back()->withErrors($validator)->withInput();
    }

    // Filtering by date
    if ($req->filled('start_date') && $req->filled('end_date')) {
        $nilaiQuery = $nilaiQuery->whereBetween('tanggal', [
            Carbon::parse($req->start_date),
            Carbon::parse($req->end_date)
        ]);
    } elseif ($req->filled('start_date')) {
        $nilaiQuery = $nilaiQuery->where('tanggal', Carbon::parse($req->start_date));
    }

    // Ambil data nilai
    $nilai = $nilaiQuery->latest('tanggal')->get();

    return Inertia::render('Widget', [
        'nilai' => $nilai,
        'aplikasi' => $aplikasi,
        'device' => $device,
        'value' => $value,
    ]);
})->name('widget');



Route::get('/plan', function (){
    return Inertia::render('Plan');
})->name('plan');
Route::get('/payment', function (){
    return Inertia::render('Payment');
})->name('payment');
Route::get('/subcription', function (){
    return Inertia::render('Subcription');
})->name('subcription');

Route::middleware('auth')->group(function () {
    Route::post('/postApp', [PostController::class, 'store'])->name('postApplication.store');
    Route::post('/postDevice/{id}', [PostController::class, 'store_device'])->name('postDevice.store');
    Route::post('/postWidget', [PostController::class, 'store_widget'])->name('postWidget.store');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
