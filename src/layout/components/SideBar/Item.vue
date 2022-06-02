<script>
const MenuItem = (props) => {
  const { icon, title } = props

  const vnodes = []

  if (icon) {
    vnodes.push(<svg-icon icon-class={icon}/>)
  }

  if (title) {
    vnodes.push(<span>{(title)}</span>)
  }
  return vnodes
}

MenuItem.props = ['icon', 'title']

export default MenuItem
</script>
