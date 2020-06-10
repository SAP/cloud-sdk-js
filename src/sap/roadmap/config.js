import moment from 'moment'

const config = {
  defaultTimeStart: moment().year(2020).startOf('year'),
  defaultTimeEnd: moment().year(2020).endOf('year'),
  sidebarWidth: 300,
  sidebarContent: 'This is my content',
  lineHeight: 40,
  itemHeightRatio: 0.85,
  canMove: true,
  canResize: 'both',
  canChangeGroup: true,
  fullUpdate: true,
  itemTouchSendsClick: true,
  stackItems: true
}

export default config
