import axios from 'axios'
export function download(url, params, title) {
  axios({
    method: 'post',
    url: url,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: params,
    responseType: 'blob',
  }).then(res => {
    const link = document.createElement('a')
    const blob = new Blob([res.data], {
      type: 'application/vnd.ms-excel'
    })
    link.style.display = 'none'
    link.href = URL.createObjectURL(blob)
    link.setAttribute('download', title + '.xlsx')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  })
}