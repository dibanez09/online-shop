<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\UserAuthController;
use App\Models\User;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


//login page
Route::get('/login', function () {   
    if(session()->has('user_id')){
        return redirect('/');
    }

    return view('login');
});

Route::get('/register/validate/email', function (Request $request) {
    return User::where('email', $request->val)->count() === 0;
});

Route::post('/register', function (Request $request) {
    return User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => $request->password,
        'email_verified_at' => now()
    ]);
});

Route::post('login/submit',[UserAuthController::class,'userLogin'])->name('user.login');
Route::get('logout',[UserAuthController::class,'logout'])->name('user.logout');

Route::group(['middleware' =>['protect']], function(){
    Route::get('/', function () {
        $message = null;     
        return view('welcome', compact('message'));
    });

    Route::post('payment',[PaymentController::class,'pay'])->name('payment');
    Route::get('success',[PaymentController::class,'success'])->name('success');
    Route::get('cancel',[PaymentController::class,'error'])->name('cancel');
});