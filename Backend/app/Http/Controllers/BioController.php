<?php

namespace App\Http\Controllers;

use App\Models\Bio;
use App\Models\zat;
use App\Models\dataSenyawa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BioController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $Bio = Bio::get();
        return view('clientData.listBio', ['Bio' => $Bio]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $dataSenyawa = dataSenyawa::get();
        $zat = zat::get();
        return view('halaman.inputData3', ['dataSenyawa' => $dataSenyawa], ['zat' => $zat]);
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
            'BA_Name' => 'required',
            'BA_Details' => 'required',
            'BA_ref' => 'required',
            'Plant_Name' => 'required',
            'Phytochemical' => 'required',
        ]);

        $plantNames = $request->input('Plant_Name');
        $fitokimia = $request->input('Phytochemical');

        DB::table('Bio')->insert([
            'BA_Name' => $request['BA_Name'],
            'BA_Details' => $request['BA_Details'],
            'BA_ref' => $request['BA_ref'],
            'Plant_Name' => json_encode($plantNames),
            'Phytochemical' => json_encode($fitokimia),
        ]);
    
        return redirect('/Bio');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Bio  $bio
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $Bio = Bio::all()->where('id', $id)->first();
        $zat = zat::get();
        $dataSenyawa = dataSenyawa::get();
        
        return view('detail.dataDetail3', compact('Bio', 'zat', 'dataSenyawa'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Bio  $bio
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $Bio = Bio::all()->where('id', $id)->first();
        $zat = zat::get();
        $dataSenyawa = dataSenyawa::get();
        
        return view('update.updateData3', compact('Bio', 'zat', 'dataSenyawa'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Bio  $bio
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'BA_Name' => 'required',
            'BA_Details' => 'required',
            'BA_ref' => 'required',
            'Plant_Name' => 'required',
            'Phytochemical' => 'required',
        ]);
        
        $plantNames = $request->input('Plant_Name');
        $fitokimia = $request->input('Phytochemical');

        $Bio = Bio::all()
        ->where('id', $id)
        ->first();
        if ($Bio) {
            $Bio->update([
            'BA_Name' => $request['BA_Name'],
            'BA_Details' => $request['BA_Details'],
            'BA_ref' => $request['BA_ref'],
            'Plant_Name' => json_encode($plantNames),
            'Phytochemical' => json_encode($fitokimia),
        ]);}
    
        return redirect('/Bio');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Bio  $bio
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $Bio = Bio::where('_id', $id)->first();
        $Bio->delete();
        return redirect('/Bio')->with('success','Data Berhasil Dihapus!');
    }
}
