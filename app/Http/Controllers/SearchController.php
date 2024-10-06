<?php

namespace App\Http\Controllers;

use App\Http\Requests\SearchRequest;
use App\Http\Resources\SearchResource;
use App\Models\sbt;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\tanaman;
use App\Models\zat;
use App\Models\Bio;
use Illuminate\Support\Facades\Log;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        Log::info('----SearchController BEGIN----');
        $orderBy = $request->input('orderBy');
        $attribute = $request->input('attribute');
        $search = $request->input('search');
        // Memecah input pencarian menjadi array kata
        $keyword = preg_split('/\s+/', $search, -1, PREG_SPLIT_NO_EMPTY);

        $keywordString = implode(' ', $keyword);

        $query = tanaman::query();
        $query2 = zat::query();
        $query3 = Bio::query();


        switch ($orderBy) {
            default:
                $data = [];
                break;
            case 'plant':
                $tanaman = tanaman::all();
                $data = tanaman::where(function ($query) use ($keyword){
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
                            ->orWhere('Reference', 'LIKE', "%$word%");
                    }})
                    ->get();
                $results = $data;
                $zat = zat::get();
                $Bio = Bio::get();
                foreach ($results as $result) {
                    $sbtItems = Sbt::where('tanId', $result->id)->get();
                    $snywIds = $sbtItems->pluck('snywId');
                    $biokIds = $sbtItems->pluck('biokId');
                    $senyawaNames = zat::whereIn('id', $snywIds)->pluck('Phytochemical', 'id');
                    $bioNames = Bio::whereIn('id', $biokIds)->pluck('BA_Name', 'id');
                    foreach ($keyword as $word) {
                        $columns = ["Plant_Name", "Local_Name", "English_Name", "Kingdom", "SubKingdom", "Infrakingdom", "Superdivision", "Class", "Superorder", "Order", "Family", "Genus", "Species", "Synonym",  "Geographical_Distribution", "Traditional_Uses", "Phytochemical", "BA_Name"];
                        foreach ($columns as $column) {
                            $result->$column = preg_replace("/\b$word\b/i", '<span class="highlight">$0</span>', $result->$column);
                        }
                    }
                }
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
                        return view('advancesearch.advancesearch', compact('results', 'tanaman', 'zat', 'Bio', 'attributes', 'attribute', 'senyawaNames', 'bioNames'));
                    }}
                return view('halaman.search', compact('results', 'tanaman', 'zat', 'Bio', 'senyawaNames', 'bioNames'));
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
                $tanaman = tanaman::get();
                $Bio = Bio::get();
                foreach ($results as $result) {
                    $sbtItems = Sbt::where('snywId', $result->id)->get();
                    $tanIds = $sbtItems->pluck('tanId');
                    $biokIds = $sbtItems->pluck('biokId');
                    $tanNames = tanaman::whereIn('id', $tanIds)->pluck('Plant_Name', 'id');
                    $bioNames = Bio::whereIn('id', $biokIds)->pluck('BA_Name', 'id');
                    foreach ($keyword as $word) {
                        $columns = ["Plant_Name", "Local_Name", "English_Name", "Kingdom", "SubKingdom", "Infrakingdom", "Superdivision", "Class", "Superorder", "Order", "Family", "Genus", "Species", "Synonym",  "Geographical_Distribution", "Traditional_Uses", "Phytochemical", "BA_Name"];
                        foreach ($columns as $column) {
                            $result->$column = preg_replace("/\b$word\b/i", '<span class="highlight">$0</span>', $result->$column);
                        }
                    }
                }
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
                        $tanaman = tanaman::get();
                        $Bio = Bio::get();
                        return view('advancesearch.advancesearch2', compact('results', 'tanaman', 'zat', 'Bio', 'attributes', 'attribute', 'tanNames', 'bioNames'));
                    }}
                return view('halaman.search2', compact('results', 'zat', 'Bio', 'tanaman', 'attributes', 'attribute', 'tanNames', 'bioNames'));
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
                $zat = zat::get();
                $tanaman = tanaman::get();
                foreach ($results as $result) {
                    $sbtItems = Sbt::where('biokId', $result->id)->get();
                    $tanIds = $sbtItems->pluck('tanId');
                    $zatIds = $sbtItems->pluck('snywId');
                    $tanNames = tanaman::whereIn('id', $tanIds)->pluck('Plant_Name', 'id');
                    $zatNames = zat::whereIn('id', $zatIds)->pluck('Pythochemical', 'id');
                    foreach ($keyword as $word) {
                        $columns = ["Plant_Name", "Local_Name", "English_Name", "Kingdom", "SubKingdom", "Infrakingdom", "Superdivision", "Class", "Superorder", "Order", "Family", "Genus", "Species", "Synonym",  "Geographical_Distribution", "Traditional_Uses", "Phytochemical", "BA_Name"];
                        foreach ($columns as $column) {
                            $result->$column = preg_replace("/\b$word\b/i", '<span class="highlight">$0</span>', $result->$column);
                        }
                    }
                }
                $attributes = [
                    ["label" => "Details", "value" => "details"],
                    ["label" => "Plants Related", "value" => "plants_related"],
                    ["label" => "Phytochemicals Related", "value" => "phytochemicals_related"]
                ];
                foreach ($attributes as $attr){
                    if ($attribute == $attr['value']) {
                        $zat = zat::get();
                        $tanaman = tanaman::get();
                        return view('advancesearch.advancesearch3', compact('results', 'tanaman', 'zat', 'Bio', 'attributes', 'attribute', 'tanNames', 'zatNames'));
                    }}
                return view('halaman.search3', compact('results', 'Bio', 'zat', 'tanaman', 'tanNames', 'zatNames'));
                break;
        }

        return (new SearchResource($result))->response()->setStatusCode(200);
    }

    public function show($id) {
        $tanaman = tanaman::all()->where('id', $id)->first();
        $zat = zat::get();
        $Bio = Bio::get();
        return view('halaman.searchDetail', compact('tanaman', 'zat', 'Bio'));
    }

//    public function showlist(SearchRequest $request): JsonResponse
//    {
//        Log::info('List data is called');
//        $data = $request->validated();
//
//        return
//    }
}
