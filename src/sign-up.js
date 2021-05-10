<form action="/sign-up" method="post">
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
    <small id="emailHelp" class="form-text text-muted">We will never share your email with anyone else.</small>
  </div>
    <div class="form-group">
    <label for="exampleInputUsername">Username</label>
    <input type="username" name="username" class="form-control" id="exampleInputUsername" aria-describedby="usernameHelp" placeholder="Enter Username">
    <small id="usernameHelp" class="form-text text-muted">We will never share your username with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
  </div>
  {{!-- <div class="form-group form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1">
    <label class="form-check-label" for="exampleCheck1">Check out</label>
  </div> --}}
  <button type="submit" class="btn btn-primary">Submit</button>
</form>