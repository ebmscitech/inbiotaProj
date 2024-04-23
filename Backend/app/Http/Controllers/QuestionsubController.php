<?php

namespace App\Http\Controllers;

use App\Models\questionsub;
use Illuminate\Http\Request;
use App\Models\emailsub;

class QuestionsubController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $questionsub = questionsub::all();
        // dd($dataSenyawa);
        return view('clientData.listQuestSub', compact('questionsub', $questionsub));
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
     * @param  \App\Models\questionsub  $questionsub
     * @return \Illuminate\Http\Response
     */
    public function show(questionsub $questionsub)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\questionsub  $questionsub
     * @return \Illuminate\Http\Response
     */
    public function edit(questionsub $questionsub)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\questionsub  $questionsub
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, questionsub $questionsub)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\questionsub  $questionsub
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $mail = questionsub::where('_id', $id)->first();
        $mail->delete();
        return redirect('/listQuestSub')->with('success','Data Berhasil Dihapus!');
    }

}
