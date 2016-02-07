<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Response;
use Input;
use Validator;
use App\usermodel;
use App\itemmodel;
use App\progressmodel;
use App\partsmodel;
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
      // return'here';
      // return $request->all();
      // setting up rules
      $validator = Validator::make($request->all(), [
          'progress_picture'        => 'required|image',
      ]);
      // doing the validation, passing post data, rules and the messages
      if ($validator->fails())
      {
        // send back to the page with the input data and errors
        return Response::make([
            'message'   => 'Validation Failed',
            'errors'        => $validator->errors(),
            'data' =>$request->all()
          ]);
      }
      else
      {
       if ($request->file('progress_picture')->isValid())
       {
         $destinationPath = 'uploads'; // upload path
         $extension =  $request->file('progress_picture')->getClientOriginalExtension(); // getting image extension
         $fileName = rand(11111,99999).'.'.$extension; // renameing image
         Input::file('progress_picture')->move($destinationPath, $fileName); // uploading file to given path
         // sending back with message
         $file = array('progress_picture' => $fileName,'itemid' =>$id );
         $data = progressmodel::create($file);

         return Response::make([
             'message'   => 'Upload successfully',
             'data'  => $data
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
    public function multiSave(Request $request, $id)
    {
      $validator = Validator::make($request->all(), [
        'front'        => 'image',
        'back'        => 'image',
        'right'        => 'image',
        'left'        => 'image',
      ]);
      // doing the validation, passing post data, rules and the messages
      if ($validator->fails())
      {
        // send back to the page with the input data and errors
        return Response::make([
            'message'   => 'Validation Failed',
            'errors'        => $validator->errors(),
            'data'  =>$request->all()
          ]);
      }
      else
      {
        if($request->file('front')==NUll && $request->file('back')==NUll && $request->file('right')==NUll && $request->file('left')==NUll)
        {
          $file = array('front' => null, 'back' => null, 'left' => null, 'right' => null,'itemid' =>$id );
          $data = partsmodel::create($file);

          return Response::make([
              'message'   => 'Upload successfully',
              'data'  => $data
            ]);
        }
       if ($request->file('front')->isValid() || $request->file('back')->isValid() || $request->file('right')->isValid() || $request->file('left')->isValid())
       {
         $destinationPath = 'uploads'; // upload path
         if($request->file('front')){
           $front =  $request->file('front')->getClientOriginalExtension(); // getting image extension
           $frontName = rand(11111,99999).'.'.$front; // renameing image
           Input::file('front')->move($destinationPath, $frontName); // uploading file to given path
         }
         else {
           $frontName = null;
         }
         if($request->file('back')){
           $back =  $request->file('back')->getClientOriginalExtension(); // getting image extension
           $backName = rand(11111,99999).'.'.$back; // renameing image
           Input::file('back')->move($destinationPath, $backName); // uploading file to given path
         }
         else {
           $backName = null;
         }
         if($request->file('left')){
           $left =  $request->file('left')->getClientOriginalExtension(); // getting image extension
           $leftName = rand(11111,99999).'.'.$left; // renameing image
           Input::file('left')->move($destinationPath, $leftName); // uploading file to given path
         }
         else {
           $leftName = null;
         }
         if($request->file('right')){
           $right =  $request->file('right')->getClientOriginalExtension(); // getting image extension
           $rightName = rand(11111,99999).'.'.$right; // renameing image
           Input::file('right')->move($destinationPath, $rightName); // uploading file to given path
         }
         else {
           $rightName = null;
         }
         // sending back with message
         $file = array('front' => $frontName, 'back' => $backName, 'left' => $leftName, 'right' => $rightName,'itemid' =>$id );
         $data = partsmodel::create($file);

         return Response::make([
             'message'   => 'Upload successfully',
             'data'  => $data
           ]);
      }
      else
      {
        $file = array('front' => null, 'back' => null, 'left' => null, 'right' => null,'itemid' =>$id );
        $data = partsmodel::create($file);

        return Response::make([
            'message'   => 'Upload successfully',
            'data'  => $data
          ]);
      }
      }
    }
}
