<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class categorymodel extends Model
{
  /**
   * The database table used by the model.
   *
   * @var string
   */
  protected $table = 'category';

  /**
   * The database primary Key used by the model.
   *
   * @var string
   */
  protected $primaryKey = 'categoryid';

  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = ['category_name', 'category_picture', 'category_status'];


    /**
     * Get the feedback record associated with the item.
     *
     * @var function
     */
      public function category()
      {
          return $this->hasOne('App\itemmodel', 'categoryid');
      }

}
