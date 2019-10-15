<template>
  <div class="md-layout md-gutter md-size-55">
    <div class="md-layout-item">
      <md-card>
        <md-card-header>
          <h3 class="md-title">Video campaign creator</h3>
        </md-card-header>
        <md-card-content>
          <md-steppers :md-active-step.sync="active" md-linear>
            <md-step id="choose" md-label="Choose template" md-description="Choose the campaign video template" :md-done.sync="choose">
              <!-- <vue-select-image :dataImages="dataImages"@onselectimage="onSelectImage"></vue-select-image> -->
              <vue-select-image :dataImages="templatesList"></vue-select-image>
              <md-button class="md-raised md-primary" @click="setDone('choose', 'inputs')">Continue</md-button>
            </md-step>
            <md-step id="inputs" md-label="Upload medias" md-description="Upload the campaign medias" :md-done.sync="inputs">

              <md-button class="md-raised md-primary" @click="setDone('inputs', 'download')">Continue</md-button>
            </md-step>
            <md-step id="download" md-label="Download output" md-description="Donwload the campaign output" :md-done.sync="download">

              <md-button class="md-raised md-primary" @click="setDone('download')">Continue</md-button>
            </md-step>
          </md-steppers>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
// CSS
require('vue-select-image/dist/vue-select-image.css')

// Components
import VueSelectImage from 'vue-select-image'

export default {
  name: 'va-app',
  components: {
    VueSelectImage
  },
  data(){
    return{
      templatesList: [
        {
          id: 1,
          src: "https://cdn-w.v12soft.com/photos/5bb7Lwu/8779555/011_13052019103742166dd_800600.jpg",
          alt: "Square 1"
        },{
          id: 2,
          src: "https://cdn-w.v12soft.com/photos/5bb7Lwu/8779555/011_13052019103742166dd_800600.jpg",
          alt: "Square 2"
        }
      ]
    }
  }
}
</script>

<style>
  body{
    overflow-x: hidden;
  }
  .md-layout{
    padding: 60px 15px;
  }
  .card{
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  }
</style>
