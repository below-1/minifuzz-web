<template>

  <q-card flat bordered>
    <q-item>
      <q-item-section>
        <q-item-label caption>
          {{ formattedDate.elapsed }}, berlangsung selama {{ formattedDate.timeTaken }}
        </q-item-label>
      </q-item-section>
    </q-item>
    <q-separator/>
    <q-card-section>
      <q-toolbar>
        <q-toolbar-title class="text-h6">Hasil</q-toolbar-title>
      </q-toolbar>
      <q-list separator>
        <q-item v-for="output in formattedOutputs">
          <q-item-section>
            <q-item-label>{{ output.consequence }}</q-item-label> 
            <q-item-label caption>{{ output.confidence }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
    <q-separator/>
    <q-card-section>
      <q-toolbar>
        <q-toolbar-title class="text-h6">Jawaban</q-toolbar-title>
      </q-toolbar>
      <q-list separator>
        <q-item v-for="it in formattedAnswers" class="q-py-lg">
          <q-item-section>
            <q-item-label>{{ it.question }}</q-item-label> 
            <q-item-label class="text-weight-bold" style="font-size: 1.6rem;">{{ it.answer }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
    <q-card-actions>
      <q-btn @click="$emit('delete')" flat label="hapus" color="red" />
    </q-card-actions>
  </q-card>

</template>

<script setup>
  import { defineProps, defineEmit, toRefs, ref, inject, computed, onMounted, isRef } from 'vue'
  import { useFormatDate, useFormatAnswers } from 'src/serv/session/format'

  const questions = inject('questions')
  const format = inject('formatSession')
  const formatOutput = format.getFormatOutput()

  const props = defineProps({
    session: {
      type: Object,
      required: true
    }
  })

  defineEmit(['delete'])

  const { session } = toRefs(props)
  const start = computed(() => session.value.start)
  const end = computed(() => session.value.end)

  const formattedDate = useFormatDate(start, end)
  const formattedOutputs = computed(() => session.value.outputs.map(formatOutput))
  const formattedAnswers = useFormatAnswers(session, questions)
</script>
