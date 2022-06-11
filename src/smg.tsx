// @ts-ignore
const { shallowRef, ref, defineComponent,watchEffect, toRaw } = Vue

export default defineComponent({
  setup(props:any) {
    const smg = ref('smg')

    // console.log(" props -----------", smg);
    const shallow = shallowRef({
      greet: 'Hello, world'
    })

    // 第一次运行时记录一次 "Hello, world"
    watchEffect(() => {
      console.log(shallow.value.greet)
    })

    shallow.value.greet = 222

    return () =>shallow.value.greet
  }
})
