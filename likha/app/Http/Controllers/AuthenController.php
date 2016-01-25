<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use Response;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class AuthenController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = Auth::user();

        return $user;
    }

    /**
     * Login.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
      if (Auth::attempt(array('username' => $request->username, 'password' => $request->password), true))
        {
            return Response::make([
                'reply'    => 'login',
                'logined'  => 'yes'
              ]);
        }
      else {
        return Response::make([
            'reply'    => 'Username/Password is Wrong/Required',
            'logined'  => 'no'
          ]);
      }
    }

    /**
     * Logout
     *
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        Auth::logout();

        return 'logout';
    }
}
