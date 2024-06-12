<script>
import { api } from './server/api';
import characterCard from './components/characterCard.vue'


export default {
    components: {
        characterCard,


    },
    data() {
        return {
            cardsInfo: [],
            currentPage: 1,
            name: "",
            status: '',
            loading: false,
            allPages: 0,
            pagesCount: [],
        }
    },

    methods: {
        async getAllCharacters() {
            this.pagesCount = []
            let result = await api.getAllCharacters()
            return this.allPages = result.info.pages,
                this.cardsInfo = result.results, this.getPagination()

        },
        async getCharacterByFilter(page, name, status,) {
            this.loading = true;
            this.pagesCount = []
            let result = await api.getCharacterByFilter(page, name, status)
            console.log(result)
            this.info = result.info;
            this.cardsInfo = result.results;
            this.allPages = result.info.pages;
            this.getPagination();
            return this.loading = false;
        },
        nextPage() {
            this.currentPage < this.allPages ? this.currentPage += 1 : null;
            this.getCharacterByFilter(this.currentPage, this.name, this.status)
        },
        previousPage() {
            this.currentPage > 1 ? this.currentPage -= 1 : null;
            this.getCharacterByFilter(this.currentPage, this.name, this.status)
        },
        getCharacterByFilterByPage(item) {
            if (item != '...') {
                this.currentPage = item
                this.getCharacterByFilter(this.currentPage, this.name, this.status)
            }
        },
        getPagination() {
            let result = []
            let pagesArray = [...Array(this.allPages)].map((_, i) => (i += 1));
            let leftThree = [1, 2, 3, '...', pagesArray.length];
            let rightThree = [1, '...', pagesArray.length - 2, pagesArray.length - 1, pagesArray.length];
            let pageIndex = pagesArray.indexOf(this.currentPage);
            if (pagesArray.length > 6) {
                if (pageIndex <= 2) {
                    result = leftThree
                }
                else if (pageIndex >= pagesArray.length - 3) {
                    result = rightThree
                }
                else {
                    result = [1, '...', pagesArray[pageIndex - 1], pagesArray[pageIndex], pagesArray[pageIndex + 1], '...', pagesArray.length]
                }
            }
            else {
                result = pagesArray
            }
            return this.pagesCount = result
        }
    },
    mounted() {
        this.getAllCharacters()

    },
}
</script>

<template>
    <div class="w-screen-2xl " style=" max-width: 1920px;
    margin: auto;">
        <div class="flex justify-center mt-5 py-5 ">
            <div class="text-6xl font-apple-system font-weight font-bold">The Rick and Morty API
            </div>
        </div>
        <div class="w-full h-20 flex p-5">
            <div class="flex w-1/2">
                <div class="flex  w-60 justify-evenly mx-5 items-center">
                    <div class="mx-4 ">Имя:</div>
                    <input v-model="name" class="lex h-10  rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm 
                    file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2
                     disabled:cursor-not-allowed disabled:opacity-50">
                    </input>
                </div>
                <div class="flex w-60 justify-evenly mx-5 items-center">
                    <div class="mx-4">Статус:</div>
                    <input v-model="status" class="lex h-10  rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm 
                    file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2
                     disabled:cursor-not-allowed disabled:opacity-50">
                    </input>
                </div>
            </div>
            <div class="flex w-1/2 justify-between">
                <div class="flex">
                    <div class="flex " v-if="pagesCount.length != 0">
                        <button @click="previousPage" style="width: 38px;">Пред</button>
                        <div class="flex justify-around">
                            <div v-for="page in pagesCount" :key="page">
                                <div class="mx-2 float-left px-4 py-2 cursor-pointer"
                                    @click="getCharacterByFilterByPage(page)"
                                    :class="page === currentPage ? `bg-red-600 text-white rounded-xl` : null">{{
                                        page }}
                                </div>
                            </div>
                        </div>
                        <button @click="nextPage" style="width: 38px;" class="mx-3">След</button>
                    </div>
                </div>
                <div class="mx-5">
                    <button class="bg-gray-100 text-gray-900 hover:bg-gray-100/80   h-9 rounded-md px-3"
                        @click="getCharacterByFilter(currentPage, name, status)">Применить</button>
                </div>
            </div>

        </div>
        <div class="min-w-full flex flex-wrap " style="height: calc(100vh - 200px);">
            <div class=" flex flex-wrap w-full bg-black justify-center h-full  pb-5 overflow-auto" id="scrollbar1">
                <div class="ms-5 py-5 max-h-56 my-5" v-for="item in cardsInfo" :key="item.id" v-if="!loading">
                    <characterCard :characterData="item">
                    </characterCard>
                </div>
                <div v-else class="w-full flex items-center justify-center">
                    <div class="mainCss">
                        <div class="dotsCss">
                            <div class="dot"></div>
                            <div class="dot"></div>
                            <div class="dot"></div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>

<style scoped>
#scrollbar1::-webkit-scrollbar {
    width: 16px;
}

#scrollbar1::-webkit-scrollbar-track {
    border-radius: 8px;
    background-color: #e7e7e7;
    border: 1px solid #cacaca;
}

#scrollbar1::-webkit-scrollbar-thumb {
    border-radius: 8px;
    border: 3px solid transparent;
    background-clip: content-box;
    background-color: #d55959;
}

.loader {
    width: 96px;
    height: 96px;
    border: 5px solid #FFF;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 2s linear infinite;
}


.mainCss {
    width: 100%;
    height: 100%;
}

.dotsCss {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 50px;
}

.dot {
    width: 80px;
    height: 80px;
    background-color: white;
    border-radius: 20px;
    transform: translate(0px, -40px);
    animation: bounce 1s infinite;
}

.dot:nth-child(2) {
    animation-delay: 0.2s;
}

.dot:nth-child(3) {
    animation-delay: 0.4s;
}

@keyframes bounce {
    0% {
        transform: translate(0px, -10px);
    }

    40% {
        width: 0px;
        height: 2px;
        transform: translate(0px, 40px) scale(1.7);
    }

    100% {
        height: 80px;
        transform: translate(0px, -20px);
    }
}
</style>
