import moment from 'moment'

const [canMove, canResize, canChangeGroup] = [true, 'both', true]
const style = {
  'font-size': '0.9rem'
}

const keys = {
  groupIdKey: 'id',
  groupTitleKey: 'title',
  groupRightTitleKey: 'rightTitle',
  itemIdKey: 'id',
  itemTitleKey: 'title',
  itemDivTitleKey: 'title',
  itemGroupKey: 'group',
  itemTimeStartKey: 'start',
  itemTimeEndKey: 'end',
  groupLabelKey: 'title'
}

const groups = [
  { id: 'v4', title: 'OData v4 Support' },
  { id: 'v4-adv', title: 'Advanced OData v4 features' },
  { id: 'client', title: 'Unified OData v2/4 client' },
  { id: 3, title: 'SDK as a Service' },
  { id: 4, title: 'Integrations and Service libraries' },
  { id: 5, title: 'Open API type-safe client' },
  { id: 6, title: 'Azure, AWS, GCP and beyond' },
  { id: 7, title: 'Support S/4HANA Messaging and Events' },
  { id: 8, title: 'First-class K8s integration' },
  { id: 9, title: 'LoB Solutions' },
  { id: 10, title: 'Open API PoC' },
  { id: 11, title: 'SDK Documentation' }
]

const items = [
  {
    id: 1,
    group: 'v4',
    title: 'Reach feature parity between OData V2/4 type-safe clients',
    start_time: moment().year(2020).month('Jan').date(1),
    end_time: moment().year(2020).month('Mar').date(32),
    itemProps: {
      'aria-hidden': true,
      onDoubleClick: () => { console.log('You clicked double!') },
      style: {
        ...style,
        background: 'DodgerBlue'
      }
    },
    canMove: canMove,
    canResize: canResize,
    canChangeGroup: canChangeGroup
  },
  {
    id: 2,
    group: 'v4-adv',
    title: 'Release advanced OData v4 features',
    start_time: moment().year(2020).month('Apr').date(1),
    end_time: moment().year(2020).month('Jun').date(31),
    itemProps: {
      'aria-hidden': true,
      onDoubleClick: () => { console.log('You clicked double!') },
      style: {
        ...style,
        background: 'PaleVioletRed'
      }
    },
    canMove: canMove,
    canResize: canResize,
    canChangeGroup: canChangeGroup
  },
  {
    id: 3,
    group: 'client',
    title: 'Release unified programming model for OData v2/4. Simplify dependencies.',
    start_time: moment().year(2020).month('Apr').date(1),
    end_time: moment().year(2020).month('Jun').date(31),
    itemProps: {
      'aria-hidden': true,
      onDoubleClick: () => { console.log('You clicked double!') },
      style: {
        ...style,
        background: 'red',
        color: 'snow'
      }
    },
    canMove: canMove,
    canResize: canResize,
    canChangeGroup: canChangeGroup
  },
  {
    id: 4,
    group: 11,
    title: 'Release scalable docs and cover key features',
    start_time: moment().year(2020).month('Apr').date(1),
    end_time: moment().year(2020).month('Jun').date(31),
    itemProps: {
      'aria-hidden': true,
      onDoubleClick: () => { console.log('You clicked double!') },
      style: {
        ...style,
        background: 'green'
      }
    },
    canMove: canMove,
    canResize: canResize,
    canChangeGroup: canChangeGroup
  },
  {
    id: 5,
    group: 11,
    title: 'Reach 70% of coverage for docs. Raise quality. Improve analytics',
    start_time: moment().year(2020).month('Jul').date(1),
    end_time: moment().year(2020).month('Sep').date(31),
    itemProps: {
      'aria-hidden': true,
      onDoubleClick: () => { console.log('You clicked double!') },
      style: {
        ...style,
        background: 'DarkSeaGreen',
        color: 'black'
      }
    }
    // canMove: canMove,
    // canResize: canResize,
    // canChangeGroup: canChangeGroup
  }
]

export { groups, items, keys }
