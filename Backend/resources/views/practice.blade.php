<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    {{-- @php
        print_r($user);
        count($user);
    @endphp
     <h1>User Information</h1>
    @php
     
     count($user);
    @endphp

     @if(count($user) > 0)
         <ul>
             @foreach($user as $u)
                 <li>First Name: {{ $u->first_name }}</li>
                 <li>Phone: {{ $u->phone }}</li>
                 <!-- Add other fields here as needed -->
             @endforeach
         </ul>
         @php 
            echo(sizeof($user))
         @endphp
     @else
         <p>No user found</p>
     @endif --}}

     @php
       print_r($remaining_seat)
    //    echo($stations)  
     @endphp
</body>
</html>