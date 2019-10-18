<template>
    <div>
        <div class="row">
            <div class="col-md-4">
                <a href="javascript:void(0)" @click="loadCustomTemplates('square')">Square</a>
            </div>
            <div class="col-md-4">
                <a href="javascript:void(0)" @click="loadCustomTemplates('portrait')">Portrait</a>
            </div>
            <div class="col-md-4">
                <a href="javascript:void(0)" @click="loadCustomTemplates('landscape')">Landscape</a>
            </div>
        </div>
        <div class="row bd-thumbs-container">
            <div class="col-md-4" style="margin-bottom:20px" v-for="item in customTemplates" :customTemplate="item" :key="item.id">
                <img class="bd-va-thumb img-fluid" @click="selectedThumbChanged(item.id)" :class="{'bd-va-thumb-selected' : selectedTemplate == item.id}" :src="item.thumbnail_url"/>
                <span>{{ item.name }}</span>
            </div>
        </div>
    </div>
</template>

<script>
// Consts & Plugins & Components
import {VA} from '../va.js'
// import Thumbnails from './Thumbnails.vue'


export default {
    components: {
        // Thumbnails
    },
    props: {
        selectedTemplate: Number
    },
    data(){
        return {
            customTemplates : []
        }
    },
    mounted(){
        this.$http.get(VA.API + 'templates/thumbnails/square')
            .then(response => {
                let content = response.data
                if(content.data != null)
                    this.customTemplates = content.data
                else
                    this.customTemplates = []
            })
    },
    methods: {
        loadCustomTemplates(type){
            this.$http.get(VA.API + 'templates/thumbnails/' + type)
            .then(response => {
                let content = response.data
                if(content.data != null)
                    this.customTemplates = content.data
                else
                    this.customTemplates = []
            })
        },
        selectedThumbChanged(value){
            this.$emit('update', value)
        }
    }
}
</script>

<style>
    .bd-thumbs-container{
        padding-top: 20px !important;
    }
    .bd-va-thumb{
        cursor: pointer !important;
        border: 3px solid #EBEFF2;
        margin-bottom: 10px;
    }
    img{
        animation-play-state: paused;
    }
    .bd-va-thumb:hover{
        border: 3px solid #83bf54;
        animation-play-state: running;
    }
    .bd-va-thumb-selected{
        border: 3px solid #83bf54;
    }
</style>