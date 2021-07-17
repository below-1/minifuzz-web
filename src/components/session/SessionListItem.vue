<template>
  <q-item class="q-py-md" :to="`/app/sessions/${id}`">
    <!-- Remove Padding Right Align the width -->
    <q-item-section avatar class="q-pr-none">
      <div class="text-weight-bold" style="font-size: 0.7rem;">
        {{ maxConfidence }}
      </div>
    </q-item-section>
    <q-item-section>
      <q-item-label class="text-weight-bold" lines="3">
        {{ formattedOutputs }}
      </q-item-label>
      <q-item-label caption>
        {{ formattedDate.elapsed }}, berlangsung selama {{ formattedDate.timeTaken }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
  import { defineProps, toRefs, ref, inject, computed, onMounted, isRef } from 'vue';
  import { formatNumber } from 'src/serv/format'

  const format = inject('formatSession')
  const formatOutput = format.getFormatOutput()
  const formatDate = format.getFormatDate()

  const props = defineProps({
    id: {
      type: String,
      required: true
    },
    outputs: {
      type: Array,
      required: true
    },
    start: {
      type: String,
      required: true,
    },
    end: {
      type: String,
      required: true,
    },
  })
  const { id, outputs, start, end } = toRefs(props)  

  const formattedDate = computed(() => formatDate({ start: start.value, end: end.value }))
  const maxOutputs = computed(() => calculateMaxResult(outputs.value))
  const formattedOutputs = computed(() => maxOutputs.value.map(formatOutput).map(it => it.consequence).join(', '))
  const maxConfidence = computed(() => {
    const vals = maxOutputs.value
    if (vals.length) {
      return formatNumber(vals[0].confidence * 100) + '%'
    }
    return '0 %'
  })

  function calculateMaxResult(outputs) {
    const DELTA = 0.0001
    let mc = 0
    let result = []
    for (let output of outputs) {
      if (output.confidence > mc) {
        mc = output.confidence
      }
    }
    for (let output of outputs) {
      if (Math.abs(output.confidence - mc) < DELTA) {
        result.push(output)
      }
    }
    return result
  }
</script>
