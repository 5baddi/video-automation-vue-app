<template>
    <div class="row">
        <div class="col-md-8">
            <div class="col-md-12">
                <!-- <img class="form-group" v-for="item in template.medias" :key="item.id" :src="item.thumbnail_url"/> -->
                <vueper-slides class="no-shadow" slide-image-inside :visible-slides="2" :slide-ratio="1/4" :dragging-distance="70">
                    <vueper-slide v-for="item in template.medias" :image="item.thumbnail_url" :key="item.id"></vueper-slide>
                </vueper-slides>
            </div>
            <div class="col-md-8">
                <input type="hidden" :value="template.id"/>
                <div class="form-group" v-for="(item, index) in template.medias" :key="item.id">
                    <label>{{ item.placeholder }}</label>
                    <input v-if="item.type == 'text'" class="form-control" type="text" v-model="video[index]" required/>
                    <input v-if="item.type == 'image'" class="form-control" type="file" :name="index" @change="onFileChanged" required/>
                    <Sketch v-if="item.type == 'color'" v-model="video[index]"/>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="embed-responsive embed-responsive-1by1">
                <video class="embed-responsive-item" controls :src="template.preview_url"/>
            </div>
            <div class="form-group">
                <input type="text" class="form-control" v-model="outputFileName" placeholder="Video name"/>
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
        outputFileName: String
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
        video: function(newVal, oldVal){
            this.$emit('update', {video: this.video, outputFileName: this.outputFileName})
        }
    },
}
</script>