<template>
    <div>
        <div class="row" style="background:#EBEFF2;padding:8px;">
            <div class="col-md-4">
                <a class="tab-url" href="javascript:void(0)" :class="{ 'tab-url-active' : rotation == 'square' }" @click="loadCustomTemplates('square')">Square</a>
            </div>
            <div class="col-md-4">
                <a class="tab-url" href="javascript:void(0)" :class="{ 'tab-url-active' : rotation == 'portrait' }" @click="loadCustomTemplates('portrait')">Portrait</a>
            </div>
            <div class="col-md-4">
                <a class="tab-url" href="javascript:void(0)" :class="{ 'tab-url-active' : rotation == 'landscape' }" @click="loadCustomTemplates('landscape')">Landscape</a>
            </div>
        </div>
        <div class="row bd-thumbs-container">
            <div class="col-md-4" style="margin-bottom:20px" v-for="item in customTemplates" :customTemplate="item" :key="item.id" @mouseover="switchPreview(item.id)" @mouseleave="switchPreview(null)">
                <img class="bd-va-thumb img-fluid" v-show="playedOne == item.id" @click="selectedThumbChanged(item)" :class="{'bd-va-thumb-selected' : selectedTemplate == item.id}" :src="item.gif_url"/>
                <img class="bd-va-thumb img-fluid" v-show="playedOne != item.id" @click="selectedThumbChanged(item)" :class="{'bd-va-thumb-selected' : selectedTemplate == item.id}" :src="item.thumbnail_url"/>
                <p>{{ item.name }}</p>
            </div>
        </div>
    </div>
</template>

<script>
// Consts & Plugins & Components
import {VA} from '../va.js'


export default {
    components: {
        
    },
    props: {
        selectedTemplate: Number
    },
    data(){
        return {
            customTemplates : [],
            rotation: 'square',
            playedOne: null
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
        loadCustomTemplates(rotation){
            this.rotation = rotation
            this.selectedThumbChanged(null)

            this.$http.get(VA.API + 'templates/thumbnails/' + rotation)
            .then(response => {
                let content = response.data
                if(content.data != null)
                    this.customTemplates = content.data
                else
                    this.customTemplates = []
            })
        },
        selectedThumbChanged(template){
            let selectedOne = null
            // Only enabled template can be used
            if(template != null){
                if(template.enabled == 1)
                    selectedOne = template.id
                else
                    alert("This template not for use! Please choose another one")
            }


            this.selectedTemplate = selectedOne
            this.$emit('update', selectedOne)
        },
        switchPreview(id){
            this.playedOne = id
            // if(event.target == null)
            //     return

            // let splitedLink = event.target.src.split('.')
            // let extension = splitedLink[splitedLink.length - 1]

            // // Replace file extension to gif
            // if(extension != 'gif')
            //     event.target.src = event.target.src.replace(extension, 'gif')
            // else
            //     event.target.src = event.target.getAttribute('data-thumbnail')
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
    .bd-va-thumb:hover{
        border: 3px solid #83bf54;
        animation-play-state: running;
    }
    .bd-va-thumb-selected{
        border: 3px solid #83bf54;
    }
    .tab-url:hover{
        text-decoration: none !important;
        border-bottom: 2px solid #83bf54;
    }
    .tab-url-active{
        border-bottom: 2px solid #83bf54;
    }
</style>