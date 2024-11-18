<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Fetching_Controller extends Controller
{

    public function get_train_compartment_class_details(Request $req)
    {
        $train_details = DB::select('SELECT
            compartment.compartment_id,
            compartment.compartment_name,
            compartment.train_id,
            ti.train_name,
            cc.class_name,
            cc.price,
            compartment.remaining_seat,
            compartment.total_seat

            FROM 
                compartment
            JOIN 
                train_info AS ti ON ti.train_id = compartment.train_id
            JOIN 
                compartment_class cc ON cc.class_id = compartment.class_id
            WHERE 
                compartment.train_id IN (
                    SELECT 
                        ti.train_id
                    FROM 
                        train_info ti
                    JOIN 
                        train_station ts ON ti.train_id = ts.train_id
                    WHERE 
                        ts.station_id = (SELECT station_id FROM stations WHERE station_name = ?)
                        AND ts.station_number > ANY (
                            SELECT 
                                station_number 
                            FROM 
                                train_station
                            WHERE 
                                station_id = (SELECT station_id FROM stations WHERE station_name = ?)
                        )
                )
            ORDER BY 
                compartment.compartment_id AND compartment.train_id ASC', [$req->to, $req->from]);

        if ($train_details) {
            return response()->json([
                'status' => 200,
                'data' => $train_details
            ]);
        } else {
            return response()->json([
                'status' => 404,
            ]);
        }
    }
    public function get_booked_seat($id)
    {

        try {
            //code...
            $get_booked_seat = DB::select('SELECT seat_number from ticket where compartment_id=?', [$id]);
            $arr = array();
            for ($i = 0; $i < sizeof($get_booked_seat); $i++) {
                array_push($arr, $get_booked_seat[$i]->seat_number);
            }

            return response()->json([
                'message' => 200,
                'data' => $arr
            ]);
        } catch (\Throwable $th) {

            return response()->json([
                'message' => 500,
                'error' => $th->getMessage()

            ]);
        }
    }
    public function add_ticket(Request $req)
    {
        $data = $req->all();



        $flag=true;
        for ($i = 0; $i < sizeof($data); $i++) {
            $insertion = DB::insert('INSERT INTO ticket (passenger_id,compartment_id,seat_number,pnr_code) VALUES (?,?,?,?)', [

                $data[$i]['passenger_id'],
                $data[$i]['compartment_id'],
                $data[$i]['seat_number'],
                $data[$i]['pnr'],

            ]);


            if (!$insertion) {
                $flag=false;
                return response()->json([
                    'status' => 404,
                    'message' => `insertation failed at $i`
                ]);
            }

        }
        if($flag==true){
            $remaining_seat = DB::select('SELECT remaining_seat FROM compartment where compartment_id = ?  ', [$data[0]['compartment_id']]);
                for ($i = 0; $i < sizeof($remaining_seat); $i++) {
                    $remaining_seat[$i] = (array)$remaining_seat[$i];
                }
                $Current_seat = intval($remaining_seat[0]['remaining_seat']) - sizeof($data);
                $update = DB::update('UPDATE compartment SET remaining_seat=? WHERE compartment_id=?', [$Current_seat, $data[0]['compartment_id']]);

                if ($update) {

                    return response()->json([
                        'status' => 200,
                        'message' => 'Inserted successfully'
                    ], 200);
                } else {
                    return response()->json([
                        'status' => 404,
                        'message' => 'not inserted and updated'
                    ], 404);
                }
        }
    }










    public function solving()
    {

        $data = [
            (array) ['compartment_id' => 9, 'passenger_id' => 1, 'seat_number' => 3, 'pnr' => 'INMJ1L5ATIUD'],
            (array) ['compartment_id' => 9, 'passenger_id' => 1, 'seat_number' => 4, 'pnr' => 'SE7C1H2MBUPD'],
        ];

        for ($i = 0; $i < sizeof($data); $i++) {   //Coverting std Object class to associative array
            // $temp=(array) $data[$i];
            $data[$i] = (array) $data[$i];
        }
        print_r($data);
    }
}
