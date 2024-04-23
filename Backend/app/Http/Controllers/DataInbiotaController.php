<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\zat;
use App\Models\Bio;
use App\Models\dataSenyawa;

class DataInbiotaController extends Controller
{
    public function pageInputData(Request $request){
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

        DB::table('dataSenyawa')->insert([
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
            'BA_Name' => json_encode($baname),
            'Phytochemical' => json_encode($fitokimia),
            'BA_detail' => $request['BA_detail'],
            // 'In_Silico' => $request['In_Silico'],
            // 'Acute_Toxicity' => $request['Acute_Toxicity'],
            // 'Subchronic_Toxicity' => $request['Subchronic_Toxicity'],
            // 'Chronic_Toxicity' => $request['Chronic_Toxicity'],
            // 'In_Vivo' => $request['In_Vivo'],
            // 'In_Vitro' => $request['In_Vitro'],
            // 'Clinical_Studies' => $request['Clinical_Studies'],
            // 'Structure' => $filename,
        ]);

        // if (!$PlantNew) {
        //     throw new \Exception("Failed to create new data.");
        // }

        // // Dapatkan ID data baru
        // $PlantNewId = $request->input('_id'); // Misalkan ID disimpan dalam atribut _id

        // $dataSenyawaModel = dataSenyawa::find($PlantNewId);
        // $dataSenyawaModel->bioact()->attach($baname);

     
        return redirect ('/listDatabase');
    }
}
