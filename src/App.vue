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
                                        <h4>{{ (outputFileName != null && outputFileName != "") ? outputFileName.replace(/_/g, ' ') : "Something wrong!" }}</h4>
                                        <hr/>
                                        <div class="col-md-12" v-show="!isGenerated">
                                            <p id="outputMessage" ref="outputMessage">Please wait until rendering is complete ...</p>
                                            <font-awesome-icon v-show="onProgress" icon="spinner" size="2x" spin/>
                                            <div v-show="onProgress" class="progress text-center" style="margin:20px">
                                                <div class="progress-bar progress-bar-striped bg-success progress-bar-animated" role="progressbar" :aria-valuenow="progressStatus"
                                                aria-valuemin="0" aria-valuemax="100" :style="'width:' + progressStatus + '%'">
                                                    {{ progressStatus }}%
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-12" v-show="isGenerated">
                                            <!-- <div class="embed-responsive embed-responsive-16by9" v-html="outputVideo" style="margin-bottom:20px"></div> -->
                                            <div class="embed-responsive embed-responsive-16by9" style="margin-bottom:20px">
                                                <video controls muted id="outputVideo" ref="outputVideo" name="outputVideo" :src="outputURL"/>
                                            </div>
                                            <a class="btn btn-download" :href="downloadURL" download>Download video</a>
                                        </div>
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
            selectedTemplate: -1,
            template: {},
            video: [],
            outputFileName: "",
            outputURL: "#",
            downloadURL: "#",
            isGenerated: false,
            progressStatus: 0,
            onProgress: false
            // outputVideo: ""
        }
    },
    methods: {
        // Watch vars
        updateSelectedTemplate(selectedOne){
            this.selectedTemplate = selectedOne
        },
        updateTemplateInputs(objData){
            this.video = objData.video
            this.outputFileName = objData.outputName
        },

        // Step One
        validateChooseTemplateStep() {
            // Validate has been selected an video template
            if(this.selectedTemplate != -1){
                // Load template medias structure
                this.$http.get(VA.API + 'templates/' + this.selectedTemplate)
                    .then(response => {
                        let content = response.data
                        if(content.data != null){
                            this.template = content.data
                            this.outputFileName = this.template.name.replace(/_/g, ' ')

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
                            this.outputFileName = ""
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
            // if(this.video.length === this.template.medias.length && !this.video.includes(null) && this.outputFileName != null && this.outputFileName != "")
            if(this.outputFileName != null && this.outputFileName != "")
                return true

            // alert("Should fill the required fields!")
            alert("Should set the video output name!")
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
                    value = self.video[key]

                formData.append(item.placeholder, value)
            })

            // let vue = this
            this.$http.post(VA.API2 + 'render', formData) 
                .then(response => {
                    let content = response.data
                    if(response.status == 200 && content != null){
                        this.progressStatus = 0
                        this.isGenerated = false
                        this.onProgress = true
                        this.outputURL = "#"
                        this.outputFileName = content.output_name

                        let properID = setInterval(() => {
                            this.$http.get(VA.API2 + 'status/' + content.job_id) 
                                .then(response => {
                                    let _content = response.data
                                    if(response.status == 200 && _content.data != null){
                                        this.progressStatus = _content.data.progress
                                    }

                                    if(_content.data.progress == 100){
                                        clearInterval(properID)
                                        this.outputURL = _content.data.output_url;
                                        this.downloadURL = VA.CDN + 'download/' + _content.data.template_id + '/' + _content.data.output_url.substring(_content.data.output_url.lastIndexOf('/') + 1)
                                        this.isGenerated = true
                                        this.$refs.outputVideo.pause()
                                        this.$refs.outputVideo.load()
                                    }

                                    // On error
                                    if(_content.data.status == 'error'){
                                        console.log("here")
                                        clearInterval(properID)
                                        this.onProgress = false
                                        this.$refs.outputMessage.innerText = _content.data.message
                                        this.$refs.outputMessage.style.color = "red"
                                    }
                                        // Show the generated video
                                        // let videoDom = document.createElement('video')
                                        // videoDom.src = content.output_url
                                        // this.outputVideo = videoDom.innerHTML
                                        // this.outputURL = content.outputURL
                                        // this.isGenerated = true
                                })
                        }, 60000)
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
    .btn-download{
        background-color: #83bf54 !important;
        color: white !important;
    }
</style>