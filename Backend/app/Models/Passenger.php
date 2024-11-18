<?php

namespace App\Models;

use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;


class Passenger extends Authenticatable implements JWTSubject
{
    use HasFactory;

     protected  $table='passenger';
     protected $primaryKey='passenger_id';
     protected $fillable=[

        'passenger_id',
        'first_name',
        'sur_name',
        'address',
        'phone',
        'date_of_birth',
        'email',
        'nid',
        'password'

     ];


    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }
}
