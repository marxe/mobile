<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class itemmodel extends Model
{
  /**
   * The database table used by the model.
   *
   * @var string
   */
  protected $table = 'item';

  /**
   * The database primary Key used by the model.
   *
   * @var string
   */
  protected $primaryKey = 'itemid';

  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = ['userid', 'qty', 'item_name', 'item_picture', 'comment', 'date_to_finish', 'category', 'progress', 'minimum_price', 'maximum_price', 'receipt' , 'tracking_number'];

  /**
   * Get the user that owns the item.
   *
   * @var function
   */
   public function users()
   {
       return $this->belongsTo('App\usermodel','userid');
   }

   /**
    * Get the bid for the for item.
    *
    * @var function
    */

   public function bid()
   {
     return $this->hasMany('App\bidmodel','itemid');
   }

   /**
    * Get the message for the for item.
    *
    * @var function
    */
    public function message()
    {
      return $this->hasMany('App\messagemodel','itemid');
    }

    /**
     * Get the feedback record associated with the item.
     *
     * @var function
     */
      public function feedback()
      {
          return $this->hasOne('App\feedbackmodel', 'itemid');
      }

}
