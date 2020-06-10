import React, { Component } from 'react'
import 'react-calendar-timeline/lib/Timeline.css'
import config from './config'
import { groups, items, keys } from './roadmap-java'
import Timeline, {
  TimelineMarkers,
  CustomMarker,
  TodayMarker,
  CursorMarker
} from 'react-calendar-timeline'
import moment from 'moment'

export default class Roadmap extends Component {
  constructor (props) {
    super(props)

    this.state = {
      items,
      groups
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
  }

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
  }

  render () {
    const { groups, items } = this.state

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
      >
        <TimelineMarkers>
          <CustomMarker date={moment().year(2020).month('Mar').date(31)} >
            {({ styles, date }) => {
              const customStyles = {
                ...styles,
                backgroundColor: 'lightgreen',
                width: '4px'
              }
              return <div style={customStyles} />
            }}
          </CustomMarker>
          <CustomMarker date={moment().year(2020).month('Jun').date(31)} >
            {({ styles, date }) => {
              const customStyles = {
                ...styles,
                backgroundColor: 'lightgreen',
                width: '4px'
              }
              return <div style={customStyles} />
            }}
          </CustomMarker>
          <CustomMarker date={moment().year(2020).month('Sep').date(31)} >
            {({ styles, date }) => {
              const customStyles = {
                ...styles,
                backgroundColor: 'lightgreen',
                width: '4px'
              }
              return <div style={customStyles} />
            }}
          </CustomMarker>
          <CustomMarker date={moment()}>
            {({ styles, date }) => {
              const customStyles = {
                ...styles,
                backgroundColor: 'deeppink',
                width: '4px'
              }
              return <div style={customStyles} />
            }}
          </CustomMarker>
          <CursorMarker />
        </TimelineMarkers>
      </Timeline>
    )
  }
}
