export const handleDisplayCkeditor = (data) => {
  const url = import.meta.env.VITE_BASE_HOST
  const dangerouslySetInnerHTML = {__html: data}
  const parser = new DOMParser()
  const text = parser.parseFromString(dangerouslySetInnerHTML.__html, "text/html")
  let result = text.getElementsByTagName("img")
  if (result.length > 0) {
    for (let i = 0; i < result.length; i++) {
      result[i].style.maxHeight = "200px"
      result[i].style.maxWidth = "600px"
      result[i].src = `${url}${result[i].getAttribute("src")}`
    }
  }
  return text.getElementsByTagName("p")[0]?.outerHTML
}
