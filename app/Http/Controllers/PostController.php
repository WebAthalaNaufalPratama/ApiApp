<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Aplikasi;
use App\Models\Device;
use App\Models\Parendevice;
use Illuminate\Http\RedirectResponse;
use illuminate\Support\Facades\Auth;


class PostController extends Controller
{
    public function store(Request $req) : RedirectResponse
    {
        $str = Str::random(10);
        $validatedData = $req->validate([
            'nama_aplikasi' => 'required|string',
            'deskripsi' => 'required|string',
        ]);

        $validatedData['user_id'] = Auth::user()->id;
        $validatedData['kode_aplikasi'] = $str;

        $applikasi = Aplikasi::create($validatedData);

        if ($applikasi) {
            return redirect('/application')->with('success', 'Sukses Menyimpan Aplikasi');
        } else {
            return redirect('/application')->with('fail', 'Gagal Menyimpan Aplikasi');
        }
    }

    public function store_device(Request $req, $id){
        // dd($req);
        $str = Str::random(10);
        $aplikasi = Aplikasi::where('kode_aplikasi', $id)->first();
        if ($aplikasi) {
            $count = $req->input('jumlah_device');
    
            for ($i = 0; $i < $count; $i++) {
                $parnama = $req->input('par_nama_device_' . $i);
    
                $parentDevice = Parendevice::create([
                    'aplikasi_id' => $aplikasi->id,
                    'kode_par_device' => $str,
                    'par_nama_device' => $parnama,
                    'tanggal' => now()->format('Y-m-d'),
                    'waktu' => now()->format('H:i:s'),
                ]);
    
                if (!$parentDevice) {
                    return redirect('/detail-aplikasi/' . $id)->with('fail', 'Gagal membuat Parentdevice');
                }
    
                $jumlah_value = 0;
                while ($req->has('value_' . $i . '_' . $jumlah_value)) {
                    $jumlah_value++;
                }

                for ($index = 0; $index < $jumlah_value; $index++) {
                    $value = $req->input('value_' . $i . '_' . $index);
                    $type = $req->input('typevalue_' . $i . '_' . $index);
                    $methodsArray = $req->input('methods');
                    if (is_array($methodsArray)) {
                        // Convert array to a comma-separated string
                        $methodsString = implode(', ', $methodsArray);
                    } else {
                        // Handle the case where it's not an array
                        $methodsString = $methodsArray; // Or handle error as needed
                    }

                    if ($value && $type) {
                        Device::create([
                            'aplikasi_id' => $aplikasi->id,
                            'parentdevice_id' => $parentDevice->id,
                            'nama_device' => $value,
                            'methods' => $methodsString,
                            'type' => $type,
                            'tanggal' => now()->format('Y-m-d'),
                            'waktu' => now()->format('H:i:s'),
                        ]);
                    } else {
                        return redirect('/detail-aplikasi/' . $id)->with('fail', 'Nilai atau tipe tidak ditemukan untuk perangkat ' . $index);
                    }
                }
            }
    
            return redirect('/detail-aplikasi/' . $id)->with('success', 'Devices Berhasil Disimpan');
        } else {
            return redirect('/detail-aplikasi/' . $id)->with('fail', 'Devices Gagal Disimpan');
        }
    }

    public function store_widget(Request $request)
    {
        $validatedData = $request->validate([
            'charts' => 'required|string',
            'min' => 'required|numeric',
            'max' => 'required|numeric',
            'aplikasi' => 'required|integer',
            'device' => 'required|integer',
            'value' => 'required|integer',
        ]);

        $str = Str::random(10);

        $updatedevice = Device::where('aplikasi_id', $validatedData['aplikasi'])
                            ->where('parentdevice_id', $validatedData['device'])
                            ->where('id', $validatedData['value'])
                            ->update([
                                'kode_chart' => $str,
                                'chart_id' => $validatedData['charts'],
                                'min' => $validatedData['min'],
                                'max' => $validatedData['max']
                            ]);

        return redirect()->back()->with(['message' => 'Widget updated successfully.']);
    }

}
