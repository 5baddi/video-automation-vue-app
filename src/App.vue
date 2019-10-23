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
                                <tab-content title="Upload medias" :before-change="uploadTemplateInputsStep">
                                    <VaUploadMedias :template="template" :video="video" :outputFileName="outputFileName" @update="updateTemplateInputs"/>
                                </tab-content>
                                <tab-content title="Download the video" :after-change="renderStep">
                                    <div class="col-md-12 text-center">
                                        <h4>{{ outputFileName }}</h4>
                                        <video v-if="isGenerated" :src="outputURL" />
                                    </div>
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
require('vueperslides/dist/vueperslides.css')

// Consts & Plugins & Components
import {VA} from './va.js'
import {FormWizard, TabContent} from 'vue-form-wizard'

// Components
import VaChooseTemplate from './components/ChooseTemplate.vue'
import VaUploadMedias from './components/UploadMedias.vue'


export default {
    name: 'va-app',
    components: {
        FormWizard, 
        TabContent,
        VaChooseTemplate,
        VaUploadMedias
    },
    data(){
        return{
            selectedTemplate: null,
            template: {},
            video: [],
            outputFileName: null,
            outputURL: null,
            isGenerated: false
        }
    },
    methods: {
        // Watch vars
        updateSelectedTemplate(selectedOne){
            this.selectedTemplate = selectedOne
        },
        updateTemplateInputs(objData){
            this.video = objData.video
            this.outputFileName = objData.outputFileName
        },

        // Step One
        validateChooseTemplateStep() {
            // Validate has been selected an video template
            if(this.selectedTemplate != null){
                // Load template medias structure
                this.$http.get(VA.API + 'templates/' + this.selectedTemplate)
                    .then(response => {
                        let content = response.data
                        if(content.data != null){
                            this.template = content.data
                            this.outputFileName = this.template.name

                            let self = this;
                            // Format the media model
                            self.video = new Array(this.template.medias.length)
                            $.each(this.template.medias, function(key, item){
                                if(item.type !== 'image')
                                    self.video[key] = item.default_value
                                else
                                    self.video[key] = null
                            })
                            this.video = self.video
                        }else{
                            this.template = {}
                            this.video = []
                            this.outputFileName = null
                        }
                    })

                return true
            }

            alert("Please choose a template!")
            return false
        },
        // Step Two
        uploadTemplateInputsStep(){
            // TODO: Validation
            if(this.video.length === this.template.medias.length && !this.video.includes(null) && this.outputFileName != null)
                return true

            alert("Should fill the required fields!")
            return false
        },
        // Render step
        renderStep(){
            let formData = new FormData()
            formData.append('template', this.template.id)
            formData.append('name', this.outputFileName)
            let self = this
            $.each(this.template.medias, function(key, item){
                let value = self.video[key]
                if(item.type === 'color')
                    value = self.video[key].hex

                formData.append(item.placeholder, value)
            })

            let vue = this
            this.$http.post(VA.API2 + 'render', formData) 
                .then(response => {
                    let content = response.data
                    if(response.status == 200 && content != null){
                        this.isGenerated = true
                        this.outputURL = content.output_url
                    }
                })
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