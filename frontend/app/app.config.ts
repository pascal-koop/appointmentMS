export default defineAppConfig({
  ui: {
    popover: {
      slots: {
        content: 'ring-0! inset-shadow-none! focus:ring-none!'
      }
    },
    checkbox: {
      slots: {
        root: '',
        container: 'flex items-center',
        base: 'data-[state="unchecked"]:bg-amber-50! border-2! ring-0! drop-shadow-[2px_3px_0px_#000000]! ',
        indicator: 'flex items-center justify-center size-full text-inverted',
        icon: 'shrink-0 size-full',
      }
    },
    switch: {
      slots: {
        base: ['rounded-xl! bg-amber-100! h-[1.67rem]! data-[state="checked"]:bg-green-300!']
      },

    },
    card: {
      slots:{
        root: 'rounded-none border-3 border-black drop-shadow-[4px_6px_0px_#000000]',
        header: 'text-black font-bold text-xl',
        body: 'rounded-none',
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
        base: 'border-3 border-black rounded-none text-[16px]'
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
    },
    modal: {
      slots: {
        content: 'border-3 ring-0! inset-shadow-none! divide-black  bg-[#e3dff2] focus:ring-0! border-black rounded-none! drop-shadow-[4px_6px_0px_#000000] outline-none',

      },
    }
  }
})