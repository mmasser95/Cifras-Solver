<template>
  <v-container class="container-nums">
    <div class="numbers">
      <div class="number" v-for="k in numbersToSolve">{{ k }}</div>
    </div>
  </v-container>
  <div class="controllers">
    <div class="group-btns">
      <v-btn
        v-for="num in numbers"
        :disabled="isDisabled"
        @click="() => addNumber(num)"
        >{{ num }}</v-btn
      >
    </div>
    <div class="slider">
      <v-slider
        :disabled="isDisabled"
        thumb-label="always"
        id="slider"
        :min="3"
        :max="10"
        :step="1"
        v-model="n"
      ></v-slider>
    </div>
    <div class="input">
      <v-text-field
        v-model="caca"
        label="Objectiu"
        type="number"
      ></v-text-field>
    </div>
    <div class="group-btns">
      <v-btn @click="clear" color="error">
        <v-icon icon="mdi-close-outline"></v-icon>
      </v-btn>
      <v-btn @click="solve" color="success" :disabled="!isNumber">
        <v-icon icon="mdi-check-outline"></v-icon>
      </v-btn>
    </div>
    <div class="group-res">
      <p v-for="r in results">{{ r }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import useSolver from "@/composables/useSolver";
const { findSolution } = useSolver();
const numbers = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 25, 50, 75, 100]);
const results = ref([]);
const n = ref(6);
const numbersToSolve = ref([]);
const caca = ref(6);
const myLen = computed(() => numbersToSolve.value.length);
const isDisabled = computed(() => myLen.value >= n.value);
const isNumber = computed(() => caca.value > 50 && isDisabled);
const clear = () => {
  numbersToSolve.value = [];
  caca.value = "";
  results.value = [];
};
const addNumber = (n: number) => {
  numbersToSolve.value.push(n);
};
const solve = () => {
  const res = findSolution(numbersToSolve.value, parseInt(caca.value, 10));
  if (!res) console.log("No existeix solució");
  results.value = res;
};
</script>

<style scoped>
.numbers {
  display: flex;
  flex-flow: row nowrap;
  gap: 20px;
  justify-content: center;
  width: 100%;
}
.number {
  font-size: large;
}
.controllers {
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  gap: 20px;
}
.group-btns {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  gap: 10px;
}
.slider {
  min-width: 100px;
  width: 75%;
  margin-top: 15px;
}
.input {
  width: 25%;
  min-width: 100px;
}
.container-nums{
  height:15%;
}
</style>
