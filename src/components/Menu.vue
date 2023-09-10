<template>
    <div class="row justify-content-center">
        <div class="col-md-6 my-3">
            <nav class="navbar navbar-expand-lg mb-3 menu p-1">
                <button class="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#navbarText"
                    aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation" @click="toggleNavbar">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse px-2" :class="{ show: navbarOpen }" id="navbarText">
                    <ul class="navbar-nav mx-auto">
                        <li class="nav-item active">
                            <router-link class="nav-link" to="/notes">All Notes</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/new">Create New</router-link>
                        </li>
                    </ul>
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <button class="btn btn-light btn-sm" @click="logout">
                                Logout <font-awesome-icon icon="fa-solid fa-arrow-right" />
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    </div>
</template>
  
<script>
import { RouterLink } from 'vue-router'

export default {
    data() {
        return {
            navbarOpen: false
        };
    },
    methods: {
        toggleNavbar() {
            this.navbarOpen = !this.navbarOpen;
        },
        logout() {
            localStorage.removeItem('token')
            this.$router.push({ path: '/login' })
        }
    }
};
</script>
  
<style scoped>
.menu {
    border: solid 1px rgba(128, 128, 128, 0.208);
    border-radius: 5px;
}

.nav-link {
    color: black;
    font-weight: 600;
}
</style>