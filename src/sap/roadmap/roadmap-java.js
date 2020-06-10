import moment from 'moment'
import randomColor from 'randomcolor'

const style = {
  fontSize: '0.9rem'
}

export const keys = {
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

export const groups = [
  { id: 'odata', title: 'OData v2/4 type-safe client' },
  { id: 'saas', title: 'SDK as a Service' },
  { id: 'libs', title: 'SAP Eco-system' },
  { id: 'rest', title: 'Open API type-safe client' },
  { id: 'oss', title: 'Open Source SDK for Java' },
  { id: 'infra', title: 'K8s, Azure, AWS, GCP and beyond' },
  { id: 's4', title: 'S/4HANA API libraries' },
  { id: 'lobs', title: 'LoB Solutions' },
  { id: 'docs', title: 'SDK Documentation' },
  { id: 'support', title: 'Analyze and scale support' },
  { id: 'cap', title: 'One SAP' },
  { id: 'top', title: 'Quality and excellence' },
  { id: 'future', title: 'Future shots' }
]

export const items = [
  {
    id: 1,
    group: 'odata',
    title: 'Reach feature parity between OData V2/4 type-safe clients',
    start: moment().year(2020).month('Jan').date(1),
    end: moment().year(2020).month('Mar').date(32),
    itemProps: {
      'aria-hidden': true,
      onDoubleClick: () => { console.log('You clicked double!') },
      style: {
        ...style,
        background: randomColor({
          luminosity: 'dark'
        })
      }
    }
  },
  {
    id: 2,
    group: 'odata',
    title: 'Release advanced OData v4 features',
    start: moment().year(2020).month('Jan').date(1),
    end: moment().year(2020).month('Mar').date(32),
    itemProps: {
      'aria-hidden': true,
      onDoubleClick: () => { console.log('You clicked double!') },
      style: {
        ...style,
        background: randomColor({
          luminosity: 'dark'
        })
      }
    }
  },
  {
    id: 3,
    group: 'odata',
    title: 'Release unified programming model for OData v2/4.',
    start: moment().year(2020).month('Apr').date(1),
    end: moment().year(2020).month('Jun').date(31),
    itemProps: {
      'aria-hidden': true,
      onDoubleClick: () => { console.log('You clicked double!') },
      style: {
        ...style,
        background: randomColor({
          luminosity: 'dark'
        })
      }
    }
  },
  {
    id: 4,
    group: 'rest',
    title: 'Release type-safe client for SCP Workflow service ',
    start: moment().year(2020).month('Apr').date(1),
    end: moment().year(2020).month('Jun').date(31),
    itemProps: {
      'aria-hidden': true,
      onDoubleClick: () => { console.log('You clicked double!') },
      style: {
        ...style,
        background: randomColor({
          luminosity: 'dark'
        })
      }
    }
  },
  {
    id: 5,
    group: 'rest',
    title: 'Release Open API type-safe client generator',
    start: moment().year(2020).month('Apr').date(1),
    end: moment().year(2020).month('Jun').date(31),
    itemProps: {
      'aria-hidden': true,
      onDoubleClick: () => { console.log('You clicked double!') },
      style: {
        ...style,
        background: randomColor({
          luminosity: 'dark'
        })
      }
    }
  },
  {
    id: 6,
    group: 'rest',
    title: 'Pre-generated clients for Core, Job Scheduler, etc.',
    start: moment().year(2020).month('Apr').date(1),
    end: moment().year(2020).month('Jun').date(31),
    itemProps: {
      'aria-hidden': true,
      onDoubleClick: () => { console.log('You clicked double!') },
      style: {
        ...style,
        background: randomColor({
          luminosity: 'dark'
        })
      }
    }
  },
  {
    id: 7,
    group: 'docs',
    title: 'Release scalable docs and cover key features',
    start: moment().year(2020).month('Apr').date(1),
    end: moment().year(2020).month('Jun').date(31),
    itemProps: {
      'aria-hidden': true,
      onDoubleClick: () => { console.log('You clicked double!') },
      style: {
        ...style,
        background: randomColor({
          luminosity: 'dark'
        })
      }
    }
  },
  {
    id: 8,
    group: 'docs',
    title: 'Build analytics system for Documentation',
    start: moment().year(2020).month('Apr').date(1),
    end: moment().year(2020).month('Jun').date(31),
    itemProps: {
      'aria-hidden': true,
      onDoubleClick: () => { console.log('You clicked double!') },
      style: {
        ...style,
        background: randomColor({
          luminosity: 'dark'
        })
      }
    }
  },
  {
    id: 9,
    group: 'docs',
    title: 'Reach 70% of coverage for docs. Raise quality. Improve analytics',
    start: moment().year(2020).month('Jul').date(1),
    end: moment().year(2020).month('Sep').date(31),
    itemProps: {
      'aria-hidden': true,
      onDoubleClick: () => { console.log('You clicked double!') },
      style: {
        ...style,
        background: randomColor({
          luminosity: 'dark'
        })
      }
    }
  },
  {
    id: 10,
    group: 'future',
    title: 'Spring WebFlux - Web on Reactive Stack',
    start: moment().year(2020).month('Jul').date(1),
    end: moment().year(2020).month('Sep').date(31),
    itemProps: {
      'aria-hidden': true,
      onDoubleClick: () => { console.log('You clicked double!') },
      style: {
        ...style,
        background: randomColor({
          luminosity: 'dark'
        })
      }
    }
  },
  {
    id: 21,
    group: 'oss',
    title: 'Get approval to Open Source Cloud SDK for Java',
    start: moment().year(2020).month('Jul').date(1),
    end: moment().year(2020).month('Sep').date(31),
    itemProps: {
      'aria-hidden': true,
      onDoubleClick: () => { console.log('You clicked double!') },
      style: {
        ...style,
        background: randomColor({
          luminosity: 'dark'
        })
      }
    }
  },
  {
    id: 15,
    group: 'oss',
    title: 'Release Open Source version of SAP Cloud SDK for Java',
    start: moment().year(2020).month('Jul').date(1),
    end: moment().year(2020).month('Sep').date(31),
    itemProps: {
      'aria-hidden': true,
      onDoubleClick: () => { console.log('You clicked double!') },
      style: {
        ...style,
        background: randomColor({
          luminosity: 'dark'
        })
      }
    }
  },
  {
    id: 19,
    group: 'oss',
    title: 'Achieve a split between Open Source and Closed Source parts of the SDK',
    start: moment().year(2020).month('Jul').date(1),
    end: moment().year(2020).month('Sep').date(31),
    itemProps: {
      'aria-hidden': true,
      onDoubleClick: () => { console.log('You clicked double!') },
      style: {
        ...style,
        background: randomColor({
          luminosity: 'dark'
        })
      }
    }
  }
]
