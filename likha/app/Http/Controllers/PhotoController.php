<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Response;
use Input;
use Validator;
use App\usermodel;
use App\Http\Controllers\Controller;

class PhotoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $id)
    {
      // return $request->all();
      // setting up rules
      $validator = Validator::make($request->all(), [
          'profilepicture'        => 'image|required',
      ]);
      // doing the validation, passing post data, rules and the messages
      if ($validator->fails())
      {
        // send back to the page with the input data and errors
        return Response::make([
            'message'   => 'Validation Failed',
            'errors'        => $validator->errors()
          ]);
      }
      else
      {
        // checking file is valid.
       if ($request->file('profilepicture')->isValid())
       {
         $destinationPath = 'uploads'; // upload path
         $extension =  $request->file('profilepicture')->getClientOriginalExtension(); // getting image extension
         $fileName = rand(11111,99999).'.'.$extension; // renameing image
         Input::file('profilepicture')->move($destinationPath, $fileName); // uploading file to given path
         // sending back with message
         $data = usermodel::find($id);
         $data->profilepicture = $fileName;
         $data->save();
         return Response::make([
             'message'   => 'Upload successfully',
             'uploaded'  => 'ok'
           ]);
      }
      else
      {
        // sending back with error message.
        return Response::make([
            'message'   => 'Upload Invalid',
            'uploaded'  => 'no'
          ]);
      }
      }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
      // return $request->file('profilepicture');
      // setting up rules
      $validator = Validator::make($request->all(), [
          'profilepicture'        => 'image',
      ]);
      // doing the validation, passing post data, rules and the messages
      if ($validator->fails())
      {
        // send back to the page with the input data and errors
        return Response::make([
            'message'   => 'Validation Failed',
            'errors'        => $validator->errors()
          ]);
      }
      else
      {
        // checking file is valid.
       if ($request->file('profilepicture')->isValid())
       {
         $destinationPath = 'uploads'; // upload path
         $extension =  $request->file('profilepicture')->getClientOriginalExtension(); // getting image extension
         $fileName = rand(11111,99999).'.'.$extension; // renameing image
         Input::file('profilepicture')->move($destinationPath, $fileName); // uploading file to given path
         // sending back with message
         $data = usermodel::find($id);
         $data->profilepicture = $fileName;
         $data->save();
         return Response::make([
             'message'   => 'Upload successfully',
             'uploaded'  => 'ok'
           ]);
      }
      else
      {
        // sending back with error message.
        return Response::make([
            'message'   => 'Upload Invalid',
            'uploaded'  => 'no'
          ]);
      }
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
        //
    }
}
