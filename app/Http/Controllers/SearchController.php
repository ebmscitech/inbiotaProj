<?php

namespace App\Http\Controllers;

use App\Http\Requests\IndividualSearchRequest;
use App\Http\Requests\SearchRequest;
use App\Http\Resources\bioactivitiesResourceDetail;
use App\Http\Resources\bioResource;
use App\Http\Resources\IndividualSearchResource;
use App\Http\Resources\phytochemicalResource;
use App\Http\Resources\phytochemicalResourceDetail;
use App\Http\Resources\SearchResource;
use App\Http\Resources\tanamanResource;
use App\Http\Resources\TanamanResourceDetail;
use App\Models\sbt;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\tanaman;
use App\Models\zat;
use App\Models\Bio;
use App\Models\commontable;
use Exception;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

use function PHPUnit\Framework\throwException;

class SearchController extends Controller
{
    public function search(Request $request) /*: JsonResponse */
    {
//        $request = $request->validated();
        Log::info('----SearchController BEGIN----');
        $orderBy = $request->input('orderBy');
        $attribute = $request->input('attribute');
        $search = $request->input('search');
        $keyword = preg_split('/\s+/', $search, -1, PREG_SPLIT_NO_EMPTY);

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
                $senyawaNames = [];
                $bioNames = [];
                foreach ($results as $result) {
                    $sbtItems = Sbt::where('tanId', $result->id)->get();
                    $snywIds = $sbtItems->pluck('snywId');
                    $biokIds = $sbtItems->pluck('biokId');
                    if (!$result == null){
                        $senyawaNames = zat::whereIn('id', $snywIds)->pluck('Phytochemical', 'id');
                        $bioNames = Bio::whereIn('id', $biokIds)->pluck('BA_Name', 'id');
                    }
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
                $tanNames = [];
                $bioNames = [];
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
                    ["label" => "All Attributes", "value" => "All"],
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
                $tanNames = [];
                $zatNames = [];
                foreach ($results as $result) {
                    $sbtItems = Sbt::where('biokId', $result->id)->get();
                    $tanIds = $sbtItems->pluck('tanId');
                    $zatIds = $sbtItems->pluck('snywId');
                    $tanNames = tanaman::whereIn('id', $tanIds)->pluck('Plant_Name', 'id');
                    $zatNames = zat::whereIn('id', $zatIds)->pluck('Phytochemical', 'id');
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

//        return (new SearchResource($result))->response()->setStatusCode(200);
    }

    public function searchApi(SearchRequest $request)
    {
        $isAuthorize = $this->checkHeader($request);

        if($isAuthorize == false){
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        }

        if($request['attribute'] == null){
            return response()->json(['message' => 'Attribute is required'], 422);
        }
        if($request['search'] == null){
            return response()->json(['message' => 'Search is required'], 422);
        }
        if($request['pageNo'] > 50 ){
            return response()->json(['message' => 'Page number is too high'], 422);
        }
        if($request['row'] == null || $request['pageNo'] == null){
            return response()->json(['message' => 'Row and Page number is required'], 422);
        }

        $request = $request->validated();
        Log::info('----SearchController BEGIN----');
        $orderBy = $request['orderBy'];
        $attribute = $request['attribute'];
        $search = $request['search'];
        $row = $request['row'];
        $pageNo = $request['pageNo'];
        $keyword = preg_split('/\s+/', $search, -1, PREG_SPLIT_NO_EMPTY);

        $query = tanaman::query();
        $query2 = zat::query();
        $query3 = Bio::query();

        $clasCd2 = commontable::where('CD_NM', 'attributes')
            ->where('CLAS_CD1', $orderBy)
            ->value('CLAS_CD2');

        Log::info('Debugging info: ', ['clasCd2' => $clasCd2]);

        if($clasCd2 == 'plant'){
            $results = $query->where(function ($query) use ($keyword) {
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
                }
            })
            ->orderBy('id', 'asc')
            ->get();
            if ($results->isEmpty()) {
                return response()->json([
                    'data' => [],
                    'totalPage' => null,
                    'curPage' => '',
                    'totalCount' => null,
                    'recCnt' => '',
                ], 200);
            }
            $resultsFinal =[];
            foreach ($results as $result) {
                $sbtItems = Sbt::where('tanId', $result->id)->get();
                $snywIds = $sbtItems->pluck('snywId');
                $biokIds = $sbtItems->pluck('biokId');
                $senyawaNames = zat::whereIn('id', $snywIds)->pluck('Phytochemical', 'id');
                $bioNames = Bio::whereIn('id', $biokIds)->pluck('BA_Name', 'id');
                $bioItems = [];
                foreach ($biokIds as $id) {
                    $bioItems[] = [
                        'idBio' => $id,
                        'BA_Name' => $bioNames[$id] ?? null,
                    ];
                }
                $snywItems = [];
                foreach ($snywIds as $id) {
                    $snywItems[] = [
                        'idSnyw' => $id,
                        'Phytochemicals' => $senyawaNames[$id] ?? null,
                    ];
                }
                $result =[
                    'id'=>$result->id,
                    'Plant_Name' => $result->Plant_Name,
                    'Local_Name' => $result->Local_Name,
                    'English_Name' => $result->English_Name,
                    'Kingdom' => $result->Kingdom,
                    'SubKingdom' => $result->SubKingdom,
                    'Infrakingdom' => $result->Infrakingdom,
                    'Superdivision' => $result->Superdivision,
                    'Class' => $result->Class,
                    'Superorder' => $result->Superorder,
                    'Order' => $result->Order,
                    'Family' => $result->Family,
                    'Genus' => $result->Genus,
                    'Species' => $result->Species,
                    'Synonym' => $result->Synonym,
                    'Geographical_Distribution' => $result->Geographical_Distribution,
                    'Traditional_Uses' => $result->Traditional_Uses,
                    'Reference' => $result->Reference,
                    'Phytochemicals' => $snywItems,
                    'Bioactivities' => $bioItems,
                ];
                $resultsFinal[] = $result;
            }
        } elseif ($clasCd2 == 'bioactivities') {
            $data = Bio::where(function ($query3) use ($keyword){
                foreach ($keyword as $word) {
                    $query3->where('BA_Name', 'LIKE', "%$word%")
                        ->orWhere('BA_Details', 'LIKE', "%$word%")
                        ->orWhere('BA_ref', 'LIKE', "%$word%");
                }})
                ->orderBy('id', 'asc')
                ->get();
            $results = $data;
            if ($results->isEmpty()) {
                return response()->json([
                    'data' => [],
                    'totalPage' => null,
                    'curPage' => '',
                    'totalCount' => null,
                    'recCnt' => '',
                ], 200);
            }
            $resultsFinal =[];
            foreach ($results as $result) {
                $sbtItems = Sbt::where('biokId', $result->id)->get();
                $tanIds = $sbtItems->pluck('tanId');
                $zatIds = $sbtItems->pluck('snywId');
                $tanNames = tanaman::whereIn('id', $tanIds)->pluck('Plant_Name', 'id');
                $zatNames = zat::whereIn('id', $zatIds)->pluck('Phytochemical', 'id');
                $tanItems = [];
                foreach ($tanIds as $id) {
                    $tanItems[] = [
                        'idTan' => $id,
                        'Plant_Name' => $tanNames[$id] ?? null,
                    ];
                }
                $zatItems = [];
                foreach ($zatIds as $id) {
                    $zatItems[] = [
                        'idSnyw' => $id,
                        'Phytochemical' => $zatNames[$id] ?? null,
                    ];
                }
                $result =[
                    'id'=>$result->id,
                    'BA_Name' => $result->BA_Name,
                    'BA_Details' => $result->BA_Details,
                    'BA_ref' => $result->BA_ref,
                    'bioTan' => $tanItems,
                    'bioPhy' => $zatItems,
                ];
                $resultsFinal[] = $result;
            }
        } elseif ($clasCd2 == 'phytochemical'){
            $data = zat::where(function ($query2) use ($keyword){
                foreach ($keyword as $word) {
                    $query2->where('Phytochemical', 'LIKE', "%$word%")
                        ->orWhere('compoundClass', 'LIKE', "%$word%")
                        ->orWhere('Chemical_Formula', 'LIKE', "%$word%")
                        ->orWhere('Molecular_Mass', 'LIKE', "%$word%")
                        ->orWhere('IUPAC_Name', 'LIKE', "%$word%")
                        ->orWhere('SynonymZ', 'LIKE', "%$word%");
                }})
                ->orderBy('id', 'asc')
                ->get();
            $results = $data;
            if ($results->isEmpty()) {
                return response()->json([
                    'data' => [],
                    'totalPage' => null,
                    'curPage' => '',
                    'totalCount' => null,
                    'recCnt' => '',
                ], 200);
            }
            $resultsFinal =[];
            foreach ($results as $result) {
                $sbtItems = Sbt::where('snywId', $result->id)->get();
                $tanIds = $sbtItems->pluck('tanId');
                $biokIds = $sbtItems->pluck('biokId');
                $tanNames = tanaman::whereIn('id', $tanIds)->pluck('Plant_Name', 'id');
                $bioNames = Bio::whereIn('id', $biokIds)->pluck('BA_Name', 'id');
                $tanItems = [];
                foreach ($tanIds as $id) {
                    $tanItems[] = [
                        'idTan' => $id,
                        'Plant_Name' => $tanNames[$id] ?? null,
                    ];
                }
                $bioItems = [];
                foreach ($biokIds as $id) {
                    $bioItems[] = [
                        'idBio' => $id,
                        'BA_Name' => $bioNames[$id] ?? null,
                    ];
                }
                $result =[
                    'id' => $result->id,
                    'Phytochemical' => $result->Phytochemical,
                    'compoundClass' => $result->compoundClass,
                    'Chemical_Formula' => $result->Chemical_Formula,
                    'Molecular_Mass' => $result->Molecular_Mass,
                    'IUPAC_Name' => $result->IUPAC_Name,
                    'SynonymZ' => $result->SynonymZ,
                    'phyTan' => $tanItems,
                    'phyBio' => $bioItems,
                ];
                $resultsFinal[] = $result;
            }
        } else {
            return response()->json([
                'message' => 'Invalid orderBy option',
                'status' => 400
            ], 400);
        }

        $size = count($results);
            Log::info('Debugging info: ', ['sizeResult' => $size]);

            if ($size != null) {
                $remainSize = $size % $row;
            }

            if ($size == 0){
                $totalPage = 0;
                $recCnt = 0;
            } else {
                if($remainSize == 0){
                    $totalPage = (int)($size / $row);
                    $recCnt = $row;
                } else {
                    if ($size < $row) {
                        $recCnt = $size;
                        $totalPage = 1;
                    } else {
                        $totalPage = (int)($size / $row) + 1;
                        if($totalPage == $pageNo){
                            $recCnt = $remainSize;
                        } else if ($totalPage > $pageNo) {
                            $recCnt = $row;
                        } else {
                            $recCnt = 0;
                        }
                    }
                }
            }

            $curPage = $pageNo;

            if ($pageNo == 0){
                $page = 1;
            }

            Log::info('Debugging info: ', ['pageNo' => $pageNo]);

            if ($pageNo > $totalPage && $row >= $size){
                $recCnt = 0;
                $recCnt = $recCnt;
                $pageNo = $totalPage;
            }
            $sizePageOut = ($pageNo -1) * $row;

            $pageResults = [];
            for ($dataCnt = $sizePageOut; $dataCnt < $sizePageOut + $recCnt; $dataCnt++) {
                if (isset($resultsFinal[$dataCnt])) {
                    Log::info('Debugging info: ', ['isset' => isset($resultsFinal[$dataCnt])]);
                    $pageResults[] = $resultsFinal[$dataCnt];
                }
            }
            $pageResults = collect($pageResults);

        if($clasCd2 == 'bioactivities'){
            return response()->json([
                'data' => SearchResource::collection($pageResults),
                'totalPage' => $totalPage,
                'curPage' => $pageNo,
                'totalCount' => $size,
                'recCnt' => $recCnt,
            ], 200);
        } elseif($clasCd2 == 'phytochemical'){
            return response()->json([
                'data' => phytochemicalResource::collection($pageResults),
                'totalPage' => $totalPage,
                'curPage' => $pageNo,
                'totalCount' => $size,
                'recCnt' => $recCnt,
            ], 200);
        } elseif($clasCd2 == 'plant'){
            return response()->json([
                'data' => TanamanResource::collection($pageResults),
                'totalPage' => $totalPage,
                'curPage' => $pageNo,
                'totalCount' => $size,
                'recCnt' => $recCnt,
            ], 200);
        }
    }

    public function showT($id) {
        $tanaman = tanaman::all()->where('id', $id)->first();
        $zat = zat::get();
        $Bio = Bio::get();
        $sbtItems = Sbt::where('tanId', $tanaman)->get();
        $snywIds = $sbtItems->pluck('snywId');
        $biokIds = $sbtItems->pluck('biokId');
        $zatNames = zat::whereIn('id', $snywIds)->pluck('Phytochemical', 'id');
        $bioNames = Bio::whereIn('id', $biokIds)->pluck('BA_Name', 'id');
        $bioDetails = Bio::whereIn('id', $biokIds)->pluck('BA_Details', 'id');
        return view('halaman.searchDetail', compact('tanaman', 'zat', 'Bio', 'zatNames', 'bioNames', 'bioDetails'));
    }

    public function showZ($id) {
        $zat = zat::all()->where('id', $id)->first();
        $tanaman = tanaman::get();
        $Bio = Bio::get();
        $sbtItems = Sbt::where('snywId', $zat)->get();
        $tanIds = $sbtItems->pluck('tanId');
        $biokIds = $sbtItems->pluck('biokId');
        $tanNames = tanaman::whereIn('id', $tanIds)->pluck('Plant_Name', 'id');
        $bioNames = Bio::whereIn('id', $biokIds)->pluck('BA_Name', 'id');
        $bioDetails = Bio::whereIn('id', $biokIds)->pluck('BA_Details', 'id');
        return view('halaman.searchDetail2', compact('tanaman', 'zat', 'Bio', 'tanNames', 'bioNames', 'bioDetails'));
    }

    public function showlist(IndividualSearchRequest $request): JsonResponse
    {
        $isAuthorize = $this->checkHeader($request);

        if($isAuthorize == false){
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        Log::info('List data is called');
        $data = $request->parameter;

        if ($data == null) {
            throw new Exception('Data is null. Please provide valid data.');
        }

        $parameterMap = [
            'Bioactivity' => 'bioaktivitas',
            'Plants' => 'tanaman',
            'Substances' => 'senyawa',
            'plantDetails' => 'BaTanRelated',
        ];

        if ($data == 'searchBy'){
            $results = ['Bioactivity', 'Plants', 'Substances'];

            //TODO : CREATE COMMON TABLE (NEED TEST 13/01)

            $results = [
                ['id' => 1, 'result' => 'Plants'],
                ['id' => 2, 'result' => 'Bioactivity'],
                ['id' => 3, 'result' => 'Substances']
            ];

            foreach ($results as $result)
            {
                $finalResults[]=[
                    'id' => $result['id'],
                    'result' => $result['result']
                ];
            }

            $dataWthSts = [
                'status' => 200,
                'message' => 'success',
                'data' => $finalResults
            ];

            return (new IndividualSearchResource($dataWthSts))->response()->setStatusCode(200);
        } else if ($data == 'Bioactivity' || $data == 'Plants' || $data == 'Substances') {
            try {
                $tableName = $parameterMap[$data];
                $columns = DB::select("SHOW COLUMNS FROM {$tableName}");
                $excludeColumn = ['id', 'created_at', 'updated_at', 'BA_Name', 'Plant_Name', 'Reference', 'Description'];

                $filteredColumns = array_filter($columns, function ($column) use ($excludeColumn) {
                    return !in_array($column->Field, $excludeColumn);
                });

                if ($data == 'Bioactivity'){
                    $includeColumn = ['Pythochemical', 'Plant_Name', 'All Attributes'];
                } else if ($data == 'Plants'){
                    $includeColumn = ['BA_Name', 'Pythochemical', 'All Attributes'];
                } else if ($data == 'Substances'){
                    $includeColumn = ['BA_Name', 'Plant_Name', 'All Attributes'];
                }

                $columnNames = array_map(function ($column) {
                    return $column->Field;
                }, $filteredColumns);

                $columnNames = array_merge($columnNames, $includeColumn);
                foreach ($columnNames as $index => $columnName) {
                    $finalResults[]=[
                        'id' => $index + 1,
                        'result' => $columnName
                    ];
                }

                $dataWthSts = [
                    'status' => 200,
                    'message' => 'success',
                    'data' => $finalResults
                ];

                return (new IndividualSearchResource($dataWthSts))->response()->setStatusCode(200);
            } catch (\Exception $e) {
                return response()->json([
                    'success' => false,
                    'message' => 'Error: ' . $e->getMessage(),
                ], 500);
            }
        } else {
            throw new HttpResponseException(response([
                'errors' => [
                    'message' => 'Error: Invalid parameter.'
                ]
            ], 403));
        }
    }

    public function showDetail(Request $request, $id, $searchBy): JsonResponse
    {
        $isAuthorize = $this->checkHeader($request);

        if($isAuthorize == false){
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        Log::info('----showDetail BEGIN----');

        if (empty($id) || empty($searchBy)) {
            return response()->json(['error' => 'Invalid input parameters'], 400);
        }

        $result = null;
        $query = tanaman::query();
        $query2 = zat::query();
        $query3 = Bio::query();

        $clasCd2 = commontable::where('CD_NM', 'attributes')
            ->where('CLAS_CD1', $searchBy)
            ->value('CLAS_CD2');

        Log::info('Debugging info: searchDetail', ['clasCd2' => $clasCd2]);

        switch ($clasCd2) {
            case 'plant':
                $result = $query->where('id', $id)->first();
                if (!$result) {
                    return response()->json([
                        'message' => 'No results found'
                    ], 404);
                }
                $sbtItems = Sbt::where('tanId', $result->id)->get();
                $snywIds = $sbtItems->pluck('snywId');
                $biokIds = $sbtItems->pluck('biokId');
                $senyawaNames = zat::whereIn('id', $snywIds)->pluck('Phytochemical', 'id');
                $bioNames = Bio::whereIn('id', $biokIds)->pluck('BA_Name', 'id');
                $bioItems = [];
                foreach ($biokIds as $id) {
                    $bioItems[] = [
                        'idBio' => $id,
                        'BA_Name' => $bioNames[$id] ?? null,
                    ];
                }
                $snywItems = [];
                foreach ($snywIds as $id) {
                    $snywItems[] = [
                        'idSnyw' => $id,
                        'Phytochemicals' => $senyawaNames[$id] ?? null,
                    ];
                }
                $result =[
                    'id'=>$result->id,
                    'Plant_Name' => $result->Plant_Name,
                    'Local_Name' => $result->Local_Name,
                    'English_Name' => $result->English_Name,
                    'Kingdom' => $result->Kingdom,
                    'SubKingdom' => $result->SubKingdom,
                    'Infrakingdom' => $result->Infrakingdom,
                    'Superdivision' => $result->Superdivision,
                    'Class' => $result->Class,
                    'Superorder' => $result->Superorder,
                    'Order' => $result->Order,
                    'Family' => $result->Family,
                    'Genus' => $result->Genus,
                    'Species' => $result->Species,
                    'Synonym' => $result->Synonym,
                    'Geographical_Distribution' => $result->Geographical_Distribution,
                    'Traditional_Uses' => $result->Traditional_Uses,
                    'Reference' => $result->Reference,
                    'Phytochemicals' => $snywItems,
                    'Bioactivities' => $bioItems,
                ];
                $dataWthSts = [
                    'status' => 200,
                    'message' => 'success',
                    'data' => $result
                ];
                return (new IndividualSearchResource($dataWthSts))->response()->setStatusCode(200);
                break;
            case 'phytochemical':
                $result = $query2->where('id', $id)->first();
                if (!$result) {
                    return response()->json([
                        'message' => 'No results found'
                    ], 404);
                }
                $sbtItems = Sbt::where('snywId', $result->id)->get();
                $tanIds = $sbtItems->pluck('tanId');
                $biokIds = $sbtItems->pluck('biokId');
                $tanNames = tanaman::whereIn('id', $tanIds)->pluck('Plant_Name', 'id');
                $bioNames = Bio::whereIn('id', $biokIds)->pluck('BA_Name', 'id');
                $tanItems = [];
                foreach ($tanIds as $id) {
                    $tanItems[] = [
                        'idTan' => $id,
                        'Plant_Name' => $tanNames[$id] ?? null,
                    ];
                }
                $bioItems = [];
                foreach ($biokIds as $id) {
                    $bioItems[] = [
                        'idBio' => $id,
                        'BA_Name' => $bioNames[$id] ?? null,
                    ];
                }
                $result =[
                    'id' => $result->id,
                    'Phytochemical' => $result->Phytochemical,
                    'compoundClass' => $result->compoundClass,
                    'Chemical_Formula' => $result->Chemical_Formula,
                    'Molecular_Mass' => $result->Molecular_Mass,
                    'IUPAC_Name' => $result->IUPAC_Name,
                    'SynonymZ' => $result->SynonymZ,
                    'phyTan' => $tanItems,
                    'phyBio' => $bioItems,
                ];
                $dataWthSts = [
                    'status' => 200,
                    'message' => 'success',
                    'data' => $result
                ];
                return (new IndividualSearchResource($dataWthSts))->response()->setStatusCode(200);
            case 'bioactivities':
                $result = $query3->where('id', $id)->first();
                if (!$result) {
                    return response()->json([
                        'message' => 'No results found'
                    ], 404);
                }
                $sbtItems = Sbt::where('biokId', $result->id)->get();
                $tanIds = $sbtItems->pluck('tanId');
                $zatIds = $sbtItems->pluck('snywId');
                $tanNames = tanaman::whereIn('id', $tanIds)->pluck('Plant_Name', 'id');
                $zatNames = zat::whereIn('id', $zatIds)->pluck('Phytochemical', 'id');
                $tanItems = [];
                foreach ($tanIds as $id) {
                    $tanItems[] = [
                        'idTan' => $id,
                        'Plant_Name' => $tanNames[$id] ?? null,
                    ];
                }
                $zatItems = [];
                foreach ($zatIds as $id) {
                    $zatItems[] = [
                        'idSnyw' => $id,
                        'Phytochemical' => $zatNames[$id] ?? null,
                    ];
                }
                $result =[
                    'id'=>$result->id,
                    'BA_Name' => $result->BA_Name,
                    'BA_Details' => $result->BA_Details,
                    'BA_ref' => $result->BA_ref,
                    'bioTan' => $tanItems,
                    'bioPhy' => $zatItems,
                ];
                $dataWthSts = [
                    'status' => 200,
                    'message' => 'success',
                    'data' => $result
                ];
                return (new IndividualSearchResource($dataWthSts))->response()->setStatusCode(200);
                break;
            default:
                return response()->json([
                    'message' => 'Invalid searchBy value.',
                    'status' => 400,
                ], 400);
        }

        return (new TanamanResourceDetail($results))->response()->setStatusCode(200);
    }

    public function checkHeader(Request $request)
    {
        $output = false;

        if (!$request->hasHeader('ClientId')) {
            Log::warning("Can't found 'ClientId'");
            return false;
        }

        $clientId = $request->header('ClientId');

        if (empty($clientId)) {
            Log::warning("Header 'ClientId' Invalid");
            return false;
        }

        $chkCust = commontable::where('CD_NM', 'clientId')
            ->where('CLAS_CD1', $clientId)
            ->where('APCL_STR', '<=', now())
            ->where('APCL_END', '>=', now());

        Log::info("Current datetime (now()): " . now());
        Log::info("Final check result: ". $chkCust->get()->count());

        if ($chkCust->exists()) {
            $output = true;
        }

        return $output;
    }

}
