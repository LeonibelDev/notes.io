<template>
    <div class="container">
        <Menu />
        <div class="row justify-content-center">
            <div class="col-md-6">

                <div class="text-center">
                    <h4 class="mb-2"><b>Add Note</b></h4>
                    <h5><b>Quickly add your notes 📝</b></h5>
                </div>
                <form @submit.prevent="submitTask">
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
                    <button type="submit" style="width: 100%;" class="py-3 btn btn-primary mb-4"
                        :disabled="isSubmitDisabled">Add Task</button>
                </form>

            </div>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import { url } from '../constants'

export default {

    data() {
        return {

            note: {
                title: "",
                description: ""
            }

        }

    },

    computed: {

        isSubmitDisabled() {

            return !this.note.title || !this.note.description;

        },

    },

    methods: {
        clearData() {

            this.note.title = "";
            this.note.description = "";

        },

        async submitTask() {

            try {

                const response = await axios.post(url + "/api/note", this.note, {

                    headers: {

                        Authorization: `Bearer ${localStorage.getItem('token')}`

                    }

                });

                this.clearData();

                Swal.fire({
                    title: 'Success!',
                    text: 'Task added successfully',
                    icon: 'success',
                    timer: 2000
                });

            } catch (error) {

                this.clearData();

                Swal.fire({
                    title: 'Error!',
                    text: error.response.data.message,
                    icon: 'error',
                    timer: 2000
                });

            }
        }
    }
};
</script>
  
<style scoped></style>
  