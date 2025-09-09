export default defineAppConfig({
  ui: {

    button: {
      slots: {
        base: 'font-bold border-3 rounded-none border-black bg-amber-300 drop-shadow-[4px_6px_0px_#000000] no-hover-effect cursor-pointer',
        variant: {
          solid: 'text-black'
        }
      }
    },
    card: {
      slots:{
        root: 'rounded-none border-3 border-black drop-shadow-[4px_6px_0px_#000000]',
        header: 'text-black font-bold text-xl',
        footer: 'text-black font-bold text-sm text-center'
      },
      variants:{
        variant: {
          solid: {
            root: 'bg-[#c4a6f9]'
          }
        }
      }
    },
    input:{
      slots: {
        base: 'border-3 border-black rounded-none'
      }
    },
    formField:{
      slots: {
        label: 'text-black font-bold text-sm',
        error: 'text-white font-semibold tracking-wide font-stretch-expanded text-[0.9rem]'
      }
    },


    toast: {
      slots: {
        root: 'border-2 border-black mb-4 text-black rounded-none drop-shadow-[6px_6px_0px_#000000] focus:outline-none ring-0',
        title: 'text-black font-bold text-xl mb-4',
        description: 'text-black font-bold',
      },
      variants: {
        color: {
          success: {
            root: 'bg-[#7FBC8C]',
            close: 'bg-red-400 text-white'
          },
          error: {
            root: 'bg-[#FF6B6B]',

          },
          info: {
            root: 'bg-[#FDFD96]',
            close: 'bg-red-400 text-white'
          }
        }
      }
    }
  }
})