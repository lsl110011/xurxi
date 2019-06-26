import '@/vender/gt'

export default function (options) {
  return new Promise((resolve,reject) => {
    window.initGeetest(options,captchaObj => {
      resolve(captchaObj)
    })
  }) 
}


// const captchaObj =await initGeetest({
//       product: 'bind',
//       gt: data.gt,
//       challenge: data.challenge,
//       offline: !data.success,
//       new_captcha: true
// })