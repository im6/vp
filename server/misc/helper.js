export const resSuccessObj = data => ({
  error: false,
  result: data
})

export const resFailObj = err => ({
  error: true,
  result: err
})
