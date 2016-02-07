<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class partsmodel extends Model
{
  /**
   * The database table used by the model.
   *
   * @var string
   */
  protected $table = 'picture';

  /**
   * The database primary Key used by the model.
   *
   * @var string
   */
  protected $primaryKey = 'pictureid';

  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = ['itemid','back', 'front','right', 'left'];

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
