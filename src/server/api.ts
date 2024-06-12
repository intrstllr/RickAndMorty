import axios from "vue-ts-axios";
const url = "https://rickandmortyapi.com/api/character";

export const api = {
    getAllCharacters: async () => {
        const response = await axios.get(url);
        return response.data;
    },

    getCharactersById: async (characterIdList: Number[]) => {
        const response = await axios.get(url + "/" + characterIdList);
        return response.data;
    },

    getCharacterByFilter: async (page: string, name: string, status: string) => {
        const response = await axios.get(url + "/?page=" + page + "&name=" + name + "&status=" + status);

        return response.data;
    },
};
