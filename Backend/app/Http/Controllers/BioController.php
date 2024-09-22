<?php

namespace App\Http\Controllers;

use App\Models\Bio;
use App\Models\zat;
use App\Models\sbt;
use App\Models\tanaman;
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
        return view('clientData.listBio', compact('Bio'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $tanaman = tanaman::get();
        $zat = zat::get();
        $sbt = sbt::get();
        return view('halaman.inputData3', compact('tanaman', 'zat', 'sbt'));
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

        $baId = DB::table('bioaktivitas')->insertGetId([
            'BA_Name' => $request['BA_Name'],
            'BA_Details' => $request['BA_Details'],
            'BA_ref' => $request['BA_ref'],
        ]);

        if (is_array($plantNames) && is_array($fitokimia)) {
            foreach ($plantNames as $plantName) {
                foreach ($fitokimia as $Fitokimia) {
                    DB::table('sbt')->insert([
                        'snywId' => $Fitokimia,
                        'tanId' => $plantName,
                        'biokId' => $baId, 
                    ]);
                }
            }
        } else {
            DB::table('sbt')->insert([
                'snywId' => is_array($fitokimia) ? $fitokimia[0] : $fitokimia,
                'tanId' => is_array($plantNames) ? $plantNames[0] : $plantNames,
                'biokId' => $baId,
            ]);
        }
    
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
        $Bio = Bio::findOrFail($id);

        $sbtItems = Sbt::where('biokId', $Bio->id)->get();

        $tanIds = $sbtItems->pluck('tanId');
        $snywIds = $sbtItems->pluck('snywId');

        $tanNames = tanaman::whereIn('id', $tanIds)->pluck('Plant_Name', 'id');

        $senyawaNames = zat::whereIn('id', $snywIds)->pluck('Phytochemical', 'id');
        
        return view('detail.dataDetail3', compact('tanNames' , 'senyawaNames', 'Bio'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Bio  $bio
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $Bio = Bio::findOrFail($id);

        $sbtItems = Sbt::where('biokId', $Bio->id)->get();

        $tanIds = $sbtItems->pluck('tanId');
        $snywIds = $sbtItems->pluck('snywId');

        $tanNames = tanaman::whereIn('id', $tanIds)->pluck('Plant_Name', 'id');

        $senyawaNames = zat::whereIn('id', $snywIds)->pluck('Phytochemical', 'id');
        
        return view('update.updateData3', compact('tanNames' , 'senyawaNames', 'Bio'));
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

        $Bio = Bio::find($id);
        if ($Bio) {
            $Bio->update([
            'BA_Name' => $request['BA_Name'],
            'BA_Details' => $request['BA_Details'],
            'BA_ref' => $request['BA_ref'],
        ]);}

        DB::table('sbt')->where('biokId', $id)->delete();

        if (is_array($plantNames) && is_array($fitokimia)) {
            foreach ($plantNames as $plantName) {
                foreach ($fitokimia as $Fitokimia) {
                    DB::table('sbt')->insert([
                        'snywId' => $Fitokimia,
                        'tanId' => $plantName,
                        'biokId' => $id, 
                    ]);
                }
            }
        } else {
            DB::table('sbt')->insert([
                'snywId' => is_array($fitokimia) ? $fitokimia[0] : $fitokimia,
                'tanId' => is_array($plantNames) ? $plantNames[0] : $plantNames,
                'biokId' => $id,
            ]);
        }
    
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
        $Bio = Bio::find($id);
        if ($Bio) {
            $Bio->delete();
            return redirect('/Bio')->with('success', 'Data Berhasil Dihapus!');
        } else {
            return redirect('/Bio')->with('error', 'Data Tidak Ditemukan!');
        }
    }
}
