<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Foundation\Auth\Access\Authorizable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;

class usermodel extends Model implements AuthenticatableContract,
                                    AuthorizableContract,
                                    CanResetPasswordContract
{
    use Authenticatable, Authorizable, CanResetPassword;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'users';

    /**
     * The database primary Key used by the model.
     *
     * @var string
     */
    protected $primaryKey = 'userid';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['username', 'first_name', 'middle_name', 'last_name', 'email', 'password', 'birthday', 'contact_number', 'profilepicture', 'user_type'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['password', 'remember_token'];

    /**
     *  Get the item for the for user.
     *
     * @var function
     */
     public function item()
     {
       return $this->hasMany('App\itemmodel','userid');
     }

     /**
      * Get the bid for the for user.
      *
      * @var function
      */
      public function bid()
      {
        return $this->hasMany('App\bidmodel','userid');
      }

      /**
       * Get the message for the for user.
       *
       * @var function
       */
       public function message()
       {
         return $this->hasMany('App\messagemodel','userid');
       }

       /**
        * Get the feedback for the for user.
        *
        * @var function
        */
        public function feedback()
        {
          return $this->hasMany('App\feedbackmodel','userid');
        }
}
