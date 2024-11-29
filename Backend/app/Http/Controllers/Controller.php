<?php

namespace App\Http\Controllers;

use App\Models\Passenger;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Contracts\Providers\JWT;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    public function p(Request $req)
    {

        // DB::insert('INSERT INTO passenger (first_name,sur_name,address,phone,date_of_birth,email,nid,password) VALUES(?,?,?,?,?,?,?,?)',[$req->first_name,$req->sur_name,$req->address,$req->phone,$req->date_of_birth,$req->email,$req->nid,bcrypt($req->password)]);
        return response()->json([
            'message' => 'user registered'
        ]);
    }

    public function helllo(Request $req)
    {
        return response()->json([
            'message' => 'hey'
        ]);
    }

    public function add(Request $req)
    {
        $add = $add = DB::insert(
            'INSERT INTO passenger (first_name,sur_name,address, phone, date_of_birth, email, nid, password) VALUES(?,?,?,?,?,?,?,?)',
            [
                $req->first_name,
                $req->sur_name,
                $req->address,
                $req->phone,
                $req->date_of_birth,
                $req->email,
                $req->nid,
                Hash::make($req->password)
            ]

        );
        logger($req->all());
        if ($add) {
            return response()->json([
                'message' => 'succesfully added'
            ]);
        } else {
            return response()->json([
                'message' => 'unsuccessfull'
            ]);
        }
    }
    public function log(Request $req)
    {
        $user = DB::select('SELECT * from passenger WHERE phone=?', [
            $req->phone
        ]);
        if ($user) {
            $check = Hash::check($req->password, $user[0]->password);
            if ($check) {
                return response()->json([
                    'status' => $user,
                    'message' => 'successfully login'
                ]);
            } else {
                return response()->json([
                    'status' => $check,
                    'user' => $user
                ]);
            }
        } else {
            return response()->json([
                'message' => 'no user'
            ]);
        }
    }

    
    public function refresh()
    {
        return $this->respondWithToken(auth('api')->refresh());
    }

    public function login()
    {
        $credentials = request(['phone', 'password']);

        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token,$credentials);
    }



    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'user'=>auth()->user(),
            'expires_in' => auth('api')->factory()->getTTL() * 20
        ],200);
    }
    public function me()
    {
        logger('came here');
        return response()->json(auth()->user());
    }
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    
}