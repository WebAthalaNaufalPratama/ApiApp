<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Device;
use App\Http\Controllers\apicontroller;
use App\Models\Aplikasi;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::post('/login', [apicontroller::class, 'login']);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

$devices = Device::all();
$combined = [];

foreach ($devices as $device) {
    $methodsArray = explode(',', $device->methods);
    foreach ($methodsArray as $method) {
        $combined[] = [
            'method' => strtoupper(trim($method)),
            'aplikasi_id' => $device->aplikasi_id,
            'parentdevice_id' => $device->parentdevice_id,
            'id_device' => $device->id,
        ];
    }
}

foreach ($combined as $item) {
    if ($item['method'] === 'GET') {
        Route::middleware('auth:sanctum')->get('/data/{aplikasi_id}/{parentdevice_id}/{id_device}', [ApiController::class, 'get_api']);
    } elseif ($item['method'] === 'POST') {
        Route::middleware('auth:sanctum')->post('/datapost', [ApiController::class, 'apipost']);
    }
}



