<template>
    <div class="container">
        <Menu />

        <div class="row justify-content-center">
            <div class="col-md-6">
                <h1 class="mb-4"><b>{{ note.title }}</b></h1>
                <pre v-html="note.descriptionHtml"></pre>

                <div class="mb-4">
                    <div class="text-center">
                        <span class="points-separators">...</span>
                    </div>
                </div>
            </div>
        </div>

        <Footer />
    </div>
</template>


<script>

import axios from 'axios'
import MarkdownIt from 'markdown-it'

export default {
    components: {

    },

    data() {

        return {

            token: localStorage.getItem('token'),

            note: {}

        }

    },

    mounted() {

        this.getAndRenderTask()

    },

    methods: {

        async getAndRenderTask() {
            try {
                // Obtener la tarea desde la API
                const response = await axios.get(`https://notes-backend-lps0.onrender.com/api/note/${this.$route.params.id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                this.note = response.data;

                // Renderizar la descripción en formato Markdown
                const md = MarkdownIt();
                this.note.descriptionHtml = md.render(this.note.description);

                console.log(this.note);
            } catch (error) {
                console.error(error);
            }
        }



    },

    computed: {

    }
}
</script>

<style scoped>
pre {
    white-space: pre-wrap;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

strong {
    font-weight: bold;
}

em {
    font-style: italic;
}

.points-separators {
    font-size: 20px;
    letter-spacing: 20px;
}
</style>