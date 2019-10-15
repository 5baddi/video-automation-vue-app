<template>
    <div class="bd-vertical-align">
        <div class="container">
            <div class="row">
                <div class="col-md-10 offset-md-1 text-center">
                    <img src="./assets/logo.png" class="bd-v12-logo"/>
                    <div class="card">
                        <div class="card-body">
                            <form-wizard color="#83bf54" title="Video campaign creator" subtitle="Generate the campaign video easy and fastly without any video editing knowledges">
                                <tab-content title="Choose template">
                                    <VaChooseTemplate/>
                                </tab-content>
                                <tab-content title="Upload medias">
                                    <VaUploadMedias/>
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

// Plugins
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
        VaUploadMedias
    },
    data(){
        return{

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