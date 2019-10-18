<template>
    <div class="bd-vertical-align">
        <div class="container">
            <div class="row">
                <div class="col-md-10 offset-md-1 text-center">
                    <img src="./assets/logo.png" class="bd-v12-logo"/>
                    <div class="card">
                        <div class="card-body">
                            <form-wizard color="#83bf54" title="Video campaign creator" subtitle="Generate the campaign video easy and fastly without any video editing knowledges">
                                <tab-content title="Choose template" :before-change="validateChooseTemplateStep">
                                    <VaChooseTemplate :selectedTemplate="selectedTemplate" @update="updateSelectedTemplate"/>
                                </tab-content>
                                <tab-content title="Upload medias">
                                    <VaUploadMedias :template="templateMedias" :video="video"/>
                                </tab-content>
                                <tab-content title="Download the video">
                                    <VaGeneratedVideo/>
                                </tab-content>
                            </form-wizard>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// CSS
require('vue-form-wizard/dist/vue-form-wizard.min.css')

// Consts & Plugins & Components
import {VA} from './va.js'
import {FormWizard, TabContent} from 'vue-form-wizard'

// Components
import VaChooseTemplate from './components/ChooseTemplate.vue'
import VaUploadMedias from './components/UploadMedias.vue'
import VaGeneratedVideo from './components/GeneratedVideo.vue'


export default {
    name: 'va-app',
    components: {
        FormWizard, 
        TabContent,
        VaChooseTemplate,
        VaUploadMedias,
        VaGeneratedVideo
    },
    data(){
        return{
            selectedTemplate: null,
            templateMedias: [],
            video: {}
        }
    },
    methods: {
        updateSelectedTemplate(selectedOne){
            this.selectedTemplate = selectedOne
        },
        validateChooseTemplateStep() {
            if(this.selectedTemplate != null){
                this.$http.get(VA.API + 'templates/' + this.selectedTemplate)
                    .then(response => {
                        let content = response.data
                        if(content.data != null)
                            this.templateMedias = content.data
                        else
                            this.templateMedias = []
                    })

                return true
            }

            alert("Please choose a template!")
            return false;
        }
    }
}
</script>

<style scoped>
    .bd-vertical-align{
        min-height: 100%;  /* Fallback for browsers do NOT support vh unit */
        min-height: 100vh; /* These two lines are counted as one :-)       */

        display: flex;
        align-items: center;
    }
    .bd-v12-logo{
        margin: 15px;
    }
    .bd-subtitle{
        color: #83bf54;
        font-family: 'Roboto', sans-serif;
    }
</style>
<style>
    a{
        color: #83bf54 !important
    }
    a:hover{
        color: rgba(131, 191, 84, .5);
    }
    .vue-form-wizard .wizard-title{
        margin-bottom: 15px !important;
    }
    .no-padding{
        padding: 0px !important;
    }
</style>