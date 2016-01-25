<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\messagemodel;
use Illuminate\Support\Facades\Validator;
use Response;


class MessageController extends Controller
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
    public function store(Request $request)
    {
      // return $request;
        $validator = Validator::make($request->all(), [
          'userid'              => 'required',
          'itemid'              => 'required',
          'message'             => 'required',
        ]);

        if ($validator->fails()) {
          return Response::make([
              'message'   => 'Validation Failed',
              'errors'        => $validator->errors()
            ]);
        }
        else {
          $data = $request->all();
          $saved = messagemodel::create($data);
          return Response::make([
              'message'   => 'Success Registered',
              'data'      => $saved
            ]);
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
      $data = messagemodel::where('itemid', '=',$id)->with('user')->get();
      return Response::make([
          'data'        => $data
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
          'message'             => 'required',
        ]);

        if ($validator->fails()) {
          return Response::make([
              'message'   => 'Validation Failed',
              'errors'        => $validator->errors()
            ]);
        }
        else {
          $data = messagemodel::find($id);
          $data->message = $request->message;
          $data->save();
          return Response::make([
              'message'   => 'Success Registered',
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
      messagemodel::destroy($id);
      return Response::make([
          'message'   => 'Deleted'
        ]);
    }
}
