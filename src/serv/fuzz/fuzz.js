import { onMounted, ref } from 'vue'
import { api } from 'boot/axios'
import { imply, defuzz, buildFuzzier, meta  } from './_fuzz';

const URL = '/v1/api/rule'

export default function fuzzy() {
  const rules = ref([])
  const loadingRules = ref(true)

  onMounted(async () => {
    const params = {
      perPage: 10000
    }
    const resp = await api.get(URL, { params })
    const { data } = resp
    rules.value = data.items.map((it) => {
      const predicate = it.predicate.split('').map((x) => parseInt(x))
      const consequence = parseInt(it.consequence)
      const rule = {
        predicate,
        consequence
      }
      return rule
    })
    loadingRules.value = false
  })

  const fuzzFunc = buildFuzzier(meta)

  function run(input) {
    console.log('input = ', input)
    const fuzzVals = fuzzFunc(input)
    console.log('fuzzVals')
    console.log(fuzzVals)
    const ruleInfos = imply(rules.value, fuzzVals)
    console.log('ruleInfos')
    console.log(ruleInfos)
    const results = defuzz(ruleInfos)
    console.log('results')
    console.log(results)
    return results
  }

  return {
    rules,
    loadingRules,
    run
  }
}