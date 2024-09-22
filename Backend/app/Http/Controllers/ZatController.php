<?php

namespace App\Http\Controllers;

use App\Models\zat;
use Illuminate\Http\Request;
use App\Models\tanaman;
use App\Models\Bio;
use App\Models\sbt;
use App\Rules\NumericWithMinus;
use Illuminate\Support\Facades\DB;


class ZatController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $zat = zat::get();
        return view('clientData.listZat', ['zat' => $zat]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $tanaman = tanaman::get();
        $Bio = Bio::get();
        $sbt = sbt::get();
        return view('halaman.inputData2', compact('tanaman', 'Bio'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'Phytochemical' => 'required',
            'compoundClass' => 'required',
            'CAS_Number' => ['required', 'regex:/^[-0-9A-Za-z]+$/'],
            'Chemical_Formula' => 'required',
            'Molecular_Mass' => 'required |numeric' ,
            'IUPAC_Name' => 'required',
            'SynonymZ' => 'required',
            'Plant_Name' => 'required',
            'Description' => 'required',
            'BA_Name' => 'required',
        ]);

        $plantNames = $request->input('Plant_Name');
        $baname = $request->input('BA_Name');

        $zatId = DB::table('senyawa')->insertGetId([
            'Phytochemical' => $request['Phytochemical'],
            'compoundClass' => $request['compoundClass'],
            'CAS_Number' => $request['CAS_Number'],
            'Chemical_Formula' => $request['Chemical_Formula'],
            'Molecular_Mass' => $request['Molecular_Mass'],
            'IUPAC_Name' => $request['IUPAC_Name'],
            'SynonymZ' => $request['SynonymZ'],
            'Description' => $request['Description'],
        ]);

        if (is_array($plantNames) && is_array($baname)) {
            foreach ($plantNames as $plantName) {
                foreach ($baname as $baName) {
                    DB::table('sbt')->insert([
                        'snywId' => $zatId,
                        'tanId' => $plantName,
                        'biokId' => $baName, 
                    ]);
                }
            }
        } else {
            DB::table('sbt')->insert([
                'snywId' => $zatId,
                'tanId' => is_array($plantNames) ? $plantNames[0] : $plantNames,
                'biokId' => is_array($baname) ? $baname[0] : $baname,
            ]);
        }
    
    
        return redirect('/zat');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\zat  $zat
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $zat = zat::findOrFail($id);

        $sbtItems = Sbt::where('snywId', $zat->id)->get();

        $tanIds = $sbtItems->pluck('tanId');
        $biokIds = $sbtItems->pluck('biokId');

        $tanNames = tanaman::whereIn('id', $tanIds)->pluck('Plant_Name', 'id');

        $bioNames = Bio::whereIn('id', $biokIds)->pluck('BA_Name', 'id');
        
        return view('detail.dataDetail2', compact('tanNames' , 'bioNames', 'zat'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\zat  $zat
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $zat = zat::all()->where('id', $id)->first();
        $tanaman = tanaman::get();
        $Bio = Bio::get();
        $sbt = sbt::get();
        return view('update.updateData2', compact('zat', 'tanaman', 'Bio', 'sbt'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\zat  $zat
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'Phytochemical' => 'required',
            'compoundClass' => 'required',
            'CAS_Number' => ['required', 'regex:/^[-0-9A-Za-z]+$/'],
            'Chemical_Formula' => 'required',
            'Molecular_Mass' => 'required |numeric',
            'IUPAC_Name' => 'required',
            'SynonymZ' => 'required',
            'Plant_Name' => 'required',
            'Description' => 'required',
            'BA_Name' => 'required',
        ]);

        $zat = zat::find($id);
        if ($zat) {
            $zat->update([
            'Phytochemical' => $request['Phytochemical'],
            'compoundClass' => $request['compoundClass'],
            'CAS_Number' => $request['CAS_Number'],
            'Chemical_Formula' => $request['Chemical_Formula'],
            'Molecular_Mass' => $request['Molecular_Mass'],
            'IUPAC_Name' => $request['IUPAC_Name'],
            'SynonymZ' => $request['SynonymZ'],
            'Description' => $request['Description'],  
        ]);}
        
        $plantNames = $request->input('Plant_Name');
        $baname = $request->input('BA_Name');

        DB::table('sbt')->where('snywId', $id)->delete();

        if (is_array($plantNames) && is_array($baname)) {
            foreach ($plantNames as $plantName) {
                foreach ($baname as $baName) {
                    DB::table('sbt')->insert([
                        'snywId' => $id,
                        'tanId' => $plantName,
                        'biokId' => $baName,
                    ]);
                }
            }
        } else {
            DB::table('sbt')->insert([
                'snywId' => $Id,
                'tanId' => is_array($plantNames) ? $plantNames[0] : $plantNames,
                'biokId' => is_array($baname) ? $baname[0] : $baname,
            ]);
        }

        return redirect('/zat');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\zat  $zat
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $zat = zat::find($id);

        if ($zat) {
            $zat->delete();
            return redirect('/zat')->with('success', 'Data Berhasil Dihapus!');
        } else {
            return redirect('/zat')->with('error', 'Data Tidak Ditemukan!');
        }
    }
}
