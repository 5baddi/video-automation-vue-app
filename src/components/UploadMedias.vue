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
                <div class="form-group" v-for="item in template.medias" :key="item.id">
                    <label>{{ item.placeholder }}</label>
                    <input v-if="item.type == 'text'" class="form-control" type="text" :name="item.placeholder" :value="item.default_value"/>
                    <input v-if="item.type == 'image'" class="form-control" type="file" :name="item.placeholder"/>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="embed-responsive embed-responsive-1by1">
                <video class="embed-responsive-item" controls :src="template.preview_url"/>
            </div>
            <div class="form-group">
                <input type="text" class="form-control" ref="video.name" :value="template.name" placeholder="Video name"/>
            </div>
        </div>
    </div>
</template>

<script>
require('vueperslides/dist/vueperslides.css')

import { VueperSlides, VueperSlide } from 'vueperslides'

export default {
    components: { VueperSlides, VueperSlide },
    props: {
        template: Object,
        video: Object
    },
}
</script>