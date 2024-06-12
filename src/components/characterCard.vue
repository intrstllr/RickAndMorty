<script>
export default {
    props: {
        characterData: {
            type: Object,
            default: {},

        }
    },
    data() {
        return {

        }
    }
}
</script>

<template>
    <div class="flex bg-gray-600  h-56 items-center rounded-xl" style="width: 600px;">
        <div class="">
            <img :src="characterData.image" width="220" height="229" class="rounded-2xl"></img>
        </div>
        <div class=" h-full  text-2xl text-white  flex flex-col  justify-evenly p-3" style="width: 380px;">
            <div class="w-full text-3xl font-bold">
                {{ characterData.name }}

                <div class="text-xl p-3 pt-0  flex items-center">
                    <div class="h-4 w-4 bg-red-600 mr-1" style="border-radius: 50%;"
                        v-if="characterData.status === 'Dead'"></div>

                    <div class="h-4 w-4 bg-green-600 mr-1" style="border-radius: 50%;"
                        v-if="characterData.status === 'Alive'"></div>

                    <div class="h-4 w-4 bg-gray-800 mr-1" style="border-radius: 50%;"
                        v-if="characterData.status === 'unknown'"></div>
                    {{ characterData.status + ' - ' + characterData.species }}
                </div>
            </div>

            <div> {{ 'First seen in:' + characterData.species }}</div>
            <div> {{ ' Last known location:' + characterData.location.name }}</div>
        </div>
    </div>
</template>

<style></style>