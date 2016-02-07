<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Response;
use App\itemmodel;
use App\bidmodel;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = itemmodel::with('users')->get();
        return Response::make([
            'data'        => $data
          ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
      // return $request;
        $validator = Validator::make($request->all(), [
            'item_name'               => 'required',
            'item_picture'            => 'required|image',
            'date_to_finish'          => 'required|date',
            'categoryid'              => 'required',
            'userid'                  => 'required',
            'minimum_price'           => 'required',
            'maximum_price'           => 'required',
            'qty'                     => 'required'
        ]);

        if ($validator->fails()) {
          return Response::make([
              'message'   => 'Validation Failed',
              'errors'        => $validator->errors()
            ]);
        }
        else {
          // checking file is valid.
         if ($request->file('item_picture')->isValid())
         {
           $destinationPath = 'uploads'; // upload path
           $extension =  $request->file('item_picture')->getClientOriginalExtension(); // getting image extension
           $fileName = rand(11111,99999).'.'.$extension; // renameing image
           $request->file('item_picture')->move($destinationPath, $fileName); // uploading file to given path
           // sending back with message
           $data = $request->all();
           $saved = itemmodel::create($data);
           $saved->item_picture = $fileName;
           $saved->save();
           return Response::make([
               'message'   => 'Successfully Added',
               'data'      => $saved
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
      $data = itemmodel::where('itemid','=',$id)->with('users')->orderBy('itemid','desc')->first();
      $bid = bidmodel::where('itemid','=',$id)->with('users')->orderBy('bidid','desc')->first();
        return Response::make([
          'data'        => $data,
            'bid'        => $bid
          ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $data = itemmodel::where('categoryid', '=', $id)->where('progress', '=', null)->with('users')->with('bid')->orderBy('itemid','desc')->get();

        return Response::make([
            'data'        =>  $data
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
      // return $request;
        $validator = Validator::make($request->all(), [
            'progress'              => 'required'
        ]);

        if ($validator->fails()) {
          return Response::make([
              'message'   => 'Validation Failed',
              'errors'        => $validator->errors()
            ]);
        }
        else {
          $data = itemmodel::find($id);
          $data->progress = $request->progress;
          $data->item_status = 's';
          if ($data->progress == 100) {
            $data->item_status = 'com';
          }
          $data->save();
          return Response::make([
              'message'   => 'Updated',
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
      itemmodel::destroy($id);
      return Response::make([
          'message'   => 'Deleted'
        ]);
    }
}
