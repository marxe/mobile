<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\bidmodel;
use App\itemmodel;
use Illuminate\Support\Facades\Validator;
use Response;

class BidController extends Controller
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
          'amount'             => 'required|numeric',
        ]);

        if ($validator->fails()) {
          return Response::make([
              'message'   => 'Validation Failed',
              'errors'        => $validator->errors()
            ]);
        }
        else {
          $data = $request->all();
          $saved = bidmodel::create($data);
          $item = itemmodel::find($saved->itemid);
          $item->item_status = 'a';
          $item->save();
          return Response::make([
              'message'   => 'Successfully Added',
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
      $data = bidmodel::where('itemid', '=',$id)->with('user')->with('item')->get();
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
      $data = bidmodel::where('userid', '=',$id)->with('user')->with('item')->get();
      return Response::make([
          'data'        => $data
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
          'status'              => 'required',
        ]);

        if ($validator->fails()) {
          return Response::make([
              'message'   => 'Validation Failed',
              'errors'        => $validator->errors()
            ]);
        }
        else {
          $saved = bidmodel::where('itemid','=', $id)->where('userid', '=', $request->userid)->first();
          $saved->status = $request->status;
          $saved->save();

          bidmodel::where('itemid','=', $id)->where('status', '=', 1)->delete();
          return Response::make([
              'message'   => 'Updated',
              'data'      => $saved
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
      bidmodel::destroy($id);
      return Response::make([
          'message'   => 'Deleted'
        ]);
    }
}
