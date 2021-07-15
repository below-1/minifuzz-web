import { api } from 'boot/axios'

export default function (id, predicate, consequence) {
  return api.put(`/api/rule/${id}`, {
    predicate,
    consequence
  })
    .then(resp => resp.data)
}