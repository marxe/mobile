<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\feedbackmodel;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Response;
use Hash;

class FeedbackController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
      $data = feedbackmodel::with('user')->with('item')->get();
      return Response::make([
          'data'        => $data
        ]);
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
            'rate'              => 'required',
            'feedback'          => 'required',
            'userid'            => 'required',
            'itemid'            => 'required',
        ]);

        if ($validator->fails()) {
          return Response::make([
              'message'   => 'Validation Failed',
              'errors'        => $validator->errors()
            ]);
        }
        else {
          $data = $request->all();
          $saved = feedbackmodel::create($data);
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
      $data = feedbackmodel::where('itemid', '=',$id)->with('user')->with('item')->get();
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
      $data = feedbackmodel::where('userid', '=',$id)->with('user')->with('item')->get();
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
      feedback::destroy($id);
      return Response::make([
          'message'   => 'Deleted'
        ]);
    }
}
