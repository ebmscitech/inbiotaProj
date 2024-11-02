<?php

namespace App\Http\Controllers;

use App\Models\emailsub;
use Illuminate\Http\Request;

class EmailsubController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    public function indexS()
    {
        $emailsub = emailsub::all();
        return view('clientData.listEmailSub', compact('emailsub'));
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
     * @param  \App\Models\emailsub  $emailsub
     * @return \Illuminate\Http\Response
     */
    public function show(emailsub $emailsub)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\emailsub  $emailsub
     * @return \Illuminate\Http\Response
     */
    public function edit(emailsub $emailsub)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\emailsub  $emailsub
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, emailsub $emailsub)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\emailsub  $emailsub
     * @return \Illuminate\Http\Response
     */
    public function destroy(emailsub $emailsub)
    {
        //
    }
    public function destroyS($id)
    {
        $mail = emailsub::where('_id', $id)->first();
        $mail->delete();
        return redirect('/listSubscriber')->with('success','Data Berhasil Dihapus!');
    }
}
