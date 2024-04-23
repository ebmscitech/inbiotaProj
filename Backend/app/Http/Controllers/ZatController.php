<?php

namespace App\Http\Controllers;

use App\Models\zat;
use Illuminate\Http\Request;
use App\Models\dataSenyawa;
use App\Models\Bio;
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
        $dataSenyawa = dataSenyawa::get();
        $Bio = Bio::get();
        return view('halaman.inputData2', compact('dataSenyawa', 'Bio'));
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

        DB::table('zat')->insert([
            'Phytochemical' => $request['Phytochemical'],
            'compoundClass' => $request['compoundClass'],
            'CAS_Number' => $request['CAS_Number'],
            'Chemical_Formula' => $request['Chemical_Formula'],
            'Molecular_Mass' => $request['Molecular_Mass'],
            'IUPAC_Name' => $request['IUPAC_Name'],
            'SynonymZ' => $request['SynonymZ'],
            'Plant_Name' => json_encode($plantNames),
            'Description' => $request['Description'],
            'BA_Name' => json_encode($baname), 
        ]);
    
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
        $zat = zat::all()->where('id', $id)->first();
        $dataSenyawa = dataSenyawa::get();
        $Bio = Bio::get();
        return view('detail.dataDetail2', compact('zat', 'dataSenyawa', 'Bio'));
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
        $dataSenyawa = dataSenyawa::get();
        $Bio = Bio::get();
        return view('update.updateData2', compact('zat', 'dataSenyawa', 'Bio'));
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

        $plantNames = $request->input('Plant_Name');
        $baname = $request->input('BA_Name');

        $zat = zat::all()
        ->where('id', $id)
        ->first();
        if ($zat) {
            $zat->update([
            'Phytochemical' => $request['Phytochemical'],
            'compoundClass' => $request['compoundClass'],
            'CAS_Number' => $request['CAS_Number'],
            'Chemical_Formula' => $request['Chemical_Formula'],
            'Molecular_Mass' => $request['Molecular_Mass'],
            'IUPAC_Name' => $request['IUPAC_Name'],
            'SynonymZ' => $request['SynonymZ'],
            'Plant_Name' => $request['Plant_Name'],
            'Description' => $request['Description'],
            'Plant_Name' => json_encode($plantNames),
            'BA_Name' => json_encode($baname), 
        ]);}

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
        $zat = zat::where('_id', $id)->first();
        $zat->delete();
        return redirect('/zat')->with('success','Data Berhasil Dihapus!');
    }
}
