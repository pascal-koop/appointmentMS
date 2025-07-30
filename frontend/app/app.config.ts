export default defineAppConfig({
  ui: {

    button: {
      slots: {
        base: 'font-bold border-2 rounded-none border-black bg-amber-300 drop-shadow-[3px_3px_0px_#000000] no-hover-effect',
        variant: {
          solid: 'text-black'
        }
      }
    },
    card: {
      slots:{
        root: 'rounded-none border-2 border-black drop-shadow-[3px_3px_0px_#000000]',
        header: 'text-black font-bold text-xl',
        footer: 'text-black font-bold text-sm text-center'
      },
      variants:{
        variant: {
          solid: {
            root: 'bg-[#C4A1FF]'
          }
        }
      }
    },
    input:{
      slots: {
        base: 'border-2 border-black rounded-none'
      }
    },
    formField:{
      slots: {
        label: 'text-black font-bold text-sm'
      }
    }
  }
})