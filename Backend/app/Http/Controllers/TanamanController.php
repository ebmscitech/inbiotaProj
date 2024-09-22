<?php

namespace App\Http\Controllers;

use App\Models\tanaman;
use Illuminate\Http\Request;
use App\Models\zat;
use App\Models\Bio;
use App\Models\sbt;
use Illuminate\Support\Facades\DB;

class TanamanController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tanamans = tanaman::get();
        return view('halaman.listDatabase', compact('tanamans'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $zat = zat::get();
        $Bio = Bio::get();
        $sbt = sbt::get();
        return view('halaman.inputData', compact('zat', 'Bio', 'sbt'));
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
            'Plant_Name' => 'required',
            'Local_Name' => 'required',
            'English_Name' => 'required',
            'Kingdom' => 'required',
            'SubKingdom' => 'required',
            'Infrakingdom' => 'required',
            'Superdivision' => 'required',
            'Class' => 'required',
            'Superorder' => 'required',
            'Order' => 'required',
            'Family' => 'required',
            'Genus' => 'required',
            'Species' => 'required',
            'Synonym' => 'required',            
            'Geographical_Distribution' => 'required',
            'Traditional_Uses' => 'required',
            'BaTanRelated' => 'required',
            'Reference' => 'required',
            'Phytochemical' => 'required',
            'BA_Name' => 'required',
        ]);

        $baname = $request->input('BA_Name');
        $fitokimia = $request->input('Phytochemical');

        $tanId = DB::table('tanaman')->insertGetId([
            'Plant_Name' => $request['Plant_Name'],
            'Local_Name' => $request['Local_Name'],
            'English_Name' => $request['English_Name'],
            'Kingdom' => $request['Kingdom'],
            'SubKingdom' => $request['SubKingdom'],
            'Infrakingdom' => $request['Infrakingdom'],
            'Superdivision' => $request['Superdivision'],
            'Class' => $request['Class'],
            'Superorder' => $request['Superorder'],
            'Order' => $request['Order'], 
            'Family' => $request['Family'],
            'Genus' => $request['Genus'],
            'Species' => $request['Species'],
            'Synonym' => $request['Synonym'],
            'Geographical_Distribution' => $request['Geographical_Distribution'],
            'Traditional_Uses' => $request['Traditional_Uses'],
            'Reference' => $request['Reference'],
            'BaTanRelated' => $request['BaTanRelated'],
        ]);

        if (is_array($baname) && is_array($fitokimia)) {
            foreach ($baname as $baName) {
                foreach ($fitokimia as $Fitokimia) {
                    DB::table('sbt')->insert([
                        'snywId' => $Fitokimia,
                        'tanId' => $tanId,
                        'biokId' => $baName, 
                    ]);
                }
            }
        } else {
            DB::table('sbt')->insert([
                'snywId' => is_array($fitokimia) ? $fitokimia[0] : $fitokimia,
                'tanId' => $tanId,
                'biokId' => is_array($baname) ? $baname[0] : $baname,
            ]);
        }

        return redirect ('/tanaman');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\tanaman  $tanaman
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $tanaman = Tanaman::findOrFail($id);

        $sbtItems = Sbt::where('tanId', $tanaman->id)->get();

        $snywIds = $sbtItems->pluck('snywId');
        $biokIds = $sbtItems->pluck('biokId');

        $senyawaNames = zat::whereIn('id', $snywIds)->pluck('Phytochemical', 'id');

        $bioNames = Bio::whereIn('id', $biokIds)->pluck('BA_Name', 'id');
        
        return view('detail.dataDetail', compact('senyawaNames' , 'bioNames', 'tanaman'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\tanaman  $tanaman
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $tanaman = tanaman::all()->where('id', $id)->first();
        $sbt = sbt::get();
        $zat = zat::get();
        $Bio = Bio::get();
        return view('halaman.updateData', compact('Bio', 'sbt' , 'zat', 'tanaman'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\tanaman  $tanaman
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'Plant_Name' => 'required',
            'Local_Name' => 'required',
            'English_Name' => 'required',
            'Kingdom' => 'required',
            'SubKingdom' => 'required',
            'Infrakingdom' => 'required',
            'Superdivision' => 'required',
            'Class' => 'required',
            'Superorder' => 'required',
            'Order' => 'required', 
            'Family' => 'required',
            'Genus' => 'required',
            'Species' => 'required',
            'Synonym' => 'required',            
            'Geographical_Distribution' => 'required',
            'Traditional_Uses' => 'required',
            'Reference' => 'required',
            'BaTanRelated' => 'required',
        ]);

        $baname = $request->input('BA_Name');
        $fitokimia = $request->input('Phytochemical');

        $tanamans = tanaman::find($id);
        if ($tanamans) {
            $tanamans->update([
                'Plant_Name' => $request->Plant_Name,
                'Local_Name' => $request->Local_Name,
                'English_Name' => $request->English_Name,
                'Kingdom' => $request->Kingdom,
                'SubKingdom' => $request->SubKingdom,
                'Infrakingdom' => $request->Infrakingdom,
                'Superdivision' => $request->Superdivision,
                'Class' => $request->Class,
                'Superorder' => $request->Superorder,
                'Order' => $request->Order,
                'Family' => $request->Family,
                'Genus' => $request->Genus,
                'Species' => $request->Species,
                'Synonym' => $request->Synonym,                
                'Geographical_Distribution' => $request->Geographical_Distribution,
                'Traditional_Uses' => $request->Traditional_Uses,
                'Reference' => $request->Reference,
                'BaTanRelated' => $request->BaTanRelated,
            ]);
        }

        DB::table('sbt')->where('tanId', $id)->delete();

        if (is_array($baname) && is_array($fitokimia)) {
            foreach ($baname as $baName) {
                foreach ($fitokimia as $Fitokimia) {
                    DB::table('sbt')->insert([
                        'snywId' => $Fitokimia,
                        'tanId' => $id,
                        'biokId' => $baName,
                    ]);
                }
            }
        } else {
            DB::table('sbt')->insert([
                'tanId' => $id,
                'biokId' => is_array($baname) ? $baname[0] : $baname,
                'snywId' => is_array($fitokimia) ? $fitokimia[0] : $fitokimia,
            ]);
        }
        return redirect ('/tanaman');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\tanaman  $tanaman
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $tanamans = tanaman::find($id);

        if ($tanamans) {
            $tanamans->delete();
            return redirect('/tanaman')->with('success', 'Data Berhasil Dihapus!');
        } else {
            return redirect('/tanaman')->with('error', 'Data Tidak Ditemukan!');
        }
    }
}
