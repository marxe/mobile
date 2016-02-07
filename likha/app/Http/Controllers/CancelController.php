<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Response;
use App\itemmodel;
use Illuminate\Support\Facades\Validator;
use App\cancelmodel;

use App\Http\Controllers\Controller;

class CancelController extends Controller
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
      $validator = Validator::make($request->all(), [
        'itemid'              => 'required',
        'userid'              => 'required',
      ]);

      if ($validator->fails()) {
        return Response::make([
            'message'   => 'Validation Failed',
            'errors'        => $validator->errors()
          ]);
      }
      else {
        $data = cancelmodel::create($request->all());
        $item = itemmodel::find($request->get('itemid'));
        $item->item_status = 'ic';
        $item->save();
        return Response::make([
            'message'   => 'Updated',
            'data'      => $data,
            'item'      => $item
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
      $item = itemmodel::find($id);
      $item->item_status = 'c';
      $item->save();
      $data = cancelmodel::where('itemid','=',$id)->first();
      cancelmodel::destroy($data->cancelid);
      return Response::make([
          'message'   => 'Updated',
          'data'      => $item
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
      $item = itemmodel::find($id);
      $item->item_status = 's';
      $item->save();
      $data = cancelmodel::where('itemid','=',$id)->first();
      cancelmodel::destroy($data->cancelid);
      return Response::make([
          'message'   => 'Updated'
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
