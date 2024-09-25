<?php

namespace App\Http\Controllers;
use App\Models\Nilai;
use Carbon\Carbon;
use App\Models\User;

use Illuminate\Http\Request;

class apicontroller extends Controller
{
    public function get_api($aplikasi_id, $parentdevice_id, $id_device) {
        $nilai = Nilai::where('aplikasi_id', $aplikasi_id)
            ->where('nama_device_id', $parentdevice_id)
            ->where('sub_nama_device_id', $id_device)
            ->get();
    
        return response()->json($nilai);
    }
    

    public function apipost(Request $req) {
        $validated = $req->validate([
            'aplikasi_id' => 'required|integer',
            'parentdevice_id' => 'required|integer',
            'id_device' => 'required|integer',
            'nilai' => 'required|numeric', 
        ]);
    
        $nilai = Nilai::create([
            'aplikasi_id' => $validated['aplikasi_id'],
            'nama_device_id' => $validated['parentdevice_id'],
            'sub_nama_device_id' => $validated['id_device'],
            'nilai' => $validated['nilai'],
            'tanggal' => Carbon::today(), 
            'waktu' => Carbon::now(), 
        ]);
    
        return response()->json($nilai, 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if ($user && password_verify($request->password, $user->password)) {
            $token = $user->createToken('token_name')->plainTextToken;
            return response()->json(['token' => $token]);
        }

        return response()->json(['message' => 'Unauthorized'], 401);
    }
}
