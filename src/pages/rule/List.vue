<template>
  <q-page>
    <Hero
      title="Data Aturan"
      subtitle="Daftar aturan yang digunakan dalam inferensi" />

    <q-toolbar>
      <div style="min-width: 150px;">
        <q-select
          v-model="params.perPage"
          hide-bottom-space
          standout
          dense
          flat
          label="item per halaman"
          :options="[
            5, 10, 25, 50
          ]"
          class="q-mr-md"
        />
      </div>
      <q-input
        label="halaman"
        :model-value="params.page + 1"
        @update:model-value="(v) => {
          params.page = parseInt(v) - 1
        }"
        type="number"
        :max="totalPage"
        min="0"
        flat
        standout
        hide-bottom-space
        dense
      />
      <q-space/>
      <q-btn
        to="/app/rules/create"
        dark
        color="blue"
        label="tambah"
        icon="add"
        unelevated
      ></q-btn>

    </q-toolbar>

    <div class="q-pa-md" v-if="loading" v-for="i in 6" :key="`placeholder_${i}`">
      <q-skeleton animation="wave" class="q-my-xs" height="2.5rem"/>
    </div>

    <q-table
      v-else
      :columns="columns"
      :rows="rules"
      :pagination="{
        rowsPerPage: 0
      }"
      hide-bottom
      hide-pagination
    >
      <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn @click="onDelete(props.row)" icon="delete" color="red" flat size="xs" />
          </q-td>
        </template>
    </q-table>

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
  import { useQuasar } from 'quasar'
  import useGetRuleAPI from 'src/serv/rule/list'
  import useRemoveRuleAPI from 'src/serv/rule/remove'
  import useQuestions from 'src/serv/question'
  import Hero from 'components/Hero.vue'

  const columns = [
    {
      name: 'E1',
      field: row => row.formattedPredicates[0].answer,
      label: 'E1'
    },
    {
      name: 'E2',
      field: row => row.formattedPredicates[1].answer,
      label: 'E2'
    },
    {
      name: 'E3',
      field: row => row.formattedPredicates[2].answer,
      label: 'E3'
    },
    {
      name: 'E4',
      field: row => row.formattedPredicates[3].answer,
      label: 'E4'
    },
    {
      name: 'E5',
      field: row => row.formattedPredicates[4].answer,
      label: 'E5'
    },
    {
      name: 'E6',
      field: row => row.formattedPredicates[5].answer,
      label: 'E6'
    },
    {
      name: 'E7',
      field: row => row.formattedPredicates[6].answer,
      label: 'E7'
    },
    {
      name: 'E8',
      field: row => row.formattedPredicates[7].answer,
      label: 'E8'
    },
    {
      name: 'consequence',
      field: row => row.formattedConsequence,
      label: 'output'
    },
    {
      name: 'actions',
      field: row => row._id,
      label: ''
    }
  ]

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

  onMounted(async () => {
    try {
      await getQuestions()
      await getRules()
    } catch (err) {
        console.log(err)
    }
  })
</script>