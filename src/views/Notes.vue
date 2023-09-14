<template>
    <div class="container">
        <Menu />

        <div class="row justify-content-center">
            <div class="col-md-6">

                <h2><b>notes</b></h2>

                <div class="" v-for="note in notes">
                    <div class="list-group list-group-light">
                        <div
                            class="list-group-item list-group-item-action px-3 border-0 d-flex justify-content-between align-items-center">
                            <router-link :to="`/note/${note._id}`" class="list-group-item border-0">
                                {{ note.title }}
                            </router-link>

                            <div>
                                <button class="btn btn-sm" title="delete" @click="deleteNote(`${note._id}`)">
                                    <font-awesome-icon icon="fa-solid fa-trash" />
                                </button>

                                <router-link :to="`/edit/${note._id}`" class="btn btn-sm" title="edit">
                                    <font-awesome-icon icon="fa-solid fa-pen-to-square" />
                                </router-link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>

        <Footer />
    </div>
</template>

<script>
import Swel from 'sweetalert2'
import { RouterLink } from 'vue-router'
import axios from 'axios'
import { url } from '../constants'

export default {
    data() {
        return {
            token: localStorage.getItem('token'),
            notes: []
        }
    },

    mounted() {
        this.getTasks()
    },

    methods: {
        async getTasks() {
            try {
                const response = await axios.get(url + '/api/notes', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                this.notes = response.data.posts
                console.log(response.data)


            } catch (error) {

                console.log(error)

            }
        },

        async deleteNote(id) {

            const confirm = await Swel.fire({
                title: "are you sure?",
                text: "are you sure you want to delete this task?",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
            })

            if (confirm.isConfirmed) {
                try {
                    const response = await axios.delete(url + `/api/note/${id}`, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    })

                    if (response.status == 200) {
                        const index = this.notes.findIndex(note => note._id === id)

                        if (index !== -1) {
                            this.notes.splice(index, 1)
                        }

                    }

                } catch (error) {

                    console.log(error)

                }
            }
        }
    },

    computed: {

    }
}
</script>

<style scoped></style>