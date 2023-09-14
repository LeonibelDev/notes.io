<template>
    <div class="container">
        <Menu />
        <div class="row justify-content-center">
            <div class="col-md-6">

                <div class="text-center">
                    <h4 class="mb-2"><b>Update Note - {{ note.title }}</b></h4>
                </div>
                <form @submit.prevent="updateTask">
                    <!-- Task name input -->
                    <div class="form-outline mb-4">
                        <label class="form-label small font-weight-bold" for="taskName">Note Name</label>
                        <input type="text" id="taskName" class="form-control" v-model="note.title" />
                    </div>

                    <!-- Task description input -->
                    <div class="form-outline mb-4">
                        <label class="form-label small font-weight-bold" for="taskDescription">Description</label>
                        <textarea id="taskDescription" class="form-control" v-model="note.description" rows="10"></textarea>
                    </div>

                    <!-- Submit button -->
                    <button type="submit" style="width: 100%;" class="py-3 btn btn-s mb-4"
                        :disabled="isSubmitDisabled">Update</button>
                </form>

            </div>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios'
import { url } from '../constants'

export default {

    data() {
        return {

            note: {}

        }

    },

    mounted() {
        this.getTask()
    },

    computed: {

        isSubmitDisabled() {

            return !this.note.title || !this.note.description;

        },

    },

    methods: {
        async getTask() {
            try {
                // Obtener la tarea desde la API
                const response = await axios.get(url + `/api/note/${this.$route.params.id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                this.note = response.data;


            } catch (error) {
                console.error(error);
            }
        },



        clearData() {

            this.note.title = "";
            this.note.description = "";

        },

        async updateTask() {

            try {

                const response = await axios.put(url + "/api/note/" + this.note._id, this.note, {

                    headers: {

                        Authorization: `Bearer ${localStorage.getItem('token')}`

                    }

                });

                console.log("✅")
                this.$router.push({ path: `/note/${this.note._id}` })
            } catch (error) {

                //this.clearData();
                return null
            }
        }
    }
}
</script>
  
<style scoped></style>
  