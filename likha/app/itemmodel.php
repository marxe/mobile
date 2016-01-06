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
  protected $fillable = ['userid', 'itemname', 'itempic' 'comment', 'datefinish', 'category', 'status', 'receipt' , 'trackingnumber'];

  /**
   * Get the user that owns the item.
   *
   * @var function
   */
   public function user()
   {
       return $this->belongsTo('App\usermodel');
   }

   /**
    * Get the bid for the for item.
    *
    * @var function
    */

   public function bid()
   {
     return $this->hasMany('App\bidmodel');
   }

   /**
    * Get the message for the for item.
    *
    * @var function
    */
    public function message()
    {
      return $this->hasMany('App\messagemodel');
    }

    /**
     * Get the feedback record associated with the item.
     *
     * @var function
     */
      public function feedback()
      {
          return $this->hasOne('App\feedbackmodel');
      }

}
