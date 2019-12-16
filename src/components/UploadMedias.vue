<template>
    <div class="row text-left">
        <div class="col-md-8">
            <!-- <div class="col-md-12">
                <img class="form-group" v-for="item in template.medias" :key="item.id" :src="item.thumbnail_url"/>
                <vueper-slides class="no-shadow" slide-image-inside :visible-slides="2" :slide-ratio="1/4" :dragging-distance="70">
                    <vueper-slide v-for="item in template.medias" :image="item.thumbnail_url" :key="item.id"></vueper-slide>
                </vueper-slides>
            </div> -->
            <div class="col-md-8 form">
                <input type="hidden" :value="template.id"/>
                <div class="form-group">
                    <label>Video name</label>
                    <input type="text" class="form-control" v-model="outputFileName" placeholder="First campaign"/>
                </div>
                <div class="form-group" v-for="(item, index) in template.medias" :key="item.id">
                    <label>{{ item.placeholder.replace(/_/g, ' ') }}</label>
                    <input v-if="item.type == 'text'" class="form-control" type="text" v-model="video[index]" required/>
                    <input v-if="item.type == 'image'" class="form-control" type="file" :name="index" @change="onFileChanged" required/>
                    <!-- <Sketch v-if="item.type == 'color'" v-model="video[index]"/> -->
                    <input v-if="item.type == 'color'" class="form-control" type="color" v-model="video[index]"/>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="embed-responsive embed-responsive-1by1">
                <video class="embed-responsive-item" controls :src="template.preview_url"/>
            </div>
        </div>
    </div>
</template>

<script>
// CSS
require('vueperslides/dist/vueperslides.css')

// Consts & Plugins & Components
import { VueperSlides, VueperSlide } from 'vueperslides'

// Components
import Sketch from 'vue-color/src/components/Sketch.vue'

export default {
    components: { VueperSlides, VueperSlide, Sketch },
    props: {
        template: Object,
        video: Array,
        outputFileName: {
            type: String,
            default: ""
        }
    },
    methods: {
        onFileChanged(e){
            // Catch the files attribute
            let files = e.target.files || e.dataTransfer.files
            if(!files.length)
                return

            // Set at the video model
            this.video[e.target.name] = files[0]
        }
    },
    watch: {
        outputFileName: function(newVal, oldVal){
            this.outputFileName = newVal
            this.$emit('update', {video: this.video, outputName: newVal})
        },
        video: function(newVal, oldVal){
            this.$emit('update', {video: this.video, outputName: this.outputFileName})
        }
    },
}
</script>