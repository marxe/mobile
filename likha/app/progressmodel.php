<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class progressmodel extends Model
{
  /**
   * The database table used by the model.
   *
   * @var string
   */
  protected $table = 'upprogress';

  /**
   * The database primary Key used by the model.
   *
   * @var string
   */
  protected $primaryKey = 'upprogressid';

  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = ['itemid', 'progress_picture'];


    /**
     * Get the feedback record associated with the item.
     *
     * @var function
     */
      public function upprogress()
      {
          return $this->belongsTo('App\itemmodel', 'itemid');
      }

}
