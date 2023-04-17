import { reactive } from 'vue'

export default function makeReactive(initData) {
    const data = reactive(initData)
    const reset = () => Object.assign(data, initData)
    const unwrap = () => Object
        .keys(initData)
        .map(key => ({ [key]: data[key] }))
        .reduce((obj, pair) => Object.assign(obj, pair), {})
    return { data, reset, unwrap }
}