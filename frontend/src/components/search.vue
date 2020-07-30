<template>
    <div id="search">
      <h1>Appathon @NTUA 2020</h1>
      <vue-tags-input id = "tags"
              v-model="meds.tag"
              placeholder = ""
              :tags="meds.tags"
              @tags-changed="newTags => meds.tags = newTags"
      />
      <button v-on:click.prevent="changeInput"><router-link to="/results" exact>Search</router-link></button>
    </div>
</template>

<script>
// Imports
import {bus} from '../main';
import VueTagsInput from '@johmun/vue-tags-input';

export default {
    components: {
        VueTagsInput,
    },
    data () {
        return {
          meds:{
            tag:'',
            tags:[],
          }
        };
    },
    methods: {
        changeInput: function(){
            bus.$emit('inputChanged', this.meds.tags.map((tag) => tag['text']));
        }
    }
}
</script>

<style>
#search *{
    box-sizing: border-box;
}
#search{
    margin: 0px auto;
    text-align: center;
    max-width: 800px;
    color:white;
}
button{
  background-color: #555555;
  font-size: 26px;
  border-radius: 15px;
  transition-duration: 0.3s;
  margin-top: 10px;
  border-color: black;
}
button:hover{
    background-color: #eee;
}
a {
    text-decoration: none;
    color: #eee;
    transition-duration: 0.3s;
}
a:hover{
  color: #555555;
}
h1{
  font-family:verdana;
  color:black;
  font-size: 70px;
  margin-bottom: 70px;
}
#tags{
  margin-left: auto;
  margin-right: auto;
}
</style>

<style lang="css">
  /* style the background and the text color of the input ... */
  .vue-tags-input {
    background: #black;
  }

  .vue-tags-input .ti-new-tag-input {
    background: transparent;
    color: #black;
  }

  .vue-tags-input .ti-input {
    padding: 4px 10px;
    transition: border-bottom 200ms ease;
  }

  /* we cange the border color if the user focuses the input */
  .vue-tags-input.ti-focus .ti-input {
    border: 1px solid #black;
  }

  /* some stylings for the autocomplete layer */
  .vue-tags-input .ti-autocomplete {
    background: #283944;
    border: 1px solid #black;
    border-top: none;
  }

  /* the selected item in the autocomplete layer, should be highlighted */
  .vue-tags-input .ti-item.ti-selected-item {
    background: #ebde6e;
    color: #283944;
  }

  /* style the placeholders color across all browser */
  .vue-tags-input ::-webkit-input-placeholder {
    color: #a4b1b6;
  }

  .vue-tags-input ::-moz-placeholder {
    color: #a4b1b6;
  }

  .vue-tags-input :-ms-input-placeholder {
    color: #a4b1b6;
  }

  .vue-tags-input :-moz-placeholder {
    color: #a4b1b6;
  }

  /* default styles for all the tags */
  .vue-tags-input .ti-tag {
    position: relative;
    background: #black;
    color: #283944;
  }

  /* we defined a custom css class in the data model, now we are using it to style the tag */
  .vue-tags-input .ti-tag.custom-class {
    background: transparent;
    border: 1px solid #black;
    color: #ebde6e;
    margin-right: 4px;
    border-radius: 0px;
    font-size: 13px;
  }

  /* the styles if a tag is invalid */
  .vue-tags-input .ti-tag.ti-invalid {
    background-color: #e88a74;
  }

  /* if the user input is invalid, the input color should be red */
  .vue-tags-input .ti-new-tag-input.ti-invalid {
    color: #e88a74;
  }

  /* if a tag or the user input is a duplicate, it should be crossed out */
  .vue-tags-input .ti-duplicate span,
  .vue-tags-input .ti-new-tag-input.ti-duplicate {
    text-decoration: line-through;
  }

  /* if the user presses backspace, the complete tag should be crossed out, to mark it for deletion */
  .vue-tags-input .ti-tag:after {
    transition: transform .2s;
    position: absolute;
    content: '';
    height: 2px;
    width: 108%;
    left: -4%;
    top: calc(50% - 1px);
    background-color: #000;
    transform: scaleX(0);
  }

  .vue-tags-input .ti-deletion-mark:after {
    transform: scaleX(1);
  }
</style>
