import moment from 'moment'
import randomColor from 'randomcolor'

const style = {
  fontSize: '0.9rem'
}

const styleFocus = {
  fontSize: '0.9rem',
  background: 'indigo'
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
  { id: 'infra', title: 'K8s, Azure, AWS, GCP and beyond' },
  { id: 's4', title: 'S/4HANA API libraries' },
  { id: 'lobs', title: 'LoB Solutions' },
  { id: 'docs', title: 'SDK Documentation' },
  //  { id: 'support', title: 'Analyze and scale support' },
  { id: 'cap', title: 'One SAP' },
  { id: 'top', title: 'Developer happiness' },
  { id: 'future', title: 'Future shots' },
  { id: 'scp', title: 'SAP Cloud Platform' }
]

export const items = [
  {
    id: 1,
    group: 'odata',
    title: 'Reach feature parity between OData V2/4 type-safe clients',
    start: moment().year(2020).month('Mar').date(1),
    end: moment().year(2020).month('Jul').date(32),
    itemProps: {
      'aria-hidden': true,
      onDoubleClick: () => { console.log('You clicked double!') },
      style: {
        ...styleFocus
      }
    }
  },
  {
    id: 2,
    group: 'odata',
    title: 'Release advanced OData v4 features',
    start: moment().year(2020).month('Jul').date(1),
    end: moment().year(2020).month('Sep').date(32),
    itemProps: {
      'aria-hidden': true,
      onDoubleClick: () => { console.log('You clicked double!') },
      style: {
        ...styleFocus

      }
    }
  },
  {
    id: 5,
    group: 'rest',
    title: 'Release Open API type-safe client generator',
    start: moment().year(2020).month('Jul').date(0),
    end: moment().year(2020).month('Sep').date(31),
    itemProps: {
      'aria-hidden': true,
      onDoubleClick: () => { console.log('You clicked double!') },
      style: {
        ...styleFocus

      }
    }
  },
  {
    id: 6,
    group: 'libs',
    title: 'Pre-generated clients for WorkFlow Service.',
    start: moment().year(2020).month('Aug').date(1),
    end: moment().year(2020).month('Oct').date(31),
    itemProps: {
      'aria-hidden': true,
      onDoubleClick: () => { console.log('You clicked double!') },
      style: {
        ...styleFocus

      }
    }
  },
  {
    id: 7,
    group: 'libs',
    title: 'Pre-generated clients for Graph, Kernel Service, Job Scheduler, etc.',
    start: moment().year(2020).month('Oct').date(1),
    end: moment().year(2020).month('Dec').date(31),
    itemProps: {
      'aria-hidden': true,
      onDoubleClick: () => { console.log('You clicked double!') },
      style: {
        ...styleFocus

      }
    }
  },

  {
    id: 8,
    group: 'docs',
    title: 'Release scalable docs and cover key features',
    start: moment().year(2020).month('Apr').date(1),
    end: moment().year(2020).month('Jul').date(31),
    itemProps: {
      'aria-hidden': true,
      onDoubleClick: () => { console.log('You clicked double!') },
      style: {
        ...styleFocus

      }
    }
  },
  {
    id: 9,
    group: 'docs',
    title: 'Reach 70% of coverage for docs. Raise quality.',
    start: moment().year(2020).month('Jul').date(1),
    end: moment().year(2020).month('Oct').date(31),
    itemProps: {
      'aria-hidden': true,
      onDoubleClick: () => { console.log('You clicked double!') },
      style: {
        ...styleFocus

      }
    }
  },
  {
    id: 10,
    group: 'odata',
    title: 'Build reference CAP application to test OData v2/4',
    start: moment().year(2020).month('June').date(1),
    end: moment().year(2020).month('Dec').date(31),
    itemProps: {
      'aria-hidden': true,
      onDoubleClick: () => { console.log('You clicked double!') },
      style: {
        ...style

      }
    }
  },
  {
    id: 14,
    group: 'infra',
    title: 'Native support for K8s in Java',
    start: moment().year(2020).month('Sep').date(1),
    end: moment().year(2020).month('Nov').date(31),
    itemProps: {
      'aria-hidden': true,
      onDoubleClick: () => { console.log('You clicked double!') },
      style: {
        ...style
      }
    }
  },
  {
    id: 15,
    group: 's4',
    title: 'Generate OData v4 libraries for S/4HANA 2008 release',
    start: moment().year(2020).month('Aug').date(1),
    end: moment().year(2020).month('Aug').date(31),
    itemProps: {
      'aria-hidden': true,
      onDoubleClick: () => { console.log('You clicked double!') },
      style: {
        ...styleFocus

      }
    }
  },
  {
    id: 16,
    group: 's4',
    title: 'Type-safe client for S/4HANA on premise',
    start: moment().year(2020).month('Aug').date(20),
    end: moment().year(2020).month('Oct').date(31),
    itemProps: {
      'aria-hidden': true,
      onDoubleClick: () => { console.log('You clicked double!') },
      style: {
        ...styleFocus

      }
    }
  },
  {
    id: 17,
    group: 's4',
    title: 'Type-safe client for S/4HANA Enterprise Messaging',
    start: moment().year(2021).month('Jan').date(0),
    end: moment().year(2021).month('Mar').date(31),
    itemProps: {
      'aria-hidden': true,
      onDoubleClick: () => { console.log('You clicked double!') },
      style: {
        ...style

      }
    }
  },
  {
    id: 18,
    group: 'scp',
    title: 'Keep up with change rate of SCP development',
    start: moment().year(2020).month('Jul').date(20),
    end: moment().year(2020).month('Dec').date(31),
    itemProps: {
      'aria-hidden': true,
      onDoubleClick: () => { console.log('You clicked double!') },
      style: {
        ...style
      }
    }
  },
  {
    id: 19,
    group: 'saas',
    title: 'Automate release for existing libraries via Pipeline',
    start: moment().year(2021).month('Jan').date(0),
    end: moment().year(2021).month('Mar').date(31),
    itemProps: {
      'aria-hidden': true,
      onDoubleClick: () => { console.log('You clicked double!') },
      style: {
        ...styleFocus

      }
    }
  },
  {
    id: 20,
    group: 'infra',
    title: 'Improve service discovery and connectivity to enable new run times and rest client capabilities',
    start: moment().year(2020).month('Oct').date(20),
    end: moment().year(2020).month('Dec').date(31),
    itemProps: {
      'aria-hidden': true,
      onDoubleClick: () => { console.log('You clicked double!') },
      style: {
        ...styleFocus

      }
    }
  },
  {
    id: 21,
    group: 'odata',
    title: 'Ongoing support and refinement for OData v4/v2',
    start: moment().year(2020).month('Sep').date(1),
    end: moment().year(2020).month('Dec').date(32),
    itemProps: {
      'aria-hidden': true,
      onDoubleClick: () => { console.log('You clicked double!') },
      style: {
        ...style

      }
    }
  },

  {
    id: 25,
    group: 'cap',
    title: 'Regular alignment between CAP and SAP to achieve synergies',
    start: moment().year(2020).month('Mar').date(1),
    end: moment().year(2020).month('Dec').date(31),
    itemProps: {
      'aria-hidden': true,
      onDoubleClick: () => { console.log('You clicked double!') },
      style: {
        ...styleFocus

      }
    }
  },
  {
    id: 26,
    group: 'libs',
    title: 'Logging with SAP passport for Performance monitoring',
    start: moment().year(2020).month('Jul').date(1),
    end: moment().year(2020).month('Aug').date(31),
    itemProps: {
      'aria-hidden': true,
      onDoubleClick: () => { console.log('You clicked double!') },
      style: {
        ...style

      }
    }
  },
  {
    id: 27,
    group: 'top',
    title: 'Improve logging and debugging capabilities',
    start: moment().year(2020).month('Sep').date(1),
    end: moment().year(2021).month('Mar').date(31),
    itemProps: {
      'aria-hidden': true,
      onDoubleClick: () => { console.log('You clicked double!') },
      style: {
        ...style

      }
    }
  },
  {
    id: 29,
    group: 'top',
    title: 'Caching & resilience w/ multi-tenancy',
    start: moment().year(2020).month('Aug').date(20),
    end: moment().year(2020).month('Nov').date(31),
    itemProps: {
      'aria-hidden': true,
      onDoubleClick: () => { console.log('You clicked double!') },
      style: {
        ...styleFocus

      }
    }
  }

]
