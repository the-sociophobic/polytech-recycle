const sliceBetweenWords = (string, openTag, closeTag) => {
  let start = 0, end = -1
  
  const index = string
    .toLowerCase()
    .indexOf(openTag.toLowerCase())

  if (index !== -1)
    start = index + openTag.length

    
  if (closeTag) {
    const index = string
      .toLowerCase()
      .indexOf(closeTag.toLowerCase())

    if (index !== -1)
      end = index
  }

  if (start === 0)
    return ""
  if (end === -1)
    return string.slice(start)


  return string.slice(start, end)
}

export default sliceBetweenWords