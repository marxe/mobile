<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class feedbackmodel extends Model
{
  /**
   * The database table used by the model.
   *
   * @var string
   */
  protected $table = 'feedback';

  /**
   * The database primary Key used by the model.
   *
   * @var string
   */
  protected $primaryKey = 'feedbackid';

  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = ['itemid', 'userid', 'rate', 'feedback'];

  /**
   * Get the user that owns the bid.
   *
   * @var function
   */
   public function user()
   {
       return $this->belongsTo('App\usermodel');
   }

   /**
    * Get the item that owns the bid.
    *
    * @var function
    */
    public function item()
    {
        return $this->belongsTo('App\itemmodel');
    }
}
