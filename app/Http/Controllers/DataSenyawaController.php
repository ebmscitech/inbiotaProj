<?php

namespace App\Http\Controllers;

use App\Models\dataSenyawa;
use App\Models\zat;
use App\Models\Bio;
use Illuminate\Http\Request;
use App\Rules\NumericWithMinus;
use File;

class DataSenyawaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    
    public function pageList()
    {
        $dataSenyawa = dataSenyawa::all();
        // dd($dataSenyawa);
        return view('halaman.listDatabase', compact('dataSenyawa', $dataSenyawa));
    }
    public function show($id)
    {
        $dataSenyawa = dataSenyawa::all()->where('id', $id)->first();
        $zat = zat::get();
        $Bio = Bio::get();
        return view('halaman.dataDetail', compact('dataSenyawa', 'zat', 'Bio'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\dataSenyawa  $dataSenyawa
     * @return \Illuminate\Http\Response
     */
    // public function show(dataSenyawa $dataSenyawa)
    // {
    //     //
    // }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\dataSenyawa  $dataSenyawa
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $dataSenyawa = dataSenyawa::all()->where('id', $id)->first();
        $zat = zat::get();
        $Bio = Bio::get();
        return view('halaman.updateData', compact('dataSenyawa', 'zat', 'Bio'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\dataSenyawa  $dataSenyawa
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
            'Phytochemical' => 'required',
            'BA_Name' => 'required',
            // 'Plant_Name' => 'required'
            // 'CAS_Number' => ['required', new NumericWithMinus],
            // 'Chemical_Formula' => 'required',
            // 'Molecular_Mass' => 'required |numeric',
            // 'IUPAC_Name' => 'required',

            // 'In_Silico' => 'required',
            // 'Acute_Toxicity' => 'required',
            // 'Subchronic_Toxicity' => 'required',
            // 'Chronic_Toxicity' => 'required',
            // 'In_Vivo' => 'required',
            // 'In_Vitro' => 'required',
            // 'Clinical_Studies' => 'required',
            // 'Phytochemical' => 'required',
            // 'compoundClass' => 'required',
            // 'structure' => 'image|mimes:jpg,png,jpeg',
        ]);

        $baname = $request->input('BA_Name');
        $fitokimia = $request->input('Phytochemical');

        $senyawa = dataSenyawa::all()
        ->where('id', $id)
        ->first();
        if ($senyawa) {
            $senyawa->update([
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
                'BA_Name' => json_encode($baname),
                'Phytochemical' => json_encode($fitokimia),
                'BA_detail' => $request->BA_detail,
                // 'CAS_Number' => $request->CAS_Number,
                // 'Chemical_Formula' => $request->Chemical_Formula,
                // 'Molecular_Mass' => $request->Molecular_Mass,
                // 'IUPAC_Name' => $request->IUPAC_Name,

                // 'In_Silico' => $request->In_Silico,
                // 'Acute_Toxicity' => $request->Acute_Toxicity,
                // 'Subchronic_Toxicity' => $request->Subchronic_Toxicity,
                // 'Chronic_Toxicity' => $request->Chronic_Toxicity,
                // 'In_Vivo' => $request->In_Vivo,
                // 'In_Vitro' => $request->In_Vitro,
                // 'Clinical_Studies' => $request->Clinical_Studies,
                // 'Phytochemical' => $request->Phytochemical,
                // 'compoundClass' => $request->compoundClass,
            ]);}
        return redirect ('/listDatabase');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\dataSenyawa  $dataSenyawa
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $senyawa = dataSenyawa::where('_id', $id)->first();
        $senyawa->delete();
        return redirect('/listDatabase')->with('success','Data Berhasil Dihapus!');
    }
}
