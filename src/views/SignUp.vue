<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-4 m-4">
                <div class="my-4 text-center">
                    <h4 class="mb-2"><b>Create account</b></h4>
                    <h5><b>Manage your tasks quickly 🔥</b></h5>
                </div>
                <form @submit.prevent="submitData">
                    <!-- Email input -->
                    <div class="form-outline mb-4">
                        <label class="form-label small font-weight-bold" for="form2Example3">User name</label>
                        <input type="text" id="form2Example3" class="form-control" v-model="json_data.user_name" />
                    </div>

                    <div class="form-outline mb-4">
                        <label class="form-label small font-weight-bold" for="form2Example1">Email address</label>
                        <input type="email" id="form2Example1" class="form-control" v-model="json_data.email" />
                    </div>

                    <!-- Password input -->
                    <div class="form-outline mb-4">
                        <label class="form-label small font-weight-bold" for="form2Example2">Password</label>
                        <input type="password" id="form2Example2" class="form-control" placeholder="8+ characters"
                            v-model="json_data.password" :minlength="8" />
                    </div>

                    <p class="text-sm small text-danger" v-if="message">
                        <font-awesome-icon icon="fa-solid fa-circle-exclamation" />
                        {{ message }}
                    </p>
                    <!-- Submit button -->
                    <button type="submit" style="width: 100%;" class="py-3 btn btn-primary mb-4"
                        :disabled="isSubmitDisabled">Sign
                        up</button>

                    <!-- Register buttons -->
                    <div class="text-center">
                        <p>Already have an account? <router-link to="/login">Sign in</router-link></p>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
  
<script>

import { RouterLink } from 'vue-router'
import axios from 'axios'
import { url } from '../constants'

export default {

    data() {

        return {

            message: "",
            json_data: {
                user_name: "",
                email: "",
                password: ""
            }

        }

    },

    computed: {

        isSubmitDisabled() {

            return !this.json_data.user_name || !this.json_data.email || !this.json_data.password

        },

    },

    methods: {

        async submitData() {

            try {

                const response = await axios.post(url + "/api/signup", this.json_data);

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