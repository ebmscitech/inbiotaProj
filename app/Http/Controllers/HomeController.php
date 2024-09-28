<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\zat;
use App\Models\Bio;

class HomeController extends Controller
{
    public function page1(){
        return view('welcome');
    }

    public function page2(){
        return view('halaman.docs');
    }

    public function page3(){
        return view('halaman.contact');
    }

    public function page4(){
        return view('halaman.signin');
    }

    public function page5(){
        return view('halaman.signup');
    }

    public function page6(){
        return view('halaman.sEngine');
    }

    public function pageBForm(Request $request){
        $validated = $request->validate([
            'name' => 'required',
            'senderEmail' => 'required',
            'phoneNumber' => 'numeric',
            'dibaca' => 'boolean'
        ]);
        // dd($request->all());
        DB::table('questionsub')->insert([
            'name' => $request['name'],
            'senderEmail' => $request['senderEmail'],
            'phoneNumber' => $request['phoneNumber'],
            'message' => $request['message'],
        ]);
        return redirect ('/');
    }
    public function subsForm(Request $request){
        DB::table('emailsub')->insert([
            'subscription' => $request['subscription'],
        ]);
        return redirect('/');
    }

    //tinggal Auth
    public function accSignin(Request $request){
        $validated = $request->validate([
            'email' => 'required',
            'password' => 'required',
        ]);
        dd($request->all());
    }
    public function accSignup(Request $request){
        $validated = $request->validate([
            'email' => 'required',
            'password' => 'required',
        ]);
        dd($request->all());
    }
    public function indexadmin(){
        return view('backoffice.indexAdmin');
    }
}
