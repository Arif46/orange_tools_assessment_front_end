<template>
   <b-container fluid class="px-0 mc-login-bg">
     <b-row align-v="center" no-gutters>
        <b-col md="6" class="d-none d-md-block">
            <img class="img-fluid d-block mx-auto" width="100" src="@/assets/images/pos.png" alt="">
            <h4 class="text-center mt-3 mb-2">Integrated Digital Service Delivery Platform</h4>
            <p class="text-center mb-3">Ministry of Commerce</p>
        </b-col>
        <b-col sm="12" md="6" class="bg-secondary">
            <div class="login-wrapper mc-login-bg">
              <b-card>
                <h5 class="mb-3 text-light">Login</h5>
                <b-form>
                    <b-form-group
                        id="user"
                        label="Email/ User Name"
                        label-for="user"
                    >
                        <b-form-input
                        id="userInput"
                        v-model="form.email"
                        type="email"
                        placeholder="Enter email"
                        required
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group
                    id="pass"
                    label="Password"
                    label-for="passInput">
                        <b-form-input
                        class="mb-1"
                        id="input-2"
                        v-model="form.pass"
                        type="password"
                        placeholder="Enter Password"
                        required
                        ></b-form-input>
                        <a href="#" class="text-muted">Forgot Password?</a>
                    </b-form-group>
                    <b-button block type="submit" class="mb-2" variant="primary">Login</b-button>
                    <b-small class="text-light">Don’t have an account?</b-small>
                    <a href="javascript:" class="d-block">SignUp</a>
                </b-form>
              </b-card>
            </div>
        </b-col>
   </b-row>
   </b-container>
</template>

<script>
export default {
  data () {
    return {
      form: {
        email: '',
        pass: ''
      }
    }
  }
}
</script>
<style>
.mc-login-bg{
  background: url(../../assets/images/sidebar-bg.png);
  background-position: center;
}
.login-wrapper{
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.login-wrapper .form-group label{
  color: var(--white);
}
.login-wrapper .card{
  backdrop-filter: blur(2px);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 1);
}
</style>
