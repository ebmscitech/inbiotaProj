<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\dataSenyawa;
use App\Models\zat;
use App\Models\Bio;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $orderBy = $request->input('orderBy');
        $attribute = $request->input('attribute');
        $search = $request->input('search');
          // Memecah input pencarian menjadi array kata
          $keyword = preg_split('/\s+/', $search, -1, PREG_SPLIT_NO_EMPTY);

          $keywordString = implode(' ', $keyword);

          $query = dataSenyawa::query();
          $query2 = zat::query();
          $query3 = Bio::query();


          switch ($orderBy) {
            default:
            $data = [];
            break;
            case 'plant':
                $dataSenyawa = dataSenyawa::all();
                $data = dataSenyawa::where(function ($query) use ($keyword){
                    foreach ($keyword as $word) {
                    $query->where('Plant_Name', 'LIKE', "%$word%")
                    ->orWhere('Local_Name', 'LIKE', "%$word%")
                    ->orWhere('English_Name', 'LIKE', "%$word%")
                    ->orWhere('Kingdom', 'LIKE', "%$word%")
                    ->orWhere('SubKingdom', 'LIKE', "%$word%")
                    ->orWhere('Infrakingdom', 'LIKE', "%$word%")
                    ->orWhere('Superdivision', 'LIKE', "%$word%")
                    ->orWhere('Class', 'LIKE', "%$word%")
                    ->orWhere('Superorder', 'LIKE', "%$word%")
                    ->orWhere('Order', 'LIKE', "%$word%")
                    ->orWhere('Family', 'LIKE', "%$word%")
                    ->orWhere('Genus', 'LIKE', "%$word%")
                    ->orWhere('Species', 'LIKE', "%$word%")
                    ->orWhere('Synonym', 'LIKE', "%$word%")
                    ->orWhere('Geographical_Distribution', 'LIKE', "%$word%")
                    ->orWhere('Traditional_Uses', 'LIKE', "%$word%")
                    ->orWhere('Reference', 'LIKE', "%$word%")
                    ->orWhere('Phytochemical', 'LIKE', "%$word%")
                    ->orWhere('BA_Name', 'LIKE', "%$word%"); 
          }})
                    ->get();
                    $results = $data;
                    // Proses hasil untuk mengutip kata yang cocok dengan kata pencarian
                    foreach ($results as $result) {
                        foreach ($keyword as $word) {
                            $columns = ["Plant_Name", "Local_Name", "English_Name", "Kingdom", "SubKingdom", "Infrakingdom", "Superdivision", "Class", "Superorder", "Order", "Family", "Genus", "Species", "Synonym",  "Geographical_Distribution", "Traditional_Uses", "Phytochemical", "BA_Name"];
                            foreach ($columns as $column) {
                                $result->$column = preg_replace("/\b$word\b/i", '<span class="highlight">$0</span>', $result->$column);
                            }
                        }
                    }
                    $zat = zat::get();
                    $Bio = Bio::get();
                    $attributes = [
                        ["label" => "All Attributes", "value" => "All"],
                        ["label" => "Local Name", "value" => "local_name"],
                        ["label" => "English Name", "value" => "english_name"],
                        ["label" => "Kingdom", "value" => "kingdom"],
                        ["label" => "Subkingdom", "value" => "subkingdom"],
                        ["label" => "Infrakingdom", "value" => "infrakingdom"],
                        ["label" => "Superdivision", "value" => "superdivision"],
                        ["label" => "Class", "value" => "class"],
                        ["label" => "Superorder", "value" => "superorder"],
                        ["label" => "Order", "value" => "order"],
                        ["label" => "Family", "value" => "family"],
                        ["label" => "Genus", "value" => "genus"],
                        ["label" => "Species", "value" => "species"],
                        ["label" => "Traditional Uses", "value" => "traditional_uses"],
                        ["label" => "Synonym", "value" => "synonym"],
                        ["label" => "Bioactivities Related", "value" => "bioactivities_related"],
                        ["label" => "Phytochemicals Related", "value" => "phytochemicals_related"]
                    ];
                    foreach ($attributes as $attr){
                    if ($attribute == $attr['value']) {
                        $zat = zat::get();
                        $Bio = Bio::get();
                        return view('advancesearch.advancesearch', compact('results', 'dataSenyawa', 'zat', 'Bio', 'attributes', 'attribute'));
                    }}
                    return view('halaman.search', compact('results', 'dataSenyawa', 'zat', 'Bio'));
                    break;
                break;
            case 'phytochemical':
                $zat = zat::all();
                $data = zat::where(function ($query2) use ($keyword){
                    foreach ($keyword as $word) {
                    $query2->where('Phytochemical', 'LIKE', "%$word%")
                    ->orWhere('compoundClass', 'LIKE', "%$word%")
                    ->orWhere('Chemical_Formula', 'LIKE', "%$word%")
                    ->orWhere('Molecular_Mass', 'LIKE', "%$word%")
                    ->orWhere('IUPAC_Name', 'LIKE', "%$word%")
                    ->orWhere('SynonymZ', 'LIKE', "%$word%");
          }})
                    ->get();
                    $results = $data;
                    // Proses hasil untuk mengutip kata yang cocok dengan kata pencarian
                    foreach ($results as $result) {
                        foreach ($keyword as $word) {
                            $columns = ["Phytochemical", "compoundClass", "Chemical_Formula", "Molecular_Mass", "IUPAC_Name", "SynonymZ", "BA_Name", "Plant_Name"];
                            foreach ($columns as $column) {
                                $result->$column = preg_replace("/\b$word\b/i", '<span class="highlight">$0</span>', $result->$column);
                            }
                        }
                    }
                    $Bio = Bio::get();
                    $dataSenyawa = dataSenyawa::get();
                    $attributes = [
                        ["label" => "Compound Class", "value" => "compound_class"],
                        ["label" => "Chemical Formula", "value" => "chemical_formula"],
                        ["label" => "Molecular Mass", "value" => "molecular_mass"],
                        ["label" => "IUPAC Name", "value" => "iupac_name"],
                        ["label" => "Synonym", "value" => "synonym"],
                        ["label" => "Plants Related", "value" => "plants_related"],
                        ["label" => "Bioactivities Related", "value" => "bioactivities_related"],
                        ["label" => "CAS Number", "value" => "cas_number"]
                    ];
                    foreach ($attributes as $attr){
                    if ($attribute == $attr['value']) {
                        $dataSenyawa = dataSenyawa::get();
                        $Bio = Bio::get();
                        return view('advancesearch.advancesearch2', compact('results', 'dataSenyawa', 'zat', 'Bio', 'attributes', 'attribute'));
                    }}
                    return view('halaman.search2', compact('results', 'zat', 'Bio', 'dataSenyawa', 'attributes', 'attribute'));
                break;
            case 'bioactivities':
                $Bio = Bio::all();
                $data = Bio::where(function ($query3) use ($keyword){
                    foreach ($keyword as $word) {
                    $query3->where('BA_Name', 'LIKE', "%$word%")
                    ->orWhere('BA_Details', 'LIKE', "%$word%")
                    ->orWhere('BA_ref', 'LIKE', "%$word%");
          }})
                    ->get();
                    $results = $data;
                    // Proses hasil untuk mengutip kata yang cocok dengan kata pencarian
                    foreach ($results as $result) {
                        foreach ($keyword as $word) {
                            $columns = ["BA_Name", "BA_Details", "BA_ref", "Phytochemical", "Plant_Name"];
                            foreach ($columns as $column) {
                                $result->$column = preg_replace("/\b$word\b/i", '<span class="highlight">$0</span>', $result->$column);
                            }
                        }
                    }
                    $zat = zat::get();
                    $dataSenyawa = dataSenyawa::get();
                    $attributes = [
                        ["label" => "Details", "value" => "details"],
                        ["label" => "Plants Related", "value" => "plants_related"],
                        ["label" => "Phytochemicals Related", "value" => "phytochemicals_related"]
                    ];
                    foreach ($attributes as $attr){
                    if ($attribute == $attr['value']) {
                        $zat = zat::get();
                        $dataSenyawa = dataSenyawa::get();
                        return view('advancesearch.advancesearch3', compact('results', 'dataSenyawa', 'zat', 'Bio', 'attributes', 'attribute'));
                    }}
                    return view('halaman.search3', compact('results', 'Bio', 'zat', 'dataSenyawa'));
                break;
        }
    }

    public function show($id) {
        $dataSenyawa = dataSenyawa::all()->where('id', $id)->first();
        $zat = zat::get();
        $Bio = Bio::get();
        return view('halaman.searchDetail', compact('dataSenyawa', 'zat', 'Bio'));
    }
}
