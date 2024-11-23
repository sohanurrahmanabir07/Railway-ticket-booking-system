<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class Api_Controller extends Controller
{
    // public function add_passenger(Request $req){
        
    //     $add_pass=DB::insert('INSERT INTO passenger (first_name,sur_name,address,phone,date_of_birth,email,nid,password) VALUES(?,?,?,?,?,?,?,?)',[$req->first_name,$req->sur_name,$req->address,$req->phone,$req->date_of_birth,$req->email,$req->nid,bcrypt($req->password)]);
    //     if ($add_pass){
    //         return response()->json([
    //             'message'=>'user registered'
    //         ]);
    //     }
    //     else{
    //         return response()->json([
    //             'message'=>'not registered'
    //         ]);
    //     }
    //     // return response()->json([
    //     //     'message'=>'user registered'
    //     // ]);
       
    // }
    // public function show(){
    //     return response()->json([
    //         'message'=>'user registered'
    //     ]);
    // }

    public function addpassenger(Request $req){
        $hashing=Hash::make(($req->password));
        // logger($hashing);
        logger($req->all());

        $add_pass = DB::insert(
                    'INSERT INTO passenger (first_name, sur_name, address, phone, date_of_birth, email, nid, password) 
                    VALUES(?, ?, ?, ?, ?, ?, ?, ?)',
                    [
                        $req->first_name, 
                        $req->sur_name, 
                        $req->address, 
                        $req->phone, 
                        $req->date_of_birth, 
                        $req->email, 
                        $req->nid, 
                        $hashing
                    ]
                );
        if($add_pass){
            return response()->json([
                'status'=>'successfully registered',
                'user'=>$req->all()
            ],200);
        }else{
            return response()->json([
                'status'=>'Couldnt register',
                'user'=>$req->all()
            ],404);
        }
        

    }
    public function show(){
        // $phone='ishwardi';
        // $user=DB::select('SELECT * from passenger WHERE address=? ',[
        //     $phone
        // ]);
        

        // return view('practice',['user'=>$user]);
        return response()->json([
            'status'=>'hello'
        ]);
    }

    // public function login(Request $req){

    //     $user=DB::select('SELECT * from passenger WHERE phone=? ',[
    //         $req->phone,
    //     ]);

    //     if($user && Auth::attempt(['phone'=>$req->phone,'password'=>$req->password])){
    //         return response()->json([
    //             'status'=>200,
    //             'user'=>Auth::user()
    //         ]);
    //     }else{
    //         return response()->json([
    //             'status'=>404
    //         ]);
    //     }
    
        

        
    // }
    // public function login(Request $req) {
    //     try {
    //         // Check if the user exists by phone
    //         $user = DB::select('SELECT * from passenger WHERE phone = ?', [$req->phone]);
    
    //         // If user exists, validate password using Auth
    //         if ($user){

    //             if(Auth::attempt(['phone' => $req->phone, 'password' => $req->password])){
    //                 return response()->json([
    //                     'status' => 200,
    //                     'message' => 'Login successful',
    //                     'user' => Auth::user()
    //                 ]);
    //             }else{
    //                 return response()->json([
    //                     'status' => 200,
    //                     'message' => 'password wrong',
    //                 ]);
    //             }
                
    //         } else {
    //             // If credentials don't match or user doesn't exist, return an error
    //             return response()->json([
    //                 'status' => 404,
    //                 'message' => 'Invalid phone'
    //             ], 404);
    //         }
    //     } catch (\Exception $e) {
    //         // Catch the exception and log it
    //         return response()->json([
    //             'status' => 500,
    //             'error' => $e->getMessage()
    //         ], 500);
    //     }
    // }
    public function check(Request $req){
        $user = DB::select('SELECT * from passenger WHERE phone = ?', [$req->phone]);
        try {
            if ($user) {
                logger("Plain password: " . $req->password);
                logger("Hashed password from DB: " . $user[0]->password);
    
                $check = Hash::check($req->password, $user[0]->password);
    
                logger("Password check result: " . ($check ? 'true' : 'false'));
    
                if ($check) {
                    return response()->json([
                        'status' => 200,
                        'message' => 'Password matched'
                    ]);
                } else {
                    return response()->json([
                        'status' => 400,
                        'message' => 'Password is incorrect',
                        'plain_password' => $req->password,
                        'hashed_password' => $user[0]->password
                    ]);
                }
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'User not found'
                ]);
            }
        } catch (\Exception $e) {
            return response()->json([
                'status' => 500,
                'error' => $e->getMessage()
            ], 500);
        }
    }
    public function log(Request $req){
        $user=DB::select('SELECT * from passenger WHERE phone=?',[
            $req->phone
        ]);
        if($user){
            $check=Hash::check($req->password,$user[0]->password);
            if($check){
                return response()->json([
                    'status'=>200,
                    'user'=>$user[0],
                    'hey'=>'here'
                ]);
            }else{
                return response()->json([
                    'status'=>404,
                    'message'=>'wrong password'
                ]);
            }
        }else{
            return response()->json([
                'status'=>404,
                'message'=>'user not found'
            ]);
        }
    }
    public function get_stations(){

        $stations=DB::select('SELECT * from stations');

        // return view('practice',['stations'=>$stations]);
        if($stations){
            return response()->json([
                'status'=>200,
                'stations'=>$stations
            ]);
        }else{
            return response()->json([
                'status'=>'Something went wrong'
            ]);
        }
        
    }
    public function helllo(Request $req){
        return response()->json([
            'message'=>'hey'
        ]);
    }
    
    
}


// {
//     "first_name": "sohanur",
//     "sur_name": "rahman abir",
//     "address": "ishwardi",
//     "phone": "01794",
//     "date_of_birth": "07-05-1999",
//     "email": "sohanur.rahman.abir@g.bracu.ac.bd",
//     "nid": "12345",
//     "password": "1234"
// }
