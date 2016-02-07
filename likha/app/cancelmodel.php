<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class cancelmodel extends Model
{
  /**
   * The database table used by the model.
   *
   * @var string
   */
  protected $table = 'cancelling';

  /**
   * The database primary Key used by the model.
   *
   * @var string
   */
  protected $primaryKey = 'cancelid';

  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = ['itemid','userid', 'resons','flag_acceptance', 'refusal_reason'];

  /**
   * Get the user that owns the item.
   *
   * @var function
   */
   public function item()
   {
       return $this->belongsTo('App\itemmodel','itemid');
   }

}
