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

    public function add_station()
    {
        function randomTime()
        {
            $hour = str_pad(rand(0, 23), 2, '0', STR_PAD_LEFT);
            $minute = str_pad(rand(0, 59), 2, '0', STR_PAD_LEFT);
            return "$hour:$minute";
        }

        // Dhaka District
        DB::insert('INSERT INTO stations (station_name, location, reach_time) VALUES (?, ?, ?)', ['Kamalapur', 'Dhaka', randomTime()]);
        DB::insert('INSERT INTO stations (station_name, location, reach_time) VALUES (?, ?, ?)', ['Banani', 'Dhaka', randomTime()]);
        DB::insert('INSERT INTO stations (station_name, location, reach_time) VALUES (?, ?, ?)', ['Cantonment', 'Dhaka', randomTime()]);
        DB::insert('INSERT INTO stations (station_name, location, reach_time) VALUES (?, ?, ?)', ['Gendaria', 'Dhaka', randomTime()]);
        DB::insert('INSERT INTO stations (station_name, location, reach_time) VALUES (?, ?, ?)', ['Airport', 'Dhaka', randomTime()]);
        DB::insert('INSERT INTO stations (station_name, location, reach_time) VALUES (?, ?, ?)', ['Shyampur Baraitala', 'Dhaka', randomTime()]);
        DB::insert('INSERT INTO stations (station_name, location, reach_time) VALUES (?, ?, ?)', ['Tejgaon', 'Dhaka', randomTime()]);
        DB::insert('INSERT INTO stations (station_name, location, reach_time) VALUES (?, ?, ?)', ['Keraniganj', 'Dhaka', randomTime()]);

        // Faridpur District
        DB::insert('INSERT INTO stations (station_name, location, reach_time) VALUES (?, ?, ?)', ['Ambikapur', 'Faridpur', randomTime()]);
        DB::insert('INSERT INTO stations (station_name, location, reach_time) VALUES (?, ?, ?)', ['Amirabad', 'Faridpur', randomTime()]);
        DB::insert('INSERT INTO stations (station_name, location, reach_time) VALUES (?, ?, ?)', ['Bakhunda', 'Faridpur', randomTime()]);
        DB::insert('INSERT INTO stations (station_name, location, reach_time) VALUES (?, ?, ?)', ['Boalmari', 'Faridpur', randomTime()]);
        DB::insert('INSERT INTO stations (station_name, location, reach_time) VALUES (?, ?, ?)', ['Faridpur College', 'Faridpur', randomTime()]);
        DB::insert('INSERT INTO stations (station_name, location, reach_time) VALUES (?, ?, ?)', ['Faridpur', 'Faridpur', randomTime()]);
        DB::insert('INSERT INTO stations (station_name, location, reach_time) VALUES (?, ?, ?)', ['Ghorakhali', 'Faridpur', randomTime()]);
        DB::insert('INSERT INTO stations (station_name, location, reach_time) VALUES (?, ?, ?)', ['Kamarkhali Ghat', 'Faridpur', randomTime()]);
        DB::insert('INSERT INTO stations (station_name, location, reach_time) VALUES (?, ?, ?)', ['Madhukhali Junction', 'Faridpur', randomTime()]);
        DB::insert('INSERT INTO stations (station_name, location, reach_time) VALUES (?, ?, ?)', ['Pukhuria', 'Faridpur', randomTime()]);
        DB::insert('INSERT INTO stations (station_name, location, reach_time) VALUES (?, ?, ?)', ['Shahasrail', 'Faridpur', randomTime()]);
        DB::insert('INSERT INTO stations (station_name, location, reach_time) VALUES (?, ?, ?)', ['Shatoir', 'Faridpur', randomTime()]);
        DB::insert('INSERT INTO stations (station_name, location, reach_time) VALUES (?, ?, ?)', ['Talma', 'Faridpur', randomTime()]);
        DB::insert('INSERT INTO stations (station_name, location, reach_time) VALUES (?, ?, ?)', ['Bhanga', 'Faridpur', randomTime()]);
        DB::insert('INSERT INTO stations (station_name, location, reach_time) VALUES (?, ?, ?)', ['Bhanga Junction', 'Faridpur', randomTime()]);
        DB::insert('INSERT INTO stations (station_name, location, reach_time) VALUES (?, ?, ?)', ['Nagarkanda', 'Faridpur', randomTime()]);

        // Gopalganj District
        DB::insert('INSERT INTO stations (station_name, location, reach_time) VALUES (?, ?, ?)', ['Bayspur', 'Gopalganj', randomTime()]);
        DB::insert('INSERT INTO stations (station_name, location, reach_time) VALUES (?, ?, ?)', ['Kashiani Junction', 'Gopalganj', randomTime()]);
        DB::insert('INSERT INTO stations (station_name, location, reach_time) VALUES (?, ?, ?)', ['Maksudpur', 'Gopalganj', randomTime()]);
        DB::insert('INSERT INTO stations (station_name, location, reach_time) VALUES (?, ?, ?)', ['Gopalganj', 'Gopalganj', randomTime()]);
        DB::insert('INSERT INTO stations (station_name, location, reach_time) VALUES (?, ?, ?)', ['Gobra', 'Gopalganj', randomTime()]);
        DB::insert('INSERT INTO stations (station_name, location, reach_time) VALUES (?, ?, ?)', ['Chandradhigdhalia', 'Gopalganj', randomTime()]);
        DB::insert('INSERT INTO stations (station_name, location, reach_time) VALUES (?, ?, ?)', ['Chapta', 'Gopalganj', randomTime()]);
        DB::insert('INSERT INTO stations (station_name, location, reach_time) VALUES (?, ?, ?)', ['Bhatiapara Ghat', 'Gopalganj', randomTime()]);
        DB::insert('INSERT INTO stations (station_name, location, reach_time) VALUES (?, ?, ?)', ['Choto Bahirbag', 'Gopalganj', randomTime()]);
        DB::insert('INSERT INTO stations (station_name, location, reach_time) VALUES (?, ?, ?)', ['Borasi', 'Gopalganj', randomTime()]);
        DB::insert('INSERT INTO stations (station_name, location, reach_time) VALUES (?, ?, ?)', ['Mahespur', 'Gopalganj', randomTime()]);

        // Add other districts similarly...

        return response()->json([
            'message' => 'Stations added successfully'
        ], 201);
    }
    public function token(Request $req)
    {
        // // Find the user by phone number
        // $user = Passenger::where('phone', $req->phone)->first();

        // Check if user exists and password matches
        // if (!$user || !Hash::check($req->password, $user->password)) {

        //     return response()->json(['error' => 'Invalid credentials'], 401);
        // } else {

        //     $token = JWTAuth::fromUser($user);

        //     // Return the token
        //     return response()->json([
        //         'token' => $token,
        //         'user'=>$user,
        //         'expires_in' => JWTAuth::factory()->getTTL() * 60
            
            
            
        //     ]);
        // }

        $credentials = request(['phone', 'password']);

        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        return response()->json([
            'token'=>$token,
            'user'=>$credentials
        ]);


    }
    public function refresh()
    {
        return $this->respondWithToken(JWTAuth::auth()->refresh());

        return response()->json([
            'message'=>'refreshed',
            'user'=>auth()->user()
        ]);
    }
    public function testing(){
        try {
            $user = JWTAuth::parseToken()->authenticate();
            if (!$user) {
                return response()->json(['error' => 'User not found'], 404);
            }
            return response()->json([
                'message' => 'Successful',
                'user' => $user
            ]);
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json(['error' => 'Token is invalid'], 401);
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json(['error' => 'Token has expired'], 401);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong'], 500);
        }
    }

    

    // protected function respondWithToken($token)
    // {
    //     return response()->json([
    //         'access_token' => $token,
    //         'token_type' => 'bearer',
    //         'expires_in' => auth('api')->factory()->getTTL() * 60
    //     ]);
    // }

    
}