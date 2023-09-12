<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

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

    public function page7(){
        return view('halaman.inputData');
    }
}
