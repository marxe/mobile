<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Response;
use App\itemmodel;

class TransactionController  extends Controller
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
    public function store(Request $request,$id)
    {
      $validator = Validator::make($request->all(), [
          'receipt'              => 'required'
      ]);

      if ($validator->fails()) {
        return Response::make([
            'message'   => 'Validation Failed',
            'errors'        => $validator->errors()
          ]);
      }
      else {
        $data = itemmodel::find($id);
        $data->receipt = $request->receipt;
        $data->save();
        return Response::make([
            'message'   => 'Updated',
            'data'      => $data
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
        $data=itemmodel::find($id);
        $data->receipt_flag = 'y';
        $data->save();
        return Response::make([
            'message'   => 'Updated',
            'data'      => $data
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
      $data=itemmodel::find($id);
      $data->tracking_flag = 'y';
      $data->save();
      return Response::make([
          'message'   => 'Updated',
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
      // return $request;
        $validator = Validator::make($request->all(), [
            'tracking_number'              => 'required'
        ]);

        if ($validator->fails()) {
          return Response::make([
              'message'   => 'Validation Failed',
              'errors'        => $validator->errors()
            ]);
        }
        else {
          $data = itemmodel::find($id);
          $data->tracking_number = $request->tracking_number;
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
        //
    }
}
