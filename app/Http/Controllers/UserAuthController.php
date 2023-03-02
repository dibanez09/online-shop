<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserAuthController extends Controller
{
    public function userLogin(Request $request){
        $email = $request->email;
        $pw = $request->password;

        $session = User::where('email', $email)
            ->where(\DB::raw('BINARY `password`'), $pw)
            ->get();

        if(count($session) > 0){
            $request->session()->put('user_id', $session[0]->id);
            $request->session()->put('email', $session[0]->email);
            $request->session()->put('name', $session[0]->name);

            return response('success', 200);
        }else{
            return response('invalid email or password', 200);
        }
    }

    public function logout(Request $request){
        $request->session()->forget('user_id');
        $request->session()->forget('email');
        $request->session()->forget('name');

        return redirect('/login');
    }
}
