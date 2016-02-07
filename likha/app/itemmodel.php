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
  protected $fillable = ['userid', 'categoryid', 'item_name', 'item_picture', 'progress', 'comment', 'minimum_price', 'maximum_price', 'date_to_finish', 'receipt', 'tracking_number', 'qty', 'status'];

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
    * Get the category that owns the item.
    *
    * @var function
    */
    public function category()
    {
        return $this->belongsTo('App\categorymodel','categoryid');
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

      /**
       * Get the feedback record associated with the item.
       *
       * @var function
       */
        public function parts()
        {
            return $this->hasOne('App\partsmodel', 'itemid');
        }
      /**
       * Get the feedback record associated with the item.
       *
       * @var function
       */
        public function upprogress()
        {
            return $this->hasMany('App\progressmodel', 'itemid');
        }
        /**
         * Get the feedback record associated with the item.
         *
         * @var function
         */
          public function cancel()
          {
              return $this->hasOne('App\cancelmodel', 'itemid');
          }

}
