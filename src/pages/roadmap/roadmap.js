import React from 'react'
import 'react-calendar-timeline/lib/Timeline.css'
import Timeline from 'react-calendar-timeline'
import moment from 'moment'
import { groups, items, keys } from './roadmap-data.js'

const [canMove, canResize, canChangeGroup] = [true, 'both', true]

const config = {
  defaultTimeStart: moment().year(2020).startOf('year'),
  defaultTimeEnd: moment().year(2020).endOf('year'),
  sidebarWidth: 300,
  sidebarContent: 'This is my content',
  lineHeight: 40,
  itemHeightRatio: 0.85,
  // keys: keys,
  canMove: canMove,
  canResize: canResize,
  canChangeGroup: canChangeGroup
}

class Roadmap extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      groups,
      items,
      defaultTimeStart: config.defaultTimeStart,
      defaultTimeEnd: config.defaultTimeEnd
    }
  }

  handleItemMove (itemId, dragTime, newGroupOrder) {
    const { items, groups } = this.state

    const group = groups[newGroupOrder]

    this.setState({
      items: items.map(item =>
        item.id === itemId
          ? Object.assign({}, item, {
            start: dragTime,
            end: dragTime + (item.end - item.start),
            group: group.id
          })
          : item
      )
    })

    console.log('Moved', itemId, dragTime, newGroupOrder)
  };

  handleItemResize (itemId, time, edge) {
    const { items } = this.state

    this.setState({
      items: items.map(item =>
        item.id === itemId
          ? Object.assign({}, item, {
            start: edge === 'left' ? time : item.start,
            end: edge === 'left' ? item.end : time
          })
          : item
      )
    })

    console.log('Resized', itemId, time, edge)
  };

  render () {
    const properties = { ...config, ...this.state }
    return (
      <Timeline {...properties} />
    )
  }
}

export default Roadmap
