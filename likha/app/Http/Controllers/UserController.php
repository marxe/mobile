<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\usermodel;
use App\bidmodel;
use App\itemmodel;
use Illuminate\Support\Facades\Validator;
use Response;
use Hash;
use Mail;
use Crypt;

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
        // $data->item;
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
      // return $request;
        $validator = Validator::make($request->all(), [
            'username'              => 'required|unique:users|max:45|min:5|alphaNum',
            'first_name'            => 'required|max:45',
            'middle_name'           => 'required|max:25',
            'last_name'             => 'required|max:25',
            'email'                 => 'required|max:40|email|unique:users',
            'password'              => 'required|max:60|min:8|alphaNum|confirmed',
            'password_confirmation' => 'required|max:60|min:8|alphaNum|same:password',
            'birthday'              => 'required|date',
            'contact_number'        => 'required|numeric',
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
          $saved = usermodel::create($data);
          $saved->status = 'd';
          $saved->save();
          if($saved)
          {
            $saved->rand = Crypt::encrypt($saved->userid);
            Mail::send('message', ['data'=>$saved], function($mail) use ($data){
              $mail->to($data['email'],$data['username'])->subject('Welcome to Likha');
            });
          }
          return Response::make([
              'message'   => 'Success Registered',
              'data'      => $saved->userid
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
        $data = usermodel::where('userid','=', $id)->first();
        $bid = bidmodel::where('userid','=', $id)->where('status', '=', 1)->with('item')->get();
        $item = itemmodel::where('userid','=', $id)->where('progress', '=', null)->with('bid')->with('users')->get();
        return Response::make([
            'message'   => 'Retrived',
            'data'      => $data,
            'bid'      => $bid,
            'item'      => $item,
          ]);
    }
    /**
     * Display the specified resource by id
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $data = usermodel::where('userid','=', $id)->first();
        $item = itemmodel::where('userid','=', $id)->where('progress', '>=', 0)->with('bid')->with('users')->with('parts')->with('upprogress')->with('cancel')->orderBy('updated_at','desc')->get();
        $bid = bidmodel::where('userid','=', $id)->where('status', '=', 0)->with('item')->with('item.upprogress')->with('item.parts')->with('item.cancel')->orderBy('updated_at','desc')->get();
        return Response::make([
            'message'   => 'Retrived',
            'data'      => $data,
            'bid'      => $bid,
            'item'      => $item,
          ]);
    }
    public function portfolioData($id)
    {
        $data = usermodel::where('userid','=', $id)->first();
        $bid = bidmodel::where('userid','=', $id)->where('status', '=', 0)->with('item')->with('item.feedback')->with('item.upprogress')->with('item.parts')->orderBy('updated_at','desc')->get();
        return Response::make([
            'message'   => 'Retrived',
            'data'      => $data,
            'bid'      => $bid,
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
