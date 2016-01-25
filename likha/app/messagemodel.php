<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class messagemodel extends Model
{
  /**
   * The database table used by the model.
   *
   * @var string
   */
  protected $table = 'message';

  /**
   * The database primary Key used by the model.
   *
   * @var string
   */
  protected $primaryKey = 'messageid';

  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = ['itemid', 'userid', 'message'];

  /**
   * Get the user that owns the bid.
   *
   * @var function
   */
   public function user()
   {
       return $this->belongsTo('App\usermodel','userid');
   }

   /**
    * Get the item that owns the bid.
    *
    * @var function
    */
    public function item()
    {
        return $this->belongsTo('App\itemmodel','itemid');
    }
}
