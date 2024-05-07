import { useCallback, useState } from "react"

export default function useAnimatedList(initialValue = []) {
  const [items, setItems] = useState(initialValue)

  const [pendingRemovalItemsIds, setPendingRemovalItemsIds] = useState([])

  const handleRemoveItems = useCallback((id) => {
    setPendingRemovalItemsIds((prevState) => [...prevState, id])
  }, [])

  const handleAnimationEnd = useCallback((id) => {
    setItems((prevState) => prevState.filter((message) => message.id !== id))
    setPendingRemovalItemsIds((prevState) =>
      prevState.filter((messageId) => messageId !== id)
    )
  }, [])

  const renderList = useCallback(
    (renderItem) =>
      items.map((item) =>
        renderItem(item, {
          isLeaving: pendingRemovalItemsIds.includes(item.id)
        })
      ),
    [items, pendingRemovalItemsIds]
  )

  return {
    items,
    setItems,
    handleRemoveItems,
    handleAnimationEnd,
    renderList
  }
}
