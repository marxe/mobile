
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    Hi {{$data->first_name}},
      <p>
        We personally welcome you in joining the Likha Community.
      </p>
      <p>
        For activation in your account, please click this link: <a href="http://localhost:81/mobile/likha/public/admin/{{$data->rand}}/edit">Link</a>        
      </p>
  </body>
</html>
