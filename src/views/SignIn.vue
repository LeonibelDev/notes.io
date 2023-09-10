<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-4 m-4">
                <div class="my-4 text-center">
                    <h4 class="mb-2"><b>Login</b></h4>
                    <h5><b>Access your account 😀</b></h5>
                </div>
                <form @submit.prevent="submitData">
                    <!-- Email input -->
                    <div class="form-outline mb-4">
                        <label class="form-label small font-weight-bold" for="form2Example1">Email address</label>
                        <input type="email" id="form2Example1" class="form-control" v-model="json_data.email" autofocus />
                    </div>

                    <!-- Password input -->
                    <div class="form-outline mb-4">
                        <label class="form-label small font-weight-bold" for="form2Example2">Password</label>
                        <input type="password" id="form2Example2" class="form-control" v-model="json_data.password"
                            :minlength="8" />
                    </div>

                    <p class="text-sm small text-danger" v-if="message">
                        <font-awesome-icon icon="fa-solid fa-circle-exclamation" />
                        {{ message }}
                    </p>
                    <!-- Submit button -->
                    <button type="submit" style="width: 100%;" class="py-3 btn btn-primary mb-4"
                        :disabled="isSubmitDisabled">Log
                        in</button>

                    <!-- Register buttons -->
                    <div class="text-center">
                        <p>Not a member? <router-link to="/register" class="">Create account</router-link></p>
                    </div>


                </form>
            </div>
        </div>
    </div>
</template>
  
<script>

import { RouterLink } from 'vue-router'

import axios from 'axios'

export default {

    data() {

        return {

            message: "",
            json_data: {
                email: "",
                password: ""
            }

        }

    },

    computed: {

        isSubmitDisabled() {

            return !this.json_data.email || !this.json_data.password

        }

    },

    methods: {

        async submitData() {

            try {

                const response = await axios.post("https://notes-backend-lps0.onrender.com/api/login", this.json_data)

                localStorage.setItem('token', response.data.token)

                this.$router.push({ path: '/notes' })

            } catch (error) {
                this.message = error.response.data.message

            }
        }
    }
};

</script>
  
<style scoped></style>