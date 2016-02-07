<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class reportmodel extends Model
{
  /**
   * The database table used by the model.
   *
   * @var string
   */
  protected $table = 'report';

  /**
   * The database primary Key used by the model.
   *
   * @var string
   */
  protected $primaryKey = 'reportid';

  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = ['userid', 'report', 'subject', 'sender'];


    /**
     * Get the feedback record associated with the item.
     *
     * @var function
     */
      public function user()
      {
          return $this->belongsTo('App\usermodel', 'userid');
      }

}
