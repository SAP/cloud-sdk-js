import React, { Component } from 'react'
import Timeline from 'react-calendar-timeline'
// make sure you include the timeline stylesheet or the timeline will not be styled
import 'react-calendar-timeline/lib/Timeline.css'
import config from './config'
import {groups,items,keys} from './roadmap-java'

export default class Roadmap extends Component {
  constructor (props) {
    super(props)

    this.state = {
      items,
      groups,
    }
  }

  handleItemMove (itemId, dragTime, newGroupOrder) {
    const { items, groups } = this.state;

    const group = groups[newGroupOrder];

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
    });

    console.log("Moved", itemId, dragTime, newGroupOrder);
  }

  handleItemResize (itemId, time, edge) {
    const { items } = this.state;

    this.setState({
      items: items.map(item =>
        item.id === itemId
          ? Object.assign({}, item, {
              start: edge === "left" ? time : item.start,
              end: edge === "left" ? item.end : time
            })
          : item
      )
    });

    console.log("Resized", itemId, time, edge);
  }

  render () {
    const { groups, items } = this.state;

    return (
      <Timeline
        {
          ...{
            ...config,
            keys,
            groups,
            items,
            onItemMove: this.handleItemMove.bind(this),
            onItemResize: this.handleItemResize.bind(this)
          }
        }
      />
    )
  }
}
