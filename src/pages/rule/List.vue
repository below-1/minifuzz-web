<template>
  <q-page>
    <div class="bg-indigo-7 text-white column items-center q-py-md">
      <q-avatar 
        color="indigo-5"
        text-color="white"
        size="5rem"
        icon="receipt_long" />
      <p class="text-h5 text-weight-bold">Data Aturan</p>
    </div>

    <div class="q-pa-md bg-grey-2">
      <q-btn
        to="/app/rules/create"
        dark
        color="blue"
        label="tambah"
        icon="add"
        unelevated
        dense
        class="q-mb-sm"
        style="display: block; width: 100%;"
      ></q-btn>
      <q-select
        v-model="params.perPage"
        dense
        outlined
        label="item per halaman"
        :options="[
          10, 25, 50
        ]"
        class="q-mb-xs"
      />
      <q-input
        label="halaman"
        v-model.number="params.page"
        type="number"
        :max="totalPage"
        min="0"
        outlined
        dense
      />
    </div>

    <div class="q-pa-md" v-if="loading" v-for="i in 6" :key="`placeholder_${i}`">
      <q-skeleton animation="wave" class="q-my-xs" height="2.5rem"/>
    </div>
    <q-list
      v-else
      separator
      padding
    >
      <q-item v-for="rule in rules" class="q-py-md">
        <q-item-section>
          <q-item-label class="q-mb-sm text-weight-bold text-grey-7">{{ rule.formattedConsequence }}</q-item-label>
          <div class="row q-gutter-sm q-px-sm">
            <template v-for="p, index in rule.predicate"
              :key="`${rule.id}__${index}`">
              <q-btn
                outline
                padding="8px"
                :color="rule.colors[index]" 
                :label="p + 1"
                class="text-weight-bold"
                style="font-size: 0.8rem; line-height: 100%;"
              >
                <q-menu>
                  <div class="bg-white q-pa-md">
                    <div class="text-grey-7 text-weight-bold">Pertanyaan</div>
                    <div class="text-grey-9 q-mb-sm">{{ rule.formattedPredicates[index].question }}</div>
                    <div class="text-grey-7 text-weight-bold">Jawaban</div>
                    <div class="text-grey-9 q-mb-sm">{{ rule.formattedPredicates[index].answer }}</div>
                  </div>
                </q-menu>
              </q-btn>
            </template>
          </div>
        </q-item-section>
        <q-item-section top side>
          <q-btn size="12px" flat dense round icon="more_vert">
            <q-menu auto-close>
              <q-list separator>
                <q-item dense :to="`/app/rules/${rule._id}/update`">
                  <q-item-section avatar>
                    <q-avatar icon="edit"></q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>edit</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item dense clickable @click="onDelete(rule)">
                  <q-item-section avatar>
                    <q-avatar icon="delete"></q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>hapus</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </q-item-section>
      </q-item>
    </q-list>

    <q-dialog v-model="deleteDialog">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
          <span class="q-ml-sm">Anda akan menghapus aturan <span class="text-weight-bold">{{ deleteItem.predicate.join('-') }}</span></span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Batalkan" color="primary" v-close-popup />
          <q-btn @click="realRemove" flat label="Lanjutkan" color="red" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script setup>
  import { ref, reactive, computed, onMounted, watch } from 'vue'
  import useGetRuleAPI from 'src/serv/rule/list'
  import useRemoveRuleAPI from 'src/serv/rule/remove'
  import useQuestions from 'src/serv/question'

  let formatRule = (t) => t

  const {
    questions,
    answers,
    getQuestions
  } = useQuestions()

  const {
    items: rules,
    params,
    totalPage,
    getRules,
    loading
  } = useGetRuleAPI()

  const deleteDialog = ref(false)
  const deleteItem = ref({ predicate: [] })

  const {
    loading: removeLoading,
    remove
  } = useRemoveRuleAPI()

  function onDelete (item) {
    deleteDialog.value = true
    deleteItem.value = { ...item }
  }

  async function realRemove () {
    removeLoading.value = true
    try {
      await remove(deleteItem.value.predicate)
    } catch (err) {
      console.log(err)
    } finally {
      removeLoading.value = false
      getRules()
    }
  }

  onMounted(() => {
    getQuestions()
      .then(() => getRules())
      .catch(err => {
        console.log(err)
      })
  })
</script>