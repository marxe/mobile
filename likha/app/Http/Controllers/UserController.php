<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\usermodel;
use Illuminate\Support\Facades\Validator;
use Response;
use Hash;

class UserController extends Controller
{
    /**
     * Display aLL listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = usermodel::all();
        return $data;
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username'              => 'required|unique:users|max:45|min:5|alphaNum',
            'first_name'            => 'required|max:45',
            'middle_name'           => 'required|max:25',
            'last_name'             => 'required|max:25',
            'email'                 => 'required|max:40|email|unique:users',
            'password'              => 'required|max:60|min:8|alphaNum|confirmed',
            'password_confirmation' => 'required|max:60|min:8|alphaNum|same:password',
            'birthday'              => 'required|date',
            'contact_number'        => 'required',
            'user_type'             => 'required',
        ]);

        if ($validator->fails()) {
          return Response::make([
              'message'   => 'Validation Failed',
              'errors'        => $validator->errors()
            ]);
        }
        else {
          $data = $request->all();
          $data['password'] = Hash::make($data['password']);
          usermodel::create($data);
          return Response::make([
              'message'   => 'Success Registered',
              'data'      => $data
            ]);
        }
    }

    /**
     * Display the specified resource by id
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $data = usermodel::find($id);

        return Response::make([
            'message'   => 'Retrived',
            'data'      => $data
          ]);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
      $validator = Validator::make($request->all(), [
          'username'              => 'required|max:45|min:5|alphaNum',
          'first_name'            => 'required|max:45',
          'middle_name'           => 'required|max:25',
          'last_name'             => 'required|max:25',
          'email'                 => 'required|max:40',
          'birthday'              => 'required|date',
          'contact_number'        => 'required',
          'user_type'             => 'required',
      ]);

      if ($validator->fails()) {
        return Response::make([
            'message'   => 'Validation Failed',
            'errors'        => $validator->errors()
          ]);
      }
      else {
        $data = $request->all();
        $data['password'] = Hash::make($data['password']);
        usermodel::find($id)->update($data);

        return Response::make([
            'message'   => 'Edited',
            'data'      => $data
          ]);
      }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = usermodel::find($id);
        usermodel::destroy($id);

        return Response::make([
            'message'   => 'Deleted',
            'data'      => $data
          ]);
    }
}
